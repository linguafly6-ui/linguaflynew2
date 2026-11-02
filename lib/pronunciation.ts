import { getEnv } from "./cf-context";

/**
 * ============================================================
 * TUTOR DE PRONUNCIACIÓN
 * ============================================================
 * Transcribe el audio del usuario con Workers AI (Whisper),
 * compara con la frase objetivo y devuelve puntuación + feedback.
 */

// Modelos de Workers AI disponibles en plan Free
const STT_MODEL = "@cf/openai/whisper-tiny-en";
const TTS_MODEL = "@cf/myshell-ai/melotts";

export interface PronunciationResult {
  score: number;
  transcription: string;
  feedback: string;
  phoneticIssues: string[];
}

export async function transcribeAudio(
  audio: ArrayBuffer,
  language: string
): Promise<string> {
  const env = getEnv();
  if (!env?.AI) {
    throw new Error("Cloudflare Workers AI binding (env.AI) is not available");
  }

  const response = await env.AI.run(STT_MODEL as any, {
    audio: [...new Uint8Array(audio)],
  });

  return (response as any).text?.trim() ?? "";
}

export function calculateSimilarity(a: string, b: string): number {
  const s1 = a.toLowerCase().trim().replace(/[.,!?;:]/g, "");
  const s2 = b.toLowerCase().trim().replace(/[.,!?;:]/g, "");

  if (s1 === s2) return 100;
  const matrix: number[][] = [];
  const len1 = s1.length;
  const len2 = s2.length;
  if (len1 === 0 || len2 === 0) return 0;

  for (let i = 0; i <= len1; i++) matrix[i] = [i];
  for (let j = 0; j <= len2; j++) matrix[0][j] = j;

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  const distance = matrix[len1][len2];
  const maxLen = Math.max(len1, len2);
  return Math.round(((maxLen - distance) / maxLen) * 100);
}

export function detectPhoneticIssues(
  target: string,
  transcribed: string
): string[] {
  const issues: string[] = [];
  const targetWords = target.toLowerCase().split(/\s+/);
  const transcribedWords = transcribed.toLowerCase().split(/\s+/);

  const missing = targetWords.filter(
    (w) => !transcribedWords.some((tw) => tw.includes(w) || w.includes(tw))
  );
  if (missing.length > 0) {
    issues.push(`Palabras no detectadas: ${missing.join(", ")}`);
  }

  const extra = transcribedWords.filter(
    (w) => !targetWords.some((tw) => tw.includes(w) || w.includes(tw))
  );
  if (extra.length > 0 && extra.length <= 3) {
    issues.push(`Posibles errores: ${extra.join(", ")}`);
  }

  return issues;
}

export function generateFeedback(score: number, issues: string[]): string {
  if (score >= 90) {
    return "¡Excelente pronunciación! Suena muy natural.";
  } else if (score >= 75) {
    return "Muy bien. Pequeños detalles a pulir: " + issues.join("; ");
  } else if (score >= 50) {
    return "Vas por buen camino. Practica las palabras que no se detectaron claramente.";
  } else {
    return "Sigue intentándolo. Escucha la frase de referencia y repite despacio, palabra por palabra.";
  }
}

/**
 * Genera audio con MeloTTS y lo guarda en R2 como audio/mpeg.
 */
export async function generateReferenceAudio(
  phrase: string,
  language: string
): Promise<string> {
  const env = getEnv();

  if (!env?.AI) {
    throw new Error("Cloudflare Workers AI binding (env.AI) is not available");
  }
  if (!env?.LINGUAFLY_MEDIA) {
    throw new Error("Cloudflare R2 binding (env.LINGUAFLY_MEDIA) is not available");
  }

  const result = await env.AI.run(TTS_MODEL as any, {
    prompt: phrase,
    lang: language || "en",
  });

  // Registrar la estructura real de la respuesta para depurar.
  console.log("MeloTTS tipo de resultado:", typeof result);
  console.log(
    "MeloTTS claves del resultado:",
    result && typeof result === "object" ? Object.keys(result) : "N/A"
  );
  console.log("MeloTTS constructor:", (result as any)?.constructor?.name);

  let audioBytes: ArrayBuffer | Uint8Array | string | null = null;
  const response = result as any;

  // Caso 1: objeto Response (tiene método arrayBuffer).
  if (result && typeof response.arrayBuffer === "function") {
    audioBytes = await response.arrayBuffer();
  }
  // Caso 2: objeto con propiedad audio.
  else if (result && typeof result === "object" && response.audio) {
    audioBytes = response.audio;
  }
  // Caso 3: string (audio binario).
  else if (typeof result === "string") {
    audioBytes = result;
  }
  // Caso 4: objeto con body.
  else if (result && response.body) {
    audioBytes = await new Response(response.body).arrayBuffer();
  } else {
    const resultStr = JSON.stringify(result, null, 2);
    throw new Error(
      `MeloTTS devolvió un formato inesperado. Tipo: ${typeof result}, Valor: ${resultStr?.substring(0, 500)}`
    );
  }

  if (!audioBytes) {
    throw new Error("MeloTTS devolvió audio vacío");
  }

  const audioData =
    audioBytes instanceof ArrayBuffer
      ? new Uint8Array(audioBytes)
      : audioBytes instanceof Uint8Array
        ? audioBytes
        : new TextEncoder().encode(audioBytes);

  if (audioData.byteLength === 0) {
    throw new Error("MeloTTS devolvió audio vacío");
  }

  const r2Key = `pronunciation-ref/${Date.now()}-${Math.random().toString(36).slice(2)}.mp3`;
  await env.LINGUAFLY_MEDIA.put(r2Key, audioData, {
    httpMetadata: { contentType: "audio/mpeg" },
  });

  return r2Key;
}
