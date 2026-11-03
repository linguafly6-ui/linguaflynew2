"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Student = {
  id: number;
  email: string;
  plan: string;
  subscription_status: string;
  current_period_end: string | null;
};

type Plan = "monthly" | "annual";

export default function SubscriptionPage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");

  useEffect(() => {
    let active = true;

    async function loadStudent() {
      try {
        const res = await fetch("/api/auth/me");
        const me: any = await res.json();
        if (active) setStudent(me?.student ?? null);
      } catch {
        if (active) setStudent(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadStudent();

    return () => {
      active = false;
    };
  }, []);

  async function checkout(plan: Plan) {
    if (!student) {
      window.location.assign(`/crear-cuenta?plan=${plan}`);
      return;
    }

    setBusy(plan);
    setError("");
    try {
      const response = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: student.id, plan }),
      });
      const data: any = await response.json();
      if (!response.ok) throw new Error(data.error || "No se pudo iniciar el pago.");
      if (data.url) window.location.assign(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo iniciar el pago.");
    } finally {
      setBusy("");
    }
  }

  async function portal() {
    setBusy("portal");
    setError("");
    try {
      const response = await fetch("/api/billing/portal", { method: "POST" });
      const data: any = await response.json();
      if (!response.ok) throw new Error(data.error || "No se pudo abrir el portal.");
      if (data.url) window.location.assign(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo abrir el portal.");
    } finally {
      setBusy("");
    }
  }

  const isPro = student?.plan === "pro";

  if (loading) {
    return <main className="mx-auto max-w-4xl px-4 py-16">Cargando planes…</main>;
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <header className="text-center">
        <h1 className="text-4xl font-black tracking-tight">Linguafly Pro</h1>
        <p className="mt-3 text-lg text-slate-600">Aprende inglés hablando con IA</p>
      </header>

      {isPro ? (
        <section className="mx-auto mt-10 max-w-2xl rounded-2xl border border-emerald-200 bg-emerald-50 p-7 text-center">
          <h2 className="text-2xl font-bold text-emerald-900">Tu suscripción está activa</h2>
          <p className="mt-2 text-slate-700">
            Estado: {student.subscription_status}
            {student.current_period_end
              ? ` · Hasta ${new Date(student.current_period_end).toLocaleDateString("es-ES")}`
              : ""}
          </p>
          <button
            onClick={() => void portal()}
            disabled={!!busy}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white disabled:opacity-50"
          >
            {busy === "portal" ? "Abriendo…" : "Gestionar suscripción"}
          </button>
        </section>
      ) : (
        <>
          <section className="mt-9 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-7">
            <p className="text-sm font-extrabold uppercase tracking-wider text-amber-800">🎁 Prueba gratis</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              5 unidades gratuitas de cada curso de Speaking y ejercicios
            </h2>
            <p className="mt-2 text-sm text-slate-600">Sin tarjeta, sin compromiso</p>
            {student ? (
              <p className="mt-4 rounded-lg bg-white/70 p-3 text-sm font-semibold text-slate-700">
                Estás usando la prueba gratis (unidades 1–5)
              </p>
            ) : (
              <Link
                href="/crear-cuenta"
                className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
              >
                Empezar gratis →
              </Link>
            )}
          </section>

          <div className="mt-9 grid gap-5 md:grid-cols-2">
            <section className="flex flex-col rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold">Mensual</h2>
              <p className="mt-3 text-3xl font-black">€7,99<span className="text-base font-medium text-slate-500">/mes</span></p>
              <ul className="mt-5 flex-1 space-y-3 text-sm text-slate-700">
                <li>✓ Acceso completo a los 12 cursos A1–C2</li>
                <li>✓ Entrenamiento de pronunciación</li>
                <li>✓ Progreso sincronizado entre dispositivos</li>
              </ul>
              <button
                onClick={() => void checkout("monthly")}
                disabled={!!busy}
                className="mt-7 w-full rounded-xl bg-blue-600 p-3 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy === "monthly" ? "Conectando…" : "Suscribirse"}
              </button>
            </section>

            <section className="flex flex-col rounded-2xl border-2 border-blue-300 p-6 shadow-sm">
              <h2 className="text-xl font-bold">Anual</h2>
              <p className="mt-3 text-3xl font-black">€59,99<span className="text-base font-medium text-slate-500">/año</span></p>
              <p className="mt-1 text-sm font-semibold text-emerald-700">≈€5/mes · Ahorra un 37%</p>
              <ul className="mt-5 flex-1 space-y-3 text-sm text-slate-700">
                <li>✓ Acceso a 100 unidades</li>
                <li>✓ Entrenamiento de pronunciación</li>
                <li>✓ Progreso sincronizado entre dispositivos</li>
              </ul>
              <button
                onClick={() => void checkout("annual")}
                disabled={!!busy}
                className="mt-7 w-full rounded-xl bg-blue-600 p-3 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy === "annual" ? "Conectando…" : "Suscribirse"}
              </button>
            </section>
          </div>
        </>
      )}

      {error && <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}
      <p className="mt-8 text-center text-sm text-slate-500">
        <Link href="/curso-a1-speaking" className="underline">Volver al curso</Link>
      </p>
    </main>
  );
}
