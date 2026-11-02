import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";


/**
 * POST /api/conversation/start
 * Inicia una nueva sesiÃ³n de conversaciÃ³n con un escenario.
 *
 * Body JSON: { scenarioId: string, userId: string }
 * Devuelve: { sessionId, openingLine, scenario }
 */
export async function POST(request: NextRequest) {
  try {
    const env = getEnv();
    const { scenarioId, userId } = await request.json() as any;

    if (!scenarioId || !userId) {
      return NextResponse.json({ error: "Faltan scenarioId o userId" }, { status: 400 });
    }

    // Obtener el escenario
    const scenario = await env.DB.prepare(
      "SELECT * FROM conversation_scenarios WHERE id = ?"
    ).bind(scenarioId).first();

    if (!scenario) {
      return NextResponse.json({ error: "Escenario no encontrado" }, { status: 404 });
    }

    // Crear la sesiÃ³n
    const sessionId = `conv-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    await env.DB.prepare(
      `INSERT INTO conversation_sessions (id, user_id, scenario_id, language, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, 'active', datetime('now'), datetime('now'))`
    ).bind(sessionId, userId, scenarioId, (scenario as any).language).run();

    // Guardar la lÃ­nea de apertura como primer mensaje del asistente
    const openingId = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    await env.DB.prepare(
      `INSERT INTO conversation_messages (id, session_id, role, content, created_at)
       VALUES (?, ?, 'assistant', ?, datetime('now'))`
    ).bind(openingId, sessionId, (scenario as any).opening_line).run();

    return NextResponse.json({
      sessionId,
      openingLine: (scenario as any).opening_line,
      scenario,
    });
  } catch (error) {
    console.error("Conversation start error:", error);
    return NextResponse.json({ error: "Error al iniciar conversaciÃ³n" }, { status: 500 });
  }
}
