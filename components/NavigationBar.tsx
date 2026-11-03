"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NavigationBar() {
  const [student, setStudent] = useState<any>(null);
  const [unreadTickets, setUnreadTickets] = useState(0);
  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" }).then((r) => r.json() as Promise<any>).then(async (data) => {
      const current = data.student || null;
      setStudent(current);
      if (current) {
        try {
          const tickets = await fetch("/api/support/tickets?countOnly=true", { cache: "no-store" }).then((r) => r.json() as Promise<any>);
          setUnreadTickets(Number(tickets.unreadCount || 0));
        } catch { setUnreadTickets(0); }
      }
    }).catch(() => setStudent(null));
  }, []);

  return <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-xs font-semibold text-slate-600">
    {student ? <>
      <Link href="/aprender">Aprender</Link>
      <Link href="/mi-cuenta">Mi cuenta</Link>
      <Link href="/mi-cuenta/soporte" className="inline-flex items-center gap-1">Soporte{unreadTickets > 0 && <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">{unreadTickets}</span>}</Link>
      <Link href="/suscripcion">Suscripción</Link>
      <span className="max-w-32 truncate text-slate-500">{student.email}</span>
    </> : <>
      <Link href="/blog">Blog</Link>
      <Link href="/inicio">Aprender</Link>
      <Link href="/suscripcion">Suscripción</Link>
      <Link href="/iniciar-sesion">Iniciar sesión</Link>
      <Link href="/crear-cuenta">Crear cuenta</Link>
    </>}
  </div>;
}
