import { NextRequest,NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent,studentUserId } from "@/lib/student-auth";
import { generateCachedTts,audioServeUrl } from "@/lib/tts";
export const runtime="edge";
export async function POST(req:NextRequest){
 try{
  const env=getEnv(),body=await req.json() as any,{scenarioId}=body;let userId=String(body.userId||"");
  if(!scenarioId||!userId) return NextResponse.json({error:"Faltan parámetros"},{status:400});
  let scenario:any,opening:string;
  if(String(scenarioId).startsWith("a1-speaking-")){
   const id=Number(String(scenarioId).slice(12)),student=await getStudent(req);
   if(!Number.isInteger(id)||id<1||id>200) return NextResponse.json({error:"Unidad no válida"},{status:400});
   if(id>5&&student?.plan!=="pro") return NextResponse.json({error:"Se requiere el plan Pro"},{status:403});
   if(student){userId=studentUserId(student);if(body.userId!==userId)return NextResponse.json({error:"Sesión no válida"},{status:403});}
   const unit=await env.COURSE_DB.prepare("SELECT * FROM a1_speaking_units WHERE id=?").bind(id).first() as any;
   if(!unit)return NextResponse.json({error:"Unidad no encontrada"},{status:404});
   scenario={id:scenarioId,title:"Unidad "+id,description:"Practica una conversación en inglés.",setting:"Situación cotidiana",language:"en",level:"A1"};
   opening="Hello! How can I help you today?";
  }else{
   const row=await env.DB.prepare("SELECT * FROM conversation_scenarios WHERE id=?").bind(scenarioId).first() as any;
   if(!row)return NextResponse.json({error:"Escenario no encontrado"},{status:404});
   scenario={id:row.id,title:"Práctica de conversación",description:"Escucha y responde en inglés.",setting:"Situación cotidiana",language:"en",level:row.level};
   opening=String(row.opening_line||"Hello! How can I help you today?");
  }
  const sessionId="conv-"+crypto.randomUUID();
  await env.DB.prepare("INSERT INTO conversation_sessions (id,user_id,scenario_id,language,status,created_at,updated_at) VALUES (?,?,?,'en','active',datetime('now'),datetime('now'))").bind(sessionId,userId,scenarioId).run();
  await env.DB.prepare("INSERT INTO conversation_messages (id,session_id,role,content,created_at) VALUES (?,?,'assistant',?,datetime('now'))").bind("msg-"+crypto.randomUUID(),sessionId,opening).run();
  const key=await generateCachedTts(opening,"en",userId,"tts/conv/"+sessionId);
  return NextResponse.json({sessionId,audioUrl:audioServeUrl(key),scenario});
 }catch(error){
  if(error instanceof Error&&error.message==="AI_RATE_LIMITED") return NextResponse.json({error:"Demasiadas peticiones. Espera unos segundos e inténtalo de nuevo."},{status:429});
  console.error(error);return NextResponse.json({error:"Error al iniciar conversación"},{status:500});
 }
}