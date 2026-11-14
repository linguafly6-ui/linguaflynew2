CREATE TABLE IF NOT EXISTS biblioteca_pdfs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  level TEXT NOT NULL,
  unit_number INTEGER NOT NULL,
  filename TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'application/pdf',
  content BLOB NOT NULL,
  size_bytes INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (length(content) <= 2000000),
  CHECK (size_bytes = length(content))
);

CREATE INDEX IF NOT EXISTS idx_biblioteca_pdfs_level_unit
ON biblioteca_pdfs(level, unit_number);
