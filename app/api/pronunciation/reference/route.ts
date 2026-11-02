import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { generateReferenceAudio } from "@/lib/pronunciation";


/**
 * POST /api/pronunciation/reference
 * Genera audio de referencia (TTS) para una frase y lo sirve desde R2.
 *
 * Body JSON: { phrase: string, language: string }
 */
export async function POST(request: NextRequest) {
  try {
    const env = getEnv();
    const { phrase, language } = await request.json() as any;

    if (!phrase) {
      return NextResponse.json({ error: "Falta phrase" }, { status: 400 });
    }

    const r2Key = await generateReferenceAudio(phrase, language || "en");

    // Devolver URL pÃºblica del audio en R2
    return NextResponse.json({
      audioUrl: `/api/media/${r2Key}`,
      r2Key,
    });
  } catch (error) {
    console.error("Reference audio error:", error);
    return NextResponse.json(
      { error: "Error al generar audio de referencia" },
      { status: 500 }
    );
  }
}
