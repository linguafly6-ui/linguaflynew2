import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent } from "@/lib/student-auth";

const courses: Record<string,number> = {
  "a1-speaking":100,"a2-speaking":200,"b1-speaking":200,"b2-speaking":200,"c1-speaking":200,"c2-speaking":200,
  "exercises-a1":100,"exercises-a2":100,"exercises-b1":100,"exercises-b2":100,"exercises-c1":100,"exercises-c2":100,
};

export async function GET(request: NextRequest) {
  try {
    const db = getEnv().COURSE_DB;\n    if (!db) return NextResponse.json({ error: "Base de datos de cursos no disponible." }, { status: 503 });\n    const student = await getStudent(request);
    if (!student) return NextResponse.json({ error: "Inicia sesión para consultar tu progreso." }, { status: 401 });
    const db = getEnv().COURSE_DB;
    if (!db) return NextResponse.json({ error: "Base de datos de cursos no disponible." }, { status: 503 });
    const result = await db.prepare(
      "SELECT course_type,COUNT(*) AS started,SUM(completed) AS completed,ROUND(AVG(CASE WHEN completed=1 THEN score END)) AS averageScore,MAX(last_attempt) AS lastAttempt FROM unified_progress WHERE student_id=? GROUP BY course_type"
    ).bind(student.id).all();
    const progress: Record<string,any> = {};
    for (const [type,totalUnits] of Object.entries(courses)) progress[type] = { totalUnits, started:0, completed:0, averageScore:0, lastAttempt:null };
    for (const row of (result.results || []) as any[]) {
      if (!(row.course_type in progress)) continue;
      progress[row.course_type] = { ...progress[row.course_type], started:Number(row.started||0), completed:Number(row.completed||0), averageScore:Number(row.averageScore||0), lastAttempt:row.lastAttempt||null };
    }
    const { stripe_customer_id, ...safeStudent } = student;
    return NextResponse.json({ student:safeStudent, progress });
  } catch (error) {
    console.error("Unified progress error:",error);
    return NextResponse.json({ error:"No se pudo consultar el progreso." },{status:500});
  }
}
