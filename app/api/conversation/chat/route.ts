import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { chatWithPersona, loadSessionMessages, type ChatMessage } from "@/lib/conversation";


/**
 * POST /api/conversation/chat
 * Envía un mensaje del usuario y recibe la respuesta del personaje IA.
 *
 * Body JSON: {
 *   sessionId: string,
 *   message: string,
 *   personaPrompt: string,
 *   language: string,
 *   level: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const env = getEnv();
    const { sessionId, message, personaPrompt, language, level } = await request.json() as any;

    if (!sessionId || !message || !personaPrompt) {
      return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
    }

    // 1. Guardar el mensaje del usuario en D1
    const userMsgId = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    await env.DB.prepare(
      `INSERT INTO conversation_messages (id, session_id, role, content, created_at)
       VALUES (?, ?, 'user', ?, datetime('now'))`
    ).bind(userMsgId, sessionId, message).run();

    // 2. Cargar historial completo de la sesión
    const history = await loadSessionMessages(env.DB, sessionId);

    // 3. Añadir el mensaje actual al historial
    const allMessages: ChatMessage[] = [...history, { role: "user", content: message }];

    // 4. Obtener respuesta de la IA
    const { content, correction } = await chatWithPersona(
      allMessages,
      personaPrompt,
      language,
      level
    );

    // 5. Guardar la respuesta del asistente en D1 (con corrección si la hay)
    const assistantMsgId = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    await env.DB.prepare(
      `INSERT INTO conversation_messages (id, session_id, role, content, correction, created_at)
       VALUES (?, ?, 'assistant', ?, ?, datetime('now'))`
    ).bind(assistantMsgId, sessionId, content, correction).run();

    // 6. Actualizar timestamp de la sesión
    await env.DB.prepare(
      "UPDATE conversation_sessions SET updated_at = datetime('now') WHERE id = ?"
    ).bind(sessionId).run();

    return NextResponse.json({
      reply: content,
      correction: correction,
    });
  } catch (error) {
    console.error("Conversation chat error:", error);
    return NextResponse.json({ error: "Error en la conversación" }, { status: 500 });
  }
}
