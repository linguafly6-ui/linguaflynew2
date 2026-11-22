import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
const LEVELS = ["A1","A2","B1"];
export async function GET(request: NextRequest) {
 try {
  const userId = new URL(request.url).searchParams.get("userId");
  if (!userId) return NextResponse.json({error:"Falta userId"},{status:400});
  const env = getEnv();
  const rows = await env.DB.prepare("SELECT id,title,description,setting,language,level,course_order FROM conversation_scenarios WHERE course_order > 0 ORDER BY CASE level WHEN 'A1' THEN 1 WHEN 'A2' THEN 2 WHEN 'B1' THEN 3 ELSE 4 END, course_order").all();
  const scenarios = rows.results || [];
  const existing = await env.DB.prepare("SELECT COUNT(*) AS total FROM conversation_course_progress WHERE user_id = ?").bind(userId).first();
  if (!Number((existing as any)?.total || 0)) {
   for (let i=0;i<scenarios.length;i++) {
    const item = scenarios[i] as any;
    await env.DB.prepare("INSERT OR IGNORE INTO conversation_course_progress (id,user_id,scenario_id,status) VALUES (?,?,?,?)").bind("cp-"+userId+"-"+item.id,userId,item.id,i===0?"available":"locked").run();
   }
  }
  const progressRows = await env.DB.prepare("SELECT scenario_id,status,score,stars FROM conversation_course_progress WHERE user_id = ?").bind(userId).all();
  const progress = new Map((progressRows.results || []).map((item:any)=>[item.scenario_id,item]));
  const levels = LEVELS.map(level=>({level,scenarios:scenarios.filter((item:any)=>item.level===level).map((item:any)=>{
   const state = progress.get(item.id) as any;
   return {id:item.id,title:item.title,description:item.description,setting:item.setting,language:item.language,status:state?.status||"locked",score:state?.score||0,stars:state?.stars||0,course_order:item.course_order};
  })})).filter(level=>level.scenarios.length>0);
  return NextResponse.json({levels});
 } catch(error) { console.error("Course GET error:",error); return NextResponse.json({error:"No se pudo cargar el curso"},{status:500}); }
}