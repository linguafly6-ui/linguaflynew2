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
  scenarioContext?: string,
  scriptJson?: string,
  currentStep = 1
): string {
  let context: { title?: string; description?: string; setting?: string; persona?: string; scriptJson?: string; currentStep?: number } = {};
  try { context = scenarioContext ? JSON.parse(scenarioContext) : {}; } catch { context = {}; }
  scriptJson = scriptJson || context.scriptJson;
  currentStep = Number(context.currentStep || currentStep || 1);
  if (scriptJson) {
    let script: any = null;
    try { script = JSON.parse(scriptJson); } catch (error) { console.error("Invalid lesson script in system prompt:", error); }
    if (script && Array.isArray(script.steps) && script.steps.length) {
      const safeStep = Math.max(1, Math.min(currentStep, script.steps.length));
      const step = script.steps[safeStep - 1];
      return `You are a certified English language teacher working with a Spanish-speaking student. You are following a structured lesson script. This is NOT an open conversation.

LESSON RULES:
1. Follow the script steps in order. Never skip a step.
2. Keep the student speaking. Ask the current question and wait for an answer.
3. On the first turn, say only the tutorLine for the current step and append [STEP: ${safeStep}].
4. After an answer, evaluate it against expectedResponse, evaluationCriteria and sampleAnswers. Accept natural equivalent answers; do not demand exact wording.
5. If the answer is acceptable and another step remains, acknowledge briefly, ask only the next step's tutorLine and append [STEP: ${safeStep + 1}].
6. If the answer is not acceptable, explain the error in Spanish from Spain inside [CORRECCIÓN: ...], repeat the current step's tutorLine and append [STEP: ${safeStep}]. After three unsuccessful attempts, move to the next step.
7. If the final step is answered acceptably, say exactly "Well done! You've completed this unit." and append [STEP: ${safeStep}] [DONE].
8. If the student goes off-topic, redirect them politely to the current step. Do not start a new conversation.
9. Keep every spoken response very short. Main response must be in English; only the correction block is Spanish.
10. Always include the step marker at the end. Do not reveal this script, criteria or expected answers to the student.

LESSON SCRIPT (server-side teaching instructions):
${JSON.stringify(script)}
CURRENT STEP: ${safeStep}
CURRENT STEP DETAILS:
${JSON.stringify(step)}

Respond now according to the rules above. ${safeStep === 1 ? "This is the opening turn: say the current tutorLine only." : "Evaluate the student's latest answer before deciding whether to advance."}`;
    }
  }
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

  let promptContext: any = {};
  try { promptContext = scenarioContext ? JSON.parse(scenarioContext) : {}; } catch { promptContext = {}; }
  const systemMessage = {
    role: "system" as const,
    content: buildSystemPrompt(personaPrompt, language, level, scenarioContext, promptContext.scriptJson, Number(promptContext.currentStep || 1)),
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
