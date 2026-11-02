-- ============================================================
-- LinguaFly - Migración: 3 funciones novedosas
-- Ejecutar en la base de datos DB (476f34d4-5622-4a56-923e-c4fb571578c2)
-- ============================================================

-- --------------------------------------------------------
-- 1. TUTOR DE PRONUNCIACIÓN
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS pronunciation_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  phrase_id TEXT,
  target_phrase TEXT NOT NULL,
  target_language TEXT NOT NULL DEFAULT 'en',
  transcription TEXT,
  similarity_score INTEGER DEFAULT 0,
  feedback TEXT,
  audio_r2_key TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS pronunciation_phrases (
  id TEXT PRIMARY KEY,
  language TEXT NOT NULL,
  level TEXT NOT NULL DEFAULT 'A1',
  phrase TEXT NOT NULL,
  translation TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_pron_sessions_user ON pronunciation_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_pron_phrases_lang_level ON pronunciation_phrases(language, level);

-- --------------------------------------------------------
-- 2. CONVERSACIÓN SIMULADA CON IA
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS conversation_scenarios (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  level TEXT NOT NULL DEFAULT 'A1',
  setting TEXT NOT NULL,           -- ej: "restaurante en Tokio"
  persona_prompt TEXT NOT NULL,     -- system prompt del personaje IA
  opening_line TEXT NOT NULL,       -- primera línea del personaje
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS conversation_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  scenario_id TEXT NOT NULL,
  language TEXT NOT NULL,
  status TEXT DEFAULT 'active',     -- active | completed | abandoned
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS conversation_messages (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL,               -- user | assistant | system
  content TEXT NOT NULL,
  correction TEXT,                  -- corrección si el usuario tuvo errores
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_conv_sessions_user ON conversation_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_conv_messages_session ON conversation_messages(session_id);

-- --------------------------------------------------------
-- 3. REPETICIÓN ESPACIADA ADAPTATIVA
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS sr_items (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  word TEXT NOT NULL,
  translation TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  context_sentence TEXT,           -- frase de ejemplo
  interval_days INTEGER DEFAULT 1,
  ease_factor REAL DEFAULT 2.5,     -- factor SM-2
  repetitions INTEGER DEFAULT 0,
  next_review_at TEXT DEFAULT (datetime('now')),
  last_reviewed_at TEXT,
  total_reviews INTEGER DEFAULT 0,
  correct_reviews INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sr_reviews (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  item_id TEXT NOT NULL,
  rating INTEGER NOT NULL,          -- 0-5 (SM-2 quality)
  was_correct INTEGER NOT NULL,     -- 0 | 1
  ai_generated_content TEXT,        -- ejemplo/contexto generado por IA
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_sr_items_user ON sr_items(user_id);
CREATE INDEX IF NOT EXISTS idx_sr_items_next_review ON sr_items(user_id, next_review_at);
CREATE INDEX IF NOT EXISTS idx_sr_reviews_item ON sr_reviews(item_id);

-- --------------------------------------------------------
-- DATOS DE EJEMPLO
-- --------------------------------------------------------
INSERT OR IGNORE INTO pronunciation_phrases (id, language, level, phrase, translation, category) VALUES
  ('pf-001', 'en', 'A1', 'Hello, how are you?', 'Hola, ¿cómo estás?', 'greetings'),
  ('pf-002', 'en', 'A1', 'I would like a coffee, please.', 'Me gustaría un café, por favor.', 'restaurant'),
  ('pf-003', 'en', 'A2', 'Could you tell me the way to the station?', '¿Podría decirme cómo llegar a la estación?', 'directions'),
  ('pf-004', 'en', 'A2', 'What time does the museum open?', '¿A qué hora abre el museo?', 'tourism'),
  ('pf-005', 'en', 'B1', 'I have been studying English for two years.', 'He estado estudiando inglés durante dos años.', 'conversation'),
  ('pf-006', 'fr', 'A1', 'Bonjour, comment allez-vous?', 'Hola, ¿cómo estás?', 'greetings'),
  ('pf-007', 'fr', 'A1', 'Je voudrais un café, s''il vous plaît.', 'Me gustaría un café, por favor.', 'restaurant');

INSERT OR IGNORE INTO conversation_scenarios (id, title, description, language, level, setting, persona_prompt, opening_line) VALUES
  ('cs-001',
   'Café en París',
   'Pides un café en una cafetería parisina. El camarero es amable y te ayuda con tu francés.',
   'fr', 'A1', 'Cafetería en París',
   'Eres un camarero francés amable en una cafetería de París. Hablas francés de forma sencilla y clara, adaptándote al nivel del estudiante. Si el estudiante comete errores, lo corriges sutilmente. Sé paciente y animado.',
   'Bonjour! Bienvenue à notre café. Qu''est-ce que vous désirez?'),
  ('cs-002',
   'Entrevista de trabajo',
   'Entrevista de trabajo en inglés para un puesto de recepcionista en un hotel.',
   'en', 'B1', 'Oficina de un hotel',
   'Eres un gerente de hotel entrevistando a un candidato para un puesto de recepcionista. Haz preguntas profesionales pero sencillas sobre experiencia, disponibilidad y habilidades. Si el candidato comete errores gramaticales, anótalos en el campo correction.',
   'Good morning! Thank you for coming in today. Could you start by telling me a little about yourself?'),
  ('cs-003',
   'Doctor en Madrid',
   'Visitas al médico en España. describes tus síntomas y el doctor te diagnostica.',
   'es', 'A2', 'Consulta médica',
   'Eres un médico general en Madrid. Hablas español claro y pausado. Pregunta al paciente sobre sus síntomas, cuándo empezaron y qué lesiona. Sé empático y profesional.',
   'Buenos días. Pase, pase. ¿Qué le trae por aquí hoy?');