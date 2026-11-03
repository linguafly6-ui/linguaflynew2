"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Question = { id: number; question: string; options: string[]; correctOption: string };
type Result = { level: "A1" | "A2" | "B1" | "B2" | "C1"; totalCorrect: number; detail: { level: string; correct: number; total: number }[] };
const descriptions: Record<string, string> = {
  A1: "Estás empezando. Construiremos una base sólida con frases cotidianas, vocabulario esencial y gramática básica.",
  A2: "Ya puedes comunicarte en situaciones habituales. Practicaremos más estructuras y ampliarás tu vocabulario.",
  B1: "Tienes una base intermedia. Trabajaremos la fluidez, la comprensión y la comunicación en situaciones variadas.",
  B2: "Tienes un nivel intermedio alto. Perfeccionaremos la precisión, la fluidez y los matices del idioma.",
  C1: "Tienes un nivel avanzado. Te ayudaremos a expresarte con naturalidad y precisión en contextos complejos."
};
export default function TestNivelPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [needLogin, setNeedLogin] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const response = await fetch("/api/placement/test", { cache: "no-store" });
        const data = await response.json() as any;
        if (!active) return;
        if (response.status === 401) { setNeedLogin(true); return; }
        if (!response.ok) throw new Error(data.error || "No se pudo cargar el test.");
        if (data.completed) { router.replace("/aprender"); return; }
        setQuestions(data.questions || []);
      } catch (e) { if (active) setError(e instanceof Error ? e.message : "Error de conexión."); }
      finally { if (active) setLoading(false); }
    })();
    return () => { active = false; };
  }, [router]);

  const finish = async (finalAnswers: Record<number, string>) => {
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/placement/submit", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: questions.map((question) => ({ questionId: question.id, selectedOption: finalAnswers[question.id] })) })
      });
      const data = await response.json() as any;
      if (!response.ok) throw new Error(data.error || "No se pudo calcular tu nivel.");
      setResult(data as Result);
    } catch (e) { setError(e instanceof Error ? e.message : "Error de conexión."); }
    finally { setBusy(false); }
  };

  const current = questions[index];
  const answered = selected !== null;
  const correct = answered && selected === current?.correctOption;
  const choose = (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswers((previous) => ({ ...previous, [current.id]: option }));
  };
  const advance = () => {
    if (!current || !selected) return;
    if (index === questions.length - 1) {
      const finalAnswers = { ...answers, [current.id]: selected };
      void finish(finalAnswers);
    } else { setIndex((value) => value + 1); setSelected(null); }
  };

  if (needLogin) return <main className="mx-auto max-w-lg px-5 py-20 text-center"><h1 className="text-3xl font-black">Test de nivel</h1><p className="mt-3 text-slate-600">Inicia sesión para descubrir tu nivel de inglés.</p><Link href="/iniciar-sesion" className="mt-6 inline-flex rounded-xl bg-blue-700 px-6 py-3 font-bold text-white">Iniciar sesión</Link></main>;
  if (result) return <main className="mx-auto max-w-2xl px-4 py-14 sm:px-6"><section className="rounded-3xl border border-blue-100 bg-white p-7 text-center shadow-xl shadow-blue-100/50 sm:p-10"><div className="text-6xl">🎉</div><p className="mt-5 text-sm font-bold uppercase tracking-widest text-blue-700">Tu resultado</p><h1 className="mt-2 text-4xl font-black text-slate-950">Tu nivel es {result.level}</h1><p className="mt-3 text-slate-600">Has acertado {result.totalCorrect} de 20 preguntas.</p><p className="mx-auto mt-5 max-w-lg leading-7 text-slate-700">{descriptions[result.level]}</p><div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">{result.detail.map((item) => <div key={item.level} className="rounded-xl bg-slate-50 p-3"><p className="text-xs font-bold text-slate-500">{item.level}</p><p className="mt-1 text-xl font-black">{item.correct}/{item.total}</p></div>)}</div><button onClick={() => router.replace("/aprender")} className="mt-8 w-full rounded-xl bg-blue-700 px-6 py-4 font-extrabold text-white hover:bg-blue-800">Empezar a aprender →</button></section></main>;

  if (loading) return <main className="mx-auto max-w-2xl px-5 py-24 text-center text-slate-500">Preparando tu test de nivel…</main>;
  if (error && !current) return <main className="mx-auto max-w-xl px-5 py-20 text-center"><p className="rounded-xl bg-red-50 p-4 text-red-700">{error}</p><button onClick={() => window.location.reload()} className="mt-4 font-bold text-blue-700">Reintentar</button></main>;
  if (!current) return null;
  const percent = ((index + (answered ? 1 : 0)) / questions.length) * 100;
  return <main className="mx-auto min-h-[75vh] max-w-2xl px-4 py-8 sm:px-6"><header className="mb-8"><Link href="/inicio" className="text-sm font-semibold text-blue-700">← Mi espacio</Link><div className="mt-5 flex items-center justify-between"><p className="text-sm font-bold uppercase tracking-wider text-blue-700">Descubre tu nivel</p><span className="text-sm font-bold text-slate-500">Pregunta {index + 1} de {questions.length}</span></div><div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: percent + "%" }} /></div></header><section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-9"><p className="text-xs font-bold uppercase tracking-widest text-slate-400">Grammar & vocabulary</p><h1 className="mt-4 text-2xl font-black leading-relaxed text-slate-950 sm:text-3xl">{current.question}</h1><div className="mt-7 grid gap-3">{current.options.map((option) => { const isCorrect = answered && option === current.correctOption; const isWrong = answered && option === selected && !isCorrect; return <button key={option} disabled={answered || busy} onClick={() => choose(option)} className={"rounded-2xl border-2 p-4 text-left font-semibold transition " + (isCorrect ? "border-emerald-500 bg-emerald-50 text-emerald-900" : isWrong ? "border-rose-500 bg-rose-50 text-rose-900" : "border-slate-200 hover:border-blue-400 hover:bg-blue-50")}>{option}{isCorrect ? " ✓" : isWrong ? " ✕" : ""}</button>; })}</div>{answered && <div className={"mt-5 rounded-xl p-4 text-sm font-semibold " + (correct ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800")}>{correct ? "¡Correcto!" : "La respuesta correcta es: " + current.correctOption}</div>}{error && <p className="mt-4 text-sm text-red-600">{error}</p>}<button onClick={advance} disabled={!answered || busy} className="mt-7 w-full rounded-xl bg-blue-700 px-6 py-4 font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-40">{busy ? "Calculando tu nivel…" : index === questions.length - 1 ? "Ver mi nivel" : "Continuar →"}</button></section></main>;
}
