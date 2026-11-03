import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent, studentUserId } from "@/lib/student-auth";

export async function POST(req: NextRequest) {
  try {
    const student = await getStudent(req);
    if (!student || student.plan !== "pro") {
      return NextResponse.json({ success: true, saved: false });
    }
    const { unitId, score, feedback = "" } = await req.json() as any;
    const id = Number(unitId);
    const points = Math.round(Number(score));
    if (!Number.isInteger(id) || id < 1 || id > 200 || !Number.isFinite(points)) {
      return NextResponse.json({ error: "Datos no válidos" }, { status: 400 });
    }
    if (id > 6) {
      const previous = await getEnv().COURSE_DB.prepare(
        "SELECT score,completed FROM a2_speaking_progress WHERE user_id=? AND unit_id=?"
      ).bind(studentUserId(student), id - 1).first() as any;
      if (!previous?.completed || Number(previous.score) < 60) {
        return NextResponse.json({ error: "La unidad anterior requiere 60 puntos." }, { status: 403 });
      }
    }
    const value = Math.max(0, Math.min(100, points));
    const completed = value >= 60 ? 1 : 0;
    const userId = studentUserId(student);
    await getEnv().COURSE_DB.prepare(
      "INSERT INTO a2_speaking_progress (user_id,unit_id,score,completed,attempts,feedback,updated_at) VALUES (?,?,?,?,1,?,datetime('now')) ON CONFLICT(user_id,unit_id) DO UPDATE SET score=MAX(score,excluded.score),completed=MAX(completed,excluded.completed),attempts=attempts+1,feedback=excluded.feedback,updated_at=datetime('now')"
    ).bind(userId, id, value, completed, String(feedback).slice(0, 1000)).run();
    return NextResponse.json({ success: true, saved: true, score: value, completed: Boolean(completed), next: completed && id < 200 ? id + 1 : null });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "No se pudo guardar el progreso A2." }, { status: 500 });
  }
}
