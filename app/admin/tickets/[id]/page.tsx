"use client";
import {useCallback,useEffect,useState} from "react";
import {useParams,useRouter} from "next/navigation";
import Link from "next/link";
import TicketDetail from "@/components/TicketDetail";
import TicketReply from "@/components/TicketReply";
export default function AdminTicketDetailPage(){
 const params=useParams<{id:string}>(),router=useRouter(),[key,setKey]=useState(""),[data,setData]=useState<any>(null),[error,setError]=useState(""),[loading,setLoading]=useState(true),[status,setStatus]=useState("open"),[priority,setPriority]=useState("normal");
 useEffect(()=>{const k=sessionStorage.getItem("lf_admin_key")||"";setKey(k);if(!k){setError("Vuelve al panel de tickets e introduce la clave de administrador.");setLoading(false);}},[]);
 const load=useCallback(async()=>{if(!key)return;try{const r=await fetch("/api/admin/tickets/"+params.id,{headers:{"x-admin-key":key},cache:"no-store"});const d=await r.json();if(!r.ok)throw new Error(d.error||"No se pudo cargar el ticket");setData(d);setStatus(d.ticket.status);setPriority(d.ticket.priority);}catch(e){setError(e instanceof Error?e.message:"Error al cargar ticket");}finally{setLoading(false);}},[key,params.id]);
 useEffect(()=>{if(key)void load();},[key,load]);
 async function update(patch:any){setError("");try{const r=await fetch("/api/admin/tickets/"+params.id+"/status",{method:"PATCH",headers:{"Content-Type":"application/json","x-admin-key":key},body:JSON.stringify(patch)});const d=await r.json();if(!r.ok)throw new Error(d.error||"No se pudo actualizar");await load();}catch(e){setError(e instanceof Error?e.message:"No se pudo actualizar");}}
 return <main className="mx-auto min-h-screen max-w-3xl px-4 py-10"><Link href="/admin/tickets" className="font-semibold text-blue-700">← Volver a tickets</Link>{loading?<p className="mt-6">Cargando ticket…</p>:error&&!data?<p className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>:data&&<><TicketDetail ticket={data.ticket} messages={data.messages}/>
 <section className="mt-5 grid gap-3 rounded-2xl border bg-white p-5 sm:grid-cols-2"><div><label className="mb-1 block text-sm font-bold">Estado</label><select value={status} onChange={e=>{setStatus(e.target.value);void update({status:e.target.value});}} className="w-full rounded-xl border px-3 py-3"><option value="open">Abierto</option><option value="answered">Respondido</option><option value="resolved">Resuelto</option><option value="closed">Cerrado</option></select></div><div><label className="mb-1 block text-sm font-bold">Prioridad</label><select value={priority} onChange={e=>{setPriority(e.target.value);void update({priority:e.target.value});}} className="w-full rounded-xl border px-3 py-3"><option value="low">Baja</option><option value="normal">Normal</option><option value="high">Alta</option></select></div></section>
 {error&&<p className="mt-3 text-sm text-red-600">{error}</p>}
 {data.ticket.status==="closed"?<p className="mt-5 rounded-xl bg-slate-100 p-4 text-sm text-slate-600">Ticket cerrado. Cambia su estado para poder responder.</p>:<TicketReply endpoint={"/api/admin/tickets/"+params.id+"/reply"} headers={{"x-admin-key":key}} onSent={()=>void load()}/>}
 </>}</main>;
}
