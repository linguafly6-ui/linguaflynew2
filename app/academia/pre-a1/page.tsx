import Link from "next/link";

export const metadata = {
  title: "Inglés Pre-A1 · Linguafly Academy",
  description: "Primeras palabras e instrucciones cotidianas en inglés para empezar desde cero."
};

export default function PreA1Page() {
  return <main className="mx-auto min-h-[70vh] max-w-5xl px-5 py-12">
    <section className="rounded-3xl bg-slate-950 px-7 py-12 text-white sm:px-12">
      <Link href="/academia" className="text-sm font-semibold text-cyan-300">← Todos los niveles</Link>
      <p className="mt-8 text-sm font-bold uppercase tracking-[.2em] text-cyan-300">Linguafly Academy · Starter</p>
      <p className="mt-5 text-2xl font-black text-cyan-300">PRE-A1</p>
      <h1 className="mt-2 text-4xl font-black sm:text-5xl">Empieza desde cero</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Un primer recorrido por palabras, expresiones e instrucciones muy sencillas. Practica a tu ritmo y escucha inglés británico.</p>
    </section>
    <section className="mt-10">
      <p className="text-sm font-extrabold uppercase tracking-widest text-blue-700">Tu primera misión</p>
      <h2 className="mt-2 text-3xl font-black text-slate-950">Misiones Pre-A1</h2>
      <Link href="/academia/pre-a1/058" className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-300">
        <span className="rounded-xl bg-blue-50 px-4 py-3 text-2xl font-black text-blue-800">058</span>
        <span className="min-w-0 flex-1"><strong className="block text-lg text-slate-950">Classroom English</strong><span className="text-sm text-slate-600">Exploración · Práctica · Repaso</span></span>
        <span className="font-bold text-blue-700">Empezar →</span>
      </Link>
    </section>
  </main>;
}