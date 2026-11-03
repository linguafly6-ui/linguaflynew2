import { getEnv } from "./cf-context";
import {
  type ConversationScript,
  type ScriptStep,
  type Level,
  generateScriptFromId,
  loadUnitFromDb,
  parseScriptFromJson,
  isLastStep,
} from "./conversation-script";

/**
 * ============================================================
 * TUTOR DE CONVERSACIÓN — Lógica de evaluación y avance
 * ============================================================
 */

const CHAT_MODEL = "@cf/meta/llama-3.1-8b-instruct";
const TTS_MODEL = "@cf/myshell-ai/melotts";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  correction?: string | null;
}

export interface EvaluationResult {
  content: string;
  correction: string | null;
  isAccepted: boolean;
  audioBase64: string | null;
}

export interface SessionState {
  sessionId: string;
  unitId: number;
  level: Level;
  currentStep: number;
  totalSteps: number;
  script: ConversationScript;
  isComplete: boolean;
}

function buildSystemPrompt(script: ConversationScript, step: ScriptStep): string {
  const langName =
    script.language === "en" ? "English" : script.language === "fr" ? "French" : "Spanish";

  return `You are an English teacher helping a student at the ${script.level} level.
The topic of this unit is "${script.title}" (${script.description}).

You are currently on step ${step.stepNumber + 1} of ${script.totalSteps}.
Your role: ${
    step.type === "teacher_intro"
      ? "Introduce the topic warmly."
      : step.type === "teacher_question"
        ? "Ask the student a question and wait for their response."
        : step.type === "teacher_feedback"
          ? "Give brief positive feedback and ask the next question."
          : step.type === "teacher_conclusion"
            ? "Congratulate the student and conclude the unit."
            : "Continue the conversation."
  }

RULES:
1. Always respond in ${langName}.
2. Keep your response short (2-3 sentences maximum).
3. Adapt your vocabulary to the ${script.level} level.
4. If the student makes grammar or vocabulary errors, include at the END of your response a correction in this exact format:
   [CORRECTION: explain the error and the correct form]
5. If there are no errors, do NOT include the correction block.
6. Be natural, encouraging, and maintain a supportive tone.
${step.evaluationCriteria ? `7. Evaluation criteria for this step: ${step.evaluationCriteria}` : ""}`;
}

export function extractCorrection(text: string): {
  content: string;
  correction: string | null;
} {
  const match = text.match(/\[CORRECTION:\s*(.+?)\]/i);
  if (match) {
    const correction = match[1].trim();
    const content = text.replace(/\[CORRECTION:\s*.+?\]/i, "").trim();
    return { content, correction };
  }
  return { content: text.trim(), correction: null };
}

export async function evaluateResponse(
  script: ConversationScript,
  step: ScriptStep,
  userMessage: string,
  history: ChatMessage[]
): Promise<{ content: string; correction: string | null; isAccepted: boolean }> {
  const env = getEnv();

  const systemMessage = {
    role: "system" as const,
    content: buildSystemPrompt(script, step),
  };

  const apiMessages = [
    systemMessage,
    ...history.map((m) => ({
      role: m.role,
      content: m.content,
    })),
    { role: "user" as const, content: userMessage },
  ];

  const response = await env.AI.run(CHAT_MODEL as never, {
    messages: apiMessages,
    max_tokens: 300,
    temperature: 0.7,
  });

  const rawText = (response as { response?: string }).response ?? "";
  const { content, correction } = extractCorrection(rawText);

  const isAccepted = userMessage.trim().length > 0;

  return { content, correction, isAccepted };
}

export async function generateAudio(
  text: string,
  language: string
): Promise<string | null> {
  try {
    const env = getEnv();

    const audioResponse = await env.AI.run(TTS_MODEL as never, {
      prompt: text,
      lang: language === "fr" ? "fr" : language === "es" ? "es" : "en",
    });

    let audioBuffer: ArrayBuffer;

    if (audioResponse instanceof ReadableStream) {
      audioBuffer = await new Response(audioResponse).arrayBuffer();
    } else if (audioResponse instanceof ArrayBuffer) {
      audioBuffer = audioResponse;
    } else if (audioResponse instanceof Uint8Array) {
      audioBuffer = audioResponse.buffer as ArrayBuffer;
    } else {
      const ab = await new Response(audioResponse as BodyInit).arrayBuffer();
      audioBuffer = ab;
    }

    const bytes = new Uint8Array(audioBuffer);
    let binary = "";
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, i + chunkSize);
      binary += String.fromCharCode.apply(null, Array.from(chunk));
    }
    return btoa(binary);
  } catch (error) {
    console.error("TTS generation error:", error);
    return null;
  }
}

export async function loadSessionState(
  db: D1Database,
  sessionId: string
): Promise<SessionState | null> {
  const row = await db
    .prepare(
      `SELECT id, user_id, unit_id, language, level, status, current_step, script_json
       FROM conversation_sessions WHERE id = ?`
    )
    .bind(sessionId)
    .first();

  if (!row) return null;

  const scriptJson = row.script_json as string | null;
  if (!scriptJson) return null;

  const script = parseScriptFromJson(scriptJson);
  if (!script) return null;

  return {
    sessionId: row.id as string,
    unitId: row.unit_id as number,
    level: row.level as Level,
    currentStep: row.current_step as number,
    totalSteps: script.totalSteps,
    script,
    isComplete: row.status === "completed",
  };
}

export async function loadSessionMessages(
  db: D1Database,
  sessionId: string
): Promise<ChatMessage[]> {
  const rows = await db
    .prepare(
      "SELECT role, content, correction FROM conversation_messages WHERE session_id = ? ORDER BY created_at ASC"
    )
    .bind(sessionId)
    .all();

  return (rows.results || []).map((r: Record<string, unknown>) => ({
    role: r.role as ChatMessage["role"],
    content: r.content as string,
    correction: (r.correction as string) || null,
  }));
}

export async function advanceStep(
  db: D1Database,
  sessionId: string,
  script: ConversationScript,
  currentStep: number
): Promise<{ newStep: number; isComplete: boolean }> {
  const complete = isLastStep(script, currentStep);

  if (complete) {
    await db
      .prepare(
        `UPDATE conversation_sessions
         SET current_step = ?, status = 'completed', updated_at = datetime('now')
         WHERE id = ?`
      )
      .bind(currentStep + 1, sessionId)
      .run();

    return { newStep: currentStep + 1, isComplete: true };
  }

  await db
    .prepare(
      `UPDATE conversation_sessions
       SET current_step = ?, updated_at = datetime('now')
       WHERE id = ?`
    )
    .bind(currentStep + 1, sessionId)
    .run();

  return { newStep: currentStep + 1, isComplete: false };
}

export async function createSession(
  db: D1Database,
  sessionId: string,
  userId: string,
  unitId: number,
  language: string
): Promise<SessionState> {
  const unit = await loadUnitFromDb(db, unitId);

  let script: ConversationScript;

  if (unit) {
    script = generateScriptFromId(
      unit.id,
      unit.title,
      unit.description,
      unit.language,
      unit.topic
    );
  } else {
    const level =
      unitId <= 25 ? "A1" : unitId <= 50 ? "A2" : unitId <= 75 ? "B1" : "B2";
    script = generateScriptFromId(
      unitId,
      `Unit ${unitId}`,
      `Conversation practice unit ${unitId}`,
      language,
      "general"
    );
    script.level = level as Level;
  }

  await db
    .prepare(
      `INSERT INTO conversation_sessions (id, user_id, unit_id, language, level, status, current_step, script_json, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, 'active', 0, ?, datetime('now'), datetime('now'))`
    )
    .bind(
      sessionId,
      userId,
      unitId,
      language,
      script.level,
      JSON.stringify(script)
    )
    .run();

  return {
    sessionId,
    unitId,
    level: script.level,
    currentStep: 0,
    totalSteps: script.totalSteps,
    script,
    isComplete: false,
  };
}

export function getCurrentStep(
  script: ConversationScript,
  currentStep: number
): ScriptStep {
  return script.steps[currentStep] ?? script.steps[0];
}
