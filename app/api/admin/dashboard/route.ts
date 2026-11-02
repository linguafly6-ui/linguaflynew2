import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";

export async function GET(request: NextRequest) {
  try {
    const env = getEnv();
    const adminKey = request.headers.get("x-admin-key");
    if (!adminKey || !env.SUPPORT_ADMIN_KEY || adminKey !== env.SUPPORT_ADMIN_KEY) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const [users, conversations, completed, average, pronunciation, items, reviews, active, top] = await Promise.all([
      env.DB.prepare("SELECT COUNT(DISTINCT user_id) AS value FROM conversation_course_progress").first(),
      env.DB.prepare("SELECT COUNT(*) AS value FROM conversation_sessions").first(),
      env.DB.prepare("SELECT COUNT(*) AS value FROM conversation_course_progress WHERE status = 'completed'").first(),
      env.DB.prepare("SELECT AVG(score) AS value FROM conversation_course_progress WHERE status = 'completed'").first(),
      env.DB.prepare("SELECT COUNT(*) AS value FROM pronunciation_sessions").first(),
      env.DB.prepare("SELECT COUNT(*) AS value FROM sr_items").first(),
      env.DB.prepare("SELECT COUNT(*) AS value FROM sr_reviews").first(),
      env.DB.prepare("SELECT COUNT(DISTINCT user_id) AS value FROM conversation_course_progress WHERE status = 'completed' AND completed_at >= date('now')").first(),
      env.DB.prepare(`WITH progress AS (
        SELECT user_id, SUM(CASE WHEN status='completed' THEN 1 ELSE 0 END) AS scenarios_completed,
          AVG(CASE WHEN status='completed' THEN score END) AS avg_score,
          MAX(COALESCE(completed_at,created_at)) AS progress_activity
        FROM conversation_course_progress GROUP BY user_id
      ), activity AS (
        SELECT user_id, MAX(updated_at) AS session_activity, COUNT(*) AS total_conversations
        FROM conversation_sessions GROUP BY user_id
      )
      SELECT p.user_id,p.scenarios_completed,p.avg_score,
        MAX(p.progress_activity,a.session_activity) AS last_activity,
        COALESCE(a.total_conversations,0) AS total_conversations
      FROM progress p LEFT JOIN activity a ON a.user_id=p.user_id
      ORDER BY p.scenarios_completed DESC,total_conversations DESC,last_activity DESC LIMIT 10`).all(),
    ]);
    return NextResponse.json({
      stats: {
        total_users: Number((users as any)?.value || 0),
        total_conversations: Number((conversations as any)?.value || 0),
        total_completed: Number((completed as any)?.value || 0),
        avg_score: Math.round(Number((average as any)?.value || 0) * 10) / 10,
        total_pronunciation_sessions: Number((pronunciation as any)?.value || 0),
        total_sr_items: Number((items as any)?.value || 0),
        total_sr_reviews: Number((reviews as any)?.value || 0),
        active_today: Number((active as any)?.value || 0),
      },
      top_students: (top.results || []).map((row: any) => ({
        user_id: row.user_id,
        scenarios_completed: Number(row.scenarios_completed || 0),
        avg_score: Math.round(Number(row.avg_score || 0) * 10) / 10,
        last_activity: row.last_activity,
        total_conversations: Number(row.total_conversations || 0),
      })),
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return NextResponse.json({ error: "No se pudieron cargar las estadísticas" }, { status: 500 });
  }
}