"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import CambiarPasswordForm from "@/components/CambiarPasswordForm";

export default function MiCuentaPage(){
  const [student,setStudent]=useState<any>(null);
  const [progress,setProgress]=useState<any>({});
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [unreadTickets,setUnreadTickets]=useState(0);
  const [totalTickets,setTotalTickets]=useState(0);
  const router=useRouter();

  useEffect(()=>{
    (async()=>{
      try{
        const d:any=await fetch("/api/progress/all",{cache:"no-store"}).then(r=>r.json() as Promise<any>);
        if(!d.student){router.replace("/iniciar-sesion");return;}
        setStudent(d.student);
        setProgress(d.progress||{});
        const ticketData:any=await fetch("/api/support/tickets?countOnly=true",{cache:"no-store"}).then(r=>r.json());
        setUnreadTickets(Number(ticketData.unreadCount||0));
        setTotalTickets(Number(ticketData.total||0));
      }catch{setError("No se pudo cargar tu cuenta.");}
      finally{setLoading(false);}
    })();
  },[router]);

  async function logout(){
    await fetch("/api/auth/logout",{method:"POST"});
    router.replace("/inicio");
    router.refresh();
  }

  const rows=Object.entries(progress) as [string,any][];
  const done=rows.reduce((n,[,p])=>n+Number(p.completed||0),0);

  return <main className="mx-auto max-w-4xl px-4 py-12">
    <h1 className="text-3xl font-black">Mi cuenta</h1>
    {loading?<p className="mt-6">Cargando…</p>:error?<p className="mt-6 text-red-600">{error}</p>:student&&<>
      <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">Cuenta</p>
        <p className="mt-1 text-xl font-bold">{student.email}</p>
        <p className="mt-3">Plan: <strong className="uppercase">{student.plan}</strong></p>
        <p className="mt-1 text-sm text-slate-600">Estado de suscripción: {student.subscription_status||"inactive"}</p>
        {student.current_period_end&&<p className="mt-1 text-sm text-slate-600">Periodo actual hasta: {new Date(student.current_period_end).toLocaleDateString("es-ES")}</p>}
        <p className="mt-1 text-sm text-slate-500">Fecha de registro: {student.created_at?new Date(student.created_at).toLocaleDateString("es-ES"):"—"}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/mi-cuenta/soporte" className="rounded-xl border border-purple-200 px-4 py-2.5 font-bold text-purple-700">📮 Soporte y consultas{unreadTickets>0&&<span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700">{unreadTickets}</span>}</Link>
          {student.plan==="pro"?<Link href="/suscripcion" className="rounded-xl bg-blue-700 px-4 py-2.5 font-bold text-white">Gestionar suscripción</Link>:<Link href="/suscripcion" className="rounded-xl bg-blue-700 px-4 py-2.5 font-bold text-white">Hazte Pro</Link>}
          <button onClick={logout} className="rounded-xl border px-4 py-2.5 font-bold">Cerrar sesión</button>
        </div>
      </section>
      <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black">Seguridad</h2>
        <p className="mt-1 text-sm text-slate-600">Actualiza tu contraseña cuando quieras. Necesitarás introducir la contraseña actual.</p>
        <CambiarPasswordForm />
      </section>
      <section className="mt-7 rounded-2xl bg-slate-50 p-6">
        <h2 className="text-xl font-black">Tu progreso global</h2>
        <p className="mt-2 text-3xl font-black">{done} <span className="text-base font-semibold text-slate-500">unidades completadas</span></p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">{rows.map(([key,p])=><div key={key} className="rounded-xl bg-white p-4"><p className="font-bold">{key}</p><p className="mt-1 text-sm text-slate-600">{p.completed}/{p.totalUnits} · Media {p.averageScore}%</p></div>)}</div>
      </section>
      <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Soporte y consultas</h2>
        <p className="mt-1 text-sm text-slate-500">¿Tienes dudas o problemas? Envíanos un mensaje y te responderemos lo antes posible.</p>
        <div className="mt-4 flex flex-col gap-4 rounded-xl bg-purple-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">📮</span>
            <div>
              <p className="font-semibold text-gray-900">Mis tickets</p>
              <p className="text-sm text-gray-500">{totalTickets===0?"No tienes consultas":totalTickets+" "+(totalTickets===1?"consulta":"consultas")}</p>
              {unreadTickets>0&&<span className="mt-1 inline-flex rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">{unreadTickets} {unreadTickets===1?"nueva respuesta":"nuevas respuestas"}</span>}
            </div>
          </div>
          <Link href="/mi-cuenta/soporte" className="shrink-0 rounded-xl bg-purple-600 px-5 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-purple-700 hover:shadow-md">{unreadTickets>0?"Ver respuestas →":"Ver mis tickets →"}</Link>
        </div>
        <Link href="/mi-cuenta/soporte" className="mt-3 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 py-3 text-sm font-medium text-gray-500 transition-colors hover:border-purple-400 hover:text-purple-600">✏️ Enviar una nueva consulta</Link>
      </section>
    </>}
  </main>;
}
