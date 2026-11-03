-- Metadata for accounts created from the admin panel.
-- Kept in a separate table so the existing students table and its data remain untouched.
CREATE TABLE IF NOT EXISTS admin_student_metadata (
  student_id INTEGER PRIMARY KEY,
  full_name TEXT,
  admin_notes TEXT,
  is_test_account INTEGER NOT NULL DEFAULT 0,
  test_expires_at TEXT,
  created_by_admin INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_admin_student_metadata_test_expiry
  ON admin_student_metadata(test_expires_at);
