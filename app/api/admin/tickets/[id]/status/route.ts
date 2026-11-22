import { NextRequest,NextResponse } from "next/server";
import { adminAuthorized,ticketDb,TICKET_STATUSES,TICKET_PRIORITIES } from "@/lib/support-tickets";
type Context={params:Promise<{id:string}>};
export async function PATCH(request:NextRequest,{params}:Context){
 try{
  if(!adminAuthorized(request))return NextResponse.json({error:"No autorizado"},{status:401});
  const {id:raw}=await params,id=Number(raw);if(!Number.isSafeInteger(id)||id<1)return NextResponse.json({error:"Ticket no válido"},{status:400});
  const body=await request.json() as any;
  if(body.status!==undefined&&!(TICKET_STATUSES as readonly string[]).includes(body.status))return NextResponse.json({error:"Estado no válido."},{status:400});
  if(body.priority!==undefined&&!(TICKET_PRIORITIES as readonly string[]).includes(body.priority))return NextResponse.json({error:"Prioridad no válida."},{status:400});
  if(body.status===undefined&&body.priority===undefined)return NextResponse.json({error:"No hay cambios que guardar."},{status:400});
  const db=ticketDb(),existing=await db.prepare("SELECT id FROM lf_support_tickets WHERE id=?").bind(id).first();
  if(!existing)return NextResponse.json({error:"Ticket no encontrado."},{status:404});
  await db.prepare("UPDATE lf_support_tickets SET status=COALESCE(?,status),priority=COALESCE(?,priority),updated_at=datetime('now') WHERE id=?").bind(body.status??null,body.priority??null,id).run();
  return NextResponse.json({ok:true});
 }catch(error){console.error("Admin update ticket:",error);return NextResponse.json({error:"No se pudo actualizar el ticket."},{status:500});}
}