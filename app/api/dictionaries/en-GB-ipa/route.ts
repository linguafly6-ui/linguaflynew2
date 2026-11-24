import { NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";

export const dynamic = "force-dynamic";
const CHUNK_COUNT = 10;

export async function GET() {
  try {
    const bucket = getEnv().LINGUAFLY_MEDIA;
    if (!bucket) return NextResponse.json({ error: "Almacén de diccionarios no disponible" }, { status: 503 });
    const chunks = await Promise.all(
      Array.from({ length: CHUNK_COUNT }, (_, index) =>
        bucket.get(`dictionaries/en-GB-ipa/chunk-${String(index).padStart(3, "0")}`),
      ),
    );
    if (chunks.some((chunk) => !chunk)) {
      return NextResponse.json({ error: "Diccionario IPA incompleto" }, { status: 503 });
    }
    const content = (await Promise.all(chunks.map((chunk) => chunk!.text()))).join("");
    JSON.parse(content);
    return new Response(content, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("Could not load IPA dictionary from R2:", error);
    return NextResponse.json({ error: "No se pudo cargar el diccionario IPA" }, { status: 503 });
  }
}
