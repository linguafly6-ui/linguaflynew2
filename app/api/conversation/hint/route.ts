import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";

const CHAT_MODEL = "@cf/meta/llama-3.1-8b-instruct-fast";

const LANG_NAMES: Record<string, string> = {
  en: "English",
  fr: "French",
  es: "Spanish",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
};

export async function POST(request: NextRequest) {
  try {
    const env = getEnv();
    const body = await request.json() as any;
    const { sessionId, lastMessage, personaPrompt, language, level } = body;

    if (!personaPrompt || !language || !level) {
      return NextResponse.json({ error: "Faltan parametros" }, { status: 400 });
    }

    const langName = LANG_NAMES[language] || "English";

    const systemPrompt = `You are a language learning assistant. The student needs help responding in a role-play conversation. Generate ONE short, natural response in ${langName} at ${level} level. The response must be what the student would say to the character. Do NOT explain. Do NOT add translations. Respond ONLY in ${langName}. Nothing else.\n\nCharacter and situation context:\n${personaPrompt}`;

    const userContent = lastMessage
      ? `The character just said: "${lastMessage}". What could the student respond? Reply in ${langName} only.`
      : `The student just started the conversation and does not know what to say. Suggest a first response. Reply in ${langName} only.`;

    const response = await env.AI.run(CHAT_MODEL as any, {
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
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
