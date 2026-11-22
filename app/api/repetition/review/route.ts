import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent, studentUserId } from "@/lib/student-auth";
import { processReview, generateAdaptiveContent, type ReviewResult } from "@/lib/spaced-repetition";

export async function POST(request: NextRequest) {
  try {
    const student = await getStudent(request);
    if (!student) return NextResponse.json({ error: "Inicia sesión para registrar tus repasos." }, { status: 401 });
    const db = getEnv().DB;
    if (!db) return NextResponse.json({ error: "Servicio de repetición no disponible." }, { status: 503 });

    const body = await request.json() as {
      itemId?: string; rating?: number; wasCorrect?: boolean; word?: string;
      translation?: string; language?: string; userLevel?: string;
    };
    const { itemId, rating, wasCorrect } = body;
    if (!itemId || itemId.length > 128 || !Number.isInteger(rating) || rating! < 0 || rating! > 5 || typeof wasCorrect !== "boolean") {
      return NextResponse.json({ error: "Los datos de la revisión no son válidos." }, { status: 400 });
    }
    let aiContent: string | null = null;
    if (!wasCorrect && body.word && body.translation) {
      aiContent = await generateAdaptiveContent(body.word.slice(0, 160), body.translation.slice(0, 240),
        (body.language || "en").slice(0, 12), (body.userLevel || "A1").slice(0, 12));
    }
    const result: ReviewResult = { item_id: itemId, rating: rating!, was_correct: wasCorrect, ai_generated_content: aiContent };
    await processReview(db, result, studentUserId(student));
    return NextResponse.json({ success: true, nextReviewScheduled: true, adaptiveContent: aiContent });
  } catch (error) {
    if (error instanceof Error && error.message === "Item no encontrado") return NextResponse.json({ error: "Repaso no encontrado." }, { status: 404 });
    console.error("SR review error:", error);
    return NextResponse.json({ error: "Error al procesar la revisión." }, { status: 500 });
  }
}
