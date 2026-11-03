"use client";
import{useEffect,useState}from"react";
import Link from"next/link";
const levels=["a1","a2","b1","b2","c1","c2"];
export default function NavigationBar(){
  const[student,setStudent]=useState<any>(null);
  const[unreadTickets,setUnreadTickets]=useState(0);
  useEffect(()=>{
    fetch("/api/auth/me",{cache:"no-store"}).then(r=>r.json() as Promise<any>).then(async d=>{
      const current=d.student||null;
      setStudent(current);
      if(current){
        try{
          const tickets:any=await fetch("/api/support/tickets?countOnly=true",{cache:"no-store"}).then(r=>r.json());
          setUnreadTickets(Number(tickets.unreadCount||0));
        }catch{setUnreadTickets(0);}
      }
    }).catch(()=>setStudent(null));
  },[]);
  return <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-xs font-semibold text-slate-600">
    <Link href="/inicio">Inicio</Link>
    <details className="relative"><summary className="cursor-pointer list-none">Speaking ▾</summary><div className="absolute right-0 z-50 mt-2 grid min-w-36 gap-2 rounded-xl border bg-white p-3 shadow-xl">{levels.map(l=><Link key={l} href={"/curso-"+l+"-speaking"}>{l.toUpperCase()} Speaking</Link>)}</div></details>
    <details className="relative"><summary className="cursor-pointer list-none">Ejercicios ▾</summary><div className="absolute right-0 z-50 mt-2 grid min-w-36 gap-2 rounded-xl border bg-white p-3 shadow-xl">{levels.map(l=><Link key={l} href={"/ejercicios/"+l}>{l.toUpperCase()} ejercicios</Link>)}</div></details>
    <Link href="/suscripcion">Suscripción</Link>
    {student?<><span className="max-w-32 truncate">{student.email}</span><Link href="/mi-cuenta">{student.plan==="pro"?"Mi cuenta":"Hazte Pro 🔒"}</Link><Link href="/mi-cuenta/soporte" className="inline-flex items-center gap-1">📮 Soporte{unreadTickets>0&&<span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">{unreadTickets}</span>}</Link></>:<><Link href="/iniciar-sesion">Iniciar sesión</Link><Link href="/crear-cuenta">Crear cuenta</Link></>}
  </div>;
}
