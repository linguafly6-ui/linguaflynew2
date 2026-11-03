import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent } from "@/lib/student-auth";
import { PLACEMENT_QUESTIONS } from "@/lib/placement-questions";

export async function GET(request: NextRequest) {
  try {
    const student = await getStudent(request);
    if (!student) return NextResponse.json({ error: "Inicia sesión para hacer el test." }, { status: 401 });
    const db = getEnv().COURSE_DB;
    if (!db) return NextResponse.json({ error: "Base de datos no disponible." }, { status: 503 });
    const saved = await db.prepare("SELECT placement_level FROM students WHERE id=?").bind(student.id).first() as { placement_level?: string | null } | null;
    if (saved?.placement_level) return NextResponse.json({ completed: true, level: saved.placement_level });
    return NextResponse.json({ completed: false, questions: PLACEMENT_QUESTIONS.map(({ id, question, options, correctOption }) => ({ id, question, options, correctOption })) });
  } catch (error) {
    console.error("Placement test GET:", error);
    return NextResponse.json({ error: "No se pudo cargar el test de nivel." }, { status: 500 });
  }
}
