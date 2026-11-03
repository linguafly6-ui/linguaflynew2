import { NextRequest, NextResponse } from "next/server";
import { getStudent } from "@/lib/student-auth";
import { ticketDb, TICKET_CATEGORIES, validMessage } from "@/lib/support-tickets";

export async function POST(request: NextRequest) {
  try {
    const student = await getStudent(request);
    if (!student) return NextResponse.json({ error: "Inicia sesión para enviar una consulta." }, { status: 401 });
    const db = ticketDb(), body = await request.json() as any;
    const subject = typeof body.subject === "string" ? body.subject.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const category = String(body.category || "general");
    if (subject.length < 5 || subject.length > 200) return NextResponse.json({ error: "El asunto debe tener entre 5 y 200 caracteres." }, { status: 400 });
    if (!validMessage(message)) return NextResponse.json({ error: "El mensaje debe tener entre 10 y 5.000 caracteres." }, { status: 400 });
    if (!(TICKET_CATEGORIES as readonly string[]).includes(category)) return NextResponse.json({ error: "Categoría no válida." }, { status: 400 });
    const recent = await db.prepare("SELECT COUNT(*) AS total FROM support_tickets WHERE student_id=? AND created_at>=datetime('now','-1 day')").bind(student.id).first() as any;
    if (Number(recent?.total || 0) >= 5) return NextResponse.json({ error: "Has alcanzado el límite de 5 tickets en 24 horas. Responde a un ticket existente si necesitas añadir información." }, { status: 429 });
    const result = await db.prepare("INSERT INTO support_tickets (student_id,student_email,subject,category,course_context,unit_context,first_message) VALUES (?,?,?,?,?,?,?)")
      .bind(student.id,student.email,subject,category,typeof body.courseContext==="string"?body.courseContext.slice(0,80):null,typeof body.unitContext==="string"?body.unitContext.slice(0,80):null,message).run();
    const id = Number(result.meta?.last_row_id);
    await db.prepare("INSERT INTO ticket_messages (ticket_id,sender_type,sender_id,sender_name,message) VALUES (?,'student',?,?,?)").bind(id,student.id,student.email,message).run();
    const ticket = await db.prepare("SELECT id,status,created_at AS createdAt FROM support_tickets WHERE id=?").bind(id).first();
    return NextResponse.json(ticket,{status:201});
  } catch(error) { console.error("Create support ticket:",error); return NextResponse.json({error:"No se pudo crear el ticket. Inténtalo de nuevo."},{status:500}); }
}

export async function GET(request: NextRequest) {
  try {
    const student = await getStudent(request);
    if (!student) return NextResponse.json({error:"No autorizado"},{status:401});
    const db=ticketDb(), unreadOnly=request.nextUrl.searchParams.get("unread")==="true";
    const condition=unreadOnly ? "AND t.updated_at>COALESCE(t.last_read_by_student,'')" : "";
    const result=await db.prepare("SELECT t.id,t.subject,t.category,t.status,t.priority,t.course_context AS courseContext,t.unit_context AS unitContext,t.created_at AS createdAt,t.updated_at AS updatedAt,(SELECT m.message FROM ticket_messages m WHERE m.ticket_id=t.id ORDER BY m.id DESC LIMIT 1) AS lastReply,(SELECT m.sender_type FROM ticket_messages m WHERE m.ticket_id=t.id ORDER BY m.id DESC LIMIT 1) AS lastReplyFrom,(SELECT COUNT(*) FROM ticket_messages m WHERE m.ticket_id=t.id) AS messagesCount,CASE WHEN t.updated_at>COALESCE(t.last_read_by_student,'') AND (SELECT sender_type FROM ticket_messages WHERE ticket_id=t.id ORDER BY id DESC LIMIT 1)='admin' THEN 1 ELSE 0 END AS unread FROM support_tickets t WHERE t.student_id=? "+condition+" ORDER BY t.updated_at DESC,t.id DESC").bind(student.id).all();
    const tickets=result.results||[];
    return NextResponse.json({tickets,unreadCount:tickets.filter((x:any)=>Number(x.unread)===1).length});
  } catch(error) { console.error("List support tickets:",error); return NextResponse.json({error:"No se pudieron cargar tus tickets."},{status:500}); }
}
