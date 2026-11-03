import { NextRequest, NextResponse } from "next/server";
import { getEnv, generateId } from "@/lib/cf-context";
import {
  createSession,
  getCurrentStep,
  generateAudio,
  type SessionState,
} from "@/lib/conversation";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const env = getEnv();
    const body = await request.json();
    const unitId: number | undefined = body.unitId;
    const userId: string | undefined = body.userId;
    const language: string = body.language || "en";

    if (unitId === undefined || !userId) {
      return NextResponse.json(
        { error: "Faltan unitId o userId" },
        { status: 400 }
      );
    }

    if (unitId < 1 || unitId > 100) {
      return NextResponse.json(
        { error: "unitId debe estar entre 1 y 100" },
        { status: 400 }
      );
    }

    const sessionId = generateId("conv");
    const session: SessionState = await createSession(
      env.DB,
      sessionId,
      userId,
      unitId,
      language
    );

    const firstStep = getCurrentStep(session.script, 0);

    const msgId = generateId("msg");
    await env.DB.prepare(
      `INSERT INTO conversation_messages (id, session_id, role, content, created_at)
       VALUES (?, ?, 'assistant', ?, datetime('now'))`
    )
      .bind(msgId, sessionId, firstStep.teacherText)
      .run();

    const audioBase64 = await generateAudio(firstStep.teacherText, language);

    return NextResponse.json({
      sessionId: session.sessionId,
      unitId: session.unitId,
      level: session.level,
      title: session.script.title,
      description: session.script.description,
      instructions: session.script.instructions,
      teacherText: firstStep.teacherText,
      stepInstructions: firstStep.instructions || null,
      audioBase64,
      currentStep: 0,
      totalSteps: session.totalSteps,
      progress: 0,
      isComplete: false,
    });
  } catch (error) {
    console.error("Conversation start error:", error);
    return NextResponse.json(
      { error: "Error al iniciar la conversación" },
      { status: 500 }
    );
  }
}
