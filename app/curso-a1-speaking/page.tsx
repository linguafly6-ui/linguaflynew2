"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import VoiceConversation from "@/components/VoiceConversation";

type U = { id:number; unit_number:number; module_number:number; module_title:string; scenario:string; objective:string; system_prompt:string; difficulty:string; estimated_duration:string; is_review:number; status:string; score:number|null; unlocked:boolean; proRequired?:boolean };
type M = { module_number:number; module_title:string; units:U[] };
type Student = { id:number; email:string; plan:string };

const difficultyStyle = (difficulty:string) => {
  const value=difficulty.toLowerCase();
  if(value.includes("inicial")) return {label:"Inicial",dot:"🟢",className:"bg-green-50 text-green-800"};
  if(value.includes("intermedio")) return {label:"Intermedio",dot:"🟡",className:"bg-amber-50 text-amber-800"};
  return {label:"Consolidación",dot:"🔵",className:"bg-blue-50 text-blue-800"};
};

export default function Page() {
  const [mods,setMods]=useState<M[]>([]),[unit,setUnit]=useState<U|null>(null),[student,setStudent]=useState<Student|null>(null),[userId,setUserId]=useState("guest"),[error,setError]=useState(""),[loading,setLoading]=useState(true),[opening,setOpening]=useState(false),[paywall,setPaywall]=useState(false),[lockedMessage,setLockedMessage]=useState(false),[resuming,setResuming]=useState(false);
  const load=useCallback(async()=>{
    setLoading(true);
    try {
      const me:any=await fetch("/api/auth/me").then(r=>r.json() as any);
      setStudent(me.student||null);
      const uid=me.student?"student-"+me.student.id:"guest-"+crypto.randomUUID();
      setUserId(uid);
      const response=await fetch("/api/course/a1-speaking"),data=await response.json() as any;
      if(!response.ok) throw Error(data.error||"No se pudo cargar el curso");
      setMods(data.modules||[]);setError("");
    } catch(e) {setError(e instanceof Error?e.message:"Error al cargar el curso");}
    finally {setLoading(false);}
  },[]);
  useEffect(()=>{void load();},[load]);
  const allUnits=useMemo(()=>mods.flatMap(m=>m.units),[mods]);
  const nextUnit=useMemo(()=>allUnits.find(u=>u.unlocked&&u.status!=="completed"&&!u.proRequired),[allUnits]);
  const open=async(id:number)=>{
    const selected=allUnits.find(u=>u.id===id);
    if(!selected)return;
    if(selected.proRequired){setPaywall(true);return;}
    if(!selected.unlocked&&selected.status!=="completed"){setLockedMessage(true);return;}
    setOpening(true);setError("");
    try {
      const response=await fetch("/api/course/a1-speaking/"+id),data=await response.json() as any;
      if(response.status===403){setPaywall(true);return;}
      if(!response.ok)throw Error(data.error||"No se pudo abrir la unidad");
      if(!data.unit.unlocked&&data.unit.status!=="completed"){setLockedMessage(true);return;}
      setUnit(data.unit);
    } catch(e){setError(e instanceof Error?e.message:"Error al abrir la unidad");}
    finally{setOpening(false);setResuming(false);}
  };
  if(unit)return <main className="min-h-screen bg-[#f8f9fa] px-3 py-4 sm:px-6 sm:py-7"><div className="mx-auto max-w-5xl"><button className="mb-4 min-h-11 rounded-xl border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 shadow-sm" onClick={()=>{setUnit(null);void load();}}>← Volver a unidades</button><VoiceConversation key={unit.id} userId={userId} scenario={{id:"a1-speaking-"+unit.id,title:"Unidad "+unit.unit_number+": "+unit.scenario,description:unit.objective,setting:unit.module_title,language:"en",level:"A1",persona_prompt:unit.system_prompt,system_prompt:unit.system_prompt,opening_line:"¡Hola! Vamos a aprender inglés paso a paso. Escucha y repite la palabra en inglés."}} onCourseCompleted={()=>{setUnit(null);void load();}} onNextUnit={()=>{setUnit(null);if(unit.unit_number<200)void open(unit.id+1);else void load();}}/></div></main>;
  return <main className="min-h-screen bg-[#f8f9fa] px-4 py-8 pb-28 sm:px-6 sm:py-10">
    <div className="mx-auto max-w-6xl">
      <header className="mb-8 rounded-3xl bg-white p-6 shadow-sm sm:p-8"><p className="text-sm font-bold uppercase tracking-widest text-blue-600">Cambridge English · A1</p><h1 className="mt-2 text-4xl font-black text-slate-900">A1 Speaking</h1><p className="mt-3 text-slate-600">Practica inglés hablado paso a paso. Completa las unidades para desbloquear las siguientes.</p><p className="mt-3 text-sm text-slate-500">{student?student.email+" · Plan "+student.plan:"Estás en modo gratuito sin cuenta."} {!student&&<Link className="ml-1 font-bold text-blue-700 underline" href="/crear-cuenta">Crear cuenta</Link>}</p></header>
      {opening&&<div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-sm"><div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-5 text-base font-bold text-slate-800 shadow-xl"><span className="h-6 w-6 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600"/>Cargando conversación...</div></div>}
      {error&&<p role="alert" className="mb-4 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
      {lockedMessage&&<div role="status" className="mb-4 flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900"><span>Necesitas completar la unidad anterior.</span><button onClick={()=>setLockedMessage(false)} aria-label="Cerrar" className="ml-3 font-bold">×</button></div>}
      {paywall&&<section className="mb-5 rounded-xl border border-amber-300 bg-amber-50 p-4"><p className="font-bold">Necesitas Pro para acceder a esta unidad</p><p className="mt-1 text-sm">Hazte Pro desde 7,99 €/mes o 59,99 €/año.</p><Link href="/suscripcion" className="mt-3 inline-block rounded-lg bg-blue-600 px-4 py-2 font-bold text-white">Ver planes Pro</Link><button onClick={()=>setPaywall(false)} className="ml-3 text-sm underline">Cerrar</button></section>}
      {loading?<div className="flex items-center justify-center gap-3 py-16 text-slate-600"><span className="h-6 w-6 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600"/><span>Cargando unidades...</span></div>:<div className="space-y-6">
        {mods.map(module=>{
          const completed=module.units.filter(u=>u.status==="completed").length,percent=Math.round(completed/20*100),color=completed===20?"bg-green-500":completed>0?"bg-blue-600":"bg-gray-300";
          return <section key={module.module_number} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-3 flex flex-wrap items-end justify-between gap-2"><div><p className="text-xs font-bold uppercase tracking-wider text-blue-600">Módulo {module.module_number}</p><h2 className="mt-1 text-xl font-extrabold text-slate-900">{module.module_title}</h2></div><p className="text-sm font-bold tabular-nums text-slate-700">{completed}/20 — {percent}%</p></div>
            <div className="mb-5 h-2.5 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label={"Progreso módulo "+module.module_number} aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}><div className={"h-full rounded-full transition-all duration-500 "+color} style={{width:percent+"%"}}/></div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {module.units.map(u=>{
                const done=u.status==="completed",locked=!u.unlocked&&!done&&!u.proRequired,difficulty=difficultyStyle(u.difficulty);
                return <button key={u.id} type="button" onClick={()=>void open(u.id)} aria-label={"Unidad "+u.unit_number+": "+u.scenario+(locked?". Necesitas completar la unidad anterior.":"")} className={"min-h-36 rounded-xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 "+(done?"border-green-200 bg-green-50/70":locked||u.proRequired?"border-gray-200 bg-gray-50":"border-blue-200 bg-white hover:border-blue-400")}>
                  <div className="flex items-start justify-between gap-2"><span className="text-3xl font-black leading-none text-slate-900">{u.unit_number}</span><span className="text-xl" aria-label={done?"Completada":locked||u.proRequired?"Bloqueada":"Desbloqueada"}>{done?"✅":locked||u.proRequired?"🔒":"🔓"}</span></div>
                  <p className="mt-3 line-clamp-2 min-h-10 text-sm font-bold leading-snug text-slate-800">{u.scenario}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2"><span className={"rounded-full px-2 py-1 text-[11px] font-bold "+difficulty.className}>{difficulty.dot} {difficulty.label}</span>{u.is_review===1&&<span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold text-amber-800">Repaso</span>}</div>
                  {done&&u.score!==null&&<p className="mt-2 text-sm font-extrabold text-green-800">⭐ {u.score}/100</p>}
                  {u.proRequired&&<p className="mt-1 text-xs font-semibold text-amber-700">Requiere Pro</p>}
                </button>;
              })}
            </div>
          </section>;
        })}
      </div>}
    </div>
    {nextUnit&&<div className="fixed inset-x-0 bottom-4 z-20 flex justify-center px-4"><button type="button" onClick={()=>{setResuming(true);void open(nextUnit.id);}} disabled={opening} className="min-h-14 rounded-full bg-blue-600 px-7 py-3 text-base font-extrabold text-white shadow-xl shadow-blue-900/20 transition hover:bg-blue-700 disabled:opacity-70">{opening||resuming?"Cargando conversación...":"▶ Continuar donde lo dejé"}</button></div>}
  </main>;
}
