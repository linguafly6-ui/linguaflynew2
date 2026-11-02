import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";

const WHISPER_MODEL = "@cf/openai/whisper-large-v3-turbo";

export async function POST(request: NextRequest) {
  try {
    const env = getEnv();
    const formData = await request.formData();
    const audioFile = formData.get("audio");
    const language = String(formData.get("language") || "").trim();

    if (!(audioFile instanceof File) || audioFile.size === 0) {
      return NextResponse.json({ error: "Falta el archivo de audio" }, { status: 400 });
    }

    if (!audioFile.type.startsWith("audio/")) {
      return NextResponse.json({ error: "El archivo debe ser audio" }, { status: 400 });
    }

    if (audioFile.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "El audio supera el lÃ­mite de 10 MB" }, { status: 413 });
    }

    if (!env.AI?.run) {
      return NextResponse.json({ error: "Workers AI no estÃ¡ disponible" }, { status: 503 });
    }

    const audioBytes = new Uint8Array(await audioFile.arrayBuffer());

    // Guardar el audio original en R2 cuando el binding estÃ¡ configurado.
    if (env.LINGUAFLY_MEDIA) {
      const key = `conversation/voice-input/${crypto.randomUUID()}`;
      await env.LINGUAFLY_MEDIA.put(key, audioBytes, {
        httpMetadata: { contentType: audioFile.type || "audio/webm" },
        customMetadata: { language: language || "auto" },
      });
    }

    const normalizedLanguage = language.toLowerCase().trim();
    const languageAliases: Record<string, string> = {
      english: "en", spanish: "es", french: "fr", german: "de",
      italian: "it", portuguese: "pt",
    };
    const languageCode = languageAliases[normalizedLanguage] || normalizedLanguage.split("-")[0];
    const supportedLanguages = new Set(["en", "es", "fr", "de", "it", "pt"]);
    const transcriptionLanguage = supportedLanguages.has(languageCode) ? languageCode : "en";

    const result = await env.AI.run(WHISPER_MODEL as any, {
      audio: Array.from(audioBytes),
      task: "transcribe",
      language: transcriptionLanguage,
      vad_filter: false,
    });

    const transcription = String((result as any)?.text || "").trim();
    if (!transcription) {
      return NextResponse.json({ error: "No se pudo reconocer voz en el audio" }, { status: 422 });
    }

    return NextResponse.json({ transcription });
  } catch (error) {
    console.error("Voice input error:", error);
    return NextResponse.json({
      error: "Error al transcribir el audio",
      detail: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
}
