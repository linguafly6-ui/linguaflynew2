"use client";
import {FormEvent,useState} from "react";
import {useRouter} from "next/navigation";
export default function AdminLoginPage(){
 const router=useRouter(),[email,setEmail]=useState(""),[password,setPassword]=useState(""),[error,setError]=useState(""),[busy,setBusy]=useState(false);
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();setBusy(true);setError("");
  try{
   const response=await fetch("/api/admin/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})});
   const data:any=await response.json();
   if(!response.ok||!data.success)throw new Error(data.error||"No se pudo iniciar sesión.");
   router.replace("/admin");router.refresh();
  }catch(err){setError(err instanceof Error?err.message:"No se pudo iniciar sesión.");}
  finally{setBusy(false);}
 }
 return <main className="min-h-screen bg-[#1a1a2e] px-4 py-16 text-slate-100"><section className="mx-auto mt-12 max-w-md rounded-2xl border border-white/10 bg-[#22223b] p-8 shadow-2xl">
  <p className="text-xs font-bold uppercase tracking-[0.24em] text-indigo-300">LinguaFly · Admin</p><h1 className="mt-3 text-3xl font-bold">Acceso administrador</h1><p className="mt-2 text-sm text-slate-400">Inicia sesión para consultar alumnos y progreso.</p>
  <form onSubmit={submit} className="mt-8 space-y-5"><label className="block text-sm font-semibold">Email<input type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#17172a] px-4 py-3 text-white outline-none focus:border-indigo-400"/></label>
  <label className="block text-sm font-semibold">Contraseña<input type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#17172a] px-4 py-3 text-white outline-none focus:border-indigo-400"/></label>
  {error&&<p role="alert" className="rounded-lg bg-red-950/60 p-3 text-sm text-red-300">{error}</p>}
  <button disabled={busy} className="w-full rounded-xl bg-indigo-500 px-4 py-3 font-bold text-white hover:bg-indigo-400 disabled:opacity-50">{busy?"Verificando…":"Entrar"}</button></form></section></main>;
}
