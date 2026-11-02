import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";

export async function GET(request: NextRequest) {
  try {
    const env = getEnv();
    const adminKey = request.headers.get("x-admin-key");
    if (!adminKey || !env.SUPPORT_ADMIN_KEY || adminKey !== env.SUPPORT_ADMIN_KEY) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const userId = new URL(request.url).searchParams.get("userId");
    if (!userId) {
      const result = await env.DB.prepare(`WITH progress AS (
        SELECT p.user_id,
          SUM(CASE WHEN p.status='completed' THEN 1 ELSE 0 END) AS total_scenarios_completed,
          AVG(CASE WHEN p.status='completed' THEN p.score END) AS avg_score,
          SUM(CASE WHEN p.status='completed' THEN p.stars ELSE 0 END) AS stars_total,
          MAX(COALESCE(p.completed_at,p.created_at)) AS progress_activity,
          MAX(CASE WHEN p.status='completed' THEN CASE sc.level WHEN 'A1' THEN 1 WHEN 'A2' THEN 2 WHEN 'B1' THEN 3 ELSE 0 END ELSE 0 END) AS level_rank
        FROM conversation_course_progress p
        LEFT JOIN conversation_scenarios sc ON sc.id=p.scenario_id
        GROUP BY p.user_id
      ), activity AS (
        SELECT user_id,MAX(updated_at) AS session_activity FROM conversation_sessions GROUP BY user_id
      )
      SELECT p.user_id,p.total_scenarios_completed,p.avg_score,p.stars_total,
        CASE WHEN a.session_activity IS NOT NULL AND (p.progress_activity IS NULL OR a.session_activity>p.progress_activity) THEN a.session_activity ELSE p.progress_activity END AS last_activity,
        CASE p.level_rank WHEN 3 THEN 'B1' WHEN 2 THEN 'A2' WHEN 1 THEN 'A1' ELSE 'A1' END AS current_level
      FROM progress p LEFT JOIN activity a ON a.user_id=p.user_id
      ORDER BY last_activity DESC`).all();
      return NextResponse.json({ students: (result.results || []).map((row: any) => ({
        user_id: row.user_id,
        total_scenarios_completed: Number(row.total_scenarios_completed || 0),
        avg_score: Math.round(Number(row.avg_score || 0) * 10) / 10,
        stars_total: Number(row.stars_total || 0),
        last_activity: row.last_activity,
        current_level: row.current_level || "A1",
      })) });
    }
    const [progress, conversations, repetition, pronunciation] = await Promise.all([
      env.DB.prepare(`SELECT sc.id AS scenario_id,sc.title,sc.level,sc.course_order,
        p.status,p.score,p.stars,p.attempts,p.completed_at
        FROM conversation_scenarios sc
        LEFT JOIN conversation_course_progress p ON p.scenario_id=sc.id AND p.user_id=?
        WHERE sc.course_order>0
        ORDER BY CASE sc.level WHEN 'A1' THEN 1 WHEN 'A2' THEN 2 WHEN 'B1' THEN 3 ELSE 4 END,sc.course_order`).bind(userId).all(),
      env.DB.prepare(`SELECT s.id,s.created_at AS date,s.updated_at,s.status,
        sc.title AS scenario,p.score,p.stars
        FROM conversation_sessions s
        LEFT JOIN conversation_scenarios sc ON sc.id=s.scenario_id
        LEFT JOIN conversation_course_progress p ON p.user_id=s.user_id AND p.scenario_id=s.scenario_id
        WHERE s.user_id=? ORDER BY s.created_at DESC LIMIT 100`).bind(userId).all(),
      env.DB.prepare(`SELECT COUNT(*) AS total_items,
        CASE WHEN SUM(total_reviews)>0 THEN ROUND(100.0*SUM(correct_reviews)/SUM(total_reviews),1) ELSE 0 END AS accuracy,
        SUM(CASE WHEN next_review_at<=datetime('now') THEN 1 ELSE 0 END) AS due_today
        FROM sr_items WHERE user_id=?`).bind(userId).first(),
      env.DB.prepare(`SELECT id,target_phrase,transcription,similarity_score AS score,feedback,created_at
        FROM pronunciation_sessions WHERE user_id=? ORDER BY created_at DESC LIMIT 5`).bind(userId).all(),
    ]);
    return NextResponse.json({
      user_id:userId,course_progress:progress.results||[],conversation_history:conversations.results||[],
      spaced_repetition:{total_items:Number((repetition as any)?.total_items||0),accuracy:Number((repetition as any)?.accuracy||0),due_today:Number((repetition as any)?.due_today||0)},
      pronunciation_history:pronunciation.results||[],
    });
  } catch(error) {
    console.error("Admin students error:",error);
    return NextResponse.json({error:"No se pudo cargar el progreso del alumno"},{status:500});
  }
}