import { getDB } from "@/lib/db";

export const dynamic = "force-dynamic";

interface PdfRow {
  content: ArrayBuffer;
  content_type: string;
  filename: string;
}

export async function GET() {
  const db = await getDB();
  const pdf = await db
    .prepare(
      "SELECT content, content_type, filename FROM biblioteca_pdfs WHERE slug = ? LIMIT 1",
    )
    .bind("a1-unidad-1-presentarse")
    .first<PdfRow>();

  if (!pdf) {
    return new Response("El PDF todavía no está disponible.", {
      status: 404,
      headers: { "Cache-Control": "no-store" },
    });
  }

  return new Response(pdf.content, {
    headers: {
      "Content-Type": pdf.content_type || "application/pdf",
      "Content-Disposition": `attachment; filename="${pdf.filename}"`,
      "Content-Length": String(pdf.content.byteLength),
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
