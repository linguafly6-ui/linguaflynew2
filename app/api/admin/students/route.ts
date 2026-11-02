import {NextRequest,NextResponse} from "next/server";
import {getRequestContext} from "@/lib/cf-context";
import {requireAdmin} from "@/lib/admin-auth";
export async function GET(request:NextRequest){
 try{
  if(!(await requireAdmin(request)))return NextResponse.json({error:"No autorizado"},{status:401});
  const db=getRequestContext().env.COURSE_DB;
  const result=await db.prepare("SELECT s.id,s.email,COALESCE(s.plan,'free') AS plan,s.created_at AS createdAt,COUNT(CASE WHEN p.completed=1 THEN 1 END) AS unitsCompleted,MAX(p.last_attempt) AS progressActivity,(SELECT MAX(created_at) FROM student_sessions WHERE student_id=s.id) AS sessionActivity FROM students s LEFT JOIN student_progress p ON p.student_id=s.id GROUP BY s.id ORDER BY s.created_at DESC").all();
  const students=((result.results||[]) as any[]).map((row:any)=>{
   const activity=[row.progressActivity,row.sessionActivity].filter(Boolean).sort().pop()||null;
   const count=Number(row.unitsCompleted||0);
   return {id:Number(row.id),email:String(row.email),plan:String(row.plan||"free"),unitsCompleted:count,progress:count,lastActivity:activity,createdAt:row.createdAt||null};
  });
  return NextResponse.json({students});
 }catch(error){console.error(error);return NextResponse.json({error:"No se pudo cargar la lista de alumnos."},{status:500});}
}
