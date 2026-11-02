import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";

export async function GET(request: NextRequest) {
  try {
    const env = getEnv();
    const adminKey = request.headers.get("x-admin-key");
    if (!adminKey || !env.SUPPORT_ADMIN_KEY || adminKey !== env.SUPPORT_ADMIN_KEY) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const result = await env.DB.prepare(`SELECT sc.id, sc.title, sc.description, sc.level, sc.course_order,
      COUNT(p.user_id) AS students_enrolled,
      SUM(CASE WHEN p.status = 'completed' THEN 1 ELSE 0 END) AS students_completed,
      AVG(CASE WHEN p.status = 'completed' THEN p.score END) AS avg_score,
      CASE WHEN COUNT(p.user_id) > 0 THEN ROUND(100.0 * SUM(CASE WHEN p.status = 'completed' THEN 1 ELSE 0 END) / COUNT(p.user_id), 1) ELSE 0 END AS pass_rate
      FROM conversation_scenarios sc
      LEFT JOIN conversation_course_progress p ON p.scenario_id = sc.id
      WHERE sc.course_order > 0
      GROUP BY sc.id, sc.title, sc.description, sc.level, sc.course_order
      ORDER BY avg_score ASC, pass_rate ASC, sc.level, sc.course_order`).all();
    return NextResponse.json({ scenarios: (result.results || []).map((row: any) => ({
      ...row,
      students_enrolled: Number(row.students_enrolled || 0),
      students_completed: Number(row.students_completed || 0),
      avg_score: row.avg_score == null ? null : Math.round(Number(row.avg_score) * 10) / 10,
      pass_rate: Number(row.pass_rate || 0),
    })) });
  } catch (error) {
    console.error("Admin scenarios error:", error);
    return NextResponse.json({ error: "No se pudieron cargar los escenarios" }, { status: 500 });
  }
}