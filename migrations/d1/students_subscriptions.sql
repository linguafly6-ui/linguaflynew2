PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS students (
 id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL,
 plan TEXT DEFAULT 'free', stripe_customer_id TEXT, subscription_status TEXT DEFAULT 'inactive',
 current_period_end TEXT, created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS student_progress (
 id INTEGER PRIMARY KEY AUTOINCREMENT, student_id INTEGER NOT NULL, unit_number INTEGER NOT NULL,
 score INTEGER DEFAULT 0, completed INTEGER DEFAULT 0, attempts INTEGER DEFAULT 0, last_attempt TEXT,
 FOREIGN KEY (student_id) REFERENCES students(id), UNIQUE(student_id, unit_number)
);
CREATE TABLE IF NOT EXISTS student_sessions (
 id INTEGER PRIMARY KEY AUTOINCREMENT, student_id INTEGER NOT NULL, token_hash TEXT NOT NULL UNIQUE,
 expires_at TEXT NOT NULL, created_at TEXT DEFAULT (datetime('now')),
 FOREIGN KEY (student_id) REFERENCES students(id)
);
CREATE INDEX IF NOT EXISTS idx_student_sessions_token ON student_sessions(token_hash);
