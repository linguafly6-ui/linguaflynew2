import Link from "next/link";

export const metadata = {
  title: "Inglés C2 · Linguafly Academy",
  description: "Curso avanzado de inglés C2 centrado en inferencia, matiz, argumentación, registro y síntesis.",
};

export default function C2Page() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-10">
      <Link href="/academia" className="text-sm font-semibold text-blue-700">← Linguafly Academy</Link>
      <header className="mt-6 rounded-3xl bg-gradient-to-br from-slate-950 via-violet-950 to-indigo-900 px-7 py-10 text-white sm:px-12">
        <p className="text-sm font-extrabold uppercase tracking-[.2em] text-violet-200">Linguafly Academy · Proficiency</p>
        <h1 className="mt-3 text-4xl font-black sm:text-5xl">Curso de inglés C2</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-violet-100">Un itinerario previsto de diez unidades y cien misiones para interpretar matices, inferir significados, argumentar con precisión, adaptar el registro y sintetizar ideas complejas.</p>
        <div className="mt-7 flex flex-wrap gap-3 text-sm font-bold"><span className="rounded-full bg-white/15 px-4 py-2">10 unidades · 100 misiones previstas</span><span className="rounded-full bg-white/15 px-4 py-2">Referencia de progresión MCER C2</span></div>
      </header>
      <section className="mt-8 rounded-3xl border border-violet-100 bg-violet-50 p-6">
        <p className="text-xs font-black uppercase tracking-widest text-violet-700">Unidad 1 · Meaning, Inference and Context</p>
        <h2 className="mt-1 text-2xl font-black text-slate-950">001–010 · Meaning beyond the literal</h2>
        <p className="mt-2 text-sm text-slate-600">Distingue lo explícito de lo implícito; interpreta presuposiciones, implicaturas, ironía y cautela lingüística sin confundir inferencia con certeza.</p>
        <Link href="/academia/c2/001" className="mt-5 block rounded-2xl border border-violet-100 bg-white p-5 transition hover:border-violet-400 hover:shadow-sm">
          <p className="text-xs font-extrabold tracking-widest text-violet-700">MISIÓN 001 · PILOTO</p><h3 className="mt-1 text-xl font-bold text-slate-950">What Words Leave Unsaid</h3><p className="mt-1 text-sm text-slate-600">Interpreta el significado implícito, la intención y los límites de la evidencia contextual.</p><span className="mt-3 inline-block text-sm font-bold text-violet-700">Abrir misión →</span>
        </Link>
        <Link href="/academia/c2/002" className="mt-3 block rounded-2xl border border-violet-100 bg-white p-5 transition hover:border-violet-400 hover:shadow-sm"><p className="text-xs font-extrabold tracking-widest text-violet-700">MISIÓN 002</p><h3 className="mt-1 text-xl font-bold text-slate-950">The Assumptions Beneath the Question</h3><p className="mt-1 text-sm text-slate-600">Detecta presuposiciones y cuestiona premisas ocultas en preguntas y argumentos.</p><span className="mt-3 inline-block text-sm font-bold text-violet-700">Abrir misión →</span></Link>
        <Link href="/academia/c2/003" className="mt-3 block rounded-2xl border border-violet-100 bg-white p-5 transition hover:border-violet-400 hover:shadow-sm"><p className="text-xs font-extrabold tracking-widest text-violet-700">MISIÓN 003</p><h3 className="mt-1 text-xl font-bold text-slate-950">What Is Meant Without Being Said</h3><p className="mt-1 text-sm text-slate-600">Interpreta implicaturas conversacionales, máximas y lenguaje indirecto.</p><span className="mt-3 inline-block text-sm font-bold text-violet-700">Abrir misión →</span></Link>
        <Link href="/academia/c2/004" className="mt-3 block rounded-2xl border border-violet-100 bg-white p-5 transition hover:border-violet-400 hover:shadow-sm"><p className="text-xs font-extrabold tracking-widest text-violet-700">MISIÓN 004</p><h3 className="mt-1 text-xl font-bold text-slate-950">When Meaning Has More Than One Scope</h3><p className="mt-1 text-sm text-slate-600">Analiza ambigüedad estructural, adjunción y alcance semántico.</p><span className="mt-3 inline-block text-sm font-bold text-violet-700">Abrir misión →</span></Link>
        <Link href="/academia/c2/005" className="mt-3 block rounded-2xl border border-violet-100 bg-white p-5 transition hover:border-violet-400 hover:shadow-sm"><p className="text-xs font-extrabold tracking-widest text-violet-700">MISIÓN 005</p><h3 className="mt-1 text-xl font-bold text-slate-950">The Limits of Contextual Inference</h3><p className="mt-1 text-sm text-slate-600">Evalúa inferencias, lecturas alternativas y límites de la evidencia contextual.</p><span className="mt-3 inline-block text-sm font-bold text-violet-700">Abrir misión →</span></Link>
        <Link href="/academia/c2/006" className="mt-3 block rounded-2xl border border-violet-100 bg-white p-5 transition hover:border-violet-400 hover:shadow-sm"><p className="text-xs font-extrabold tracking-widest text-violet-700">MISIÓN 006</p><h3 className="mt-1 text-xl font-bold text-slate-950">Politeness, Face and Indirectness</h3><p className="mt-1 text-sm text-slate-600">Gestiona imagen social, tacto, atenuación y grado de directividad.</p><span className="mt-3 inline-block text-sm font-bold text-violet-700">Abrir misión →</span></Link>
        <Link href="/academia/c2/007" className="mt-3 block rounded-2xl border border-violet-100 bg-white p-5 transition hover:border-violet-400 hover:shadow-sm"><p className="text-xs font-extrabold tracking-widest text-violet-700">MISIÓN 007</p><h3 className="mt-1 text-xl font-bold text-slate-950">Irony, Understatement and Evaluative Distance</h3><p className="mt-1 text-sm text-slate-600">Interpreta ironía, atenuación, sarcasmo y evaluación indirecta según el contexto.</p><span className="mt-3 inline-block text-sm font-bold text-violet-700">Abrir misión →</span></Link>
        <Link href="/academia/c2/008" className="mt-3 block rounded-2xl border border-violet-100 bg-white p-5 transition hover:border-violet-400 hover:shadow-sm"><p className="text-xs font-extrabold tracking-widest text-violet-700">MISIÓN 008</p><h3 className="mt-1 text-xl font-bold text-slate-950">Silence, Omission and Strategic Ambiguity</h3><p className="mt-1 text-sm text-slate-600">Analiza silencios, omisiones, elipsis y responsabilidad sin confundir ausencia con intención.</p><span className="mt-3 inline-block text-sm font-bold text-violet-700">Abrir misión →</span></Link>
        <Link href="/academia/c2/009" className="mt-3 block rounded-2xl border border-violet-100 bg-white p-5 transition hover:border-violet-400 hover:shadow-sm"><p className="text-xs font-extrabold tracking-widest text-violet-700">MISIÓN 009</p><h3 className="mt-1 text-xl font-bold text-slate-950">Stance, Framing and Degrees of Commitment</h3><p className="mt-1 text-sm text-slate-600">Calibra certeza, evidencia, modalidad y encuadre interpretativo.</p><span className="mt-3 inline-block text-sm font-bold text-violet-700">Abrir misión →</span></Link>
        <p className="mt-4 text-xs text-slate-500">La misión 010 será integradora y consolidará la Unidad 1 sin introducir contenido nuevo. Este curso es formativo y no constituye una certificación oficial.</p>
      </section>
    </main>
  );
}
