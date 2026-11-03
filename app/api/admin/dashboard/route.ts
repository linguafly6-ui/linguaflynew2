import {NextRequest,NextResponse} from "next/server";
import {getRequestContext} from "@/lib/cf-context";
import {requireAdmin} from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
const noCache = { "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate", Pragma: "no-cache", Expires: "0" };
export async function GET(request:NextRequest){
 try{
  if(!(await requireAdmin(request)))return NextResponse.json({error:"No autorizado"},{status:401,headers:noCache});
  const db=getRequestContext().env.COURSE_DB;
  const [totals,stats]=await Promise.all([
   db.prepare("SELECT COUNT(*) AS totalStudents,SUM(CASE WHEN plan='pro' THEN 1 ELSE 0 END) AS proStudents,SUM(CASE WHEN plan IS NULL OR plan!='pro' THEN 1 ELSE 0 END) AS freeStudents FROM students").first(),
   db.prepare("SELECT u.unit_number,u.scenario,SUM(CASE WHEN p.completed=1 THEN 1 ELSE 0 END) AS completions,SUM(CASE WHEN COALESCE(p.attempts,0)>0 AND COALESCE(p.completed,0)=0 THEN p.attempts ELSE 0 END) AS failedAttempts FROM a1_speaking_units u LEFT JOIN student_progress p ON p.unit_number=u.unit_number GROUP BY u.unit_number,u.scenario").all()
  ]);
  const pro=Number((totals as any)?.proStudents||0),units:any[]=(stats.results||[]) as any[];
  const completed=[...units].sort((a:any,b:any)=>Number(b.completions||0)-Number(a.completions||0))[0]||null;
  const failed=[...units].sort((a:any,b:any)=>Number(b.failedAttempts||0)-Number(a.failedAttempts||0))[0]||null;
  return NextResponse.json({totalStudents:Number((totals as any)?.totalStudents||0),proStudents:pro,freeStudents:Number((totals as any)?.freeStudents||0),monthlyRevenue:Math.round(pro*7.99*100)/100,totalCompletions:units.reduce((n:number,u:any)=>n+Number(u.completions||0),0),unitsCompleted:units.filter((u:any)=>Number(u.completions||0)>0).length,mostCompletedUnit:completed?{unitNumber:completed.unit_number,scenario:completed.scenario,completions:Number(completed.completions||0)}:null,mostFailedUnit:failed?{unitNumber:failed.unit_number,scenario:failed.scenario,attempts:Number(failed.failedAttempts||0)}:null},{headers:noCache});
 }catch(error){console.error(error);return NextResponse.json({error:"No se pudieron cargar las estadísticas."},{status:500,headers:noCache});}
}
