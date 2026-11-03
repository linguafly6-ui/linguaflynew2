import { NextRequest,NextResponse } from "next/server";
import { adminAuthorized,ticketDb } from "@/lib/support-tickets";
export async function GET(request:NextRequest){
 try{
  if(!adminAuthorized(request))return NextResponse.json({error:"No autorizado"},{status:401});
  const db=ticketDb(),p=request.nextUrl.searchParams,status=p.get("status")||"",category=p.get("category")||"",search=(p.get("search")||"").trim().slice(0,200);
  const page=Math.max(1,Math.min(10000,Number(p.get("page")||1)||1)),pageSize=30,offset=(page-1)*pageSize;
  const filters:string[]=[],values:any[]=[];
  if(["open","answered","resolved","closed"].includes(status)){filters.push("status=?");values.push(status);}
  if(["billing","technical","course","account","general"].includes(category)){filters.push("category=?");values.push(category);}
  if(search){filters.push("(student_email LIKE ? OR subject LIKE ?)");values.push("%"+search+"%","%"+search+"%");}
  const where=filters.length?"WHERE "+filters.join(" AND "):"";
  const [tickets,counts,total]=await Promise.all([
   db.prepare("SELECT t.id,t.student_id AS studentId,t.student_email AS studentEmail,t.subject,t.category,t.status,t.priority,t.course_context AS courseContext,t.unit_context AS unitContext,t.created_at AS createdAt,t.updated_at AS updatedAt,(SELECT COUNT(*) FROM ticket_messages m WHERE m.ticket_id=t.id) AS messagesCount,(SELECT message FROM ticket_messages m WHERE m.ticket_id=t.id ORDER BY id DESC LIMIT 1) AS lastMessage FROM support_tickets t "+where+" ORDER BY CASE t.status WHEN 'open' THEN 0 WHEN 'answered' THEN 1 WHEN 'resolved' THEN 2 ELSE 3 END,t.updated_at DESC LIMIT ? OFFSET ?").bind(...values,pageSize,offset).all(),
   db.prepare("SELECT COUNT(*) AS total,SUM(CASE WHEN status='open' THEN 1 ELSE 0 END) AS openCount,SUM(CASE WHEN status='answered' THEN 1 ELSE 0 END) AS answeredCount,SUM(CASE WHEN status='resolved' THEN 1 ELSE 0 END) AS resolvedCount,SUM(CASE WHEN status='closed' THEN 1 ELSE 0 END) AS closedCount FROM support_tickets").first(),
   db.prepare("SELECT COUNT(*) AS total FROM support_tickets t "+where).bind(...values).first()
  ]);
  const c=counts as any;
  return NextResponse.json({tickets:tickets.results||[],total:Number((total as any)?.total||0),openCount:Number(c?.openCount||0),answeredCount:Number(c?.answeredCount||0),resolvedCount:Number(c?.resolvedCount||0),closedCount:Number(c?.closedCount||0),page,pageSize});
 }catch(error){console.error("Admin list tickets:",error);return NextResponse.json({error:"No se pudieron cargar los tickets."},{status:500});}
}