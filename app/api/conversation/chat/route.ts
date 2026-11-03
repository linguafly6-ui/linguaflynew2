import { NextRequest, NextResponse } from "next/server";
import { getEnv, generateId } from "@/lib/cf-context";
import {
  loadSessionState,
  loadSessionMessages,
  evaluateResponse,
  generateAudio,
  advanceStep,
  getCurrentStep,
  type ChatMessage,
  type SessionState,
} from "@/lib/conversation";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const env = getEnv();
    const body = await request.json();
    const sessionId: string | undefined = body.sessionId;
    const message: string | undefined = body.message;

    if (!sessionId || !message) {
      return NextResponse.json(
        { error: "Faltan sessionId o message" },
        { status: 400 }
      );
    }

    const session: SessionState | null = await loadSessionState(
      env.DB,
      sessionId
    );

    if (!session) {
      return NextResponse.json(
        { error: "Sesión no encontrada" },
        { status: 404 }
      );
    }

    if (session.isComplete) {
      return NextResponse.json(
        { error: "Esta sesión ya está completada" },
        { status: 400 }
      );
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
      return NextResponse.json({
        reply: "I didn't catch that. Could you please try again?",
        correction: null,
        audioBase64: null,
        currentStep: session.currentStep,
        totalSteps: session.totalSteps,
        progress: Math.round((session.currentStep / session.totalSteps) * 100),
        isComplete: false,
        stepInstructions: "Please try to answer the question.",
      });
    }

    const userMsgId = generateId("msg");
    await env.DB.prepare(
      `INSERT INTO conversation_messages (id, session_id, role, content, created_at)
       VALUES (?, ?, 'user', ?, datetime('now'))`
    )
      .bind(userMsgId, sessionId, trimmedMessage)
      .run();

    const history: ChatMessage[] = await loadSessionMessages(env.DB, sessionId);

    const currentStepData = getCurrentStep(
      session.script,
      session.currentStep
    );

    const { content, correction, isAccepted } = await evaluateResponse(
      session.script,
      currentStepData,
      trimmedMessage,
      history
    );

    const assistantMsgId = generateId("msg");
    await env.DB.prepare(
      `INSERT INTO conversation_messages (id, session_id, role, content, correction, created_at)
       VALUES (?, ?, 'assistant', ?, ?, datetime('now'))`
    )
      .bind(assistantMsgId, sessionId, content, correction)
      .run();

    const { newStep, isComplete } = await advanceStep(
      env.DB,
      sessionId,
      session.script,
      session.currentStep
    );

    let nextTeacherText: string | null = null;
    let nextStepInstructions: string | null = null;
    let nextAudioBase64: string | null = null;

    if (!isComplete) {
      const nextStep = getCurrentStep(session.script, newStep);
      nextTeacherText = nextStep.teacherText;
      nextStepInstructions = nextStep.instructions || null;

      const nextMsgId = generateId("msg");
      await env.DB.prepare(
        `INSERT INTO conversation_messages (id, session_id, role, content, created_at)
         VALUES (?, ?, 'assistant', ?, datetime('now'))`
      )        .bind(nextMsgId, sessionId, nextTeacherText)
        .run();

      nextAudioBase64 = await generateAudio(
        nextTeacherText,
        session.script.language
      );
    } else {
      nextAudioBase64 = await generateAudio(content, session.script.language);
    }

    return NextResponse.json({
      reply: content,
      correction,
      isAccepted,
      audioBase64: nextAudioBase64,
      nextTeacherText: isComplete ? null : nextTeacherText,
      stepInstructions: isComplete ? null : nextStepInstructions,
      currentStep: newStep,
      totalSteps: session.totalSteps,
      progress: Math.round((newStep / session.totalSteps) * 100),
      isComplete,
    });
  } catch (error) {
    console.error("Conversation chat error:", error);
    return NextResponse.json(
      { error: "Error en la conversación" },
      { status: 500 }
    );
  }
}
