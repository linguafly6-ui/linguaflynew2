export type D1DatabaseLike = { prepare: (sql: string) => any };

export async function saveUnifiedProgress(
  db: D1DatabaseLike,
  studentId: number,
  courseType: string,
  unitNumber: number,
  score: number,
  completed: boolean,
) {
  await db.prepare(`
    INSERT INTO unified_progress
      (student_id,course_type,unit_number,score,completed,attempts,last_attempt,completed_at)
    VALUES (?,?,?,?,?,1,datetime('now'),CASE WHEN ?=1 THEN datetime('now') ELSE NULL END)
    ON CONFLICT(student_id,course_type,unit_number) DO UPDATE SET
      score=MAX(unified_progress.score,excluded.score),
      completed=MAX(unified_progress.completed,excluded.completed),
      attempts=unified_progress.attempts+1,
      last_attempt=datetime('now'),
      completed_at=CASE WHEN excluded.completed=1 THEN COALESCE(unified_progress.completed_at,datetime('now')) ELSE unified_progress.completed_at END
  `).bind(studentId,courseType,unitNumber,score,completed?1:0,completed?1:0).run();
}
