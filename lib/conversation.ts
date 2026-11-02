import { getEnv } from "./cf-context";

/**
 * ============================================================
 * CONVERSACIÓN SIMULADA CON IA
 * ============================================================
 * Role-play con un personaje IA que corrige errores del usuario
 * en tiempo real. Usa Workers AI para generar respuestas.
 */

const CHAT_MODEL = "@cf/meta/llama-3.1-8b-instruct"; // modelo gratuito

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  correction?: string;
}

/**
 * Construye el prompt del sistema combinando el personaje del escenario
 * con instrucciones de corrección pedagógica.
 */
function buildSystemPrompt(personaPrompt: string, language: string, level: string): string {
  return `${personaPrompt}

REGLAS IMPORTANTES:
1. Responde SIEMPRE en ${language === "en" ? "inglés" : language === "fr" ? "francés" : "español"}.
2. Adapta tu vocabulario al nivel ${level} del estudiante.
3. Mantén tus respuestas cortas (máximo 2-3 frases) para que la conversación fluya.
4. Si el estudiante comete errores gramaticales o de vocabulario, incluye al FINAL de tu respuesta una corrección en este formato exacto:
   [CORRECCIÓN: explica el error y la forma correcta]
5. Si no hay errores, NO incluyas el bloque de corrección.
6. Sé natural, amable y mantén el role-play en todo momento.`;
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
  level: string
): Promise<{ content: string; correction: string | null }> {
  const env = getEnv();

  const systemMessage = {
    role: "system" as const,
    content: buildSystemPrompt(personaPrompt, language, level),
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