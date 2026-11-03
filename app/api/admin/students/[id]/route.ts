import {NextRequest,NextResponse} from "next/server";
import {getRequestContext} from "@/lib/cf-context";
import {requireAdmin} from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
const noCache = { "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate", Pragma: "no-cache", Expires: "0" };
export async function GET(request:NextRequest,context:{params:Promise<{id:string}>}){
 try{
  if(!(await requireAdmin(request)))return NextResponse.json({error:"No autorizado"},{status:401,headers:noCache});
  const params=await context.params,id=Number(params.id);
  if(!Number.isInteger(id)||id<1)return NextResponse.json({error:"Alumno no válido."},{status:400,headers:noCache});
  const db=getRequestContext().env.COURSE_DB;
  const [student,progress]=await Promise.all([
   db.prepare("SELECT id,email,COALESCE(plan,'free') AS plan,subscription_status,current_period_end,created_at FROM students WHERE id=?").bind(id).first(),
   db.prepare("SELECT u.unit_number,u.scenario,p.score,p.completed,p.attempts,p.last_attempt FROM a1_speaking_units u LEFT JOIN student_progress p ON p.unit_number=u.unit_number AND p.student_id=? ORDER BY u.unit_number").bind(id).all()
  ]);
  if(!student)return NextResponse.json({error:"Alumno no encontrado."},{status:404,headers:noCache});
  return NextResponse.json({student,progress:progress.results||[]},{headers:noCache});
 }catch(error){console.error(error);return NextResponse.json({error:"No se pudo cargar el detalle del alumno."},{status:500,headers:noCache});}
}
