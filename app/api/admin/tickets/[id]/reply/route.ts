import { NextRequest,NextResponse } from "next/server";
import { adminAuthorized,ticketDb,validMessage } from "@/lib/support-tickets";
type Context={params:Promise<{id:string}>};
export async function POST(request:NextRequest,{params}:Context){
 try{
  if(!adminAuthorized(request))return NextResponse.json({error:"No autorizado"},{status:401});
  const {id:raw}=await params,id=Number(raw);if(!Number.isSafeInteger(id)||id<1)return NextResponse.json({error:"Ticket no válido"},{status:400});
  const body=await request.json() as any,message=typeof body.message==="string"?body.message.trim():"";
  if(!validMessage(message))return NextResponse.json({error:"La respuesta debe tener entre 10 y 5.000 caracteres."},{status:400});
  const db=ticketDb(),ticket=await db.prepare("SELECT id,status FROM support_tickets WHERE id=?").bind(id).first() as any;
  if(!ticket)return NextResponse.json({error:"Ticket no encontrado"},{status:404});
  if(ticket.status==="closed")return NextResponse.json({error:"No se puede responder a un ticket cerrado."},{status:409});
  const result=await db.prepare("INSERT INTO ticket_messages (ticket_id,sender_type,sender_name,message) VALUES (?,'admin','Soporte LinguaFly',?)").bind(id,message).run();
  await db.prepare("UPDATE support_tickets SET status='answered',updated_at=datetime('now') WHERE id=?").bind(id).run();
  return NextResponse.json({id:result.meta?.last_row_id,senderType:"admin",createdAt:new Date().toISOString()});
 }catch(error){console.error("Admin reply ticket:",error);return NextResponse.json({error:"No se pudo enviar la respuesta."},{status:500});}
}