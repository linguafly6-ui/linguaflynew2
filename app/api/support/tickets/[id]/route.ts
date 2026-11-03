import { NextRequest,NextResponse } from "next/server";
import { getStudent } from "@/lib/student-auth";
import { ticketDb } from "@/lib/support-tickets";
type Context={params:Promise<{id:string}>};
export async function GET(request:NextRequest,{params}:Context){
 try{
  const student=await getStudent(request); if(!student)return NextResponse.json({error:"No autorizado"},{status:401});
  const {id:raw}=await params,id=Number(raw); if(!Number.isSafeInteger(id)||id<1)return NextResponse.json({error:"Ticket no válido"},{status:400});
  const db=ticketDb(),ticket=await db.prepare("SELECT id,student_id AS studentId,subject,category,status,priority,course_context AS courseContext,unit_context AS unitContext,created_at AS createdAt,updated_at AS updatedAt FROM support_tickets WHERE id=? AND student_id=?").bind(id,student.id).first();
  if(!ticket)return NextResponse.json({error:"Ticket no encontrado"},{status:404});
  await db.prepare("UPDATE support_tickets SET last_read_by_student=datetime('now') WHERE id=? AND student_id=?").bind(id,student.id).run();
  const messages=await db.prepare("SELECT id,sender_type AS senderType,sender_name AS senderName,message,created_at AS createdAt FROM ticket_messages WHERE ticket_id=? ORDER BY id ASC").bind(id).all();
  return NextResponse.json({ticket,messages:messages.results||[]});
 }catch(error){console.error("Read support ticket:",error);return NextResponse.json({error:"No se pudo cargar el ticket."},{status:500});}
}