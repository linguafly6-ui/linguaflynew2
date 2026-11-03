PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS exercise_courses (id TEXT PRIMARY KEY, level TEXT NOT NULL, title TEXT NOT NULL, description TEXT, total_units INTEGER DEFAULT 100, free_units INTEGER DEFAULT 5);
CREATE TABLE IF NOT EXISTS exercise_unit_topics (course_id TEXT NOT NULL, unit_number INTEGER NOT NULL, topic TEXT NOT NULL, PRIMARY KEY(course_id,unit_number), FOREIGN KEY(course_id) REFERENCES exercise_courses(id));
CREATE TABLE IF NOT EXISTS exercise_units (id INTEGER PRIMARY KEY AUTOINCREMENT, course_id TEXT NOT NULL, unit_number INTEGER NOT NULL, title TEXT NOT NULL, description TEXT, topic TEXT, is_free INTEGER DEFAULT 0, unlocked INTEGER DEFAULT 1, UNIQUE(course_id,unit_number), FOREIGN KEY(course_id) REFERENCES exercise_courses(id));
CREATE TABLE IF NOT EXISTS exercise_items (id INTEGER PRIMARY KEY AUTOINCREMENT, unit_id INTEGER NOT NULL, category TEXT NOT NULL, exercise_type TEXT NOT NULL, question TEXT NOT NULL, instruction TEXT, passage TEXT, audio_key TEXT, options TEXT, correct_answer TEXT NOT NULL, explanation TEXT, difficulty INTEGER DEFAULT 1, "order" INTEGER DEFAULT 0, FOREIGN KEY(unit_id) REFERENCES exercise_units(id));
CREATE INDEX IF NOT EXISTS idx_exercise_items_unit_category ON exercise_items(unit_id,category,"order");
CREATE TABLE IF NOT EXISTS exercise_progress (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, course_id TEXT NOT NULL, unit_id INTEGER NOT NULL, category TEXT NOT NULL, total_exercises INTEGER DEFAULT 15, completed INTEGER DEFAULT 0, correct INTEGER DEFAULT 0, score INTEGER DEFAULT 0, last_attempt TEXT, completed_at TEXT, UNIQUE(user_id,course_id,unit_id,category));
CREATE TABLE IF NOT EXISTS exercise_answers (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, exercise_id INTEGER NOT NULL, user_answer TEXT, is_correct INTEGER DEFAULT 0, attempted_at TEXT, FOREIGN KEY(exercise_id) REFERENCES exercise_items(id));
CREATE INDEX IF NOT EXISTS idx_exercise_answers_user ON exercise_answers(user_id,exercise_id);
INSERT OR IGNORE INTO exercise_courses(id,level,title,description,total_units,free_units) VALUES
('a1','A1','A1 Beginner','Build basic English foundations.',100,5),
('a2','A2','A2 Elementary','Communicate in everyday situations.',100,5),
('b1','B1','B1 Intermediate','Develop independent communication.',100,5),
('b2','B2','B2 Upper-Intermediate','Use English confidently and flexibly.',100,5),
('c1','C1','C1 Advanced','Master complex language and nuance.',100,5),
('c2','C2','C2 Proficiency','Refine near-native precision and style.',100,5);

WITH RECURSIVE nums(n) AS (SELECT 1 UNION ALL SELECT n+1 FROM nums WHERE n<100)
INSERT OR IGNORE INTO exercise_unit_topics(course_id,unit_number,topic)
SELECT c.id, nums.n,
CASE ((nums.n-1)%10)
 WHEN 0 THEN 'Foundations and everyday communication'
 WHEN 1 THEN 'People, places and personal information'
 WHEN 2 THEN 'Daily situations and practical language'
 WHEN 3 THEN 'Experiences, events and descriptions'
 WHEN 4 THEN 'Plans, choices and comparisons'
 WHEN 5 THEN 'Habits, routines and changes'
 WHEN 6 THEN 'Narratives, explanations and reasons'
 WHEN 7 THEN 'Advice, possibilities and consequences'
 WHEN 8 THEN 'Communication strategies and vocabulary'
 ELSE 'Review and integrated language practice' END
FROM exercise_courses c CROSS JOIN nums;
