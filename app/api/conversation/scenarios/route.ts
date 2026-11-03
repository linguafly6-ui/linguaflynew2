import { NextRequest,NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
export const runtime="edge";
export async function GET(request:NextRequest){
 try{
  const level=request.nextUrl.searchParams.get("level");
  let query="SELECT id,level FROM conversation_scenarios",params:any[]=[];
  if(level){query+=" WHERE level=?";params=[level];}
  query+=" ORDER BY level,id";
  const rows=await getEnv().DB.prepare(query).bind(...params).all();
  return NextResponse.json({scenarios:(rows.results||[]).map((row:any)=>({id:row.id,title:"Práctica de conversación",description:"Escucha una situación y responde en inglés.",setting:"Situación cotidiana",language:"en",level:row.level,persona_prompt:"You are a friendly English conversation partner."}))});
 }catch(error){console.error(error);return NextResponse.json({error:"Error al obtener escenarios"},{status:500});}
}