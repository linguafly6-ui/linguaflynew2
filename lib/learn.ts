import { buildUnit, LEVEL_TOPICS } from "@/lib/exercise-data/build";

export const LEARN_COURSES = ["a1", "a2", "b1", "b2", "c1", "c2"] as const;
export type LearnCourse = typeof LEARN_COURSES[number];

export function speakingProgressTable(course: string) {
  if (!LEARN_COURSES.includes(course as LearnCourse)) throw new Error("Curso no válido");
  return course + "_speaking_progress";
}

export async function ensureLearnUnit(db: any, course: string, unitNumber: number) {
  if (!LEVEL_TOPICS[course] || unitNumber < 1 || unitNumber > 100) throw new Error("Unidad no válida");
  const unit = buildUnit(course, unitNumber);
  let row = await db.prepare("SELECT id FROM exercise_units WHERE course_id=? AND unit_number=?")
    .bind(course, unitNumber).first() as { id?: number } | null;
  let unitId = Number(row?.id || 0);
  if (!unitId) {
    await db.prepare("INSERT OR IGNORE INTO exercise_units(course_id,unit_number,title,description,topic,is_free) VALUES(?,?,?,?,?,?)")
      .bind(course, unitNumber, unit.title, unit.description, unit.topic, unitNumber <= 5 ? 1 : 0).run();
    row = await db.prepare("SELECT id FROM exercise_units WHERE course_id=? AND unit_number=?")
      .bind(course, unitNumber).first() as { id?: number } | null;
    unitId = Number(row?.id || 0);
  }
  if (!unitId) throw new Error("No se pudo inicializar la unidad");
  const existing = await db.prepare("SELECT COUNT(*) AS total FROM exercise_items WHERE unit_id=?")
    .bind(unitId).first() as { total?: number } | null;
  if (Number(existing?.total || 0) < unit.exercises.length) {
    const statements = unit.exercises.map((e) => db.prepare(
      'INSERT OR IGNORE INTO exercise_items(unit_id,category,exercise_type,question,instruction,passage,audio_key,options,correct_answer,explanation,difficulty,"order") VALUES(?,?,?,?,?,?,?,?,?,?,?,?)'
    ).bind(unitId, e.category, e.exercise_type, e.question, e.instruction, e.passage || null,
      e.audio_key || null, e.options ? JSON.stringify(e.options) : null, e.correct_answer,
      e.explanation, e.difficulty, e.order));
    for (let i = 0; i < statements.length; i += 50) await db.batch(statements.slice(i, i + 50));
  }
  return { unitId, unit, total: unit.exercises.length };
}

export async function getSpeakingProgress(db: any, course: string, studentId: number, unitNumber: number) {
  const table = speakingProgressTable(course);
  return await db.prepare("SELECT completed, score FROM " + table + " WHERE user_id=? AND unit_id=?")
    .bind("student-" + studentId, unitNumber).first() as { completed?: number; score?: number } | null;
}
