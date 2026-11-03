PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS lf_support_tickets (
 id INTEGER PRIMARY KEY AUTOINCREMENT, student_id INTEGER NOT NULL, student_email TEXT,
 subject TEXT NOT NULL, category TEXT NOT NULL DEFAULT 'general', status TEXT NOT NULL DEFAULT 'open',
 priority TEXT NOT NULL DEFAULT 'normal', course_context TEXT, unit_context TEXT,
 created_at TEXT NOT NULL DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')),
 first_message TEXT NOT NULL, last_read_by_student TEXT,
 FOREIGN KEY (student_id) REFERENCES students(id)
);
CREATE TABLE IF NOT EXISTS lf_ticket_messages (
 id INTEGER PRIMARY KEY AUTOINCREMENT, ticket_id INTEGER NOT NULL, sender_type TEXT NOT NULL,
 sender_id INTEGER, sender_name TEXT, message TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')),
 FOREIGN KEY (ticket_id) REFERENCES lf_support_tickets(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_tickets_student ON lf_support_tickets(student_id);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON lf_support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_category ON lf_support_tickets(category);
CREATE INDEX IF NOT EXISTS idx_messages_ticket ON lf_ticket_messages(ticket_id);
CREATE INDEX IF NOT EXISTS idx_tickets_updated ON lf_support_tickets(updated_at);
