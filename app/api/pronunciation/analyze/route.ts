import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import {
  transcribeAudio,
  calculateSimilarity,
  detectPhoneticIssues,
  generateFeedback,
} from "@/lib/pronunciation";


/**
 * POST /api/pronunciation/analyze
 * Recibe audio grabado por el usuario y la frase objetivo.
 * Devuelve puntuaciÃ³n, transcripciÃ³n y feedback.
 *
 * Body (multipart/form-data):
 *   - audio: Blob (WebM/WAV)
 *   - targetPhrase: string
 *   - language: string (en, fr, es)
 *   - phraseId?: string
 */
export async function POST(request: NextRequest) {
  try {
    const env = getEnv();
    const formData = await request.formData();

    const audioFile = formData.get("audio") as File | null;
    const targetPhrase = formData.get("targetPhrase") as string;
    const language = (formData.get("language") as string) || "en";
    const phraseId = formData.get("phraseId") as string | null;
    const userId = (formData.get("userId") as string) || "anonymous";

    if (!audioFile || !targetPhrase) {
      return NextResponse.json(
        { error: "Faltan audio o targetPhrase" },
        { status: 400 }
      );
    }

    // 1. Transcribir el audio con Workers AI Whisper
    const audioBuffer = await audioFile.arrayBuffer();
    const transcription = await transcribeAudio(audioBuffer, language);

    if (!transcription) {
      return NextResponse.json({
        score: 0,
        transcription: "",
        feedback: "No se pudo detectar el audio. Intenta hablar mÃ¡s cerca del micrÃ³fono.",
        phoneticIssues: [],
      });
    }

    // 2. Calcular similitud
    const score = calculateSimilarity(transcription, targetPhrase);

    // 3. Detectar problemas fonÃ©ticos
    const issues = detectPhoneticIssues(targetPhrase, transcription);

    // 4. Generar feedback
    const feedback = generateFeedback(score, issues);

    // 5. Guardar la sesiÃ³n en D1
    const sessionId = `pron-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    await env.DB.prepare(
      `INSERT INTO pronunciation_sessions (id, user_id, phrase_id, target_phrase, target_language, transcription, similarity_score, feedback, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`
    ).bind(
      sessionId,
      userId,
      phraseId || null,
      targetPhrase,
      language,
      transcription,
      score,
      feedback
    ).run();

    return NextResponse.json({
      sessionId,
      score,
      transcription,
      feedback,
      phoneticIssues: issues,
    });
  } catch (error) {
    console.error("Pronunciation analyze error:", error);
    return NextResponse.json(
      { error: "Error al analizar la pronunciaciÃ³n" },
      { status: 500 }
    );
  }
}
