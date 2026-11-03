import { getEnv } from "./cf-context";

/**
 * ============================================================
 * CONVERSACIÓN SIMULADA CON IA
 * ============================================================
 * Role-play con un personaje IA que corrige errores del usuario
 * en tiempo real. Usa Workers AI para generar respuestas.
 */

const CHAT_MODEL = "@cf/meta/llama-3.1-8b-instruct-fast"; // modelo gratuito

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
  if (!personaPrompt?.trim() && typeof (context as any).system_prompt === "string" && (context as any).system_prompt.trim()) return (context as any).system_prompt;

  const speakingLevel = level.toUpperCase();
  if (["A1", "A2", "B1", "B2", "C1", "C2"].includes(speakingLevel)) {
    const levelRules: Record<string, string> = {
      A1: "STRICT A1 SPEAKING FORMAT: You lead every turn. Say exactly one short, useful everyday phrase (5-8 words), then explicitly ask the student to repeat it. Never ask an open question and never invite free conversation. When the student responds, gently correct pronunciation or wording in Spanish if needed, then say the next short phrase for the student to repeat. Keep dialogues closed and highly structured.",
      A2: "STRICT A2 SPEAKING FORMAT: You lead every turn. Say one short, useful everyday phrase, ask the student to repeat it, and then move to the next phrase. Use guided pronunciation and closed mini-dialogues with clear answer options. Never ask open-ended questions and never allow free conversation. Give corrections in Spanish.",
      B1: "STRICT B1 INTERMEDIATE SPEAKING LESSON. You ALWAYS control the conversation. PHASE 1 - REPEAT: Say ONE clear B1 sentence and ask the student to repeat it. Do 5 sentences. PHASE 2 - REPEAT TEXT: Say a mini-text of 3-5 sentences. Ask the student to repeat the whole text. Do 2 texts. PHASE 3 - GUIDED DIALOGUE: YOU choose ONE topic (travel, work, hobbies). Ask ONE specific closed question at a time. Student answers. You correct and ask the next question. LANGUAGE RULES: Your English must be SIMPLE B1 level. Use short sentences and common words. ALL corrections and explanations MUST be in SPANISH. Example correction in Spanish: Bien dicho. Pequeño error: usa I have been, no la forma corta. Repite: I have been studying. Keep responses SHORT: maximum 3-4 lines. Do NOT use grammar terms in English. Explain mistakes simply in Spanish. After correcting, IMMEDIATELY ask the next question in simple English. NEVER ask 'What would you like to talk about?' NEVER let the student choose the topic. If the student changes subject, redirect them politely to YOUR topic. You ALWAYS ask the next question after every student answer. Do not let the student lead or turn this into free conversation."; 
      B2: "STRICT B2 SPEAKING LESSON: Lead the student through three phases in order: (1) give model sentences with complex grammar such as conditionals and passive voice and ask for repetition; (2) give a connected mini-text of 5-8 sentences and ask for repetition; (3) propose and control a topic, asking one focused question at a time. Allow fuller opinions, but keep every answer within your chosen topic. After EVERY student answer, acknowledge its strengths, correct errors in Spanish, and immediately ask the next relevant question. You remain in charge of the topic and conversation flow.",
      C1: "ADVANCED C1 FREE CONVERSATION: Have a natural, free-flowing conversation. Introduce a topic and discuss it in depth. Use idioms, phrasal verbs, nuanced vocabulary and natural phrasing. Correct subtle errors, register and naturalness in Spanish. The student may propose topics and lead parts of the discussion.",
      C2: "ADVANCED C2 FREE CONVERSATION: Have a natural, free-flowing, intellectually rich conversation. Introduce a topic, explore nuance, idioms, phrasal verbs, register and advanced vocabulary. Correct subtle errors and unnatural phrasing in Spanish. Let the student propose topics and lead parts of the discussion."
    };
    return `${personaPrompt}

${levelRules[speakingLevel]}

LANGUAGE RULES: Speak to the student in English. Explain corrections in Spanish. Keep the language and complexity appropriate for ${speakingLevel}. Respond to the student's latest answer, but always follow the level-specific teaching structure above.`;
  }
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

LANGUAGE AND TEACHING RULES:
1. Respond ONLY in ${language === "en" ? "English" : language === "fr" ? "French" : "Spanish"}.
2. Adapt your vocabulary to the student's ${level} level.
3. Keep replies short (maximum 2-3 sentences) and natural.
4. If the student makes a grammar or vocabulary mistake, append a correction using exactly this format:
   [CORRECCIÓN: explain the error and the correct form]
5. If there is no mistake, do NOT include a correction block.`;
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
 * Respuesta de respaldo si la IA no está disponible o falla.
 */
function fallbackResponse(): { content: string; correction: string | null } {
  return {
    content: "I'm sorry, I'm having trouble connecting right now. Could you try again in a moment?",
    correction: null,
  };
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
  try {
    const env = getEnv();

    if (!env.AI) {
      return fallbackResponse();
    }

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
    if (!rawText) {
      return fallbackResponse();
    }
    return extractCorrection(rawText);
  } catch (error) {
    console.error("AI chat failed, using fallback:", error);
    return fallbackResponse();
  }
}

/**
 * Carga el historial de mensajes de una sesión desde D1.
 */
export async function loadSessionMessages(
  db: D1Database | undefined | null,
  sessionId: string
): Promise<ChatMessage[]> {
  if (!db) return [];

  try {
    const rows = await db.prepare(
      "SELECT role, content, correction FROM conversation_messages WHERE session_id = ? ORDER BY created_at ASC"
    ).bind(sessionId).all();

    return (rows.results || []).map((r: any) => ({
      role: r.role,
      content: r.content,
      correction: r.correction,
    }));
  } catch (error) {
    console.error("Failed to load session messages:", error);
    return [];
  }
}
