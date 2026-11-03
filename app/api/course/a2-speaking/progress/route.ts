import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent, studentUserId } from "@/lib/student-auth";

export async function POST(req: NextRequest) {
  let requestedScore: number | null = null;
  try {
    const student = await getStudent(req);
    const body = await req.json() as any;
    const { unitId, score, feedback = "" } = body;
    const points = Math.round(Number(score));
    requestedScore = Number.isFinite(points) ? Math.max(0, Math.min(100, points)) : 0;

    if (!student || student.plan !== "pro") {
      return NextResponse.json({ success: true, saved: false, score: requestedScore });
    }
    const id = Number(unitId);
    if (!Number.isInteger(id) || id < 1 || id > 200 || !Number.isFinite(points)) {
      return NextResponse.json({ error: "Datos no válidos" }, { status: 400 });
    }

    const env = getEnv();
    const db = env.COURSE_DB || env.DB;
    if (!db) {
      console.warn("A2 progress not saved: D1 binding unavailable.");
      return NextResponse.json({ success: true, saved: false, score: requestedScore });
    }

    if (id > 6) {
      try {
        const previous = await db.prepare(
          "SELECT score,completed FROM a2_speaking_progress WHERE user_id=? AND unit_id=?"
        ).bind(studentUserId(student), id - 1).first() as any;
        if (!previous?.completed || Number(previous.score) < 60) {
          return NextResponse.json({ error: "La unidad anterior requiere 60 puntos." }, { status: 403 });
        }
      } catch (readError) {
        // Si la tabla aún no existe o la lectura falla, no bloqueamos la pantalla de resultados.
        console.error("Could not verify previous A2 unit; continuing with best-effort save:", readError);
      }
    }

    const value = requestedScore;
    const completed = value >= 60 ? 1 : 0;
    const userId = studentUserId(student);
    try {
      await db.prepare(
        "INSERT INTO a2_speaking_progress (user_id,unit_id,score,completed,attempts,feedback,updated_at) VALUES (?,?,?,?,1,?,datetime('now')) ON CONFLICT(user_id,unit_id) DO UPDATE SET score=MAX(score,excluded.score),completed=MAX(completed,excluded.completed),attempts=attempts+1,feedback=excluded.feedback,updated_at=datetime('now')"
      ).bind(userId, id, value, completed, String(feedback).slice(0, 1000)).run();
      return NextResponse.json({ success: true, saved: true, score: value, completed: Boolean(completed), next: completed && id < 200 ? id + 1 : null });
    } catch (writeError) {
      console.error("Could not save A2 progress to D1:", writeError);
      return NextResponse.json({ success: true, saved: false, score: value });
    }
  } catch (error) {
    console.error("A2 progress handler error:", error);
    return NextResponse.json({ success: true, saved: false, score: requestedScore ?? 0 });
  }
}
