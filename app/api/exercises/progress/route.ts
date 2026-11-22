import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent, studentUserId } from "@/lib/student-auth";

export async function GET(req: NextRequest) {
  try {
    const env = getEnv();
    const db = env.COURSE_DB;
    if (!db) return NextResponse.json({ error: "Base de datos de aprendizaje no disponible." }, { status: 503 });
    const student = await getStudent(req);
    if (!student) return NextResponse.json({ error: "Inicia sesión para consultar el progreso." }, { status: 401 });
    const rows = await db.prepare("SELECT course_id,unit_id,category,total_exercises,completed,correct,score,last_attempt,completed_at FROM exercise_progress WHERE user_id=? ORDER BY course_id,unit_id,category")
      .bind(studentUserId(student)).all();
    return NextResponse.json({ progress: rows.results || [] });
  } catch (error) {
    console.error("exercise progress", error);
    return NextResponse.json({ error: "No se pudo consultar el progreso." }, { status: 500 });
  }
}
