import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent, studentUserId } from "@/lib/student-auth";
import { buildDefaultLessonScript, parseLessonScript } from "@/lib/conversation-script";
import { generateCachedTts, audioServeUrl } from "@/lib/tts";
export const runtime = "nodejs";
export async function POST(req: NextRequest) {
  try {
    const env = getEnv();
    if (!env || !env.AI || !env.DB || !env.LINGUAFLY_MEDIA) {
      console.error("Bindings missing:", { hasEnv: !!env, hasAI: !!env?.AI, hasDB: !!env?.DB, hasR2: !!env?.LINGUAFLY_MEDIA });
      return NextResponse.json({ error: "Configuración incompleta" }, { status: 500 });
    }
    const body = await req.json() as any;
    const scenarioId = body.scenarioId;
    let userId = String(body.userId || "");
    if (!scenarioId || !userId) return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });

    let scenario: any;
    let opening: string;
    let scriptJson: string | null = null;
    let lesson: any = null;

    if (String(scenarioId).startsWith("a1-speaking-")) {
      if (!env.COURSE_DB) {
        console.error("Bindings missing:", { hasCourseDB: !!env.COURSE_DB });
        return NextResponse.json({ error: "Configuración incompleta" }, { status: 500 });
      }
      const id = Number(String(scenarioId).slice(12));
      const student = await getStudent(req);
      if (!Number.isInteger(id) || id < 1 || id > 200) return NextResponse.json({ error: "Unidad no válida" }, { status: 400 });
      if (id > 5 && student?.plan !== "pro") return NextResponse.json({ error: "Se requiere el plan Pro" }, { status: 403 });
      if (student) {
        userId = studentUserId(student);
        if (body.userId !== userId) return NextResponse.json({ error: "Sesión no válida" }, { status: 403 });
      }
      const unit = await env.COURSE_DB.prepare("SELECT * FROM a1_speaking_units WHERE id=?").bind(id).first() as any;
      if (!unit) return NextResponse.json({ error: "Unidad no encontrada" }, { status: 404 });
      const unitTitle = String(unit.title || "Unidad " + id);
      const level = String(unit.level || "A1");
      lesson = unit.script_json
        ? parseLessonScript(String(unit.script_json), unitTitle, level)
        : buildDefaultLessonScript(unitTitle, level);
      scriptJson = JSON.stringify(lesson);
      opening = String(lesson.steps[0].tutorAudio || lesson.steps[0].tutorLine);
      scenario = { id: scenarioId, title: unitTitle, level };
    } else {
      const row = await env.DB.prepare("SELECT * FROM conversation_scenarios WHERE id=?").bind(scenarioId).first() as any;
      if (!row) return NextResponse.json({ error: "Escenario no encontrado" }, { status: 404 });
      scenario = { id: row.id, title: "Práctica de conversación", description: "Escucha y responde en inglés.", setting: "Situación cotidiana", language: "en", level: row.level };
      opening = String(row.opening_line || "Hello! How can I help you today?");
    }

    const sessionId = "conv-" + crypto.randomUUID();
    await env.DB.prepare("INSERT INTO conversation_sessions (id,user_id,scenario_id,language,status,created_at,updated_at,current_step,script_json) VALUES (?,?,?,'en','active',datetime('now'),datetime('now'),1,?)")
      .bind(sessionId, userId, scenarioId, scriptJson).run();
    await env.DB.prepare("INSERT INTO conversation_messages (id,session_id,role,content,created_at) VALUES (?,?,'assistant',?,datetime('now'))")
      .bind("msg-" + crypto.randomUUID(), sessionId, opening).run();
    const key = await generateCachedTts(opening, "en", userId, "tts/conv/" + sessionId);
    return NextResponse.json({
      sessionId,
      audioUrl: audioServeUrl(key),
      scenario,
      ...(lesson ? { instruction_es: lesson.steps[0].instruction_es, currentStep: 1, totalSteps: lesson.steps.length } : {}),
    });
  } catch (error) {
    if (error instanceof Error && error.message === "AI_RATE_LIMITED") return NextResponse.json({ error: "Demasiadas peticiones. Espera unos segundos e inténtalo de nuevo." }, { status: 429 });
    console.error("Error en /api/conversation/start:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
