import Link from "next/link";

export const metadata = {
  title: "Inglés C1 · Linguafly Academy",
  description: "Curso avanzado de inglés C1: diez unidades y cien misiones previstas para desarrollar comunicación compleja, precisa y flexible.",
};

export default function C1Page() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-10">
      <Link href="/academia" className="text-sm font-semibold text-blue-700">← Linguafly Academy</Link>
      <header className="mt-6 rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 px-7 py-10 text-white sm:px-12">
        <p className="text-sm font-extrabold uppercase tracking-[.2em] text-violet-300">Linguafly Academy · Proficient</p>
        <h1 className="mt-3 text-4xl font-black sm:text-5xl">Curso de inglés C1</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-violet-100">Un recorrido previsto de diez unidades y cien misiones para comprender textos exigentes, matizar argumentos, adaptar el registro y comunicarse con precisión en contextos académicos, profesionales y sociales.</p>
        <div className="mt-7 flex flex-wrap gap-3 text-sm font-bold">
          <span className="rounded-full bg-white/15 px-4 py-2">10 unidades · 100 misiones previstas</span>
          <span className="rounded-full bg-white/15 px-4 py-2">Referencia de progresión MCER C1</span>
          <span className="rounded-full bg-white/15 px-4 py-2">Misión piloto disponible</span>
        </div>
      </header>
      <section className="mt-8 rounded-3xl border border-violet-100 bg-violet-50 p-6">
        <p className="text-xs font-black uppercase tracking-widest text-violet-700">Unidad 1 · Advanced identity and human complexity</p>
        <h2 className="mt-1 text-2xl font-black text-slate-950">001–010 · Identity, memory and personal narratives</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Analiza cómo construimos relatos sobre nosotros mismos, distingue recuerdo e interpretación y utiliza recursos avanzados de narración, énfasis y cautela lingüística.</p>
        <Link href="/academia/c1/001" className="mt-5 block rounded-2xl border border-violet-100 bg-white p-5 transition hover:border-violet-400 hover:shadow-sm">
          <p className="text-xs font-extrabold tracking-widest text-violet-700">MISIÓN 001 · PILOTO</p>
          <h3 className="mt-1 text-xl font-bold text-slate-950">The Stories We Tell About Ourselves</h3>
          <p className="mt-1 text-sm text-slate-600">Memoria, identidad, experiencias formativas y reconstrucción retrospectiva.</p>
          <span className="mt-3 inline-block text-sm font-bold text-violet-700">Empezar misión →</span>
        </Link>
        <Link href="/academia/c1/002" className="mt-4 block rounded-2xl border border-violet-100 bg-white p-5 transition hover:border-violet-400 hover:shadow-sm">
          <p className="text-xs font-extrabold tracking-widest text-violet-700">MISIÓN 002</p>
          <h3 className="mt-1 text-xl font-bold text-slate-950">Memory and Recollection</h3>
          <p className="mt-1 text-sm text-slate-600">Sistemas de memoria, recuperación, distorsión y evaluación de la fiabilidad del recuerdo.</p>
          <span className="mt-3 inline-block text-sm font-bold text-violet-700">Empezar misión →</span>
        </Link>
        <Link href="/academia/c1/003" className="mt-4 block rounded-2xl border border-violet-100 bg-white p-5 transition hover:border-violet-400 hover:shadow-sm">
          <p className="text-xs font-extrabold tracking-widest text-violet-700">MISIÓN 003</p><h3 className="mt-1 text-xl font-bold text-slate-950">Personality and Motivation</h3>
          <p className="mt-1 text-sm text-slate-600">Rasgos, motivación intrínseca y extrínseca, autoeficacia y autorregulación.</p><span className="mt-3 inline-block text-sm font-bold text-violet-700">Empezar misión →</span>
        </Link>
        <Link href="/academia/c1/004" className="mt-4 block rounded-2xl border border-violet-100 bg-white p-5 transition hover:border-violet-400 hover:shadow-sm">
          <p className="text-xs font-extrabold tracking-widest text-violet-700">MISIÓN 004</p><h3 className="mt-1 text-xl font-bold text-slate-950">Perception and Cognitive Bias</h3>
          <p className="mt-1 text-sm text-slate-600">Atención selectiva, sesgos cognitivos, encuadre y evaluación de pruebas.</p><span className="mt-3 inline-block text-sm font-bold text-violet-700">Empezar misión →</span>
        </Link>
        <Link href="/academia/c1/005" className="mt-4 block rounded-2xl border border-violet-100 bg-white p-5 transition hover:border-violet-400 hover:shadow-sm">
          <p className="text-xs font-extrabold tracking-widest text-violet-700">MISIÓN 005</p><h3 className="mt-1 text-xl font-bold text-slate-950">Relationships and Boundaries</h3>
          <p className="mt-1 text-sm text-slate-600">Confianza, reciprocidad, límites, consentimiento y comunicación asertiva.</p><span className="mt-3 inline-block text-sm font-bold text-violet-700">Empezar misión →</span>
        </Link>
        <Link href="/academia/c1/006" className="mt-4 block rounded-2xl border border-violet-100 bg-white p-5 transition hover:border-violet-400 hover:shadow-sm">
          <p className="text-xs font-extrabold tracking-widest text-violet-700">MISIÓN 006</p><h3 className="mt-1 text-xl font-bold text-slate-950">Emotion and Self-regulation</h3>
          <p className="mt-1 text-sm text-slate-600">Alfabetización emocional, reevaluación cognitiva y flexibilidad psicológica.</p><span className="mt-3 inline-block text-sm font-bold text-violet-700">Empezar misión →</span>
        </Link>
        <Link href="/academia/c1/007" className="mt-4 block rounded-2xl border border-violet-100 bg-white p-5 transition hover:border-violet-400 hover:shadow-sm">
          <p className="text-xs font-extrabold tracking-widest text-violet-700">MISIÓN 007</p><h3 className="mt-1 text-xl font-bold text-slate-950">Life Transitions and Resilience</h3>
          <p className="mt-1 text-sm text-slate-600">Adaptación al cambio, incertidumbre, recursos personales y resiliencia.</p><span className="mt-3 inline-block text-sm font-bold text-violet-700">Empezar misión →</span>
        </Link>
        <Link href="/academia/c1/008" className="mt-4 block rounded-2xl border border-violet-100 bg-white p-5 transition hover:border-violet-400 hover:shadow-sm">
          <p className="text-xs font-extrabold tracking-widest text-violet-700">MISIÓN 008</p><h3 className="mt-1 text-xl font-bold text-slate-950">Identity and Social Roles</h3>
          <p className="mt-1 text-sm text-slate-600">Identidad social, pertenencia, expectativas de rol y autonomía.</p><span className="mt-3 inline-block text-sm font-bold text-violet-700">Empezar misión →</span>
        </Link>
        <Link href="/academia/c1/009" className="mt-4 block rounded-2xl border border-violet-100 bg-white p-5 transition hover:border-violet-400 hover:shadow-sm">
          <p className="text-xs font-extrabold tracking-widest text-violet-700">MISIÓN 009</p><h3 className="mt-1 text-xl font-bold text-slate-950">Reflective Narrative Synthesis</h3>
          <p className="mt-1 text-sm text-slate-600">Narración retrospectiva, perspectiva, coherencia y síntesis reflexiva.</p><span className="mt-3 inline-block text-sm font-bold text-violet-700">Empezar misión →</span>
        </Link>
        <Link href="/academia/c1/010" className="mt-4 block rounded-2xl border border-violet-100 bg-white p-5 transition hover:border-violet-400 hover:shadow-sm">
          <p className="text-xs font-extrabold tracking-widest text-violet-700">MISIÓN 010</p><h3 className="mt-1 text-xl font-bold text-slate-950">Integration and Review</h3>
          <p className="mt-1 text-sm text-slate-600">Integración de identidad, memoria, motivación, relaciones y autorregulación.</p><span className="mt-3 inline-block text-sm font-bold text-violet-700">Empezar misión →</span>
        </Link>
        <p className="mt-4 text-xs leading-5 text-slate-500">Las misiones 001–010 de la unidad 1 están implementadas. Las misiones 011–100 siguen en desarrollo. Writing utiliza el dictado compatible con el runtime actual; la producción y evaluación automática de ensayos C1 requieren una ampliación técnica posterior. Los audios sintéticos están pendientes de revisión.</p>
      </section>
    </main>
  );
}
