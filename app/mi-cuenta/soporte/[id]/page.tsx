"use client";
import {useCallback,useEffect,useState} from "react";
import {useParams,useRouter} from "next/navigation";
import Link from "next/link";
import TicketDetail from "@/components/TicketDetail";
import TicketReply from "@/components/TicketReply";
export default function StudentTicketPage(){
 const params=useParams<{id:string}>(),router=useRouter(),[data,setData]=useState<any>(null),[error,setError]=useState(""),[loading,setLoading]=useState(true);
 const load=useCallback(async()=>{try{const r=await fetch("/api/support/tickets/"+params.id,{cache:"no-store"});const d:any=await r.json();if(r.status===401){router.replace("/iniciar-sesion");return;}if(!r.ok)throw new Error(d.error||"No se pudo cargar el ticket");setData(d);}catch(e){setError(e instanceof Error?e.message:"No se pudo cargar el ticket");}finally{setLoading(false);}},[params.id,router]);
 useEffect(()=>{void load();},[load]);
 return <main className="mx-auto min-h-screen max-w-3xl px-4 py-10"><Link href="/mi-cuenta/soporte" className="font-semibold text-blue-700">← Volver a mis tickets</Link>{loading?<p className="mt-6">Cargando ticket…</p>:error?<p className="mt-6 text-red-600">{error}</p>:data&&<><TicketDetail ticket={data.ticket} messages={data.messages}/>{data.ticket.status==="closed"?<p className="mt-5 rounded-xl bg-slate-100 p-4 text-sm text-slate-600">Este ticket está cerrado. Si necesitas más ayuda, crea una nueva consulta.</p>:<TicketReply endpoint={"/api/support/tickets/"+params.id+"/reply"} onSent={()=>void load()}/>}</>}</main>;
}
