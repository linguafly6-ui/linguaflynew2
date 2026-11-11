-- Extiende el constraint de pre_a1_mission_progress para admitir misiones 11-20.
-- Recrea la tabla conservando los datos existentes. Aplicar solo con autorizacion.
CREATE TABLE pre_a1_mission_progress_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  mission_number INTEGER NOT NULL CHECK (mission_number BETWEEN 1 AND 20),
  completed INTEGER NOT NULL DEFAULT 0 CHECK (completed IN (0, 1)),
  completed_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (student_id, mission_number)
);

INSERT INTO pre_a1_mission_progress_new (id, student_id, mission_number, completed, completed_at, created_at, updated_at)
SELECT id, student_id, mission_number, completed, completed_at, created_at, updated_at FROM pre_a1_mission_progress;

DROP TABLE pre_a1_mission_progress;
ALTER TABLE pre_a1_mission_progress_new RENAME TO pre_a1_mission_progress;

CREATE INDEX IF NOT EXISTS idx_pre_a1_mission_progress_student
  ON pre_a1_mission_progress(student_id, mission_number);

