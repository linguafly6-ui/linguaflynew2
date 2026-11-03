import { getEnv } from "./cf-context";
import { checkAiRateLimit } from "./ai-helpers";

/**
 * ============================================================
 * REPETICIÃ“N ESPACIADA ADAPTATIVA (SM-2 + IA)
 * ============================================================
 * Implementa el algoritmo SM-2 (como Anki) pero con generaciÃ³n
 * de contenido adaptativo mediante Workers AI.
 */

const CHAT_MODEL = "@cf/meta/llama-3.1-8b-instruct";

export interface SRItem {
  id: string;
  user_id: string;
  word: string;
  translation: string;
  language: string;
  context_sentence: string | null;
  interval_days: number;
  ease_factor: number;
  repetitions: number;
  next_review_at: string;
  last_reviewed_at: string | null;
  total_reviews: number;
  correct_reviews: number;
}

export interface ReviewResult {
  item_id: string;
  rating: number; // 0-5 (SM-2 quality)
  was_correct: boolean;
  ai_generated_content: string | null;
}

/**
 * Algoritmo SM-2: calcula el prÃ³ximo intervalo de revisiÃ³n.
 * @param quality 0-5 (0-2: incorrecto, 3-5: correcto)
 * @param repetitions nÃºmero de repeticiones correctas consecutivas
 * @param ease_factor factor de facilidad (mÃ­nimo 1.3)
 * @param interval intervalo actual en dÃ­as
 */
export function calculateSM2(
  quality: number,
  repetitions: number,
  easeFactor: number,
  interval: number
): { newInterval: number; newEase: number; newRepetitions: number } {
  let newRepetitions: number;
  let newEase: number;
  let newInterval: number;

  if (quality < 3) {
    // Respuesta incorrecta: reiniciar
    newRepetitions = 0;
    newInterval = 1;
    newEase = Math.max(1.3, easeFactor - 0.2);
  } else {
    // Respuesta correcta
    newRepetitions = repetitions + 1;
    if (newRepetitions === 1) {
      newInterval = 1;
    } else if (newRepetitions === 2) {
      newInterval = 3;
    } else {
      newInterval = Math.round(interval * easeFactor);
    }
    newEase = Math.max(
      1.3,
      easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    );
  }

  return { newInterval, newEase, newRepetitions };
}

/**
 * Obtiene los items pendientes de repaso para un usuario.
 */
export async function getDueItems(
  db: D1Database,
  userId: string,
  limit: number = 20
): Promise<SRItem[]> {
  const now = new Date().toISOString();
  const rows = await db.prepare(
    `SELECT * FROM sr_items 
     WHERE user_id = ? AND next_review_at <= ? 
     ORDER BY next_review_at ASC 
     LIMIT ?`
  ).bind(userId, now, limit).all();

  return (rows.results || []) as unknown as SRItem[];
}

/**
 * Procesa el resultado de una revisiÃ³n y actualiza el item en D1.
 */
export async function processReview(
  db: D1Database,
  result: ReviewResult
): Promise<void> {
  // Obtener el item actual
  const item = await db.prepare(
    "SELECT * FROM sr_items WHERE id = ?"
  ).bind(result.item_id).first<SRItem>();

  if (!item) throw new Error("Item no encontrado");

  const { newInterval, newEase, newRepetitions } = calculateSM2(
    result.rating,
    item.repetitions,
    item.ease_factor,
    item.interval_days
  );

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + newInterval);

  // Actualizar el item
  await db.prepare(
    `UPDATE sr_items SET 
       interval_days = ?,
       ease_factor = ?,
       repetitions = ?,
       next_review_at = ?,
       last_reviewed_at = ?,
       total_reviews = total_reviews + 1,
       correct_reviews = correct_reviews + ?
     WHERE id = ?`
  ).bind(
    newInterval,
    newEase,
    newRepetitions,
    nextReview.toISOString(),
    new Date().toISOString(),
    result.was_correct ? 1 : 0,
    result.item_id
  ).run();

  // Guardar la revisiÃ³n
  await db.prepare(
    `INSERT INTO sr_reviews (id, user_id, item_id, rating, was_correct, ai_generated_content, created_at)
     VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`
  ).bind(
    `rev-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    item.user_id,
    result.item_id,
    result.rating,
    result.was_correct ? 1 : 0,
    result.ai_generated_content,
  ).run();
}

/**
 * Genera un nuevo ejemplo/contexto para una palabra usando IA.
 * Esto hace que el repaso no sea estÃ¡tico: cada vez que el usuario
 * falla, la IA crea un nuevo ejemplo para reforzar el aprendizaje.
 */
export async function generateAdaptiveContent(
  word: string,
  translation: string,
  language: string,
  userLevel: string
): Promise<string> {
  const env = getEnv();

  const langName = language === "en" ? "inglÃ©s" : language === "fr" ? "francÃ©s" : "espaÃ±ol";

  const prompt = `Genera UNA frase de ejemplo en ${langName} usando la palabra "${word}" (significado: "${translation}").
La frase debe ser apta para nivel ${userLevel}.
Devuelve SOLO la frase, sin explicaciones ni traducciÃ³n.`;

  if (!(await checkAiRateLimit("spaced-repetition"))) throw new Error("AI_RATE_LIMITED");
  const response = await env.AI.run(CHAT_MODEL as any, {
    messages: [
      { role: "system", content: "Eres un asistente que genera frases de ejemplo para aprender idiomas. Responde SOLO con la frase, nada mÃ¡s." },
      { role: "user", content: prompt },
    ],
    max_tokens: 60,
    temperature: 0.8,
  });

  return (response as any).response?.trim() ?? "";
}

/**
 * AÃ±ade una nueva palabra al sistema de repeticiÃ³n espaciada.
 */
export async function addSRItem(
  db: D1Database,
  userId: string,
  word: string,
  translation: string,
  language: string,
  contextSentence?: string
): Promise<string> {
  const id = `sr-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  await db.prepare(
    `INSERT INTO sr_items (id, user_id, word, translation, language, context_sentence, interval_days, ease_factor, repetitions, next_review_at, created_at)
     VALUES (?, ?, ?, ?, ?, ?, 1, 2.5, 0, datetime('now'), datetime('now'))`
  ).bind(id, userId, word, translation, language, contextSentence || null).run();

  return id;
}

/**
 * Obtiene estadÃ­sticas de progreso del usuario.
 */
export async function getSRStats(db: D1Database, userId: string) {
  const total = await db.prepare(
    "SELECT COUNT(*) as count FROM sr_items WHERE user_id = ?"
  ).bind(userId).first<{ count: number }>();

  const due = await db.prepare(
    "SELECT COUNT(*) as count FROM sr_items WHERE user_id = ? AND next_review_at <= datetime('now')"
  ).bind(userId).first<{ count: number }>();

  const mastered = await db.prepare(
    "SELECT COUNT(*) as count FROM sr_items WHERE user_id = ? AND repetitions >= 5"
  ).bind(userId).first<{ count: number }>();

  const accuracy = await db.prepare(
    `SELECT 
       COUNT(*) as total,
       SUM(was_correct) as correct
     FROM sr_reviews WHERE user_id = ?`
  ).bind(userId).first<{ total: number; correct: number }>();

  return {
    totalItems: total?.count || 0,
    dueToday: due?.count || 0,
    mastered: mastered?.count || 0,
    accuracy: (accuracy?.total || 0) > 0
      ? Math.round(((accuracy!.correct / accuracy!.total) * 100))
      : 0,
  };
}
