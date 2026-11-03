import { NextRequest,NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
export const runtime="edge";
export async function POST(request:NextRequest){
 try{const {itemId,userId="anonymous"}=await request.json() as any;if(!itemId)return NextResponse.json({error:"Falta itemId"},{status:400});const row=await getEnv().DB.prepare("SELECT word FROM sr_items WHERE id=? AND user_id=?").bind(itemId,userId).first() as any;if(!row)return NextResponse.json({error:"Repaso no encontrado"},{status:404});return NextResponse.json({word:row.word});}
 catch{return NextResponse.json({error:"No se ha podido revelar la palabra"},{status:500});}
}