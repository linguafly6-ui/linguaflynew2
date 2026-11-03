-- B1 Speaking: progress for the 200-unit Cambridge B1 Preliminary course.
CREATE TABLE IF NOT EXISTS b1_speaking_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  unit_id INTEGER NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  completed INTEGER NOT NULL DEFAULT 0,
  attempts INTEGER NOT NULL DEFAULT 0,
  feedback TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, unit_id)
);
CREATE INDEX IF NOT EXISTS idx_b1_speaking_progress_user_unit
  ON b1_speaking_progress(user_id, unit_id);
