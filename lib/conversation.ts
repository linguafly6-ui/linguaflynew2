import { getEnv } from "./cf-context";

/**
 * ============================================================
 * CONVERSACIÓN SIMULADA CON IA
 * ============================================================
 * Role-play con un personaje IA que corrige errores del usuario
 * en tiempo real. Usa Workers AI para generar respuestas.
 */

const CHAT_MODEL = "@cf/meta/llama-3.1-8b-instruct";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  correction?: string;
}

/**
 * Construye el prompt del sistema combinando el personaje del escenario
 * con instrucciones de corrección pedagógica.
 */
function buildSystemPrompt(
  personaPrompt: string,
  language: string,
  level: string,
  scenarioContext?: string
): string {
  let context: { title?: string; description?: string; setting?: string; persona?: string } = {};
  try { context = scenarioContext ? JSON.parse(scenarioContext) : {}; } catch { context = {}; }
  // Los prompts de escenario no pueden anular las reglas listening-first.
  const scenarioDetails = [
    context.title && `Scenario: ${context.title}`,
    context.description && `Scenario description: ${context.description}`,
    context.setting && `Setting: ${context.setting}`,
    context.persona && `Your role/persona: ${context.persona}`,
  ].filter(Boolean).join("\n");
  const scenarioText = [context.title, context.description, context.setting, personaPrompt].filter(Boolean).join(" ").toLowerCase();
  const isCafeScenario = /café|cafe|coffee shop|coffee|barista|waiter|camarer/.test(scenarioText);
  const cafeRules = isCafeScenario ? `
CAFÉ ROLE-PLAY RULES:
You are a waiter in a café. The student is a customer.
- If the customer pays with cash, you give change only when change is due.
- If the customer pays with card, there is NO change. You process the card payment.
- Never tell a card-paying customer that you will give them change or ask them to swipe a card unless the scenario explicitly requires that action.
- Stay in character and respond naturally to what the student says.
` : "";
  return `You are acting in the following role-play. Treat the scenario details as the source of truth:
${scenarioDetails || personaPrompt}
${cafeRules}

CONVERSATION COHERENCE RULES:
- Stay in character and respond directly to the student's latest action or request.
- Do not merely repeat, paraphrase, or narrate what the student just said. React naturally and move the interaction forward.
- Do not invent actions, transactions, objects, promises, or outcomes that contradict the scenario or the student's choices.
- Only correct the student's English if they make mistakes. Do not repeat what they said unless correcting.
- If the student's English is correct, respond to the meaning without adding a correction.

LISTENING-FIRST LANGUAGE AND TEACHING RULES:
1. ALWAYS respond in English only, regardless of scenario language. Never use Spanish in the main response.
2. Adapt spoken English to CEFR level ${level}:
   - A1: 3-8 word sentences, basic vocabulary, simple present.
   - A2: 5-12 word sentences, everyday situations, simple past.
   - B1: 8-15 word sentences, familiar topics, compound tenses.
   - B2: 10-20 word sentences, complex discourse and idiomatic expressions.
3. Keep replies short (2-3 sentences maximum).
4. If the student makes a mistake, append at the END:
   [CORRECCIÓN: explica el error en castellano de España y da la forma correcta]
5. The correction block must be Spanish (Spain). Main response English only.
6. If there is no mistake, do NOT include a correction block.`;
}

/**
 * Extrae la corrección del bloque [CORRECCIÓN: ...] si existe.
 */
export function extractCorrection(text: string): { content: string; correction: string | null } {
  const match = text.match(/\[CORRECCIÓN:\s*(.+?)\]/i);
  if (match) {
    const correction = match[1].trim();
    const content = text.replace(/\[CORRECCIÓN:\s*.+?\]/i, "").trim();
    return { content, correction };
  }
  return { content: text.trim(), correction: null };
}

/**
 * Envía el historial de mensajes a Workers AI y obtiene la respuesta.
 */
export async function chatWithPersona(
  messages: ChatMessage[],
  personaPrompt: string,
  language: string,
  level: string,
  scenarioContext?: string
): Promise<{ content: string; correction: string | null }> {
  const env = getEnv();

  const systemMessage = {
    role: "system" as const,
    content: buildSystemPrompt(personaPrompt, language, level, scenarioContext),
  };

  // Workers AI usa el formato de mensajes de OpenAI
  const apiMessages = [
    systemMessage,
    ...messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  ];

  const response = await env.AI.run(CHAT_MODEL as any, {
    messages: apiMessages,
    max_tokens: 300,
    temperature: 0.7,
  });

  const rawText = (response as any).response ?? "";
  return extractCorrection(rawText);
}

/**
 * Carga el historial de mensajes de una sesión desde D1.
 */
export async function loadSessionMessages(
  db: D1Database,
  sessionId: string
): Promise<ChatMessage[]> {
  const rows = await db.prepare(
    "SELECT role, content, correction FROM conversation_messages WHERE session_id = ? ORDER BY created_at ASC"
  ).bind(sessionId).all();

  return (rows.results || []).map((r: any) => ({
    role: r.role,
    content: r.content,
    correction: r.correction,
  }));
}
