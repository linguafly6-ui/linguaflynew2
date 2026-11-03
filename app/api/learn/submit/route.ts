import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent } from "@/lib/student-auth";
import { getSpeakingProgress } from "@/lib/learn";

export async function POST(request: NextRequest) {
  try {
    const student = await getStudent(request);
    if (!student) return NextResponse.json({ error: "Inicia sesión para guardar tu progreso." }, { status: 401 });
    const body = await request.json() as { exerciseId?: unknown; answer?: unknown };
    const exerciseId = Number(body.exerciseId);
    const answer = typeof body.answer === "string" ? body.answer.trim().slice(0, 1000) : "";
    if (!Number.isInteger(exerciseId) || exerciseId < 1 || !answer) {
      return NextResponse.json({ error: "Respuesta o ejercicio no válido." }, { status: 400 });
    }

    const env = getEnv();
    const db = env.COURSE_DB || env.DB;
    if (!db) return NextResponse.json({ error: "Base de datos no disponible." }, { status: 503 });
    const exercise = await db.prepare(
      'SELECT ei.id,ei.correct_answer,ei.explanation,eu.course_id,eu.unit_number FROM exercise_items ei JOIN exercise_units eu ON eu.id=ei.unit_id WHERE ei.id=?'
    ).bind(exerciseId).first() as any;
    if (!exercise) return NextResponse.json({ error: "Ejercicio no encontrado." }, { status: 404 });

    const correctAnswer = String(exercise.correct_answer || "").trim();
    const normalize = (value: string) => value.toLocaleLowerCase("en").replace(/[.!?]+$/g, "").replace(/\s+/g, " ").trim();
    const correct = normalize(answer) === normalize(correctAnswer);
    const previous = await db.prepare("SELECT id,status,attempts,xp_awarded FROM learning_exercise_progress WHERE student_id=? AND exercise_id=?")
      .bind(student.id, exerciseId).first() as any;
    const oldXp = Number(previous?.xp_awarded || 0);
    const nextXp = correct ? 10 : 5;
    const xpEarned = Math.max(0, nextXp - oldXp);
    const attempts = Number(previous?.attempts || 0) + 1;

    await db.prepare(
      "INSERT INTO learning_exercise_progress(student_id,exercise_id,course_id,unit_number,status,attempts,is_correct,xp_awarded,completed_at,updated_at) VALUES(?,?,?,?,?,?,?,?,CASE WHEN ?=1 THEN datetime('now') ELSE NULL END,datetime('now')) ON CONFLICT(student_id,exercise_id) DO UPDATE SET status=CASE WHEN excluded.is_correct=1 THEN 'completed' ELSE learning_exercise_progress.status END,attempts=excluded.attempts,is_correct=MAX(learning_exercise_progress.is_correct,excluded.is_correct),xp_awarded=MAX(learning_exercise_progress.xp_awarded,excluded.xp_awarded),completed_at=CASE WHEN excluded.is_correct=1 THEN COALESCE(learning_exercise_progress.completed_at,datetime('now')) ELSE learning_exercise_progress.completed_at END,updated_at=datetime('now')"
    ).bind(student.id, exerciseId, exercise.course_id, exercise.unit_number, correct ? "completed" : "in_progress", attempts, correct ? 1 : 0, Math.max(oldXp, nextXp), correct ? 1 : 0).run();

    const today = new Date().toISOString().slice(0, 10);
    const streakRow = await db.prepare("SELECT current_streak,longest_streak,last_practice_date,xp_total FROM learning_streaks WHERE student_id=?")
      .bind(student.id).first() as any;
    const last = String(streakRow?.last_practice_date || "");
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const currentStreak = last === today ? Number(streakRow?.current_streak || 1) : last === yesterday ? Number(streakRow?.current_streak || 0) + 1 : 1;
    const longestStreak = Math.max(Number(streakRow?.longest_streak || 0), currentStreak);
    await db.prepare(
      "INSERT INTO learning_streaks(student_id,current_streak,longest_streak,last_practice_date,xp_total) VALUES(?,?,?,?,?) ON CONFLICT(student_id) DO UPDATE SET current_streak=excluded.current_streak,longest_streak=excluded.longest_streak,last_practice_date=excluded.last_practice_date,xp_total=excluded.xp_total"
    ).bind(student.id, currentStreak, longestStreak, today, Number(streakRow?.xp_total || 0) + xpEarned).run();

    const counts = await db.prepare(
      "SELECT COUNT(*) AS total, SUM(CASE WHEN status='completed' THEN 1 ELSE 0 END) AS completed FROM learning_exercise_progress WHERE student_id=? AND course_id=? AND unit_number=?"
    ).bind(student.id, exercise.course_id, exercise.unit_number).first() as any;
    const unitItemCount = await db.prepare(
      "SELECT COUNT(*) AS total FROM exercise_items ei JOIN exercise_units eu ON eu.id=ei.unit_id WHERE eu.course_id=? AND eu.unit_number=?"
    ).bind(exercise.course_id, exercise.unit_number).first() as any;
    const completedCount = Number(counts?.completed || 0);
    const total = Number(unitItemCount?.total || 60);
    const exercisesCompleted = total > 0 && completedCount >= total;
    if (exercisesCompleted) {
      await db.prepare(
        "INSERT INTO unified_progress(student_id,course_type,unit_number,score,completed,attempts,last_attempt,completed_at) VALUES(?,?,?,?,1,1,datetime('now'),datetime('now')) ON CONFLICT(student_id,course_type,unit_number) DO UPDATE SET completed=1,score=MAX(score,100),last_attempt=datetime('now'),completed_at=COALESCE(completed_at,datetime('now'))"
      ).bind(student.id, "exercises-" + exercise.course_id, exercise.unit_number, 100).run();
    }

    const speaking = await getSpeakingProgress(db, exercise.course_id, Number(student.id), Number(exercise.unit_number));
    const unitCompleted = exercisesCompleted && Boolean(speaking?.completed);
    const nextExercise = correct ? (unitCompleted ? null : { type: exercisesCompleted ? "speaking" : "exercise" }) : null;
    const totals = await db.prepare("SELECT xp_total,current_streak,longest_streak FROM learning_streaks WHERE student_id=?")
      .bind(student.id).first() as any;
    return NextResponse.json({
      correct,
      correctAnswer,
      explanation: exercise.explanation,
      nextExercise,
      unitCompleted,
      xpEarned,
      xpTotal: Number(totals?.xp_total || 0),
      streak: Number(totals?.current_streak || 0),
      completedCount,
      total
    });
  } catch (error) {
    console.error("Learn submit error:", error);
    return NextResponse.json({ error: "No se pudo guardar la respuesta." }, { status: 500 });
  }
}
