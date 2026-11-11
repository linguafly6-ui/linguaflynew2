-- New isolated progress table for the ten PRE-A1 source missions.
-- Apply manually only after review; this file does not execute against D1.
CREATE TABLE IF NOT EXISTS pre_a1_mission_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  mission_number INTEGER NOT NULL CHECK (mission_number BETWEEN 1 AND 20),
  completed INTEGER NOT NULL DEFAULT 0 CHECK (completed IN (0, 1)),
  completed_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (student_id, mission_number)
);

CREATE INDEX IF NOT EXISTS idx_pre_a1_mission_progress_student
  ON pre_a1_mission_progress(student_id, mission_number);
