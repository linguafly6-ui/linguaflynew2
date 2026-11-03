-- Ejecutar en COURSE_DB.
ALTER TABLE a1_speaking_units ADD COLUMN script_json TEXT;
ALTER TABLE a1_speaking_units ADD COLUMN level TEXT DEFAULT 'A1';
