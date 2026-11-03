"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Stats = {
  total_users:number; total_conversations:number; total_completed:number; avg_score:number;
  total_pronunciation_sessions:number; total_sr_items:number; total_sr_reviews:number; active_today:number;
};
type Student = {
  user_id:string; total_scenarios_completed:number; avg_score:number; stars_total:number;
  last_activity:string|null; current_level:string;
};
type Detail = {
  user_id:string; course_progress:any[]; conversation_history:any[];
  spaced_repetition:{total_items:number;accuracy:number;due_today:number};
  pronunciation_history:any[];
};
type Scenario = {
  id:string; title:string; level:string; course_order:number; students_enrolled:number;
  students_completed:number; avg_score:number|null; pass_rate:number;
};

const dateLabel=(value:string|null|undefined)=>{
  if(!value) return "—";
  const date=new Date(value.includes("T")?value:value.replace(" ","T")+"Z");
  return Number.isNaN(date.getTime())?"—":date.toLocaleString("es-ES",{dateStyle:"medium",timeStyle:"short"});
};
const number=(value:number)=>new Intl.NumberFormat("es-ES",{maximumFractionDigits:1}).format(value||0);

export default function AdminDashboard(){
  const [adminKey,setAdminKey]=useState("");
  const [authorized,setAuthorized]=useState(false);
  const [logging,setLogging]=useState(false);
  const [loginError,setLoginError]=useState("");
  const [activeSection,setActiveSection]=useState<"overview"|"students"|"scenarios"|"learning">("overview");
  const [stats,setStats]=useState<Stats|null>(null);
  const [learning,setLearning]=useState<any>(null);
  const [openTicketCount,setOpenTicketCount]=useState(0);
  const [totalTicketCount,setTotalTicketCount]=useState(0);
  const [topStudents,setTopStudents]=useState<Student[]>([]);
  const [students,setStudents]=useState<Student[]>([]);
  const [scenarios,setScenarios]=useState<Scenario[]>([]);
  const [search,setSearch]=useState("");
  const [selected,setSelected]=useState<string|null>(null);
  const [detail,setDetail]=useState<Detail|null>(null);
  const [detailLoading,setDetailLoading]=useState(false);
  const [dataError,setDataError]=useState("");

  const api=useCallback(async(path:string)=>{
    const response=await fetch(path,{headers:{"x-admin-key":adminKey}});
    const data=await response.json() as any;
    if(!response.ok) throw new Error(data.error||"Error al consultar el panel");
    return data;
  },[adminKey]);

  const loadDashboard=useCallback(async()=>{
    try{
      setDataError("");
      const [dash,studentData,scenarioData,learningData]=await Promise.all([
        api("/api/admin/dashboard"),api("/api/admin/students"),api("/api/admin/scenarios"),api("/api/admin/learning")
      ]);
      setStats(dash.stats);setTopStudents(dash.top_students||[]);
      setStudents(studentData.students||[]);setScenarios(scenarioData.scenarios||[]);setLearning(learningData);
      void api("/api/admin/tickets?countOnly=true").then((ticketData:any)=>{setOpenTicketCount(Number(ticketData.openCount||0));setTotalTicketCount(Number(ticketData.total||0));}).catch(()=>{});
    }catch(error){
      setDataError(error instanceof Error?error.message:"No se pudieron cargar los datos");
      if(error instanceof Error&&error.message==="No autorizado")setAuthorized(false);
    }
  },[api]);

  useEffect(()=>{if(authorized)void loadDashboard();},[authorized,loadDashboard]);

  const login=async()=>{
    setLogging(true);setLoginError("");
    try{
      const response=await fetch("/api/admin/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({adminKey})});
      const data=await response.json() as any;
      if(!response.ok||!data.authorized)throw new Error(data.error||"Clave incorrecta");
      try{sessionStorage.setItem("lf_admin_key",adminKey);}catch{}
      setAuthorized(true);
    }catch(error){setLoginError(error instanceof Error?error.message:"No se pudo acceder");}
    finally{setLogging(false);}
  };

  const openStudent=async(userId:string)=>{
    setSelected(userId);setDetail(null);setDetailLoading(true);
    try{setDetail(await api("/api/admin/students?userId="+encodeURIComponent(userId)));}
    catch(error){setDataError(error instanceof Error?error.message:"No se pudo cargar el alumno");}
    finally{setDetailLoading(false);}
  };

  const filteredStudents=useMemo(()=>students.filter(student=>student.user_id.toLowerCase().includes(search.toLowerCase())),[students,search]);
  const logout=()=>{try{sessionStorage.removeItem("lf_admin_key");}catch{}setAuthorized(false);setAdminKey("");setStats(null);setStudents([]);setTopStudents([]);setScenarios([]);setSelected(null);setDetail(null);setDataError("");};
  const nav=[{id:"overview" as const,label:"Resumen",icon:"📊"},{id:"students" as const,label:"Alumnos",icon:"👥"},{id:"scenarios" as const,label:"Escenarios",icon:"🎯"},{id:"learning" as const,label:"LinguaFly Pro",icon:"💳"}];

  if(!authorized)return <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
    <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl shadow-slate-300/70">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-3xl">🛡️</div>
      <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-blue-600">LinguaFly · Administración</p>
      <h1 className="mt-2 text-center text-2xl font-extrabold text-slate-900">Panel de control</h1>
      <p className="mt-2 text-center text-sm text-slate-500">Introduce tu clave de administrador para continuar.</p>
      <form className="mt-7 space-y-4" onSubmit={event=>{event.preventDefault();void login();}}>
        <label className="block text-sm font-semibold text-slate-700" htmlFor="admin-key">Clave de administrador</label>
        <input id="admin-key" type="password" autoComplete="current-password" value={adminKey} onChange={event=>setAdminKey(event.target.value)} placeholder="SUPPORT_ADMIN_KEY" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"/>
        {loginError&&<p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{loginError}</p>}
        <button disabled={!adminKey||logging} className="w-full rounded-xl bg-blue-600 px-4 py-3 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">{logging?"Verificando...":"Acceder"}</button>
      </form>
      <p className="mt-6 text-center text-xs text-slate-400">Acceso privado · LinguaFly</p>
    </div>
  </main>;

  const statCards=[
    {label:"Usuarios",value:stats?.total_users??0,icon:"👥",tone:"blue"},
    {label:"Conversaciones",value:stats?.total_conversations??0,icon:"💬",tone:"violet"},
    {label:"Escenarios completados",value:stats?.total_completed??0,icon:"🏆",tone:"green"},
    {label:"Score medio",value:number(stats?.avg_score??0),icon:"⭐",tone:"amber"},
    {label:"Sesiones pronunciación",value:stats?.total_pronunciation_sessions??0,icon:"🎙️",tone:"pink"},
    {label:"Items de repetición",value:stats?.total_sr_items??0,icon:"🧠",tone:"cyan"},
  ];
  const tones:Record<string,string>={blue:"bg-blue-50 text-blue-700",violet:"bg-violet-50 text-violet-700",green:"bg-green-50 text-green-700",amber:"bg-amber-50 text-amber-700",pink:"bg-pink-50 text-pink-700",cyan:"bg-cyan-50 text-cyan-700"};

  return <div className="min-h-screen bg-slate-100 md:flex">
    <aside className="flex w-full flex-col bg-slate-800 text-white md:fixed md:inset-y-0 md:w-64">
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl">✈️</div><div><p className="font-extrabold tracking-wide">LinguaFly</p><p className="text-xs text-slate-400">Admin Console</p></div></div>
      <nav className="flex gap-2 overflow-x-auto p-3 md:flex-1 md:flex-col md:gap-1 md:p-4">
        <a href="/admin/tickets" className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"><span>📮</span>Tickets de soporte{openTicketCount>0&&<span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">{openTicketCount}</span>}<span className="ml-auto text-[10px] text-slate-400">{totalTicketCount} total</span></a>
        <a href="/admin/crear-alumno" className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"><span>➕</span>Crear cuenta de alumno</a>
        <a href="/admin/alumnos" className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"><span>👥</span>Cuentas de alumnos</a>
        {nav.map(item=><button key={item.id} onClick={()=>setActiveSection(item.id)} className={"flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition "+(activeSection===item.id?"bg-blue-600 text-white shadow-lg shadow-blue-950/30":"text-slate-300 hover:bg-white/10 hover:text-white")}><span>{item.icon}</span>{item.label}</button>)}
      </nav>
      <div className="hidden border-t border-white/10 p-4 md:block"><div className="mb-3 rounded-xl bg-slate-700/70 p-3"><p className="text-xs text-slate-400">Actividad de hoy</p><p className="mt-1 text-2xl font-extrabold">{stats?.active_today??0}</p><p className="text-xs text-slate-400">alumnos activos</p></div><button onClick={logout} className="w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-300 transition hover:bg-red-500/15 hover:text-red-300">↪ Cerrar sesión</button></div>
    </aside>

    <main className="min-w-0 flex-1 p-4 sm:p-6 md:ml-64 md:p-8">
      <header className="mb-7 flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm font-semibold text-blue-600">LinguaFly / Administración</p><h1 className="mt-1 text-2xl font-extrabold text-slate-900">{activeSection==="overview"?"Resumen general":activeSection==="students"?"Gestión de alumnos":activeSection==="scenarios"?"Rendimiento de escenarios":"Alumnos, suscripciones y cursos"}</h1><p className="mt-1 text-sm text-slate-500">Seguimiento de alumnos, suscripciones y progreso en los doce cursos.</p></div><div className="flex items-center gap-2"><span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">● Conectado</span><button onClick={loadDashboard} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50">↻ Actualizar</button><button onClick={logout} className="rounded-xl bg-slate-800 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700 md:hidden">Salir</button></div></header>
      {dataError&&<div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{dataError}</div>}
      {!stats?<div className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm">Cargando métricas...</div>:<>
        {activeSection==="overview"&&<section className="space-y-7">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{statCards.map(card=><article key={card.label} className="rounded-2xl bg-white p-5 shadow-md shadow-slate-200/60 transition hover:-translate-y-0.5 hover:shadow-lg"><div className="flex items-center justify-between"><span className="text-sm font-semibold text-slate-500">{card.label}</span><span className={"flex h-11 w-11 items-center justify-center rounded-xl text-xl "+tones[card.tone]}>{card.icon}</span></div><p className="mt-4 text-3xl font-black tracking-tight text-slate-900">{number(Number(card.value))}</p></article>)}</div>
          <div className="grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-blue-100 bg-blue-50 p-5"><p className="text-sm font-semibold text-blue-700">⚡ Alumnos activos hoy</p><p className="mt-1 text-3xl font-black text-blue-900">{stats.active_today}</p></div><div className="rounded-2xl border border-violet-100 bg-violet-50 p-5"><p className="text-sm font-semibold text-violet-700">🧠 Revisiones de repetición</p><p className="mt-1 text-3xl font-black text-violet-900">{stats.total_sr_reviews}</p></div></div>
          <section className="overflow-hidden rounded-2xl bg-white shadow-md"><div className="border-b border-slate-100 px-5 py-4"><h2 className="font-extrabold text-slate-900">🏅 Alumnos más activos</h2><p className="text-xs text-slate-500">Top 10 por escenarios completados.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Alumno</th><th className="px-5 py-3">Completados</th><th className="px-5 py-3">Score medio</th><th className="px-5 py-3">Última actividad</th></tr></thead><tbody>{topStudents.map((student,index)=><tr key={student.user_id} className="border-t border-slate-100 odd:bg-white even:bg-slate-50/70 hover:bg-blue-50"><td className="px-5 py-3"><button onClick={()=>openStudent(student.user_id)} className="font-bold text-blue-700 hover:underline">{index+1}. {student.user_id}</button></td><td className="px-5 py-3">{student.total_scenarios_completed}/10</td><td className="px-5 py-3">{number(student.avg_score)}</td><td className="px-5 py-3 text-slate-500">{dateLabel(student.last_activity)}</td></tr>)}{!topStudents.length&&<tr><td colSpan={4} className="px-5 py-8 text-center text-slate-400">Todavía no hay actividad del curso.</td></tr>}</tbody></table></div></section>
        </section>}

        {activeSection==="students"&&<section className="overflow-hidden rounded-2xl bg-white shadow-md"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5"><div><h2 className="font-extrabold text-slate-900">Todos los alumnos</h2><p className="text-xs text-slate-500">{students.length} alumnos registrados en el curso</p></div><input value={search} onChange={event=>setSearch(event.target.value)} placeholder="Buscar por user_id..." className="w-full max-w-xs rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"/></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Alumno</th><th className="px-5 py-3">Nivel</th><th className="px-5 py-3">Escenarios</th><th className="px-5 py-3">Score medio</th><th className="px-5 py-3">Estrellas</th><th className="px-5 py-3">Última actividad</th></tr></thead><tbody>{filteredStudents.map((student,index)=><tr key={student.user_id} className="border-t border-slate-100 odd:bg-white even:bg-slate-50/70 hover:bg-blue-50"><td className="px-5 py-3"><button onClick={()=>openStudent(student.user_id)} className="font-bold text-blue-700 hover:underline">{student.user_id}</button></td><td className="px-5 py-3"><span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">{student.current_level}</span></td><td className="px-5 py-3">{student.total_scenarios_completed}/10</td><td className="px-5 py-3">{number(student.avg_score)}</td><td className="px-5 py-3 text-amber-500">{"⭐".repeat(Math.min(5,student.stars_total))} <span className="text-slate-600">{student.stars_total}</span></td><td className="px-5 py-3 text-slate-500">{dateLabel(student.last_activity)}</td></tr>)}{!filteredStudents.length&&<tr><td colSpan={6} className="px-5 py-8 text-center text-slate-400">No hay alumnos que coincidan con la búsqueda.</td></tr>}</tbody></table></div></section>}

        {activeSection==="learning"&&<section className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[{label:"Alumnos registrados",value:learning?.summary?.total??0},{label:"Suscripciones Pro activas",value:learning?.summary?.pro??0},{label:"Cuentas Free",value:learning?.summary?.free??0},{label:"Ingresos mensuales estimados",value:new Intl.NumberFormat("es-ES",{style:"currency",currency:"EUR"}).format(learning?.summary?.estimated_mrr??0)}].map(card=><article key={card.label} className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{card.label}</p><p className="mt-2 text-2xl font-black text-slate-900">{card.value}</p></article>)}
          </div>
          <section className="overflow-hidden rounded-2xl bg-white shadow-sm"><div className="border-b p-5"><h2 className="font-extrabold">Progreso por curso</h2><p className="text-xs text-slate-500">Unidades iniciadas, completadas y puntuación media.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="p-3">Curso</th><th className="p-3">Unidades iniciadas</th><th className="p-3">Completadas</th><th className="p-3">Media</th><th className="p-3">Última actividad</th></tr></thead><tbody>{(learning?.courses||[]).map((row:any)=><tr key={row.course_type} className="border-t"><td className="p-3 font-bold">{row.course_type}</td><td className="p-3">{row.started}</td><td className="p-3">{row.completed}</td><td className="p-3">{row.average_score??0}%</td><td className="p-3">{dateLabel(row.last_activity)}</td></tr>)}</tbody></table></div></section>
          <section className="overflow-hidden rounded-2xl bg-white shadow-sm"><div className="border-b p-5"><h2 className="font-extrabold">Alumnos y detalle de progreso</h2><p className="text-xs text-slate-500">Plan, actividad y desglose por cada curso de Speaking y ejercicios.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[950px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="p-3">Email</th><th className="p-3">Plan</th><th className="p-3">Unidades</th><th className="p-3">Última actividad</th><th className="p-3">Detalle por curso</th></tr></thead><tbody>{(learning?.students||[]).map((row:any)=><tr key={row.id} className="border-t align-top"><td className="p-3 font-semibold">{row.email}</td><td className="p-3">{row.plan==="pro"&&["active","trialing"].includes(row.subscription_status)?"Pro":"Free"}</td><td className="p-3">{row.completed_units}</td><td className="p-3">{dateLabel(row.last_activity)}</td><td className="p-3"><div className="flex max-w-[560px] flex-wrap gap-1.5">{Object.entries(row.courses||{}).map(([course,value]:any)=><span key={course} className="rounded-lg bg-slate-100 px-2 py-1 text-xs">{course}: {value.completed}/{value.totalUnits} · {value.averageScore}%</span>)}</div></td></tr>)}{!learning?.students?.length&&<tr><td colSpan={5} className="p-8 text-center text-slate-400">Todavía no hay alumnos registrados.</td></tr>}</tbody></table></div></section>
        </section>}
        {activeSection==="scenarios"&&<section className="overflow-hidden rounded-2xl bg-white shadow-md"><div className="border-b border-slate-100 p-5"><h2 className="font-extrabold text-slate-900">Dificultad y tasa de aprobación</h2><p className="text-xs text-slate-500">Los escenarios con menor score promedio aparecen primero.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Escenario</th><th className="px-5 py-3">Nivel</th><th className="px-5 py-3">Completados</th><th className="px-5 py-3">Score promedio</th><th className="px-5 py-3">Tasa aprobación</th><th className="px-5 py-3">Dificultad</th></tr></thead><tbody>{scenarios.map((scenario,index)=><tr key={scenario.id} className="border-t border-slate-100 odd:bg-white even:bg-slate-50/70 hover:bg-blue-50"><td className="px-5 py-3 font-semibold text-slate-800">{scenario.course_order}. {scenario.title}</td><td className="px-5 py-3">{scenario.level}</td><td className="px-5 py-3">{scenario.students_completed}/{scenario.students_enrolled}</td><td className="px-5 py-3">{scenario.avg_score===null?"—":number(scenario.avg_score)}</td><td className="px-5 py-3"><span className={"rounded-full px-2.5 py-1 text-xs font-bold "+(scenario.pass_rate>=75?"bg-green-100 text-green-700":scenario.pass_rate>=50?"bg-amber-100 text-amber-700":"bg-red-100 text-red-700")}>{number(scenario.pass_rate)}%</span></td><td className="px-5 py-3">{index===0?"🔴 Alta":index<3?"🟠 Media":"🟢 Baja"}</td></tr>)}{!scenarios.length&&<tr><td colSpan={6} className="px-5 py-8 text-center text-slate-400">No hay escenarios del curso.</td></tr>}</tbody></table></div></section>}
      </>}
    </main>

    {selected&&<div className="fixed inset-0 z-40 flex justify-end bg-slate-950/40" onClick={()=>{setSelected(null);setDetail(null);}}><aside onClick={event=>event.stopPropagation()} className="h-full w-full max-w-2xl overflow-y-auto bg-white shadow-2xl"><div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur"><div><p className="text-xs font-bold uppercase tracking-wide text-blue-600">Ficha del alumno</p><h2 className="font-extrabold text-slate-900">{selected}</h2></div><button onClick={()=>{setSelected(null);setDetail(null);}} className="rounded-xl bg-slate-100 px-3 py-2 text-slate-600 hover:bg-slate-200">✕</button></div>
      {detailLoading&&<p className="p-8 text-center text-slate-500">Cargando ficha...</p>}
      {detail&&<div className="space-y-6 p-5">
        <section><h3 className="mb-3 font-extrabold text-slate-900">🎓 Progreso del curso</h3><div className="overflow-x-auto rounded-xl border border-slate-100"><table className="w-full min-w-[480px] text-left text-xs"><thead className="bg-slate-50 text-slate-500"><tr><th className="p-3">Escenario</th><th className="p-3">Estado</th><th className="p-3">Score</th><th className="p-3">Estrellas</th><th className="p-3">Intentos</th></tr></thead><tbody>{detail.course_progress.map((row:any)=><tr key={row.scenario_id} className="border-t border-slate-100"><td className="p-3 font-semibold">{row.level} · {row.title}</td><td className="p-3"><span className={"rounded-full px-2 py-1 font-bold "+(row.status==="completed"?"bg-green-100 text-green-700":row.status==="available"?"bg-amber-100 text-amber-700":"bg-slate-100 text-slate-500")}>{row.status==="completed"?"Completado":row.status==="available"?"Disponible":"Bloqueado"}</span></td><td className="p-3">{row.score??0}</td><td className="p-3">{"⭐".repeat(row.stars||0)}</td><td className="p-3">{row.attempts??0}</td></tr>)}</tbody></table></div></section>
        <section><h3 className="mb-3 font-extrabold text-slate-900">💬 Historial de conversaciones</h3><div className="space-y-2">{detail.conversation_history.map((row:any)=><div key={row.id} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3 text-sm"><div><p className="font-semibold text-slate-800">{row.scenario||"Conversación"}</p><p className="text-xs text-slate-500">{dateLabel(row.date)} · {row.status}</p></div><span className="font-bold text-blue-700">{row.score==null?"—":row.score+"/100"}</span></div>)}{!detail.conversation_history.length&&<p className="text-sm text-slate-400">Sin conversaciones registradas.</p>}</div></section>
        <section><h3 className="mb-3 font-extrabold text-slate-900">🧠 Repetición espaciada</h3><div className="grid grid-cols-3 gap-2">{[{label:"Items",value:detail.spaced_repetition.total_items},{label:"Precisión",value:detail.spaced_repetition.accuracy+"%"},{label:"Pendientes hoy",value:detail.spaced_repetition.due_today}].map(item=><div key={item.label} className="rounded-xl bg-violet-50 p-3"><p className="text-xs text-violet-700">{item.label}</p><p className="mt-1 text-xl font-extrabold text-violet-950">{item.value}</p></div>)}</div></section>
        <section><h3 className="mb-3 font-extrabold text-slate-900">🎙️ Últimas sesiones de pronunciación</h3><div className="space-y-2">{detail.pronunciation_history.map((row:any)=><div key={row.id} className="rounded-xl border border-slate-100 p-3"><div className="flex justify-between gap-3"><p className="font-semibold text-slate-800">{row.target_phrase}</p><span className="font-bold text-pink-700">{row.score??0}/100</span></div><p className="mt-1 text-xs text-slate-500">{dateLabel(row.created_at)}</p>{row.feedback&&<p className="mt-2 text-sm text-slate-600">{row.feedback}</p>}</div>)}{!detail.pronunciation_history.length&&<p className="text-sm text-slate-400">Sin sesiones de pronunciación.</p>}</div></section>
      </div>}
    </aside></div>}
  </div>;
}