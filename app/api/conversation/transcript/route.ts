import { NextRequest,NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent,studentUserId } from "@/lib/student-auth";
export const runtime="edge";
export async function POST(request:NextRequest){
 try{
  const {sessionId,messageId,userId}=await request.json() as any;
  if(!sessionId||!messageId)return NextResponse.json({error:"Faltan parámetros"},{status:400});
  const env=getEnv(),session=await env.DB.prepare("SELECT user_id,status FROM conversation_sessions WHERE id=?").bind(sessionId).first() as any;
  if(!session||session.status!=="completed")return NextResponse.json({error:"La transcripción estará disponible al terminar la actividad."},{status:403});
  const student=await getStudent(request);
  if(student&&session.user_id!==studentUserId(student))return NextResponse.json({error:"Sesión no válida."},{status:403});
  if(!student&&String(session.user_id)!==String(userId))return NextResponse.json({error:"Sesión no válida."},{status:403});
  const row=await env.DB.prepare("SELECT content FROM conversation_messages WHERE id=? AND session_id=? AND role='assistant'").bind(messageId,sessionId).first() as any;
  if(!row)return NextResponse.json({error:"Mensaje no encontrado."},{status:404});
  return NextResponse.json({transcript:row.content});
 }catch{return NextResponse.json({error:"No se ha podido mostrar la transcripción."},{status:500});}
}