import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent } from "@/lib/student-auth";

export async function GET(request: NextRequest) {
  try {
    const student = await getStudent(request);
    if (!student) return NextResponse.json({ error: "Inicia sesión." }, { status: 401 });
    const db = getEnv().COURSE_DB || getEnv().DB;
    const row = await db.prepare("SELECT xp_total,current_streak,longest_streak,last_practice_date FROM learning_streaks WHERE student_id=?")
      .bind(student.id).first() as any;
    return NextResponse.json({
      xp: Number(row?.xp_total || 0),
      streak: Number(row?.current_streak || 0),
      longestStreak: Number(row?.longest_streak || 0),
      lastPracticeDate: row?.last_practice_date || null
    });
  } catch (error) {
    console.error("Learn stats error:", error);
    return NextResponse.json({ error: "No se pudieron cargar tus estadísticas." }, { status: 500 });
  }
}
