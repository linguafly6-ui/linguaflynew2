import { NextRequest,NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent } from "@/lib/student-auth";
import { generateCachedTts,audioServeUrl } from "@/lib/tts";
export const runtime="edge";
export async function GET(request:NextRequest){
 try{const student=await getStudent(request);if(student?.plan!=="pro")return NextResponse.json({error:"Se requiere el plan Pro"},{status:403});const level=request.nextUrl.searchParams.get("level")||"A1";const rows=await getEnv().DB.prepare("SELECT id,phrase,translation,level,category FROM pronunciation_phrases WHERE language='en' AND level=? ORDER BY RANDOM() LIMIT 10").bind(level).all();const phrases=await Promise.all((rows.results||[]).map(async(row:any)=>({id:row.id,translation:row.translation,level:row.level,category:row.category,audioUrl:audioServeUrl(await generateCachedTts(row.phrase,"en",String(student.id),"tts/pronunciation"))})));return NextResponse.json({phrases});}
 catch(error){if(error instanceof Error&&error.message==="AI_RATE_LIMITED")return NextResponse.json({error:"Demasiadas peticiones. Espera unos segundos e inténtalo de nuevo."},{status:429});return NextResponse.json({error:"Error al obtener frases"},{status:500});}
}