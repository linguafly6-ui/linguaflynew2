import Link from "next/link";
const labels:Record<string,string>={billing:"Facturación",technical:"Técnico",course:"Cursos",account:"Cuenta",general:"General",open:"Abierto",answered:"Respondido",resolved:"Resuelto",closed:"Cerrado"};
const tones:Record<string,string>={open:"bg-red-50 text-red-700",answered:"bg-blue-50 text-blue-700",resolved:"bg-emerald-50 text-emerald-700",closed:"bg-slate-100 text-slate-600"};
export default function TicketList({tickets,basePath}:{tickets:any[];basePath:string}){
 if(!tickets.length)return <div className="rounded-2xl border border-dashed p-8 text-center text-slate-500">Todavía no hay consultas.</div>;
 return <div className="space-y-3">{tickets.map(ticket=><Link key={ticket.id} href={basePath+"/"+ticket.id} className="block rounded-2xl border bg-white p-5 transition hover:border-blue-300 hover:shadow-sm">
  <div className="flex flex-wrap items-center justify-between gap-2"><span className="text-xs font-bold text-slate-500">#{ticket.id} · {labels[ticket.category]||ticket.category}</span><span className={"rounded-full px-3 py-1 text-xs font-bold "+(tones[ticket.status]||tones.open)}>{labels[ticket.status]||ticket.status}</span></div>
  <h3 className="mt-2 font-bold text-slate-900">{ticket.subject}</h3>
  {ticket.studentEmail&&<p className="mt-1 text-sm text-slate-600">{ticket.studentEmail}</p>}
  <p className="mt-2 line-clamp-2 text-sm text-slate-600">{ticket.lastMessage||ticket.lastReply||""}</p>
  <p className="mt-3 text-xs text-slate-400">{ticket.courseContext||"Consulta general"} · {ticket.messagesCount||1} mensajes · {ticket.updatedAt?new Date(ticket.updatedAt).toLocaleString("es-ES"):""}</p>
  {Number(ticket.unread)===1&&<span className="mt-2 inline-block rounded-full bg-amber-100 px-2 py-1 text-xs font-bold text-amber-800">Nueva respuesta</span>}
 </Link>)}</div>;
}
