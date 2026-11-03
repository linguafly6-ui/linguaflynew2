import { NextRequest, NextResponse } from "next/server";
import { generateAudio } from "@/lib/conversation";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { text?: string };
    const text: string | undefined = body.text;
    if (!text || text.trim().length === 0) return NextResponse.json({ error: "Falta text" }, { status: 400 });
    const audioBase64 = await generateAudio(text.trim());
    if (!audioBase64) return NextResponse.json({ error: "No se pudo generar el audio" }, { status: 500 });
    return NextResponse.json({ audioBase64 });
  } catch (error) {
    console.error("Pronounce error:", error);
    return NextResponse.json({ error: "Error al generar el audio" }, { status: 500 });
  }
}
