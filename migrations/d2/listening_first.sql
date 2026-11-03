ALTER TABLE conversation_scenarios ADD COLUMN ui_language TEXT DEFAULT 'es';
ALTER TABLE conversation_scenarios ADD COLUMN tutor_language TEXT DEFAULT 'en';
ALTER TABLE conversation_messages ADD COLUMN audio_r2_key TEXT;
ALTER TABLE sr_items ADD COLUMN audio_r2_key TEXT;
CREATE TABLE IF NOT EXISTS tts_cache (
 cache_key TEXT PRIMARY KEY,
 text_hash TEXT NOT NULL,
 lang TEXT NOT NULL,
 r2_key TEXT NOT NULL,
 created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_tts_cache_hash ON tts_cache(text_hash,lang);