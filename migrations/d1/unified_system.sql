PRAGMA foreign_keys = ON;

-- Existing Stripe customer/subscription columns are retained; this records the paid interval.
ALTER TABLE students ADD COLUMN billing_interval TEXT;

CREATE TABLE IF NOT EXISTS unified_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  course_type TEXT NOT NULL,
  unit_number INTEGER NOT NULL,
  score INTEGER DEFAULT 0,
  completed INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 0,
  last_attempt TEXT,
  completed_at TEXT,
  FOREIGN KEY (student_id) REFERENCES students(id),
  UNIQUE(student_id, course_type, unit_number)
);
CREATE INDEX IF NOT EXISTS idx_unified_progress_student_course
  ON unified_progress(student_id, course_type, unit_number);

-- Migrate speaking progress. A1 stores the unit row id; the other levels store the unit number.
INSERT OR IGNORE INTO unified_progress(student_id,course_type,unit_number,score,completed,attempts,last_attempt,completed_at)
SELECT CAST(substr(p.user_id,9) AS INTEGER),'a1-speaking',u.unit_number,p.score,p.completed,p.attempts,p.updated_at,
       CASE WHEN p.completed=1 THEN p.updated_at ELSE NULL END
FROM a1_speaking_progress p JOIN a1_speaking_units u ON u.id=p.unit_id
JOIN students s ON s.id=CAST(substr(p.user_id,9) AS INTEGER)
WHERE p.user_id GLOB 'student-[0-9]*' AND substr(p.user_id,9) NOT GLOB '*[^0-9]*';

INSERT OR IGNORE INTO unified_progress(student_id,course_type,unit_number,score,completed,attempts,last_attempt,completed_at)
SELECT CAST(substr(user_id,9) AS INTEGER),'a2-speaking',unit_id,score,completed,attempts,updated_at,
       CASE WHEN completed=1 THEN updated_at ELSE NULL END
FROM a2_speaking_progress p JOIN students s ON s.id=CAST(substr(p.user_id,9) AS INTEGER)
WHERE user_id GLOB 'student-[0-9]*' AND substr(user_id,9) NOT GLOB '*[^0-9]*';

INSERT OR IGNORE INTO unified_progress(student_id,course_type,unit_number,score,completed,attempts,last_attempt,completed_at)
SELECT CAST(substr(user_id,9) AS INTEGER),'b1-speaking',unit_id,score,completed,attempts,updated_at,
       CASE WHEN completed=1 THEN updated_at ELSE NULL END
FROM b1_speaking_progress p JOIN students s ON s.id=CAST(substr(p.user_id,9) AS INTEGER)
WHERE user_id GLOB 'student-[0-9]*' AND substr(user_id,9) NOT GLOB '*[^0-9]*';

INSERT OR IGNORE INTO unified_progress(student_id,course_type,unit_number,score,completed,attempts,last_attempt,completed_at)
SELECT CAST(substr(user_id,9) AS INTEGER),'b2-speaking',unit_id,score,completed,attempts,updated_at,
       CASE WHEN completed=1 THEN updated_at ELSE NULL END
FROM b2_speaking_progress p JOIN students s ON s.id=CAST(substr(p.user_id,9) AS INTEGER)
WHERE user_id GLOB 'student-[0-9]*' AND substr(user_id,9) NOT GLOB '*[^0-9]*';

INSERT OR IGNORE INTO unified_progress(student_id,course_type,unit_number,score,completed,attempts,last_attempt,completed_at)
SELECT CAST(substr(user_id,9) AS INTEGER),'c1-speaking',unit_id,score,completed,attempts,updated_at,
       CASE WHEN completed=1 THEN updated_at ELSE NULL END
FROM c1_speaking_progress p JOIN students s ON s.id=CAST(substr(p.user_id,9) AS INTEGER)
WHERE user_id GLOB 'student-[0-9]*' AND substr(user_id,9) NOT GLOB '*[^0-9]*';

INSERT OR IGNORE INTO unified_progress(student_id,course_type,unit_number,score,completed,attempts,last_attempt,completed_at)
SELECT CAST(substr(user_id,9) AS INTEGER),'c2-speaking',unit_id,score,completed,attempts,updated_at,
       CASE WHEN completed=1 THEN updated_at ELSE NULL END
FROM c2_speaking_progress p JOIN students s ON s.id=CAST(substr(p.user_id,9) AS INTEGER)
WHERE user_id GLOB 'student-[0-9]*' AND substr(user_id,9) NOT GLOB '*[^0-9]*';

-- Preserve the original A1 student_progress data as well.
INSERT OR IGNORE INTO unified_progress(student_id,course_type,unit_number,score,completed,attempts,last_attempt,completed_at)
SELECT student_id,'a1-speaking',unit_number,score,completed,attempts,last_attempt,
       CASE WHEN completed=1 THEN last_attempt ELSE NULL END
FROM student_progress;

-- Consolidate the four category records (15 items each) into one exercise-unit result.
INSERT OR IGNORE INTO unified_progress(student_id,course_type,unit_number,score,completed,attempts,last_attempt,completed_at)
SELECT CAST(substr(p.user_id,9) AS INTEGER),'exercises-'||p.course_id,u.unit_number,
       CASE WHEN SUM(p.completed)>0 THEN ROUND(SUM(p.score*p.completed)/SUM(p.completed)) ELSE 0 END,
       CASE WHEN SUM(p.completed)>=60 THEN 1 ELSE 0 END,
       SUM(p.completed),MAX(p.last_attempt),
       CASE WHEN SUM(p.completed)>=60 THEN MAX(COALESCE(p.completed_at,p.last_attempt)) ELSE NULL END
FROM exercise_progress p
JOIN exercise_units u ON u.id=p.unit_id
JOIN students s ON s.id=CAST(substr(p.user_id,9) AS INTEGER)
WHERE p.user_id GLOB 'student-[0-9]*' AND substr(p.user_id,9) NOT GLOB '*[^0-9]*'
GROUP BY p.user_id,p.course_id,u.unit_number;
