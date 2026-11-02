import { NextRequest, NextResponse } from "next/server";
import { generateReferenceAudio } from "@/lib/pronunciation";
import { getStudent } from "@/lib/student-auth";

/**
 * POST /api/pronunciation/reference
 * Genera audio de referencia (TTS) para una frase y lo sirve desde R2.
 *
 * Body JSON: { phrase: string, language: string }
 */
export async function POST(request: NextRequest) {
  try {
    const student = await getStudent(request);
    if (student?.plan !== "pro") return NextResponse.json({ error: "Pro required" }, { status: 403 });
    const { phrase, language } = (await request.json()) as {
      phrase?: string;
      language?: string;
    };

    if (!phrase?.trim()) {
      return NextResponse.json({ error: "Falta phrase" }, { status: 400 });
    }

    const r2Key = await generateReferenceAudio(phrase.trim(), language || "en");

    return NextResponse.json({
      audioUrl: `/api/media/${r2Key}`,
      r2Key,
    });
  } catch (error) {
    console.error("Pronunciation reference error:", error);
    return Response.json(
      {
        error: "Error al generar audio de referencia",
        detail: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
