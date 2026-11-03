import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent, studentUserId } from "@/lib/student-auth";
import { chatWithPersona, loadSessionMessages } from "@/lib/conversation";
import { checkAiRateLimit } from "@/lib/ai-helpers";
import { parseLessonScript } from "@/lib/conversation-script";
import { generateCachedTts, audioServeUrl } from "@/lib/tts";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  try {
    const env = getEnv();
    if (!env?.DB || !env?.AI || !env?.LINGUAFLY_MEDIA) return NextResponse.json({ error: "Configuración incompleta" }, { status: 500 });
    const { sessionId, message } = await request.json() as any;
    if (!sessionId || typeof message !== "string" || !message.trim()) return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });

    const session = await env.DB.prepare("SELECT id,user_id,scenario_id,script_json,current_step FROM conversation_sessions WHERE id=? AND status='active'").bind(sessionId).first() as any;
    if (!session) return NextResponse.json({ error: "Sesión no activa" }, { status: 404 });
    const student = await getStudent(request);
    if (student && session.user_id !== studentUserId(student)) return NextResponse.json({ error: "Sesión no válida" }, { status: 403 });
    const userId = String(session.user_id || "guest");
    if (!(await checkAiRateLimit(userId))) return NextResponse.json({ error: "Demasiadas peticiones. Espera unos segundos e inténtalo de nuevo." }, { status: 429 });

    await env.DB.prepare("INSERT INTO conversation_messages (id,session_id,role,content,created_at) VALUES (?,?, 'user', ?,datetime('now'))")
      .bind("msg-" + crypto.randomUUID(), sessionId, message.trim()).run();

    const isGuided = String(session.scenario_id).startsWith("a1-speaking-") && Boolean(session.script_json);
    if (isGuided) {
      const unitId = Number(String(session.scenario_id).slice(12));
      const unit = env.COURSE_DB
        ? await env.COURSE_DB.prepare("SELECT title,level FROM a1_speaking_units WHERE id=?").bind(unitId).first() as any
        : null;
      const lesson = parseLessonScript(String(session.script_json), String(unit?.title || "Unidad " + unitId), String(unit?.level || "A1"));
      const totalSteps = lesson.steps.length;
      const currentStep = Math.max(1, Math.min(Number(session.current_step || 1), totalSteps));
      const personaPrompt = "You are a structured English language teacher. Follow the supplied lesson script exactly.";
      const context = JSON.stringify({ scriptJson: session.script_json, currentStep });
      const history = await loadSessionMessages(env.DB, sessionId);
      let attempts = 0;
      for (let index = history.length - 1; index >= 0 && history[index].role === "user"; index--) attempts++;
      const result = await chatWithPersona(history, personaPrompt, "en", lesson.level || "A1", context);
      const marker = result.content.match(/\\[STEP:\\s*(\\d+)\\]/i);
      const done = /\\[DONE\\]/i.test(result.content);
      const suggestedStep = marker ? Number(marker[1]) : currentStep;
      let nextStep = suggestedStep === currentStep + 1 ? currentStep + 1 : currentStep;
      if (result.correction && attempts >= 3 && currentStep < totalSteps) nextStep = currentStep + 1;
      const acceptedFinalAnswer = currentStep === totalSteps && !result.correction;
      const completed = currentStep === totalSteps && (done || acceptedFinalAnswer || (Boolean(result.correction) && attempts >= 3));
      const stepAdvanced = nextStep > currentStep;
      const speechLine = completed
        ? "Well done! You've completed this unit."
        : String(lesson.steps[nextStep - 1].tutorAudio || lesson.steps[nextStep - 1].tutorLine);
      const key = await generateCachedTts(speechLine, "en", userId, `tts/conv/${sessionId}`);
      const messageId = "msg-" + crypto.randomUUID();
      await env.DB.prepare("INSERT INTO conversation_messages (id,session_id,role,content,correction,audio_r2_key,created_at) VALUES (?,?, 'assistant', ?,?,?,datetime('now'))")
        .bind(messageId, sessionId, speechLine, result.correction, key).run();
      if (completed) {
        await env.DB.prepare("UPDATE conversation_sessions SET current_step=?,status='completed',updated_at=datetime('now') WHERE id=?").bind(totalSteps, sessionId).run();
      } else {
        await env.DB.prepare("UPDATE conversation_sessions SET current_step=?,updated_at=datetime('now') WHERE id=?").bind(nextStep, sessionId).run();
      }
      return NextResponse.json({
        audioUrl: audioServeUrl(key),
        correction: result.correction,
        currentStep: completed ? totalSteps : nextStep,
        totalSteps,
        instruction_es: completed ? "¡Unidad completada! Has terminado todos los pasos." : lesson.steps[nextStep - 1].instruction_es,
        completed,
        stepAdvanced,
        messageId,
      });
    }

    let personaPrompt = "You are a friendly English conversation partner.";
    let context = "";
    let level = "A1";
    if (String(session.scenario_id).startsWith("a1-speaking-")) {
      const unitId = Number(String(session.scenario_id).slice(12));
      const unit = env.COURSE_DB ? await env.COURSE_DB.prepare("SELECT system_prompt,level FROM a1_speaking_units WHERE id=?").bind(unitId).first() as any : null;
      personaPrompt = String(unit?.system_prompt || personaPrompt);
      level = String(unit?.level || level);
    } else {
      const scenario = await env.DB.prepare("SELECT title,description,setting,persona_prompt,level FROM conversation_scenarios WHERE id=?").bind(session.scenario_id).first() as any;
      if (scenario) {
        personaPrompt = String(scenario.persona_prompt || personaPrompt);
        level = String(scenario.level || level);
        context = JSON.stringify({ title: scenario.title, description: scenario.description, setting: scenario.setting });
      }
    }
    const { content, correction } = await chatWithPersona(await loadSessionMessages(env.DB, sessionId), personaPrompt, "en", level, context);
    const key = await generateCachedTts(content, "en", userId, `tts/conv/${sessionId}`);
    const messageId = "msg-" + crypto.randomUUID();
    await env.DB.prepare("INSERT INTO conversation_messages (id,session_id,role,content,correction,audio_r2_key,created_at) VALUES (?,?, 'assistant', ?,?,?,datetime('now'))")
      .bind(messageId, sessionId, content, correction, key).run();
    await env.DB.prepare("UPDATE conversation_sessions SET updated_at=datetime('now') WHERE id=?").bind(sessionId).run();
    return NextResponse.json({ audioUrl: audioServeUrl(key), correction, messageId });
  } catch (error) {
    console.error("Conversation chat error:", error);
    if (error instanceof Error && error.message === "AI_RATE_LIMITED") return NextResponse.json({ error: "Demasiadas peticiones. Espera unos segundos e inténtalo de nuevo." }, { status: 429 });
    return NextResponse.json({ error: "Error en la conversación" }, { status: 500 });
  }
}
