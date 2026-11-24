-- Educational content store. Apply ONLY to COURSE_DB (linguafly-learning).
-- This migration is additive and does not modify student, progress, billing or blog tables.

CREATE TABLE IF NOT EXISTS canonical_missions (
  mission_id TEXT PRIMARY KEY,
  level TEXT NOT NULL CHECK (level IN ('PRE-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  route_key TEXT NOT NULL,
  content_version INTEGER NOT NULL DEFAULT 1,
  content_json TEXT NOT NULL CHECK (json_valid(content_json)),
  published INTEGER NOT NULL DEFAULT 1 CHECK (published IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(level, route_key)
);

CREATE INDEX IF NOT EXISTS idx_canonical_missions_level_published
  ON canonical_missions(level, published, route_key);
