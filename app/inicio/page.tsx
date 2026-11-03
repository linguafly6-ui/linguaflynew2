"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Student = { id: number; email: string; plan: string; placement_level?: string | null };
type NextLesson = { courseId?: string; unitId?: number; unitNumber?: number; progress?: { completed: number; total: number }; proRequired?: boolean; completed?: boolean };
type Stats = { xp: number; streak: number };

const levelNames: Record<string, string> = {
  A1: "Principiante", A2: "Elemental", B1: "Intermedio", B2: "Intermedio alto", C1: "Avanzado"
};

export default function InicioPage() {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [nextLesson, setNextLesson] = useState<NextLesson | null>(null);
  const [stats, setStats] = useState<Stats>({ xp: 0, streak: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await response.json() as any;
        if (!active) return;
        if (!data.student) { setLoading(false); return; }
        if (!data.student.placement_level) { router.replace("/test-nivel"); return; }
        setStudent(data.student);
        const [nextResponse, statsResponse] = await Promise.all([
          fetch("/api/learn/next", { cache: "no-store" }),
          fetch("/api/learn/stats", { cache: "no-store" })
        ]);
        const nextData = await nextResponse.json() as any;
        const statsData = await statsResponse.json() as any;
        if (!active) return;
        setNextLesson(nextData);
        setStats({ xp: Number(statsData.xp || 0), streak: Number(statsData.streak || 0) });
      } catch (error) {
        console.error("Student home load:", error);
      } finally { if (active) setLoading(false); }
    })();
    return () => { active = false; };
  }, [router]);

  if (loading) return <main className="mx-auto max-w-5xl px-5 py-24 text-center text-slate-500">Cargando tu espacio de aprendizaje…</main>;
  if (!student) return <main className="mx-auto max-w-xl px-5 py-20 text-center"><h1 className="text-3xl font-black">Tu espacio Linguafly</h1><p className="mt-3 text-slate-600">Inicia sesión para ver tu ruta de aprendizaje.</p><Link href="/iniciar-sesion" className="mt-6 inline-flex rounded-xl bg-blue-700 px-6 py-3 font-bold text-white">Iniciar sesión</Link></main>;

  const level = String(student.placement_level || "A1").toUpperCase();
  const completed = nextLesson?.progress?.completed || 0;
  const total = nextLesson?.progress?.total || 60;
  const unit = nextLesson?.unitNumber || nextLesson?.unitId || 1;

  return <main className="mx-auto min-h-[70vh] max-w-5xl px-4 py-10 sm:px-6">
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div><p className="text-sm font-bold uppercase tracking-widest text-blue-700">Tu espacio de aprendizaje</p><h1 className="mt-2 text-3xl font-black text-slate-950">¡Hola, {student.email}!</h1><p className="mt-2 text-slate-600">Tu ruta personalizada de inglés empieza en el nivel {level}.</p></div>
      <nav className="flex flex-wrap gap-2 text-sm font-bold"><Link href="/mi-cuenta" className="rounded-lg border px-3 py-2">Mi cuenta</Link><Link href="/mi-cuenta/soporte" className="rounded-lg border px-3 py-2">Soporte</Link><Link href="/suscripcion" className="rounded-lg border px-3 py-2">Suscripción</Link></nav>
    </header>

    <section className="mb-6 grid gap-3 sm:grid-cols-3">
      <div className="rounded-2xl border bg-white p-5"><p className="text-sm font-semibold text-slate-500">Tu nivel</p><p className="mt-2 text-3xl font-black text-blue-700">{level}</p><p className="mt-1 text-sm text-slate-500">{levelNames[level] || "Nivel asignado"}</p></div>
      <div className="rounded-2xl border bg-white p-5"><p className="text-sm font-semibold text-slate-500">Experiencia total</p><p className="mt-2 text-3xl font-black text-amber-600">⚡ {stats.xp} XP</p><p className="mt-1 text-sm text-slate-500">Suma XP con cada práctica</p></div>
      <div className="rounded-2xl border bg-white p-5"><p className="text-sm font-semibold text-slate-500">Racha actual</p><p className="mt-2 text-3xl font-black text-rose-600">🔥 {stats.streak} días</p><p className="mt-1 text-sm text-slate-500">Practica cada día para mantenerla</p></div>
    </section>

    <section className="rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-700 p-6 text-white shadow-lg sm:p-8">
      <p className="text-sm font-bold uppercase tracking-wider text-blue-100">Tu siguiente paso</p>
      <h2 className="mt-2 text-3xl font-black">Continúa aprendiendo</h2>
      <p className="mt-2 text-blue-100">{nextLesson?.courseId ? nextLesson.courseId.toUpperCase() + " · Unidad " + unit + (nextLesson.progress ? " · " + completed + " de " + total + " ejercicios completados" : "") : nextLesson?.proRequired ? "Has llegado al límite de las unidades gratuitas." : nextLesson?.completed ? "Has completado las actividades disponibles." : "Tu siguiente actividad está preparada."}</p>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/25"><div className="h-full rounded-full bg-white transition-all" style={{ width: (nextLesson?.progress ? Math.min(100, completed / Math.max(1, total) * 100) : 0) + "%" }} /></div>
      <Link href="/aprender" className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 font-extrabold text-blue-800 shadow-sm">Continuar aprendiendo →</Link>
    </section>

    {nextLesson?.proRequired && <section className="mt-6 rounded-2xl bg-slate-950 p-6 text-white"><h2 className="text-xl font-black">Desbloquea el siguiente nivel con Pro</h2><p className="mt-2 text-sm text-slate-300">Continúa tu ruta personalizada con más unidades y práctica de conversación.</p><Link href="/suscripcion" className="mt-4 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-slate-950">Ver suscripción</Link></section>}
    <p className="mt-8 text-sm text-slate-500"><Link href="/blog" className="font-semibold text-blue-700 underline">Explorar el blog</Link></p>
  </main>;
}
