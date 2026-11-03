import { NextRequest,NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getDueItems,getSRStats } from "@/lib/spaced-repetition";
import { generateCachedTts,audioServeUrl } from "@/lib/tts";
export const runtime="edge";
export async function GET(request:NextRequest){
 try{
  const env=getEnv(),userId=request.nextUrl.searchParams.get("userId")||"anonymous",limit=Math.min(50,Math.max(1,Number(request.nextUrl.searchParams.get("limit")||20)));
  const [items,stats]=await Promise.all([getDueItems(env.DB,userId,limit),getSRStats(env.DB,userId)]);
  const safe=await Promise.all(items.map(async(item:any)=>{const key=item.audio_r2_key||await generateCachedTts(String(item.word),"en",userId,"tts/repetition");if(!item.audio_r2_key)await env.DB.prepare("UPDATE sr_items SET audio_r2_key=? WHERE id=?").bind(key,item.id).run();return{id:item.id,translation:item.translation,language:"en",interval_days:item.interval_days,repetitions:item.repetitions,audioUrl:audioServeUrl(key)};}));
  return NextResponse.json({items:safe,stats});
 }catch(error){if(error instanceof Error&&error.message==="AI_RATE_LIMITED")return NextResponse.json({error:"Demasiadas peticiones. Espera unos segundos e inténtalo de nuevo."},{status:429});return NextResponse.json({error:"Error al obtener repasos"},{status:500});}
}