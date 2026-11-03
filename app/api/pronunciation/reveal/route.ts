import { NextRequest,NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent } from "@/lib/student-auth";
export const runtime="edge";
export async function POST(request:NextRequest){
 try{
  const student=await getStudent(request);
  if(!student)return NextResponse.json({error:"Inicia sesión para ver la frase original."},{status:401});
  const {sessionId}=await request.json() as any;
  if(!sessionId)return NextResponse.json({error:"Falta la sesión."},{status:400});
  const row=await getEnv().DB.prepare("SELECT target_phrase FROM pronunciation_sessions WHERE id=? AND user_id=?").bind(sessionId,String(student.id)).first() as any;
  if(!row)return NextResponse.json({error:"Intento no encontrado."},{status:404});
  return NextResponse.json({phrase:row.target_phrase});
 }catch{return NextResponse.json({error:"No se ha podido revelar la frase."},{status:500});}
}