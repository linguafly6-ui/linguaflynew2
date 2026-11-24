import { NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";

export const dynamic = "force-dynamic";
const ALLOWED = new Set(["a1", "a2", "b1", "b2", "c1", "c2"]);

export async function GET(_request: Request, { params }: { params: Promise<{ level: string }> }) {
  const { level: raw } = await params;
  const level = raw.toLowerCase();
  if (!ALLOWED.has(level)) return NextResponse.json({ error: "Nivel no válido" }, { status: 400 });

  try {
    const bucket = getEnv().LINGUAFLY_MEDIA;
    if (!bucket) return NextResponse.json({ error: "Almacén de contenido no disponible" }, { status: 503 });
    const object = await bucket.get(`speaking/${level}.json`);
    if (!object) return NextResponse.json({ error: "Contenido no encontrado" }, { status: 404 });
    return new Response(object.body, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Could not load Speaking content from R2:", error);
    return NextResponse.json({ error: "No se pudo cargar el contenido Speaking" }, { status: 503 });
  }
}
