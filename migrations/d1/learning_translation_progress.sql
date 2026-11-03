-- Traducciones reutilizables y progreso granular del recorrido de aprendizaje.
CREATE TABLE IF NOT EXISTS translation_cache (
  id TEXT PRIMARY KEY,
  word TEXT NOT NULL,
  translation TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_translation_cache_word ON translation_cache(word);

CREATE TABLE IF NOT EXISTS learning_exercise_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  exercise_id INTEGER NOT NULL,
  course_id TEXT NOT NULL,
  unit_number INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'in_progress',
  attempts INTEGER NOT NULL DEFAULT 0,
  is_correct INTEGER NOT NULL DEFAULT 0,
  xp_awarded INTEGER NOT NULL DEFAULT 0,
  completed_at TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(student_id, exercise_id)
);
CREATE INDEX IF NOT EXISTS idx_learning_exercise_student_course
  ON learning_exercise_progress(student_id, course_id, unit_number, status);

CREATE TABLE IF NOT EXISTS learning_streaks (
  student_id INTEGER PRIMARY KEY,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_practice_date TEXT,
  xp_total INTEGER NOT NULL DEFAULT 0
);
