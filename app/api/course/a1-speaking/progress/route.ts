import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent, studentUserId } from "@/lib/student-auth";

export const dynamic = "force-dynamic";

const noCache = { "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate", Pragma: "no-cache", Expires: "0" };

export async function POST(req: NextRequest) {
  try {
    const student = await getStudent(req);
    if (!student) return NextResponse.json({ error: "Inicia sesión para guardar tu progreso." }, { status: 401, headers: noCache });
    const { unitId, score, feedback = "" } = await req.json() as any;
    const id = Number(unitId), points = Math.round(Number(score));
    if (!Number.isInteger(id) || id < 1 || id > 200 || !Number.isFinite(points)) return NextResponse.json({ error: "Datos no válidos" }, { status: 400, headers: noCache });
    const env = getEnv();
    const unit = await env.COURSE_DB.prepare("SELECT id,unit_number FROM a1_speaking_units WHERE id=?").bind(id).first() as any;
    if (!unit) return NextResponse.json({ error: "Unidad no encontrada" }, { status: 404, headers: noCache });
    if (Number(unit.unit_number) > 5 && student.plan !== "pro") return NextResponse.json({ error: "Pro required" }, { status: 403, headers: noCache });

    const userId = studentUserId(student);
    if (Number(unit.unit_number) > 1) {
      const previous = await env.COURSE_DB.prepare("SELECT score,completed FROM a1_speaking_progress WHERE user_id=? AND unit_id=?").bind(userId, id - 1).first() as any;
      if (!previous?.completed || Number(previous.score) < 60) return NextResponse.json({ error: "La unidad anterior requiere 60 puntos." }, { status: 403, headers: noCache });
    }

    const value = Math.max(0, Math.min(100, points)), completed = value >= 60 ? 1 : 0;
    const safeFeedback = String(feedback).slice(0, 1000);
    // Persistir el progreso de todos los alumnos autenticados, incluidos los del tramo gratuito.
    // student_progress alimenta el panel de administración; a1_speaking_progress alimenta el curso.
    await env.COURSE_DB.batch([
      env.COURSE_DB.prepare("INSERT INTO a1_speaking_progress (user_id,unit_id,score,completed,attempts,feedback,updated_at) VALUES (?,?,?,?,1,?,datetime('now')) ON CONFLICT(user_id,unit_id) DO UPDATE SET score=MAX(score,excluded.score),completed=MAX(completed,excluded.completed),attempts=attempts+1,feedback=excluded.feedback,updated_at=datetime('now')").bind(userId,id,value,completed,safeFeedback),
      env.COURSE_DB.prepare("INSERT INTO student_progress (student_id,unit_number,score,completed,attempts,last_attempt) VALUES (?,?,?,?,1,datetime('now')) ON CONFLICT(student_id,unit_number) DO UPDATE SET score=MAX(score,excluded.score),completed=MAX(completed,excluded.completed),attempts=attempts+1,last_attempt=datetime('now')").bind(student.id,Number(unit.unit_number),value,completed)
    ]);
    return NextResponse.json({ success: true, saved: true, score: value, completed: Boolean(completed), next: completed && id < 200 ? id + 1 : null }, { headers: noCache });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "No se pudo guardar el progreso" }, { status: 500, headers: noCache });
  }
}
