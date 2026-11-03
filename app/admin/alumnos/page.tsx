"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Student = {
  id: number | string;
  full_name?: string | null;
  email: string;
  is_test_account?: number;
  plan?: string;
  subscription_status?: string | null;
  test_expires_at?: string | null;
  created_at?: string | null;
  admin_notes?: string | null;
};

type StudentsResponse = {
  error?: string;
  students?: Student[];
};

export default function AdminStudentAccountsPage() {
  const [adminKey,setAdminKey]=useState("");
  const [students,setStudents]=useState<Student[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");

  useEffect(()=>{
    let key="";
    try { key=sessionStorage.getItem("lf_admin_key")||""; } catch {}
    if(!key){window.location.replace("/admin");return;}
    setAdminKey(key);
    fetch("/api/admin/students/accounts",{headers:{"x-admin-key":key},cache:"no-store"})
      .then(async r=>{
        const d = await r.json() as StudentsResponse;
        if(!r.ok) throw new Error(d.error || "No se pudieron cargar las cuentas.");
        setStudents(d.students || []);
      })
      .catch(e=>setError(e instanceof Error?e.message:"Error al cargar las cuentas."))
      .finally(()=>setLoading(false));
  },[]);

  const dateLabel=(value:string|null|undefined)=>value?new Date(value.includes("T")?value:value.replace(" ","T")+"Z").toLocaleDateString("es-ES"):"—";
  const planLabel=(s:any)=>s.plan==="pro_test"?"Pro de prueba":s.plan==="pro"?"Pro":"Free";

  if(!adminKey)return <main className="min-h-screen bg-slate-100 p-8 text-center text-slate-500">Comprobando acceso de administrador...</main>;
  return <main className="min-h-screen bg-slate-100 px-4 py-8">
    <div className="mx-auto max-w-6xl">
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500"><Link href="/admin" className="font-semibold text-blue-700 hover:underline">Panel Admin</Link><span>›</span><span>Alumnos</span></nav>
      <header className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Administración · Alumnos</p><h1 className="mt-2 text-3xl font-black text-slate-900">Cuentas de alumnos</h1><p className="mt-2 text-slate-600">{students.length} cuentas · Incluye las cuentas de prueba creadas desde el panel.</p></div><Link href="/admin/crear-alumno" className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-700">＋ Crear alumno</Link></header>
      {error&&<p className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading?<p className="p-10 text-center text-slate-500">Cargando cuentas...</p>:<div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4">Alumno</th><th className="px-5 py-4">Acceso</th><th className="px-5 py-4">Caducidad</th><th className="px-5 py-4">Creada</th><th className="px-5 py-4">Notas internas</th></tr></thead><tbody>{students.map(s=><tr key={s.id} className="border-t border-slate-100 align-top"><td className="px-5 py-4"><p className="font-bold text-slate-900">{s.full_name||s.email}</p><p className="mt-1 text-xs text-slate-500">{s.email} · ID {s.id}</p>{Number(s.is_test_account)===1&&<span className="mt-2 inline-block rounded-full bg-violet-100 px-2.5 py-1 text-xs font-bold text-violet-700">🧪 Prueba</span>}</td><td className="px-5 py-4"><span className={"rounded-full px-2.5 py-1 text-xs font-bold "+(s.plan==="pro_test"?"bg-violet-100 text-violet-700":s.plan==="pro"?"bg-amber-100 text-amber-800":"bg-slate-100 text-slate-600")}>{planLabel(s)}</span><p className="mt-1 text-xs text-slate-500">{s.subscription_status||"inactive"}</p></td><td className="px-5 py-4 text-slate-600">{dateLabel(s.test_expires_at)}</td><td className="px-5 py-4 text-slate-600">{dateLabel(s.created_at)}</td><td className="max-w-xs whitespace-pre-wrap px-5 py-4 text-slate-600">{s.admin_notes||"—"}</td></tr>)}{!students.length&&<tr><td colSpan={5} className="px-5 py-10 text-center text-slate-500">Todavía no hay cuentas registradas.</td></tr>}</tbody></table></div>}
      </section>
      <Link href="/admin" className="mt-6 inline-block text-sm font-semibold text-slate-600 hover:text-blue-700">← Volver al panel</Link>
    </div>
  </main>;
}
