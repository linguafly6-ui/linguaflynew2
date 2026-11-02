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

  // MeloTTS espera "prompt" (no "text") como texto de entrada.
  const result = await env.AI.run(TTS_MODEL as any, {
    prompt: phrase,
    lang: language || "en",
  });

  // Workers AI puede devolver los bytes directamente o dentro de { audio }.
  const audio = (result as any)?.audio ?? result;
  let audioData: ArrayBuffer | Uint8Array;

  if (audio instanceof ArrayBuffer || ArrayBuffer.isView(audio)) {
    audioData = audio as ArrayBuffer | Uint8Array;
  } else if (audio && typeof audio.arrayBuffer === "function") {
    audioData = await audio.arrayBuffer();
  } else {
    throw new Error(
      `MeloTTS returned no usable audio payload (response type: ${Object.prototype.toString.call(result)})`
    );
  }

  if (audioData.byteLength === 0) {
    throw new Error("MeloTTS returned an empty audio payload");
  }

  const r2Key = `pronunciation-ref/${Date.now()}-${Math.random().toString(36).slice(2)}.mp3`;
  await env.LINGUAFLY_MEDIA.put(r2Key, audioData, {
    httpMetadata: { contentType: "audio/mpeg" },
  });

  return r2Key;
}
