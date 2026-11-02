import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import {
  processReview,
  generateAdaptiveContent,
  type ReviewResult,
} from "@/lib/spaced-repetition";


/**
 * POST /api/repetition/review
 * Registra el resultado de una revisiÃ³n y genera contenido adaptativo si fallÃ³.
 *
 * Body JSON: {
 *   itemId: string,
 *   userId: string,
 *   rating: number (0-5),
 *   wasCorrect: boolean,
 *   word: string,
 *   translation: string,
 *   language: string,
 *   userLevel: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const env = getEnv();
    const body = await request.json() as any;

    const {
      itemId,
      userId,
      rating,
      wasCorrect,
      word,
      translation,
      language,
      userLevel,
    } = body;

    if (!itemId || rating === undefined || wasCorrect === undefined) {
      return NextResponse.json({ error: "Faltan parÃ¡metros" }, { status: 400 });
    }

    // Si el usuario fallÃ³, generar un nuevo ejemplo con IA
    let aiContent: string | null = null;
    if (!wasCorrect) {
      aiContent = await generateAdaptiveContent(
        word,
        translation,
        language || "en",
        userLevel || "A1"
      );
    }

    // Procesar la revisiÃ³n (SM-2 + guardar en D1)
    const result: ReviewResult = {
      item_id: itemId,
      rating,
      was_correct: wasCorrect,
      ai_generated_content: aiContent,
    };

    await processReview(env.DB, result);

    return NextResponse.json({
      success: true,
      nextReviewScheduled: true,
      adaptiveContent: aiContent,
    });
  } catch (error) {
    console.error("SR review error:", error);
    return NextResponse.json({ error: "Error al procesar revisiÃ³n" }, { status: 500 });
  }
}
