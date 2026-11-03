"use client";
import {useCallback,useEffect,useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import TicketList from "@/components/TicketList";
import TicketForm from "@/components/TicketForm";
export default function StudentSupportPage(){
 const router=useRouter(),[tickets,setTickets]=useState<any[]>([]),[loading,setLoading]=useState(true),[error,setError]=useState(""),[creating,setCreating]=useState(false),[unread,setUnread]=useState(0);
 const load=useCallback(async()=>{try{const r=await fetch("/api/support/tickets",{cache:"no-store"});const d=await r.json();if(r.status===401){router.replace("/iniciar-sesion");return;}if(!r.ok)throw new Error(d.error||"No se pudieron cargar los tickets");setTickets(d.tickets||[]);setUnread(d.unreadCount||0);}catch(e){setError(e instanceof Error?e.message:"Error al cargar soporte");}finally{setLoading(false);}},[router]);
 useEffect(()=>{void load();},[load]);
 return <main className="mx-auto min-h-screen max-w-4xl px-4 py-10"><Link href="/mi-cuenta" className="font-semibold text-blue-700">← Mi cuenta</Link><div className="mt-6 flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-wide text-blue-700">Mi cuenta · Soporte</p><h1 className="mt-1 text-3xl font-black">Mis consultas</h1><p className="mt-2 text-slate-600">Envía una consulta y sigue aquí las respuestas del equipo LinguaFly.</p></div><button onClick={()=>setCreating(v=>!v)} className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white">{creating?"Cerrar":"✏️ Nueva consulta"}</button></div>
 {unread>0&&<p className="mt-5 rounded-xl bg-blue-50 p-3 text-sm font-semibold text-blue-800">Tienes {unread} {unread===1?"ticket con una nueva respuesta":"tickets con nuevas respuestas"}.</p>}
 {creating&&<section className="mt-6"><h2 className="mb-3 text-xl font-bold">Nueva consulta</h2><TicketForm onCancel={()=>setCreating(false)} onCreated={id=>router.push("/mi-cuenta/soporte/"+id)}/></section>}
 <section className="mt-8"><h2 className="mb-4 text-xl font-bold">Mis tickets ({tickets.length})</h2>{loading?<p>Cargando tus consultas…</p>:error?<p className="rounded-xl bg-red-50 p-4 text-red-700">{error}</p>:<TicketList tickets={tickets} basePath="/mi-cuenta/soporte"/>}</section>
 </main>;
}
