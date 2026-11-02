import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";

const WHISPER_MODEL = "@cf/openai/whisper-large-v3-turbo";

export async function POST(request: NextRequest) {
  try {
    const env = getEnv();
    const formData = await request.formData();
    const audioFile = formData.get("audio");
    

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
        customMetadata: { language: "en" },
      });
    }

    // El alumno practica inglés incluso cuando el tutor le explica en español.
    const transcriptionLanguage = "en";

    // Whisper espera el audio codificado en base64. Convertir por bloques evita
    // exceder el límite de argumentos de String.fromCharCode con audios grandes.
    let binaryAudio = "";
    const chunkSize = 0x8000;
    for (let offset = 0; offset < audioBytes.length; offset += chunkSize) {
      binaryAudio += String.fromCharCode(...audioBytes.subarray(offset, offset + chunkSize));
    }
    const base64Audio = btoa(binaryAudio);

    const result = await env.AI.run(WHISPER_MODEL as any, {
      audio: base64Audio,
      task: "transcribe",
      language: transcriptionLanguage,
      vad_filter: false,
    });

    const transcription = String((result as any)?.text || "").trim();
    if (!transcription) {
      return NextResponse.json({ transcription: "", noSpeech: true });
    }

    return NextResponse.json({ transcription, noSpeech: false });
  } catch (error) {
    console.error("Voice input error:", error);
    return NextResponse.json({
      error: "Error al transcribir el audio",
      detail: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
}
