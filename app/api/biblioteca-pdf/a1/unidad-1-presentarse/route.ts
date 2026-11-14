import { getDB } from "@/lib/db";

export const dynamic = "force-dynamic";

interface PdfFileRow {
  title: string;
  filename: string;
  content_type: string;
  size_bytes: number;
}

interface PdfChunkRow {
  chunk_index: number;
  content: ArrayBuffer;
}

export async function GET() {
  const db = await getDB();
  const slug = "a1-unidad-1-presentarse";

  const pdf = await db
    .prepare(
      "SELECT title, filename, content_type, size_bytes FROM biblioteca_pdf_files WHERE slug = ? LIMIT 1",
    )
    .bind(slug)
    .first<PdfFileRow>();

  if (!pdf) {
    return new Response("El PDF todavía no está disponible.", {
      status: 404,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const chunks = await db
    .prepare(
      "SELECT chunk_index, content FROM biblioteca_pdf_chunks WHERE slug = ? ORDER BY chunk_index ASC",
    )
    .bind(slug)
    .all<PdfChunkRow>();

  if (!chunks.results.length) {
    return new Response("El archivo PDF está incompleto.", {
      status: 500,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const body = new Uint8Array(pdf.size_bytes);
  let offset = 0;

  for (const chunk of chunks.results) {
    const bytes = new Uint8Array(chunk.content);
    body.set(bytes, offset);
    offset += bytes.byteLength;
  }

  if (offset !== pdf.size_bytes) {
    return new Response("El archivo PDF está incompleto.", {
      status: 500,
      headers: { "Cache-Control": "no-store" },
    });
  }

  return new Response(body, {
    headers: {
      "Content-Type": pdf.content_type || "application/pdf",
      "Content-Disposition": `attachment; filename="${pdf.filename}"`,
      "Content-Length": String(pdf.size_bytes),
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
