import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent } from "@/lib/student-auth";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const student = await getStudent(req);
    if (!student) return NextResponse.json({ error: "Necesitas iniciar sesión." }, { status: 401 });
    const db = getEnv().COURSE_DB;
    if (!db) return NextResponse.json({ error: "Base de datos no disponible." }, { status: 503 });
    const result = await db.prepare(
      "SELECT mission_number, completed, completed_at FROM pre_a1_mission_progress WHERE student_id = ? ORDER BY mission_number"
    ).bind(student.id).all();
    return NextResponse.json({ progress: result.results ?? [] });
  } catch (error) {
    console.error("PRE-A1 progress GET:", error);
    return NextResponse.json({ error: "No se pudo consultar el progreso." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const student = await getStudent(req);
    if (!student) return NextResponse.json({ error: "Necesitas iniciar sesión." }, { status: 401 });
    const body = await req.json() as { missionNumber?: number; completed?: boolean };
    const missionNumber = Number(body.missionNumber);
    if (!Number.isInteger(missionNumber) || missionNumber < 1 || missionNumber > 30 || body.completed !== true) {
      return NextResponse.json({ error: "Datos de misión no válidos." }, { status: 400 });
    }
    const db = getEnv().COURSE_DB;
    if (!db) return NextResponse.json({ error: "Base de datos no disponible." }, { status: 503 });
    await db.prepare(
      "INSERT INTO pre_a1_mission_progress (student_id, mission_number, completed, completed_at, updated_at) VALUES (?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) ON CONFLICT(student_id, mission_number) DO UPDATE SET completed = 1, completed_at = COALESCE(pre_a1_mission_progress.completed_at, CURRENT_TIMESTAMP), updated_at = CURRENT_TIMESTAMP"
    ).bind(student.id, missionNumber).run();
    return NextResponse.json({ ok: true, missionNumber, completed: true });
  } catch (error) {
    console.error("PRE-A1 progress POST:", error);
    return NextResponse.json({ error: "No se pudo guardar el progreso. Comprueba que la migración PRE-A1 esté aplicada." }, { status: 500 });
  }
}
