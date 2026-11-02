import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getCourseDB } from "@/lib/db";

export const runtime = "edge";
const json = (body: unknown, status = 200) => NextResponse.json(body, { status });
async function learnerFromSession() {
  const token = (await cookies()).get("lf_session")?.value;
  if (!token || token.length < 32 || token.length > 512) return null;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  const tokenHash = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, "0")).join("");
  const db = await getCourseDB();
  return db.prepare("SELECT l.id FROM learner_sessions s JOIN learners l ON l.id = s.learner_id WHERE s.token_hash = ? AND s.expires_at > datetime('now') AND l.status = 'active' LIMIT 1")
    .bind(tokenHash).first<{ id: string }>();
}
function normalize(value: unknown, caseSensitive: boolean, trim: boolean, unicode: string) {
  let text = String(value ?? "");
  try { if (unicode === "NFKC" || unicode === "NFC") text = text.normalize(unicode); } catch {}
  if (trim) text = text.trim();
  return caseSensitive ? text : text.toLocaleLowerCase("en-GB");
}
export async function POST(request: NextRequest, context: { params: Promise<{ level: string; unit: string }> }) {
  try {
    const learner = await learnerFromSession();
    if (!learner) return json({ error: "Authentication required." }, 401);
    const { level, unit } = await context.params;
    if (!/^(a1|a2|b1|b2|c1|c2)$/i.test(level) || !/^[1-9]\d{0,2}$/.test(unit)) return json({ error: "Invalid course unit." }, 400);
    const body = await request.json() as { exerciseId?: string; response?: unknown; idempotencyKey?: string; responseTimeMs?: number };
    if (!body.exerciseId || body.exerciseId.length > 128 || typeof body.idempotencyKey !== "string" || !/^[\w-]{12,100}$/.test(body.idempotencyKey)) return json({ error: "exerciseId and a valid idempotencyKey are required." }, 400);
    const responseText = JSON.stringify(body.response);
    if (responseText.length > 12000) return json({ error: "Response is too large." }, 413);
    const responseTime = Number.isInteger(body.responseTimeMs) ? Math.max(0, Math.min(3600000, body.responseTimeMs!)) : null;
    const db = await getCourseDB();
    const existing = await db.prepare("SELECT id, is_correct, score, max_score, feedback_json FROM learning_attempts WHERE learner_id = ? AND exercise_id = ? AND idempotency_key = ? LIMIT 1")
      .bind(learner.id, body.exerciseId, body.idempotencyKey).first<Record<string, unknown>>();
    if (existing) return json({ attemptId: existing.id, isCorrect: Boolean(existing.is_correct), score: existing.score, maxScore: existing.max_score, feedback: JSON.parse(String(existing.feedback_json || "{}")) });
    const exercise = await db.prepare("SELECT e.id, e.points, k.grading_strategy, k.answer_config_json, k.normalization_config_json, k.correct_feedback, k.incorrect_feedback FROM exercises e JOIN sections s ON s.id = e.section_id JOIN units u ON u.id = s.unit_id JOIN courses c ON c.id = u.course_id JOIN exercise_answer_keys k ON k.exercise_id = e.id WHERE e.id = ? AND e.status = 'published' AND s.status = 'published' AND u.status = 'published' AND c.status = 'published' AND c.cefr_level = ? AND u.unit_number = ? AND c.language_code = 'en' LIMIT 1")
      .bind(body.exerciseId, level.toUpperCase(), Number(unit)).first<Record<string, unknown>>();
    if (!exercise) return json({ error: "Exercise not found." }, 404);
    const strategy = String(exercise.grading_strategy);
    const answerConfig = JSON.parse(String(exercise.answer_config_json || "{}")) as { correctOptionKeys?: string[]; acceptedAnswers?: string[]; answers?: string[] };
    const normalization = JSON.parse(String(exercise.normalization_config_json || "{}")) as { caseSensitive?: boolean; trim?: boolean; unicodeNormalization?: string };
    let isCorrect: boolean;
    if (strategy === "single_choice") {
      const selected = typeof body.response === "string" ? body.response : (body.response as { optionKey?: string } | null)?.optionKey;
      if (typeof selected !== "string" || !Array.isArray(answerConfig.correctOptionKeys)) return json({ error: "Invalid answer format." }, 422);
      isCorrect = answerConfig.correctOptionKeys.includes(selected);
    } else if (strategy === "exact_match" || strategy === "accepted_answers") {
      const candidate = typeof body.response === "string" ? body.response : (body.response as { answer?: string } | null)?.answer;
      const accepted = answerConfig.acceptedAnswers ?? answerConfig.answers;
      if (typeof candidate !== "string" || !Array.isArray(accepted)) return json({ error: "Invalid answer format." }, 422);
      const options = { caseSensitive: normalization.caseSensitive ?? false, trim: normalization.trim ?? true, unicode: normalization.unicodeNormalization ?? "NFKC" };
      const normalized = normalize(candidate, options.caseSensitive, options.trim, options.unicode);
      isCorrect = accepted.some(answer => normalize(answer, options.caseSensitive, options.trim, options.unicode) === normalized);
    } else {
      return json({ error: "This exercise grading type is not supported yet." }, 501);
    }
    const maxScore = Math.max(0, Number(exercise.points) || 1);
    const score = isCorrect ? maxScore : 0;
    const feedback = { message: String(isCorrect ? exercise.correct_feedback || "Correct. Well done!" : exercise.incorrect_feedback || "Not quite. Review the question and try again.") };
    const attemptId = crypto.randomUUID();
    await db.prepare("INSERT INTO learning_attempts (id, learner_id, exercise_id, idempotency_key, response_json, is_correct, score, max_score, response_time_ms, feedback_json, grading_version) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
      .bind(attemptId, learner.id, body.exerciseId, body.idempotencyKey, responseText, isCorrect ? 1 : 0, score, maxScore, responseTime, JSON.stringify(feedback), "linguafly-v1").run();
    await db.prepare("INSERT INTO learner_exercise_state (learner_id, exercise_id, attempts_count, correct_count, last_attempt_at, last_is_correct, updated_at) VALUES (?, ?, 1, ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP) ON CONFLICT(learner_id, exercise_id) DO UPDATE SET attempts_count = attempts_count + 1, correct_count = correct_count + excluded.correct_count, last_attempt_at = CURRENT_TIMESTAMP, last_is_correct = excluded.last_is_correct, updated_at = CURRENT_TIMESTAMP")
      .bind(learner.id, body.exerciseId, isCorrect ? 1 : 0, isCorrect ? 1 : 0).run();
    await db.prepare("INSERT INTO learner_unit_progress (learner_id, unit_id, status, exercises_attempted, exercises_correct, started_at, updated_at) SELECT ?, u.id, 'in_progress', 1, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM exercises e JOIN sections s ON s.id = e.section_id JOIN units u ON u.id = s.unit_id WHERE e.id = ? ON CONFLICT(learner_id, unit_id) DO UPDATE SET status = CASE WHEN learner_unit_progress.status = 'not_started' THEN 'in_progress' ELSE learner_unit_progress.status END, exercises_attempted = exercises_attempted + 1, exercises_correct = exercises_correct + excluded.exercises_correct, started_at = COALESCE(started_at, CURRENT_TIMESTAMP), updated_at = CURRENT_TIMESTAMP")
      .bind(learner.id, isCorrect ? 1 : 0, body.exerciseId).run();
    return json({ attemptId, isCorrect, score, maxScore, feedback });
  } catch (error) {
    console.error("Attempt submission failed", error);
    return json({ error: "Unable to record this attempt." }, 500);
  }
}
