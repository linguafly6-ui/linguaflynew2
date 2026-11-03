import { getEnv } from "./cf-context";

const TTS_MODEL = "@cf/myshell-ai/melotts";

export async function generateAudio(text: string): Promise<string | null> {
  try {
    const env = getEnv();
    const audioResponse = await env.AI.run(TTS_MODEL as never, { prompt: text, lang: "en" });
    let audioBuffer: ArrayBuffer;
    if (audioResponse instanceof ReadableStream) {
      audioBuffer = await new Response(audioResponse).arrayBuffer();
    } else if (audioResponse instanceof ArrayBuffer) {
      audioBuffer = audioResponse;
    } else if (audioResponse instanceof Uint8Array) {
      audioBuffer = audioResponse.buffer as ArrayBuffer;
    } else {
      audioBuffer = await new Response(audioResponse as BodyInit).arrayBuffer();
    }
    const bytes = new Uint8Array(audioBuffer);
    let binary = "";
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, i + chunkSize);
      binary += String.fromCharCode.apply(null, Array.from(chunk));
    }
    return btoa(binary);
  } catch (error) {
    console.error("TTS error:", error);
    return null;
  }
}

