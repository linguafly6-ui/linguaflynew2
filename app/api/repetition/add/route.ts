import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { addSRItem } from "@/lib/spaced-repetition";


/**
 * POST /api/repetition/add
 * AÃ±ade una nueva palabra al sistema de repeticiÃ³n espaciada.
 *
 * Body JSON: {
 *   userId: string,
 *   word: string,
 *   translation: string,
 *   language: string,
 *   contextSentence?: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const env = getEnv();
    const { userId, word, translation, language, contextSentence } = await request.json() as any;

    if (!userId || !word || !translation) {
      return NextResponse.json({ error: "Faltan userId, word o translation" }, { status: 400 });
    }

    const id = await addSRItem(
      env.DB,
      userId,
      word,
      translation,
      language || "en",
      contextSentence
    );

    return NextResponse.json({ success: true, itemId: id });
  } catch (error) {
    console.error("SR add error:", error);
    return NextResponse.json({ error: "Error al aÃ±adir palabra" }, { status: 500 });
  }
}
