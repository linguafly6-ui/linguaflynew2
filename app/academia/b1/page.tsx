import Link from "next/link";

export const metadata = {
  title: "Inglés B1 · Linguafly Academy",
  description: "Misiones de inglés B1 para comunicar experiencias, opiniones y situaciones cotidianas con mayor autonomía.",
};

export default function B1Page() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-10">
      <Link href="/academia" className="text-sm font-semibold text-blue-700">← Linguafly Academy</Link>
      <header className="mt-6 rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-900 px-7 py-10 text-white sm:px-12">
        <p className="text-sm font-extrabold uppercase tracking-[.2em] text-cyan-300">Linguafly Academy · Independent</p>
        <h1 className="mt-3 text-4xl font-black sm:text-5xl">Curso de inglés B1</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-100">Un recorrido de diez unidades y cien misiones para contar experiencias, expresar opiniones, resolver situaciones y mantener conversaciones con más autonomía.</p>
        <div className="mt-7 flex flex-wrap gap-3 text-sm font-bold">
          <span className="rounded-full bg-white/15 px-4 py-2">10 unidades · 100 misiones previstas</span>
          <span className="rounded-full bg-white/15 px-4 py-2">Referencia de progresión MCER B1</span>
        </div>
      </header>
      <section className="mt-8 rounded-3xl border border-indigo-100 bg-indigo-50 p-6">
        <p className="text-xs font-black uppercase tracking-widest text-indigo-700">Unidad 1 · Personal Experiences and Life Stories</p>
        <h2 className="mt-1 text-2xl font-black text-slate-950">001–010 · Personal experiences</h2>
        <p className="mt-2 text-sm text-slate-600">Habla de experiencias, recuerdos, acontecimientos importantes y cambios personales. La misión piloto integra present perfect, past simple y narración en pasado.</p>
        <Link href="/academia/b1/001" className="mt-5 block rounded-2xl border border-indigo-100 bg-white p-5 transition hover:border-indigo-400 hover:shadow-sm">
          <p className="text-xs font-extrabold tracking-widest text-indigo-700">MISIÓN 001 · DISPONIBLE</p>
          <h3 className="mt-1 text-xl font-bold text-slate-950">My Life So Far</h3>
          <p className="mt-1 text-sm text-slate-600">Cuenta experiencias y acontecimientos que han influido en tu vida.</p>
          <span className="mt-3 inline-block text-sm font-bold text-indigo-700">Empezar misión →</span>
        </Link>
        <Link href="/academia/b1/002" className="mt-3 block rounded-2xl border border-indigo-100 bg-white p-5 transition hover:border-indigo-400 hover:shadow-sm">
          <p className="text-xs font-extrabold tracking-widest text-indigo-700">MISIÓN 002 · DISPONIBLE</p>
          <h3 className="mt-1 text-xl font-bold text-slate-950">A Memorable First</h3>
          <p className="mt-1 text-sm text-slate-600">Cuenta una primera experiencia importante, describe cómo te sentías y ordena lo que ocurrió.</p>
          <span className="mt-3 inline-block text-sm font-bold text-indigo-700">Empezar misión →</span>
        </Link>
        <Link href="/academia/b1/003" className="mt-3 block rounded-2xl border border-indigo-100 bg-white p-5 transition hover:border-indigo-400 hover:shadow-sm">
          <p className="text-xs font-extrabold tracking-widest text-indigo-700">MISIÓN 003 · DISPONIBLE</p>
          <h3 className="mt-1 text-xl font-bold text-slate-950">A Turning Point</h3>
          <p className="mt-1 text-sm text-slate-600">Habla de decisiones importantes, cambios de vida y cómo te adaptaste a nuevas rutinas.</p>
          <span className="mt-3 inline-block text-sm font-bold text-indigo-700">Empezar misión →</span>
        </Link>
        <p className="mt-4 text-xs text-slate-500">Las misiones 004–100 forman parte del plan curricular y se incorporarán progresivamente. Esta página no implica que el resto del nivel ya esté desarrollado.</p>
      </section>
    </main>
  );
}
