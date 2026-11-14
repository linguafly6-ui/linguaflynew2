CREATE TABLE IF NOT EXISTS biblioteca_pdf_files (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  level TEXT NOT NULL,
  unit_number INTEGER NOT NULL,
  filename TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'application/pdf',
  size_bytes INTEGER NOT NULL CHECK (size_bytes > 0),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS biblioteca_pdf_chunks (
  slug TEXT NOT NULL,
  chunk_index INTEGER NOT NULL CHECK (chunk_index >= 0),
  content BLOB NOT NULL CHECK (length(content) <= 2000000),
  PRIMARY KEY (slug, chunk_index),
  FOREIGN KEY (slug) REFERENCES biblioteca_pdf_files(slug) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_biblioteca_pdf_files_level_unit
ON biblioteca_pdf_files(level, unit_number);
