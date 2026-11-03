-- Metadata for accounts created or managed from the admin console.
-- Existing admin student listing and student authentication already use this table.
CREATE TABLE IF NOT EXISTS admin_student_metadata (
  student_id INTEGER PRIMARY KEY,
  full_name TEXT,
  admin_notes TEXT,
  is_test_account INTEGER NOT NULL DEFAULT 0,
  test_expires_at TEXT,
  created_by_admin INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_admin_student_metadata_test_expiry
  ON admin_student_metadata(is_test_account, test_expires_at);
