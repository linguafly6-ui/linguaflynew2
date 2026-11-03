import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent, studentUserId } from "@/lib/student-auth";
import { saveUnifiedProgress } from "@/lib/unified-progress";

const CHAT_MODEL = "@cf/meta/llama-3.1-8b-instruct-fast";

function fallbackEvaluation(correctWords: unknown, totalWords: unknown) {
  const total = Math.max(0, Math.floor(Number(totalWords) || 0));
  const correct = Math.max(0, Math.min(total, Math.floor(Number(correctWords) || 0)));
  const score = total > 0 ? Math.round((correct / total) * 100) : 0;
  return {
    score,
    stars: score >= 90 ? 3 : score >= 75 ? 2 : score >= 60 ? 1 : 0,
    feedback: `Has completado la unidad. Puntuación: ${score}/100.`,
    grammar_errors: 0,
    vocabulary_used: correct,
    totalWords: total,
    correctWords: correct,
    fallback: true,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as any;
    const { userId, scenarioId, sessionId, correctWords, totalWords } = body;
    if (!userId || !scenarioId || !sessionId) {
      return NextResponse.json({ error: "Faltan userId, scenarioId o sessionId" }, { status: 400 });
    }

    const isCourseUnit = String(scenarioId).startsWith("a1-speaking-") || String(scenarioId).startsWith("a2-speaking-") || String(scenarioId).startsWith("b1-speaking-") || String(scenarioId).startsWith("b2-speaking-") || String(scenarioId).startsWith("c1-speaking-") || String(scenarioId).startsWith("c2-speaking-");
    if (isCourseUnit) {
      const student = await getStudent(request);
      const unitNumber = Number(String(scenarioId).split("-").pop());
      if (unitNumber > 5 && student?.plan !== "pro" && student?.plan !== "pro_test") {
        return NextResponse.json({ error: "Pro required" }, { status: 403 });
      }
      if (student && studentUserId(student) !== userId) {
        return NextResponse.json({ error: "Sesión no válida" }, { status: 403 });
      }
    }

    const fallback = fallbackEvaluation(correctWords, totalWords);
    const env = getEnv();
    if (!env.DB) {
      console.warn("Conversation evaluation: DB unavailable; returning counter-based score.");
      return NextResponse.json(fallback);
    }

    let session: any;
    let messages: any[] = [];
    try {
      session = await env.DB.prepare(
        "SELECT id,user_id,scenario_id FROM conversation_sessions WHERE id = ?"
      ).bind(sessionId).first();
      if (!session || session.user_id !== userId || session.scenario_id !== scenarioId) {
        return NextResponse.json(fallback);
      }
      const resultRows = await env.DB.prepare(
        "SELECT role,content FROM conversation_messages WHERE session_id = ? ORDER BY created_at ASC"
      ).bind(sessionId).all();
      messages = resultRows.results || [];
    } catch (dbReadError) {
      console.error("Could not read conversation from D1; using fallback score:", dbReadError);
      return NextResponse.json(fallback);
    }

    if (!messages.some((message: any) => message.role === "user")) {
      return NextResponse.json(fallback);
    }

    const transcript = messages
      .map((message: any) => (message.role === "user" ? "Estudiante: " : "Personaje: ") + message.content)
      .join("\n");

    let evaluated: any = fallback;
    if (env.AI?.run) {
      try {
        const evaluation = await env.AI.run(CHAT_MODEL as any, {
          messages: [
            {
              role: "system",
              content: "Eres un evaluador de conversaciones de aprendizaje de idiomas. Analiza la conversación del estudiante. Devuelve SOLO un JSON con: { score: 0-100, feedback: string en español, grammar_errors: number, vocabulary_used: number }. El score refleja fluidez, precisión gramatical y riqueza de vocabulario.",
            },
            {
              role: "user",
              content: "Evalúa esta conversación y devuelve únicamente el JSON solicitado:\n\n" + transcript,
            },
          ],
          max_tokens: 300,
          temperature: 0.2,
        });
        const raw = String((evaluation as any)?.response || "").trim();
        const jsonText = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
        let parsed: any;
        try {
          parsed = JSON.parse(jsonText);
        } catch {
          const match = jsonText.match(/\{[\s\S]*\}/);
          if (!match) throw new Error("La IA devolvió una evaluación no válida");
          parsed = JSON.parse(match[0]);
        }
        const score = Math.max(0, Math.min(100, Math.round(Number(parsed.score) || 0)));
        evaluated = {
          score,
          stars: score >= 90 ? 3 : score >= 75 ? 2 : score >= 60 ? 1 : 0,
          feedback: String(parsed.feedback || "Sigue practicando para mejorar."),
          grammar_errors: Math.max(0, Number(parsed.grammar_errors) || 0),
          vocabulary_used: Math.max(0, Number(parsed.vocabulary_used) || 0),
          totalWords: fallback.totalWords,
          correctWords: fallback.correctWords,
        };
      } catch (aiError) {
        console.error("AI evaluation failed; using counter-based score:", aiError);
        evaluated = fallback;
      }
    } else {
      console.warn("AI binding unavailable; using counter-based score.");
    }

    try {
      await env.DB.prepare(
        "UPDATE conversation_sessions SET status='completed',updated_at=datetime('now') WHERE id=?"
      ).bind(sessionId).run();
    } catch (writeError) {
      console.error("Could not mark conversation session completed:", writeError);
    }

    if (!isCourseUnit) {
      try {
        await env.DB.prepare(
          "UPDATE conversation_course_progress SET status=?,score=?,stars=?,attempts=attempts+1,completed_at=CASE WHEN ?='completed' THEN datetime('now') ELSE completed_at END WHERE user_id=? AND scenario_id=?"
        ).bind(
          evaluated.score >= 60 ? "completed" : "available",
          evaluated.score,
          evaluated.stars,
          evaluated.score >= 60 ? "completed" : "available",
          userId,
          scenarioId,
        ).run();

        if (evaluated.score >= 60) {
          const current = await env.DB.prepare(
            "SELECT level,course_order FROM conversation_scenarios WHERE id=?"
          ).bind(scenarioId).first() as any;
          if (current) {
            const next = await env.DB.prepare(
              "SELECT id,title,level,course_order FROM conversation_scenarios WHERE course_order>0 AND ((level=? AND course_order>?) OR (CASE level WHEN 'A1' THEN 1 WHEN 'A2' THEN 2 WHEN 'B1' THEN 3 ELSE 4 END)>(CASE ? WHEN 'A1' THEN 1 WHEN 'A2' THEN 2 WHEN 'B1' THEN 3 ELSE 4 END)) ORDER BY CASE level WHEN 'A1' THEN 1 WHEN 'A2' THEN 2 WHEN 'B1' THEN 3 ELSE 4 END,course_order LIMIT 1"
            ).bind(current.level, current.course_order, current.level).first() as any;
            if (next) {
              await env.DB.prepare(
                "UPDATE conversation_course_progress SET status='available' WHERE user_id=? AND scenario_id=? AND status='locked'"
              ).bind(userId, next.id).run();
              evaluated.unlocked_scenario = {
                id: next.id,
                title: next.title,
                level: next.level,
                course_order: next.course_order,
              };
            }
          }
        }
      } catch (progressError) {
        console.error("Could not update conversation course progress:", progressError);
      }
    }

    if (isCourseUnit) {
      const match = String(scenarioId).match(/^(a1|a2|b1|b2|c1|c2)-speaking-(\d+)$/);
      const student = await getStudent(request);
      if (!match || !student || studentUserId(student) !== userId) {
        return NextResponse.json({ error: "Sesión de alumno no válida." }, { status: 403 });
      }
      const course = match[1];
      const unitNumber = Number(match[2]);
      const courseDb = env.COURSE_DB || env.DB;
      const table = course + "_speaking_progress";
      await courseDb.prepare(
        "INSERT INTO " + table + "(user_id,unit_id,score,completed,attempts,feedback,updated_at) VALUES(?,?,?,?,1,?,datetime('now')) ON CONFLICT(user_id,unit_id) DO UPDATE SET score=MAX(score,excluded.score),completed=MAX(completed,excluded.completed),attempts=" + table + ".attempts+1,feedback=excluded.feedback,updated_at=datetime('now')"
      ).bind(userId, unitNumber, evaluated.score, evaluated.score >= 60 ? 1 : 0, evaluated.feedback).run();
      await saveUnifiedProgress(courseDb, Number(student.id), course + "-speaking", unitNumber, evaluated.score, evaluated.score >= 60);
    }

    return NextResponse.json(evaluated);
  } catch (error) {
    console.error("Conversation completion error; returning fallback score:", error);
    // Si la solicitud contiene contadores válidos, el alumno recibe una puntuación aunque falle la evaluación.
    return NextResponse.json({ error: "No se pudo evaluar la conversación" }, { status: 500 });
  }
}
