import { NextRequest,NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";

export async function GET(request:NextRequest){
  try{
    const env=getEnv(),key=request.headers.get("x-admin-key");
    if(!key||!env.SUPPORT_ADMIN_KEY||key!==env.SUPPORT_ADMIN_KEY) return NextResponse.json({error:"No autorizado"},{status:401});
    const db=env.COURSE_DB;
    if(!db) return NextResponse.json({error:"Base de datos de cursos no disponible."},{status:503});
    const [counts,courseRows,studentRows,progressRows]=await Promise.all([
      db.prepare("SELECT COUNT(*) total, SUM(CASE WHEN plan='pro' AND subscription_status IN ('active','trialing') THEN 1 ELSE 0 END) pro, SUM(CASE WHEN plan='pro_test' THEN 1 ELSE 0 END) pro_test, SUM(CASE WHEN plan NOT IN ('pro','pro_test') OR (plan='pro' AND subscription_status NOT IN ('active','trialing')) THEN 1 ELSE 0 END) free, SUM(CASE WHEN plan='pro' AND subscription_status IN ('active','trialing') AND billing_interval='monthly' THEN 7.99 WHEN plan='pro' AND subscription_status IN ('active','trialing') AND billing_interval='annual' THEN 59.99/12.0 ELSE 0 END) mrr FROM students").first(),
      db.prepare("SELECT course_type,COUNT(*) started,SUM(completed) completed,ROUND(AVG(CASE WHEN completed=1 THEN score END),1) average_score,MAX(last_attempt) last_activity FROM unified_progress GROUP BY course_type ORDER BY completed DESC,started DESC").all(),
      db.prepare("SELECT s.id,s.email,s.plan,s.subscription_status,s.billing_interval,s.created_at,m.full_name,m.admin_notes,m.is_test_account,m.test_expires_at FROM students s LEFT JOIN admin_student_metadata m ON m.student_id=s.id ORDER BY s.created_at DESC LIMIT 500").all(),
      db.prepare("SELECT student_id,course_type,unit_number,score,completed,attempts,last_attempt FROM unified_progress ORDER BY student_id,course_type,unit_number").all(),
    ]);
    const byStudent=new Map<number,any[]>();
    for(const row of (progressRows.results||[]) as any[]){const list=byStudent.get(Number(row.student_id))||[];list.push(row);byStudent.set(Number(row.student_id),list);}
    const allCourseTypes=["a1-speaking","a2-speaking","b1-speaking","b2-speaking","c1-speaking","c2-speaking","exercises-a1","exercises-a2","exercises-b1","exercises-b2","exercises-c1","exercises-c2"];const courseSummary=allCourseTypes.map(course_type=>{const row=(courseRows.results||[] as any[]).find((x:any)=>x.course_type===course_type);return row||{course_type,started:0,completed:0,average_score:0,last_activity:null};});
    const students=(studentRows.results||[] as any[]).map((s:any)=>{
      const rows=byStudent.get(Number(s.id))||[];
      const courses:Record<string,any>={};
      for(const row of rows){const item=courses[row.course_type]||{totalUnits:row.course_type.endsWith("-speaking")?(row.course_type==="a1-speaking"?100:200):100,completed:0,attempts:0,scoreTotal:0,scoreCount:0,averageScore:0,lastActivity:null};item.completed+=Number(row.completed||0);item.attempts+=Number(row.attempts||0);if(Number(row.completed)===1){item.scoreTotal+=Number(row.score||0);item.scoreCount++;}item.averageScore=item.scoreCount?Math.round(item.scoreTotal/item.scoreCount):0;if(row.last_attempt&&(!item.lastActivity||row.last_attempt>item.lastActivity))item.lastActivity=row.last_attempt;courses[row.course_type]=item;}
      return {id:s.id,email:s.email,plan:s.plan,subscription_status:s.subscription_status,billing_interval:s.billing_interval,created_at:s.created_at,full_name:s.full_name,admin_notes:s.admin_notes,is_test_account:Number(s.is_test_account||0),test_expires_at:s.test_expires_at,completed_units:rows.filter((x:any)=>Number(x.completed)===1).length,last_activity:rows.map((x:any)=>x.last_attempt).filter(Boolean).sort().slice(-1)[0]||null,courses};
    });
    return NextResponse.json({summary:{total:Number((counts as any)?.total||0),pro:Number((counts as any)?.pro||0),pro_test:Number((counts as any)?.pro_test||0),free:Number((counts as any)?.free||0),estimated_mrr:Number((counts as any)?.mrr||0)},courses:courseSummary,students});
  }catch(error){console.error("Admin learning overview:",error);return NextResponse.json({error:"No se pudo cargar el resumen de alumnos y cursos."},{status:500});}
}
