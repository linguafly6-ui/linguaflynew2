import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent, studentUserId } from "@/lib/student-auth";

export async function POST(req: NextRequest) {
  let requestedScore = 0;
  try {
    const student = await getStudent(req);
    const body = await req.json() as any;
    const points = Math.round(Number(body.score));
    requestedScore = Number.isFinite(points) ? Math.max(0, Math.min(100, points)) : 0;
    if (!student || student.plan !== "pro") {
      return NextResponse.json({ success: true, saved: false, score: requestedScore });
    }
    const id = Number(body.unitId);
    if (!Number.isInteger(id) || id < 1 || id > 200 || !Number.isFinite(points)) {
      return NextResponse.json({ error: "Datos no válidos" }, { status: 400 });
    }
    const env = getEnv();
    const db = env.COURSE_DB || env.DB;
    if (!db) {
      console.warn("C1 progress not saved: D1 binding unavailable.");
      return NextResponse.json({ success: true, saved: false, score: requestedScore });
    }
    if (id > 6) {
      try {
        const previous = await db.prepare("SELECT score,completed FROM c1_speaking_progress WHERE user_id=? AND unit_id=?")
          .bind(studentUserId(student), id - 1).first() as any;
        if (!previous?.completed || Number(previous.score) < 60) {
          return NextResponse.json({ error: "La unidad anterior requiere 60 puntos." }, { status: 403 });
        }
      } catch (error) {
        console.error("Could not verify previous C1 unit; continuing with best-effort save:", error);
      }
    }
    const value = requestedScore;
    const completed = value >= 60 ? 1 : 0;
    try {
      await db.prepare(
        "INSERT INTO c1_speaking_progress (user_id,unit_id,score,completed,attempts,feedback,updated_at) VALUES (?,?,?,?,1,?,datetime('now')) ON CONFLICT(user_id,unit_id) DO UPDATE SET score=MAX(score,excluded.score),completed=MAX(completed,excluded.completed),attempts=attempts+1,feedback=excluded.feedback,updated_at=datetime('now')"
      ).bind(studentUserId(student), id, value, completed, String(body.feedback || "").slice(0, 1000)).run();
      return NextResponse.json({ success: true, saved: true, score: value, completed: Boolean(completed), next: completed && id < 200 ? id + 1 : null });
    } catch (error) {
      console.error("Could not save C1 progress:", error);
      return NextResponse.json({ success: true, saved: false, score: value });
    }
  } catch (error) {
    console.error("C1 progress handler error:", error);
    return NextResponse.json({ success: true, saved: false, score: requestedScore });
  }
}
