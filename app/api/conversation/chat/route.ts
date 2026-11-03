import { NextRequest,NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent,studentUserId } from "@/lib/student-auth";
import { chatWithPersona,loadSessionMessages } from "@/lib/conversation";
import { checkAiRateLimit } from "@/lib/ai-helpers";
import { generateCachedTts,audioServeUrl } from "@/lib/tts";
export const runtime="edge";
export async function POST(request:NextRequest){
 try{
  const env=getEnv();
  const {sessionId,message,level}=await request.json() as any;
  if(!sessionId||typeof message!=="string"||!message.trim()) return NextResponse.json({error:"Faltan parámetros"},{status:400});
  const session=await env.DB.prepare("SELECT id,user_id,scenario_id FROM conversation_sessions WHERE id=? AND status='active'").bind(sessionId).first() as any;
  if(!session) return NextResponse.json({error:"Sesión no activa"},{status:404});
  const student=await getStudent(request);
  if(student&&session.user_id!==studentUserId(student)) return NextResponse.json({error:"Sesión no válida"},{status:403});
  const userId=String(session.user_id||"guest");
  if(!(await checkAiRateLimit(userId))) return NextResponse.json({error:"Demasiadas peticiones. Espera unos segundos e inténtalo de nuevo."},{status:429});
  await env.DB.prepare("INSERT INTO conversation_messages (id,session_id,role,content,created_at) VALUES (?,?, 'user', ?,datetime('now'))").bind("msg-"+crypto.randomUUID(),sessionId,message.trim()).run();
  let personaPrompt="You are a friendly English conversation partner.";
  let context="";
  if(String(session.scenario_id).startsWith("a1-speaking-")){const unitId=Number(String(session.scenario_id).slice(12));const unit=await env.COURSE_DB.prepare("SELECT system_prompt FROM a1_speaking_units WHERE id=?").bind(unitId).first() as any;personaPrompt=String(unit?.system_prompt||personaPrompt);}
  else{const scenario=await env.DB.prepare("SELECT title,description,setting,persona_prompt FROM conversation_scenarios WHERE id=?").bind(session.scenario_id).first() as any;if(scenario){personaPrompt=String(scenario.persona_prompt||personaPrompt);context=JSON.stringify({title:scenario.title,description:scenario.description,setting:scenario.setting});}}
  const {content,correction}=await chatWithPersona(await loadSessionMessages(env.DB,sessionId),personaPrompt,"en",level||"A1",context);
  const key=await generateCachedTts(content,"en",userId,`tts/conv/${sessionId}`);
  const messageId="msg-"+crypto.randomUUID();
  await env.DB.prepare("INSERT INTO conversation_messages (id,session_id,role,content,correction,audio_r2_key,created_at) VALUES (?,?, 'assistant', ?,?,?,datetime('now'))").bind(messageId,sessionId,content,correction,key).run();
  await env.DB.prepare("UPDATE conversation_sessions SET updated_at=datetime('now') WHERE id=?").bind(sessionId).run();
  return NextResponse.json({audioUrl:audioServeUrl(key),correction,messageId});
 }catch(error){
  console.error("Conversation chat error:",error);
  if(error instanceof Error&&error.message==="AI_RATE_LIMITED") return NextResponse.json({error:"Demasiadas peticiones. Espera unos segundos e inténtalo de nuevo."},{status:429});
  return NextResponse.json({error:"Error en la conversación"},{status:500});
 }
}