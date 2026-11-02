import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";

const CHAT_MODEL = "@cf/meta/llama-3.1-8b-instruct";

/**
 * POST /api/conversation/hint
 * Genera una respuesta de ejemplo para ayudar al estudiante en el role-play.
 */
export async function POST(request: NextRequest) {
  try {
    const env = getEnv();
    const { sessionId, lastMessage, personaPrompt, language, level } = await request.json() as any;

    if (!sessionId || !lastMessage || !personaPrompt || !language || !level) {
      return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
    }

    const systemPrompt = "El estudiante necesita ayuda para responder en esta conversación. Genera UNA posible respuesta corta y natural en " + language + " nivel " + level + ". No expliques, solo da la respuesta que el estudiante podría decir.\n\nContexto del personaje y la situación:\n" + personaPrompt;
    const response = await env.AI.run(CHAT_MODEL as any, {
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Último mensaje de la conversación:\n" + lastMessage },
      ],
      max_tokens: 120,
      temperature: 0.7,
    });

    const hint = ((response as any).response || "").trim();
    if (!hint) {
      return NextResponse.json({ error: "No se pudo generar una pista" }, { status: 502 });
    }

    return NextResponse.json({ hint });
  } catch (error) {
    console.error("Conversation hint error:", error);
    return NextResponse.json({ error: "Error al generar la pista" }, { status: 500 });
  }
}
