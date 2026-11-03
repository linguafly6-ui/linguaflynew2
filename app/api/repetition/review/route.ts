import { NextRequest,NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { processReview,generateAdaptiveContent,type ReviewResult } from "@/lib/spaced-repetition";
import { generateCachedTts,audioServeUrl } from "@/lib/tts";
export const runtime="edge";
export async function POST(request:NextRequest){
 try{
  const env=getEnv(),{itemId,userId="anonymous",rating,wasCorrect,userLevel="A1"}=await request.json() as any;
  if(!itemId||rating===undefined||wasCorrect===undefined)return NextResponse.json({error:"Faltan parámetros"},{status:400});
  const item=await env.DB.prepare("SELECT word,translation,language FROM sr_items WHERE id=? AND user_id=?").bind(itemId,userId).first() as any;
  if(!item)return NextResponse.json({error:"Repaso no encontrado"},{status:404});
  let example:string|null=null,adaptiveAudioUrl:string|null=null;
  if(!wasCorrect){example=await generateAdaptiveContent(item.word,item.translation,item.language||"en",userLevel,userId);if(example)adaptiveAudioUrl=audioServeUrl(await generateCachedTts(example,"en",userId,"tts/repetition/examples"));}
  const result:ReviewResult={item_id:itemId,rating,was_correct:wasCorrect,ai_generated_content:example};
  await processReview(env.DB,result);
  return NextResponse.json({success:true,nextReviewScheduled:true,adaptiveAudioUrl});
 }catch(error){if(error instanceof Error&&error.message==="AI_RATE_LIMITED")return NextResponse.json({error:"Demasiadas peticiones. Espera unos segundos e inténtalo de nuevo."},{status:429});return NextResponse.json({error:"Error al procesar el repaso"},{status:500});}
}