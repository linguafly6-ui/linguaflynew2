-- Ejecutar en DB (no en COURSE_DB).
ALTER TABLE conversation_sessions ADD COLUMN current_step INTEGER DEFAULT 1;
ALTER TABLE conversation_sessions ADD COLUMN script_json TEXT;
