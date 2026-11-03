import { NextRequest,NextResponse } from "next/server";
import { adminAuthorized,ticketDb } from "@/lib/support-tickets";
type Context={params:Promise<{id:string}>};
export async function GET(request:NextRequest,{params}:Context){
 try{
  if(!adminAuthorized(request))return NextResponse.json({error:"No autorizado"},{status:401});
  const {id:raw}=await params,id=Number(raw);if(!Number.isSafeInteger(id)||id<1)return NextResponse.json({error:"Ticket no válido"},{status:400});
  const db=ticketDb(),ticket=await db.prepare("SELECT t.id,t.student_id AS studentId,t.student_email AS studentEmail,t.subject,t.category,t.status,t.priority,t.course_context AS courseContext,t.unit_context AS unitContext,t.created_at AS createdAt,t.updated_at AS updatedAt,s.plan,s.created_at AS studentCreatedAt FROM lf_support_tickets t LEFT JOIN students s ON s.id=t.student_id WHERE t.id=?").bind(id).first();
  if(!ticket)return NextResponse.json({error:"Ticket no encontrado"},{status:404});
  const messages=await db.prepare("SELECT id,sender_type AS senderType,sender_id AS senderId,sender_name AS senderName,message,created_at AS createdAt FROM lf_ticket_messages WHERE ticket_id=? ORDER BY id ASC").bind(id).all();
  return NextResponse.json({ticket,messages:messages.results||[]});
 }catch(error){console.error("Admin read ticket:",error);return NextResponse.json({error:"No se pudo cargar el ticket."},{status:500});}
}