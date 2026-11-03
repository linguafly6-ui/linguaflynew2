PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS exercise_courses (id TEXT PRIMARY KEY, level TEXT NOT NULL, title TEXT NOT NULL, description TEXT, total_units INTEGER DEFAULT 100, free_units INTEGER DEFAULT 5);
CREATE TABLE IF NOT EXISTS exercise_unit_topics (course_id TEXT NOT NULL, unit_number INTEGER NOT NULL, topic TEXT NOT NULL, PRIMARY KEY(course_id,unit_number), FOREIGN KEY(course_id) REFERENCES exercise_courses(id));
CREATE TABLE IF NOT EXISTS exercise_units (id INTEGER PRIMARY KEY AUTOINCREMENT, course_id TEXT NOT NULL, unit_number INTEGER NOT NULL, title TEXT NOT NULL, description TEXT, topic TEXT, is_free INTEGER DEFAULT 0, unlocked INTEGER DEFAULT 1, UNIQUE(course_id,unit_number), FOREIGN KEY(course_id) REFERENCES exercise_courses(id));
CREATE TABLE IF NOT EXISTS exercise_items (id INTEGER PRIMARY KEY AUTOINCREMENT, unit_id INTEGER NOT NULL, category TEXT NOT NULL, exercise_type TEXT NOT NULL, question TEXT NOT NULL, instruction TEXT, passage TEXT, audio_key TEXT, options TEXT, correct_answer TEXT NOT NULL, explanation TEXT, difficulty INTEGER DEFAULT 1, "order" INTEGER DEFAULT 0, FOREIGN KEY(unit_id) REFERENCES exercise_units(id));
CREATE INDEX IF NOT EXISTS idx_exercise_items_unit_category ON exercise_items(unit_id,category,"order");
CREATE UNIQUE INDEX IF NOT EXISTS idx_exercise_items_unit_order ON exercise_items(unit_id,"order");
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

-- Replace the generic topic seed with the CEFR-specific 10-topic syllabus for each level.
UPDATE exercise_unit_topics SET topic='Present Simple and daily routines' WHERE course_id='a1' AND ((unit_number-1)%10)=0;
UPDATE exercise_unit_topics SET topic='Verb to be and personal information' WHERE course_id='a1' AND ((unit_number-1)%10)=1;
UPDATE exercise_unit_topics SET topic='Articles and classroom objects' WHERE course_id='a1' AND ((unit_number-1)%10)=2;
UPDATE exercise_unit_topics SET topic='Plural nouns and family' WHERE course_id='a1' AND ((unit_number-1)%10)=3;
UPDATE exercise_unit_topics SET topic='Possessives and describing people' WHERE course_id='a1' AND ((unit_number-1)%10)=4;
UPDATE exercise_unit_topics SET topic='There is / There are and the home' WHERE course_id='a1' AND ((unit_number-1)%10)=5;
UPDATE exercise_unit_topics SET topic='This, that, these and those' WHERE course_id='a1' AND ((unit_number-1)%10)=6;
UPDATE exercise_unit_topics SET topic='Can and can’t: abilities' WHERE course_id='a1' AND ((unit_number-1)%10)=7;
UPDATE exercise_unit_topics SET topic='Prepositions of place and directions' WHERE course_id='a1' AND ((unit_number-1)%10)=8;
UPDATE exercise_unit_topics SET topic='Question words and everyday questions' WHERE course_id='a1' AND ((unit_number-1)%10)=9;
UPDATE exercise_unit_topics SET topic='Past Simple: memorable events' WHERE course_id='a2' AND ((unit_number-1)%10)=0;
UPDATE exercise_unit_topics SET topic='Present Continuous and arrangements' WHERE course_id='a2' AND ((unit_number-1)%10)=1;
UPDATE exercise_unit_topics SET topic='Comparatives and superlatives' WHERE course_id='a2' AND ((unit_number-1)%10)=2;
UPDATE exercise_unit_topics SET topic='Going to: plans and intentions' WHERE course_id='a2' AND ((unit_number-1)%10)=3;
UPDATE exercise_unit_topics SET topic='Countable and uncountable nouns' WHERE course_id='a2' AND ((unit_number-1)%10)=4;
UPDATE exercise_unit_topics SET topic='Adverbs of frequency and habits' WHERE course_id='a2' AND ((unit_number-1)%10)=5;
UPDATE exercise_unit_topics SET topic='Past Continuous and interruptions' WHERE course_id='a2' AND ((unit_number-1)%10)=6;
UPDATE exercise_unit_topics SET topic='Should, must and advice' WHERE course_id='a2' AND ((unit_number-1)%10)=7;
UPDATE exercise_unit_topics SET topic='First Conditional and consequences' WHERE course_id='a2' AND ((unit_number-1)%10)=8;
UPDATE exercise_unit_topics SET topic='Relative clauses and descriptions' WHERE course_id='a2' AND ((unit_number-1)%10)=9;
UPDATE exercise_unit_topics SET topic='Present Perfect and life experiences' WHERE course_id='b1' AND ((unit_number-1)%10)=0;
UPDATE exercise_unit_topics SET topic='Present Perfect Continuous' WHERE course_id='b1' AND ((unit_number-1)%10)=1;
UPDATE exercise_unit_topics SET topic='Used to and past habits' WHERE course_id='b1' AND ((unit_number-1)%10)=2;
UPDATE exercise_unit_topics SET topic='Second Conditional and imagination' WHERE course_id='b1' AND ((unit_number-1)%10)=3;
UPDATE exercise_unit_topics SET topic='Passive Voice: present and past' WHERE course_id='b1' AND ((unit_number-1)%10)=4;
UPDATE exercise_unit_topics SET topic='Reported Speech' WHERE course_id='b1' AND ((unit_number-1)%10)=5;
UPDATE exercise_unit_topics SET topic='Defining and non-defining relative clauses' WHERE course_id='b1' AND ((unit_number-1)%10)=6;
UPDATE exercise_unit_topics SET topic='Modals of deduction' WHERE course_id='b1' AND ((unit_number-1)%10)=7;
UPDATE exercise_unit_topics SET topic='Gerunds and infinitives' WHERE course_id='b1' AND ((unit_number-1)%10)=8;
UPDATE exercise_unit_topics SET topic='Linking words and contrast' WHERE course_id='b1' AND ((unit_number-1)%10)=9;
UPDATE exercise_unit_topics SET topic='Past Perfect and narrative sequence' WHERE course_id='b2' AND ((unit_number-1)%10)=0;
UPDATE exercise_unit_topics SET topic='Past Perfect Continuous' WHERE course_id='b2' AND ((unit_number-1)%10)=1;
UPDATE exercise_unit_topics SET topic='Third Conditional' WHERE course_id='b2' AND ((unit_number-1)%10)=2;
UPDATE exercise_unit_topics SET topic='Wish and If only' WHERE course_id='b2' AND ((unit_number-1)%10)=3;
UPDATE exercise_unit_topics SET topic='Future Continuous and Future Perfect' WHERE course_id='b2' AND ((unit_number-1)%10)=4;
UPDATE exercise_unit_topics SET topic='Modals of probability' WHERE course_id='b2' AND ((unit_number-1)%10)=5;
UPDATE exercise_unit_topics SET topic='Passive voice across tenses' WHERE course_id='b2' AND ((unit_number-1)%10)=6;
UPDATE exercise_unit_topics SET topic='Causative have something done' WHERE course_id='b2' AND ((unit_number-1)%10)=7;
UPDATE exercise_unit_topics SET topic='Inversion and emphasis' WHERE course_id='b2' AND ((unit_number-1)%10)=8;
UPDATE exercise_unit_topics SET topic='Cleft sentences and formal linking' WHERE course_id='b2' AND ((unit_number-1)%10)=9;
UPDATE exercise_unit_topics SET topic='Negative inversion' WHERE course_id='c1' AND ((unit_number-1)%10)=0;
UPDATE exercise_unit_topics SET topic='Mixed conditionals' WHERE course_id='c1' AND ((unit_number-1)%10)=1;
UPDATE exercise_unit_topics SET topic='Subjunctive in recommendations' WHERE course_id='c1' AND ((unit_number-1)%10)=2;
UPDATE exercise_unit_topics SET topic='Participle clauses' WHERE course_id='c1' AND ((unit_number-1)%10)=3;
UPDATE exercise_unit_topics SET topic='Fronting and emphasis' WHERE course_id='c1' AND ((unit_number-1)%10)=4;
UPDATE exercise_unit_topics SET topic='Ellipsis and substitution' WHERE course_id='c1' AND ((unit_number-1)%10)=5;
UPDATE exercise_unit_topics SET topic='Advanced passive structures' WHERE course_id='c1' AND ((unit_number-1)%10)=6;
UPDATE exercise_unit_topics SET topic='Discourse markers' WHERE course_id='c1' AND ((unit_number-1)%10)=7;
UPDATE exercise_unit_topics SET topic='Register and tone' WHERE course_id='c1' AND ((unit_number-1)%10)=8;
UPDATE exercise_unit_topics SET topic='Nuance and connotation' WHERE course_id='c1' AND ((unit_number-1)%10)=9;
UPDATE exercise_unit_topics SET topic='Stylistic inversion' WHERE course_id='c2' AND ((unit_number-1)%10)=0;
UPDATE exercise_unit_topics SET topic='Fronting for rhetorical emphasis' WHERE course_id='c2' AND ((unit_number-1)%10)=1;
UPDATE exercise_unit_topics SET topic='Advanced cleft structures' WHERE course_id='c2' AND ((unit_number-1)%10)=2;
UPDATE exercise_unit_topics SET topic='Formal subjunctive' WHERE course_id='c2' AND ((unit_number-1)%10)=3;
UPDATE exercise_unit_topics SET topic='Conditional inversion' WHERE course_id='c2' AND ((unit_number-1)%10)=4;
UPDATE exercise_unit_topics SET topic='Absolute and participial phrases' WHERE course_id='c2' AND ((unit_number-1)%10)=5;
UPDATE exercise_unit_topics SET topic='Nominalisation' WHERE course_id='c2' AND ((unit_number-1)%10)=6;
UPDATE exercise_unit_topics SET topic='Ellipsis and substitution' WHERE course_id='c2' AND ((unit_number-1)%10)=7;
UPDATE exercise_unit_topics SET topic='Rhetorical devices' WHERE course_id='c2' AND ((unit_number-1)%10)=8;
UPDATE exercise_unit_topics SET topic='Pragmatics and discourse analysis' WHERE course_id='c2' AND ((unit_number-1)%10)=9;
