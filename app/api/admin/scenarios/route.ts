import {NextRequest,NextResponse} from "next/server";
import {getRequestContext} from "@/lib/cf-context";
import {requireAdmin} from "@/lib/admin-auth";
export async function GET(request:NextRequest){
 try{
  if(!(await requireAdmin(request)))return NextResponse.json({error:"No autorizado"},{status:401});
  const db=getRequestContext().env.COURSE_DB;
  const result=await db.prepare("SELECT unit_number,scenario,module_title,difficulty,estimated_duration FROM a1_speaking_units ORDER BY unit_number").all();
  return NextResponse.json({units:result.results||[]});
 }catch(error){console.error(error);return NextResponse.json({error:"No se pudieron cargar las unidades."},{status:500});}
}
