import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";

const WHISPER_MODEL = "@cf/openai/whisper";

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
      return NextResponse.json({ error: "El audio supera el límite de 10 MB" }, { status: 413 });
    }

    if (!env.AI?.run) {
      return NextResponse.json({ error: "Workers AI no está disponible" }, { status: 503 });
    }

    const audioBytes = new Uint8Array(await audioFile.arrayBuffer());

    // Guardar el audio original en R2 cuando el binding está configurado.
    if (env.LINGUAFLY_MEDIA) {
      const key = `conversation/voice-input/${crypto.randomUUID()}`;
      await env.LINGUAFLY_MEDIA.put(key, audioBytes, {
        httpMetadata: { contentType: audioFile.type || "audio/webm" },
        customMetadata: { language: language || "auto" },
      });
    }

    const result = await env.AI.run(WHISPER_MODEL as any, {
      audio: Array.from(audioBytes),
      ...(language ? { language } : {}),
    });

    const transcription = String((result as any)?.text || "").trim();
    if (!transcription) {
      return NextResponse.json({ error: "No se pudo reconocer voz en el audio" }, { status: 422 });
    }

    return NextResponse.json({ transcription });
  } catch (error) {
    console.error("Conversation voice input error:", error);
    return NextResponse.json({ error: "Error al transcribir el audio" }, { status: 500 });
  }
}
