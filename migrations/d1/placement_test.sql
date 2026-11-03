-- Ejecutar una sola vez en COURSE_DB.
ALTER TABLE students ADD COLUMN placement_level TEXT;

CREATE TABLE IF NOT EXISTS placement_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  level_assigned TEXT NOT NULL,
  total_correct INTEGER NOT NULL DEFAULT 0,
  answers_json TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_placement_results_student ON placement_results(student_id, created_at);
