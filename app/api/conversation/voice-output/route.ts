import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";

const TTS_MODEL = "@cf/myshell-ai/melotts";

export async function POST(request: NextRequest) {
  try {
    const env = getEnv();
    const { text, language } = await request.json() as any;

    if (typeof text !== "string" || !text.trim() || typeof language !== "string" || !language.trim()) {
      return NextResponse.json({ error: "Se requiere texto e idioma" }, { status: 400 });
    }

    if (!env.AI?.run) {
      return NextResponse.json({ error: "Workers AI no estÃ¡ disponible" }, { status: 503 });
    }

    const languageValue = language.toLowerCase().trim();
    const languageAliases: Record<string, string> = {
      english: "en", spanish: "es", french: "fr", german: "de",
      italian: "it", portuguese: "pt",
    };
    const supportedLanguage = languageAliases[languageValue] || languageValue.split("-")[0];

    // Usar siempre MeloTTS y el mismo idioma normalizado recibido durante la sesión.
    const result = await env.AI.run(TTS_MODEL as any, {
      prompt: text.trim(),
      lang: supportedLanguage,
    });

    const encodedAudio = (result as any)?.audio;
    if (!encodedAudio || typeof encodedAudio !== "string") {
      return NextResponse.json({ error: "MeloTTS no estÃ¡ disponible para generar audio" }, { status: 503 });
    }

    const binary = atob(encodedAudio);
    const audioBytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index++) {
      audioBytes[index] = binary.charCodeAt(index);
    }

    // Guardar una copia del audio generado en R2 cuando el binding estÃ¡ configurado.
    if (env.LINGUAFLY_MEDIA) {
      const key = `conversation/voice-output/${crypto.randomUUID()}.mp3`;
      await env.LINGUAFLY_MEDIA.put(key, audioBytes, {
        httpMetadata: { contentType: "audio/mpeg" },
        customMetadata: { language: supportedLanguage },
      });
    }

    return new Response(audioBytes, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": String(audioBytes.byteLength),
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Conversation voice output error:", error);
    return NextResponse.json({ error: "Error al generar audio con MeloTTS" }, { status: 503 });
  }
}
