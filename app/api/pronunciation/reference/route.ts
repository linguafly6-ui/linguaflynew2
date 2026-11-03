import { NextRequest,NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent } from "@/lib/student-auth";
import { generateCachedTts,audioServeUrl } from "@/lib/tts";
export const runtime="edge";
export async function POST(request:NextRequest){
 try{const student=await getStudent(request);if(student?.plan!=="pro")return NextResponse.json({error:"Se requiere el plan Pro"},{status:403});const {phraseId}=await request.json() as any;if(!phraseId)return NextResponse.json({error:"Falta phraseId"},{status:400});const row=await getEnv().DB.prepare("SELECT phrase,translation FROM pronunciation_phrases WHERE id=? AND language='en'").bind(phraseId).first() as any;if(!row)return NextResponse.json({error:"Frase no encontrada"},{status:404});const key=await generateCachedTts(row.phrase,"en",String(student.id),"tts/pronunciation");return NextResponse.json({audioUrl:audioServeUrl(key),translation:row.translation});}
 catch(error){if(error instanceof Error&&error.message==="AI_RATE_LIMITED")return NextResponse.json({error:"Demasiadas peticiones. Espera unos segundos e inténtalo de nuevo."},{status:429});return NextResponse.json({error:"Error al generar audio de referencia"},{status:500});}
}