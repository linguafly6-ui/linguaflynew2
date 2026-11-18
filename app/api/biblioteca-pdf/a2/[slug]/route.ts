import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { A2_PDF_UNITS } from "@/lib/a2-pdf-units";
import { buildA2ExerciseSections, getA2ReadingPassages } from "@/lib/a2-exercise-generator";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const unit = A2_PDF_UNITS.find((item) => item.slug === slug);
  if (!unit) return new Response("Unidad A2 no encontrada.", { status: 404 });

  const pdf = await PDFDocument.create();
  pdf.setTitle(`Inglés A2 - Unidad ${unit.number}: ${unit.title}`);
  pdf.setAuthor("Linguafly");
  pdf.setSubject(unit.focus);
  pdf.setKeywords(["inglés A2", "ejercicios inglés PDF", unit.title, "gramática inglesa"]);
  pdf.setCreator("Linguafly");
  pdf.setProducer("Linguafly PDF Workbook");

  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 48;
  const contentWidth = pageWidth - margin * 2;
  let page = pdf.addPage([pageWidth, pageHeight]);
  let y = pageHeight - 54;
  let pageNumber = 1;

  const footer = () => {
    page.drawLine({ start: { x: margin, y: 34 }, end: { x: pageWidth - margin, y: 34 }, thickness: 0.6, color: rgb(0.82, 0.86, 0.91) });
    page.drawText("LINGUAFLY  |  CUADERNO DE INGLES A2", { x: margin, y: 20, size: 8, font: regular, color: rgb(0.38, 0.43, 0.52) });
    page.drawText(String(pageNumber), { x: pageWidth - margin - 12, y: 20, size: 8, font: regular, color: rgb(0.38, 0.43, 0.52) });
  };
  const nextPage = () => {
    footer();
    page = pdf.addPage([pageWidth, pageHeight]);
    pageNumber += 1;
    y = pageHeight - 54;
  };
  const ensure = (height: number) => { if (y - height < 58) nextPage(); };
  const cleanPdfText = (value: string) => value
    .replace(/[→➜]/g, "->")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[—–]/g, "-")
    .replace(/…/g, "...")
    .replace(/•/g, "-")
    .replace(/\u00a0/g, " ");
  const wrap = (value: string, font: typeof regular, size: number) => {
    const words = cleanPdfText(value).split(/\s+/);
    const lines: string[] = [];
    let line = "";
    for (const word of words) {
      const candidate = line ? line + " " + word : word;
      if (font.widthOfTextAtSize(candidate, size) > contentWidth && line) {
        lines.push(line);
        line = word;
      } else line = candidate;
    }
    if (line) lines.push(line);
    return lines;
  };
  const paragraph = (value: string, opts: { font?: typeof regular; size?: number; color?: ReturnType<typeof rgb>; indent?: number; gap?: number } = {}) => {
    const font = opts.font || regular;
    const size = opts.size || 10;
    const color = opts.color || rgb(0.17, 0.21, 0.29);
    const gap = opts.gap ?? 5;
    const lines = wrap(value, font, size);
    ensure(lines.length * (size + 4) + gap);
    for (const line of lines) {
      page.drawText(line, { x: margin + (opts.indent || 0), y, size, font, color });
      y -= size + 4;
    }
    y -= gap;
  };
  const heading = (value: string) => {
    ensure(28);
    y -= 3;
    page.drawText(cleanPdfText(value).toUpperCase(), { x: margin, y, size: 11, font: bold, color: rgb(0.08, 0.28, 0.62) });
    y -= 19;
  };

  page.drawText("LINGUAFLY  |  ENGLISH A2", { x: margin, y, size: 9, font: bold, color: rgb(0.08, 0.35, 0.72) });
  y -= 32;
  for (const line of wrap(`UNIT ${unit.number} - ${unit.title}`, bold, 22)) {
    page.drawText(line, { x: margin, y, size: 22, font: bold, color: rgb(0.07, 0.12, 0.22) });
    y -= 27;
  }
  paragraph(unit.focus, { size: 11, color: rgb(0.30, 0.36, 0.46), gap: 12 });
  heading("1. Explicacion");
  paragraph(unit.explanation, { size: 10.5, gap: 8 });
  heading("2. Estructuras clave");
  for (const item of unit.structure) paragraph("- " + item, { indent: 5, size: 10, gap: 2 });
  heading("3. Ejemplos");
  for (const item of unit.examples) paragraph("- " + item, { indent: 5, size: 10, gap: 2 });
  heading("4. Vocabulario");
  for (const item of unit.vocabulary) paragraph("- " + item, { indent: 5, size: 10, gap: 2 });
  const sections = buildA2ExerciseSections(unit);
  heading("5. Practica — 200 ejercicios");
  paragraph("Distribución: 80 ejercicios de gramática, 60 de vocabulario y 60 preguntas de reading. Completa primero todas las actividades y consulta después las soluciones.", { size: 9, color: rgb(0.38, 0.43, 0.52), gap: 8 });
  let exerciseNumber = 1;
  for (const section of sections) {
    if (section.title.startsWith("READING")) {
      heading("READING TEXTS - Lee los 12 textos antes de responder");
      const passages = getA2ReadingPassages();
      passages.forEach((passage, index) => {
        paragraph(`TEXT ${index + 1}: ${passage.title}`, { font: bold, size: 9.5, gap: 3 });
        paragraph(passage.body, { size: 9, gap: 9 });
      });
    }
    heading(section.title);
    for (const exercise of section.exercises) {
      paragraph(`${exerciseNumber}. ${exercise.question}`, { font: bold, size: 8.5, gap: 2 });
      paragraph("Respuesta: __________________________________________________________", { size: 8, color: rgb(0.50, 0.54, 0.60), gap: 4 });
      exerciseNumber += 1;
    }
  }
  heading("6. Soluciones y explicaciones");
  exerciseNumber = 1;
  for (const section of sections) {
    heading(section.title);
    for (const exercise of section.exercises) {
      paragraph(`${exerciseNumber}. ${exercise.answer}`, { font: bold, size: 8.5, gap: 1 });
      paragraph(exercise.note, { size: 8, color: rgb(0.36, 0.41, 0.49), gap: 4 });
      exerciseNumber += 1;
    }
  }
  footer();

  const bytes = await pdf.save();
  const responseBuffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(responseBuffer).set(bytes);
  const filename = `linguafly-a2-unidad-${unit.number}.pdf`;
  return new Response(responseBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
