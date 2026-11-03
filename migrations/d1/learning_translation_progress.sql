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

-- Importar los intentos históricos guardados por el sistema anterior.
INSERT OR IGNORE INTO learning_exercise_progress
  (student_id,exercise_id,course_id,unit_number,status,attempts,is_correct,xp_awarded,completed_at,updated_at)
SELECT
  CAST(substr(ea.user_id,9) AS INTEGER),
  ea.exercise_id,
  eu.course_id,
  eu.unit_number,
  CASE WHEN MAX(ea.is_correct)=1 THEN 'completed' ELSE 'in_progress' END,
  COUNT(*),
  MAX(ea.is_correct),
  CASE WHEN MAX(ea.is_correct)=1 THEN 10 ELSE 5 END,
  CASE WHEN MAX(ea.is_correct)=1 THEN datetime('now') ELSE NULL END,
  datetime('now')
FROM exercise_answers ea
JOIN exercise_items ei ON ei.id=ea.exercise_id
JOIN exercise_units eu ON eu.id=ei.unit_id
WHERE ea.user_id GLOB 'student-[0-9]*'
  AND substr(ea.user_id,9) NOT GLOB '*[^0-9]*'
GROUP BY ea.user_id,ea.exercise_id;

CREATE TABLE IF NOT EXISTS learning_speaking_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  course_id TEXT NOT NULL,
  unit_number INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'in_progress',
  attempts INTEGER NOT NULL DEFAULT 0,
  score INTEGER NOT NULL DEFAULT 0,
  xp_awarded INTEGER NOT NULL DEFAULT 0,
  completed_at TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(student_id, course_id, unit_number)
);
CREATE INDEX IF NOT EXISTS idx_learning_speaking_student
  ON learning_speaking_progress(student_id, course_id, unit_number);

-- Conservar el XP de progreso de speaking previo a esta ruta guiada.
INSERT OR IGNORE INTO learning_speaking_progress(student_id,course_id,unit_number,status,attempts,score,xp_awarded,completed_at,updated_at)
SELECT CAST(substr(user_id,9) AS INTEGER),'a1',unit_id,CASE WHEN completed=1 THEN 'completed' ELSE 'in_progress' END,attempts,score,CASE WHEN completed=1 THEN 10 WHEN attempts>0 THEN 5 ELSE 0 END,CASE WHEN completed=1 THEN updated_at ELSE NULL END,updated_at FROM a1_speaking_progress WHERE user_id GLOB 'student-[0-9]*' AND substr(user_id,9) NOT GLOB '*[^0-9]*';
INSERT OR IGNORE INTO learning_speaking_progress(student_id,course_id,unit_number,status,attempts,score,xp_awarded,completed_at,updated_at)
SELECT CAST(substr(user_id,9) AS INTEGER),'a2',unit_id,CASE WHEN completed=1 THEN 'completed' ELSE 'in_progress' END,attempts,score,CASE WHEN completed=1 THEN 10 WHEN attempts>0 THEN 5 ELSE 0 END,CASE WHEN completed=1 THEN updated_at ELSE NULL END,updated_at FROM a2_speaking_progress WHERE user_id GLOB 'student-[0-9]*' AND substr(user_id,9) NOT GLOB '*[^0-9]*';
INSERT OR IGNORE INTO learning_speaking_progress(student_id,course_id,unit_number,status,attempts,score,xp_awarded,completed_at,updated_at)
SELECT CAST(substr(user_id,9) AS INTEGER),'b1',unit_id,CASE WHEN completed=1 THEN 'completed' ELSE 'in_progress' END,attempts,score,CASE WHEN completed=1 THEN 10 WHEN attempts>0 THEN 5 ELSE 0 END,CASE WHEN completed=1 THEN updated_at ELSE NULL END,updated_at FROM b1_speaking_progress WHERE user_id GLOB 'student-[0-9]*' AND substr(user_id,9) NOT GLOB '*[^0-9]*';
INSERT OR IGNORE INTO learning_speaking_progress(student_id,course_id,unit_number,status,attempts,score,xp_awarded,completed_at,updated_at)
SELECT CAST(substr(user_id,9) AS INTEGER),'b2',unit_id,CASE WHEN completed=1 THEN 'completed' ELSE 'in_progress' END,attempts,score,CASE WHEN completed=1 THEN 10 WHEN attempts>0 THEN 5 ELSE 0 END,CASE WHEN completed=1 THEN updated_at ELSE NULL END,updated_at FROM b2_speaking_progress WHERE user_id GLOB 'student-[0-9]*' AND substr(user_id,9) NOT GLOB '*[^0-9]*';
INSERT OR IGNORE INTO learning_speaking_progress(student_id,course_id,unit_number,status,attempts,score,xp_awarded,completed_at,updated_at)
SELECT CAST(substr(user_id,9) AS INTEGER),'c1',unit_id,CASE WHEN completed=1 THEN 'completed' ELSE 'in_progress' END,attempts,score,CASE WHEN completed=1 THEN 10 WHEN attempts>0 THEN 5 ELSE 0 END,CASE WHEN completed=1 THEN updated_at ELSE NULL END,updated_at FROM c1_speaking_progress WHERE user_id GLOB 'student-[0-9]*' AND substr(user_id,9) NOT GLOB '*[^0-9]*';
INSERT OR IGNORE INTO learning_speaking_progress(student_id,course_id,unit_number,status,attempts,score,xp_awarded,completed_at,updated_at)
SELECT CAST(substr(user_id,9) AS INTEGER),'c2',unit_id,CASE WHEN completed=1 THEN 'completed' ELSE 'in_progress' END,attempts,score,CASE WHEN completed=1 THEN 10 WHEN attempts>0 THEN 5 ELSE 0 END,CASE WHEN completed=1 THEN updated_at ELSE NULL END,updated_at FROM c2_speaking_progress WHERE user_id GLOB 'student-[0-9]*' AND substr(user_id,9) NOT GLOB '*[^0-9]*';

CREATE TABLE IF NOT EXISTS learning_streaks (
  student_id INTEGER PRIMARY KEY,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_practice_date TEXT,
  xp_total INTEGER NOT NULL DEFAULT 0
);

INSERT OR IGNORE INTO learning_streaks(student_id,xp_total)
SELECT student_id, SUM(xp_awarded)
FROM (
  SELECT student_id,xp_awarded FROM learning_exercise_progress
  UNION ALL
  SELECT student_id,xp_awarded FROM learning_speaking_progress
)
GROUP BY student_id;
