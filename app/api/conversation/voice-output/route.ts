import { NextRequest,NextResponse } from "next/server";
import { getStudent,studentUserId } from "@/lib/student-auth";
import { generateCachedTts,audioServeUrl } from "@/lib/tts";
export const runtime="edge";
export async function POST(request:NextRequest){
 try{
  const {text,lang,userId:requestedUserId}=await request.json() as any;
  if(typeof text!=="string"||!text.trim()||!["en","es"].includes(lang)) return NextResponse.json({error:"Se requiere texto e idioma en o es"},{status:400});
  const student=await getStudent(request);
  const userId=student?studentUserId(student):String(requestedUserId||"guest");
  const key=await generateCachedTts(text.trim(),lang,userId,"tts");
  return NextResponse.json({audioUrl:audioServeUrl(key)});
 }catch(error){
  if(error instanceof Error&&error.message==="AI_RATE_LIMITED") return NextResponse.json({error:"Demasiadas peticiones. Espera unos segundos e inténtalo de nuevo."},{status:429});
  return NextResponse.json({error:"Error al generar audio"},{status:503});
 }
}