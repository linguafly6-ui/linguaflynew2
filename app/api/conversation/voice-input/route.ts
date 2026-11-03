import { NextRequest,NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { checkAiRateLimit } from "@/lib/ai-helpers";
import { generateCachedTts,audioServeUrl } from "@/lib/tts";
export const runtime="edge";
const WHISPER_MODEL="@cf/openai/whisper-tiny-en";
export async function POST(request:NextRequest){
 try{
  const env=getEnv(),form=await request.formData(),audio=form.get("audio");
  const sessionId=String(form.get("sessionId")||""),userId=String(form.get("userId")||"guest");
  if(!(audio instanceof File)||!audio.size) return NextResponse.json({error:"Falta el archivo de audio"},{status:400});
  if(!audio.type.startsWith("audio/")||audio.size>10*1024*1024) return NextResponse.json({error:"Formato de audio no válido"},{status:400});
  if(!(await checkAiRateLimit(userId))) return NextResponse.json({error:"Demasiadas peticiones. Espera unos segundos e inténtalo de nuevo."},{status:429});
  const bytes=new Uint8Array(await audio.arrayBuffer());let binary="";
  for(let i=0;i<bytes.length;i+=0x8000) binary+=String.fromCharCode(...bytes.subarray(i,i+0x8000));
  const result=await env.AI.run(WHISPER_MODEL as any,{audio:btoa(binary),task:"transcribe",language:"en",vad_filter:false});
  const transcription=String((result as any)?.text||"").trim();
  if(!transcription){
   let audioUrl:string|null=null;
   if(sessionId){
    const last=await env.DB.prepare("SELECT content FROM conversation_messages WHERE session_id=? AND role='assistant' ORDER BY created_at DESC LIMIT 1").bind(sessionId).first() as any;
    const spoken=String(last?.content||"").trim();
    const phrase=spoken.match(/Repite:\s*(.+)$/i)?.[1]?.trim()||spoken;
    if(phrase) audioUrl=audioServeUrl(await generateCachedTts("No te he oído. Repite: "+phrase,"es",userId,"tts/repeat"));
   }
   return NextResponse.json({transcription:"",noSpeech:true,audioUrl});
  }
  return NextResponse.json({transcription,noSpeech:false});
 }catch(error){
  if(error instanceof Error&&error.message==="AI_RATE_LIMITED") return NextResponse.json({error:"Demasiadas peticiones. Espera unos segundos e inténtalo de nuevo."},{status:429});
  console.error(error);return NextResponse.json({error:"Error al transcribir el audio"},{status:500});
 }
}