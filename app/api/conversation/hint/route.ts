import { NextRequest,NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { checkAiRateLimit } from "@/lib/ai-helpers";
import { generateCachedTts,audioServeUrl } from "@/lib/tts";
const CHAT_MODEL="@cf/meta/llama-3.1-8b-instruct";
export const runtime="edge";
export async function POST(request:NextRequest){
 try{
  const env=getEnv(),body=await request.json() as any,{sessionId,lastMessage,personaPrompt,level}=body;
  if(!sessionId||!personaPrompt||!level)return NextResponse.json({error:"Faltan parámetros"},{status:400});
  const session=await env.DB.prepare("SELECT user_id FROM conversation_sessions WHERE id=? AND status='active'").bind(sessionId).first() as any;
  if(!session)return NextResponse.json({error:"Sesión no activa"},{status:404});
  const userId=String(session.user_id||"guest");
  if(!(await checkAiRateLimit(userId)))return NextResponse.json({error:"Demasiadas peticiones. Espera unos segundos e inténtalo de nuevo."},{status:429});
  const response=await env.AI.run(CHAT_MODEL as any,{messages:[{role:"system",content:`Create one short spoken English suggestion for a Spanish-speaking learner at CEFR ${level}. Return English only. Situation: ${personaPrompt}`},{role:"user",content:`The tutor just said: ${String(lastMessage||"Start the conversation")}. Suggest a natural student reply.`}],max_tokens:80,temperature:0.5});
  const hint=String((response as any).response||"").trim();
  if(!hint)return NextResponse.json({error:"No se ha podido generar la pista"},{status:502});
  const key=await generateCachedTts(hint,"en",userId,"tts/hints");
  return NextResponse.json({audioUrl:audioServeUrl(key)});
 }catch(error){if(error instanceof Error&&error.message==="AI_RATE_LIMITED")return NextResponse.json({error:"Demasiadas peticiones. Espera unos segundos e inténtalo de nuevo."},{status:429});return NextResponse.json({error:"Error al generar la pista"},{status:500});}
}