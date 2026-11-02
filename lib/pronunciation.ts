import { getEnv } from "./cf-context";

/**
 * ============================================================
 * TUTOR DE PRONUNCIACIÃ“N
 * ============================================================
 * Transcribe el audio del usuario con Workers AI (Whisper),
 * compara con la frase objetivo y devuelve puntuaciÃ³n + feedback.
 */

// Modelos de Workers AI disponibles en plan Free
const STT_MODEL = "@cf/openai/whisper-tiny-en"; // speech-to-text inglÃ©s
const STT_MODEL_MULTI = "@cf/openai/whisper"; // multilingÃ¼e si disponible
const TTS_MODEL = "@cf/myshell-ai/melotts"; // text-to-speech multilingÃ¼e

export interface PronunciationResult {
  score: number; // 0-100
  transcription: string;
  feedback: string;
  phoneticIssues: string[];
}

/**
 * Transcribe audio usando Workers AI Whisper.
 * Recibe el audio en formato WebM/WAV como ArrayBuffer.
 */
export async function transcribeAudio(
  audio: ArrayBuffer,
  language: string
): Promise<string> {
  const env = getEnv();
  const model = language === "en" ? STT_MODEL : STT_MODEL;

  const response = await env.AI.run(model as any, {
    audio: [...new Uint8Array(audio)],
  });

  // Whisper devuelve { text: string }
  return (response as any).text?.trim() ?? "";
}

/**
 * Calcula similitud entre dos strings usando distancia de Levenshtein
 * normalizada. No requiere librerÃ­as externas.
 */
export function calculateSimilarity(a: string, b: string): number {
  const s1 = a.toLowerCase().trim().replace(/[.,!?;:]/g, "");
  const s2 = b.toLowerCase().trim().replace(/[.,!?;:]/g, "");

  if (s1 === s2) return 100;

  const matrix: number[][] = [];
  const len1 = s1.length;
  const len2 = s2.length;

  if (len1 === 0) return 0;
  if (len2 === 0) return 0;

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

/**
 * Detecta problemas fonÃ©ticos especÃ­ficos comparando palabras.
 */
export function detectPhoneticIssues(
  target: string,
  transcribed: string
): string[] {
  const issues: string[] = [];
  const targetWords = target.toLowerCase().split(/\s+/);
  const transcribedWords = transcribed.toLowerCase().split(/\s+/);

  // Palabras omitidas
  const missing = targetWords.filter(
    (w) => !transcribedWords.some((tw) => tw.includes(w) || w.includes(tw))
  );
  if (missing.length > 0) {
    issues.push(`Palabras no detectadas: ${missing.join(", ")}`);
  }

  // Palabras extraÃ±as
  const extra = transcribedWords.filter(
    (w) => !targetWords.some((tw) => tw.includes(w) || w.includes(tw))
  );
  if (extra.length > 0 && extra.length <= 3) {
    issues.push(`Posibles errores: ${extra.join(", ")}`);
  }

  return issues;
}

/**
 * Genera feedback textual segÃºn la puntuaciÃ³n.
 */
export function generateFeedback(score: number, issues: string[]): string {
  if (score >= 90) {
    return "Â¡Excelente pronunciaciÃ³n! Suena muy natural.";
  } else if (score >= 75) {
    return "Muy bien. PequeÃ±os detalles a pulir: " + issues.join("; ");
  } else if (score >= 50) {
    return "Vas por buen camino. Practica las palabras que no se detectaron claramente.";
  } else {
    return "Sigue intentÃ¡ndolo. Escucha la frase de referencia y repite despacio, palabra por palabra.";
  }
}

/**
 * Genera audio de referencia con TTS y lo guarda en R2.
 */
export async function generateReferenceAudio(
  phrase: string,
  language: string
): Promise<string> {
  const env = getEnv();
  const r2Key = `pronunciation-ref/${Date.now()}-${Math.random().toString(36).slice(2)}.mp3`;

  const response = await env.AI.run(TTS_MODEL as any, {
    text: phrase,
    lang: language,
  });

  // Melotts devuelve audio como Uint8Array en response.audio
  const audioData = (response as any).audio;
  if (audioData) {
    await env.LINGUAFLY_MEDIA.put(r2Key, audioData);
  }

  return r2Key;
}
