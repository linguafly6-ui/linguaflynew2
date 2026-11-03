"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import ConversationPractice from "@/components/ConversationPractice";
import { wrapWithTranslation } from "@/components/T";

type Lesson = {
  type?: "exercise" | "speaking";
  exerciseId?: number;
  unitId?: number;
  unitNumber?: number;
  courseId?: string;
  scenarioId?: string;
  question?: string;
  instruction?: string;
  passage?: string;
  options?: string[];
  exerciseType?: string;
  category?: string;
  explanation?: string;
  order?: number;
  prompt?: string;
  progress?: { completed: number; total: number };
  completed?: boolean;
  proRequired?: boolean;
  message?: string;
};

export default function AprenderPage() {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [studentId, setStudentId] = useState<number | null>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<{ correct: boolean; correctAnswer: string; explanation?: string } | null>(null);
  const [stats, setStats] = useState({ xp: 0, streak: 0 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [needLogin, setNeedLogin] = useState(false);
  const [celebration, setCelebration] = useState(false);

  const loadStats = useCallback(async () => {
    try {
      const response = await fetch("/api/learn/stats", { cache: "no-store" });
      if (response.ok) {
        const data = await response.json() as { xp?: number; streak?: number };
        setStats({ xp: Number(data.xp || 0), streak: Number(data.streak || 0) });
      }
    } catch {}
  }, []);

  const loadNext = useCallback(async () => {
    setLoading(true);
    setError("");
    setFeedback(null);
    setAnswer("");
    try {
      const response = await fetch("/api/learn/next", { cache: "no-store" });
      const data = await response.json() as Lesson & { error?: string };
      if (response.status === 401) {
        setNeedLogin(true);
        return;
      }
      if (!response.ok) throw new Error(data.error || "No se pudo cargar la siguiente actividad.");
      setLesson(data);
      await loadStats();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de conexión.");
    } finally {
      setLoading(false);
    }
  }, [loadStats]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await response.json() as any;
        if (!active) return;
        if (!data.student) {
          setNeedLogin(true);
          setLoading(false);
          return;
        }
        setStudentId(Number(data.student.id));
        await loadNext();
      } catch {
        if (active) {
          setNeedLogin(true);
          setLoading(false);
        }
      }
    })();
    return () => { active = false; };
  }, [loadNext]);

  const submitAnswer = async (value = answer) => {
    if (!lesson?.exerciseId || !value.trim() || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/learn/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exerciseId: lesson.exerciseId, answer: value })
      });
      const data = await response.json() as {
        correct?: boolean; correctAnswer?: string; explanation?: string;
        xpEarned?: number; xpTotal?: number; streak?: number; error?: string;
      };
      if (!response.ok) throw new Error(data.error || "No se pudo comprobar la respuesta.");
      if (data.unitCompleted) setCelebration(true);
      setFeedback({
        correct: Boolean(data.correct),
        correctAnswer: String(data.correctAnswer || ""),
        explanation: data.explanation
      });
      setStats((current) => ({
        xp: Number(data.xpTotal ?? current.xp + Number(data.xpEarned || 0)),
        streak: Number(data.streak ?? current.streak)
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de conexión.");
    } finally {
      setSubmitting(false);
    }
  };

  if (needLogin) {
    return <main className="mx-auto max-w-xl px-5 py-20 text-center">
      <div className="text-5xl">📚</div>
      <h1 className="mt-5 text-3xl font-black">Tu ruta de aprendizaje</h1>
      <p className="mt-3 text-slate-600">Inicia sesión o crea una cuenta gratuita para guardar tu progreso.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/iniciar-sesion" className="rounded-xl bg-blue-700 px-5 py-3 font-bold text-white">Iniciar sesión</Link>
        <Link href="/crear-cuenta" className="rounded-xl border px-5 py-3 font-bold">Crear cuenta</Link>
      </div>
    </main>;
  }

  const completed = Boolean(lesson?.completed);
  const progress = lesson?.progress;
  const progressPercent = progress?.total ? Math.min(100, (progress.completed / progress.total) * 100) : 0;

  return <main className="mx-auto min-h-[75vh] max-w-3xl px-4 py-7 sm:px-6">
    <header className="mb-8 flex items-center justify-between gap-3">
      <div>
        <Link href="/inicio" className="text-sm font-semibold text-blue-700">← Mi aprendizaje</Link>
        <h1 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">Aprende paso a paso</h1>
      </div>
      <div className="flex gap-2 text-sm font-extrabold">
        <span className="rounded-full bg-amber-50 px-3 py-2 text-amber-700">⚡ {stats.xp} XP</span>
        <span className="rounded-full bg-rose-50 px-3 py-2 text-rose-700">🔥 {stats.streak}</span>
      </div>
    </header>

    {celebration && <div className="mb-5 flex items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-950"><p className="font-extrabold">🎉 ¡Unidad completada! Has desbloqueado el siguiente paso.</p><button onClick={() => setCelebration(false)} className="text-sm font-bold underline">Cerrar</button></div>}
    {loading ? <div className="rounded-3xl border bg-white p-10 text-center text-slate-500">Preparando tu siguiente actividad…</div> :
      error ? <div className="rounded-2xl bg-red-50 p-5 text-red-700">{error}<button onClick={() => void loadNext()} className="ml-3 font-bold underline">Reintentar</button></div> :
      lesson?.proRequired ? <section className="rounded-3xl bg-slate-950 p-8 text-center text-white">
        <div className="text-5xl">🔒</div><h2 className="mt-4 text-2xl font-black">Sigue aprendiendo con Pro</h2>
        <p className="mt-2 text-slate-300">{lesson.message || "Esta unidad requiere LinguaFly Pro."}</p>
        <Link href="/suscripcion" className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-slate-950">Ver LinguaFly Pro</Link>
      </section> :
      completed ? <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-9 text-center">
        <div className="text-6xl">🏆</div><h2 className="mt-4 text-3xl font-black text-emerald-950">¡Curso completado!</h2>
        <p className="mt-2 text-emerald-800">{lesson.message}</p>
        <p className="mt-4 font-bold text-emerald-900">Has conseguido {stats.xp} XP</p>
        <Link href="/inicio" className="mt-6 inline-flex rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white">Volver al inicio</Link>
      </section> :
      lesson?.type === "speaking" && lesson.scenarioId && studentId ? <section className="space-y-4">
        <div className="rounded-2xl bg-blue-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Speaking · {lesson.courseId?.toUpperCase()} · Unidad {lesson.unitId}</p>
          <h2 className="mt-1 text-xl font-black text-slate-900">Practica hablando</h2>
          <p className="mt-1 text-sm text-slate-600">{lesson.prompt}</p>
        </div>
        <ConversationPractice key={lesson.scenarioId} userId={"student-" + studentId} initialScenarioId={lesson.scenarioId} onCourseCompleted={(result) => { if (result?.score >= 60) setCelebration(true); void loadNext(); }} />
      </section> :
      lesson?.type === "exercise" ? <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
        <div className="h-2 bg-slate-100"><div className="h-full bg-blue-600 transition-all" style={{ width: progressPercent + "%" }} /></div>
        <div className="p-5 sm:p-8">
          <div className="mb-7 flex items-center justify-between gap-3">
            <div><p className="text-xs font-bold uppercase tracking-wider text-blue-700">{lesson.courseId?.toUpperCase()} · Unidad {lesson.unitNumber}</p><p className="mt-1 text-sm text-slate-500">Actividad {progress?.completed || 0} de {progress?.total || 60}</p></div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{lesson.category}</span>
          </div>
          <h2 className="text-xl font-extrabold leading-relaxed text-slate-950 sm:text-2xl">{wrapWithTranslation(lesson.question || "")}</h2>
          {lesson.instruction && <p className="mt-3 text-sm text-slate-500">{wrapWithTranslation(lesson.instruction)}</p>}
          {lesson.passage && <p className="mt-5 whitespace-pre-line rounded-xl bg-slate-50 p-4 leading-7 text-slate-700">{wrapWithTranslation(lesson.passage)}</p>}
          {lesson.options?.length ? <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {lesson.options.map((option) => <button key={option} disabled={Boolean(feedback) || submitting} onClick={() => { setAnswer(option); void submitAnswer(option); }} className="rounded-2xl border-2 border-slate-200 p-4 text-left font-semibold transition hover:border-blue-400 hover:bg-blue-50 disabled:opacity-60">{wrapWithTranslation(option)}</button>)}
          </div> : <div className="mt-7 flex gap-2">
            <input value={answer} disabled={Boolean(feedback) || submitting} onChange={(event) => setAnswer(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") void submitAnswer(); }} placeholder="Escribe tu respuesta…" className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3" />
            <button onClick={() => void submitAnswer()} disabled={!answer.trim() || Boolean(feedback) || submitting} className="rounded-xl bg-blue-700 px-5 py-3 font-bold text-white disabled:opacity-40">Comprobar</button>
          </div>}
          {feedback && <div className={"mt-7 rounded-2xl p-5 " + (feedback.correct ? "bg-emerald-50 text-emerald-950" : "bg-rose-50 text-rose-950")}>
            <p className="text-lg font-black">{feedback.correct ? "¡Muy bien! +XP" : "Sigue intentándolo"}</p>
            {!feedback.correct && <p className="mt-2 text-sm">Respuesta correcta: <strong>{feedback.correctAnswer}</strong></p>}
            {feedback.explanation && <p className="mt-2 text-sm">{feedback.explanation}</p>}
            <button onClick={() => void loadNext()} className="mt-4 w-full rounded-xl bg-slate-950 px-5 py-3 font-bold text-white">Continuar →</button>
          </div>}
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        </div>
      </section> : <div className="rounded-2xl border bg-white p-8 text-center text-slate-500">No hay actividades disponibles.</div>
    }
  </main>;
}
