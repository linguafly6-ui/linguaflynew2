"use client";

import { useCallback, useEffect, useState } from "react";
import VoiceConversation from "@/components/VoiceConversation";

interface Scenario {
  id: string;
  title: string;
  description: string;
  setting: string;
  language: string;
  status: "locked" | "available" | "completed";
  score: number;
  stars: number;
  course_order: number;
}
interface VoiceScenario extends Scenario {
  level: string;
  persona_prompt: string;
  opening_line: string;
}
interface Level { level: string; scenarios: Scenario[]; }

export default function ConversationCourse({ userId = "demo-user" }: { userId?: string }) {
  const [levels, setLevels] = useState<Level[]>([]);
  const [selected, setSelected] = useState<VoiceScenario | null>(null);
  const [scenarioDetails, setScenarioDetails] = useState<Record<string, VoiceScenario>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completedInfo, setCompletedInfo] = useState<Scenario | null>(null);

  const loadCourse = useCallback(async () => {
    try {
      setLoading(true);
      const [courseResponse, scenarioResponse] = await Promise.all([
        fetch("/api/conversation/course?userId=" + encodeURIComponent(userId)),
        fetch("/api/conversation/scenarios"),
      ]);
      const courseData = await courseResponse.json() as any;
      const scenarioData = await scenarioResponse.json() as any;
      if (!courseResponse.ok) throw new Error(courseData.error || "No se pudo cargar el curso");
      if (!scenarioResponse.ok) throw new Error(scenarioData.error || "No se pudieron cargar los escenarios");
      setLevels(courseData.levels || []);
      const details: Record<string, VoiceScenario> = {};
      for (const item of scenarioData.scenarios || []) details[item.id] = item;
      setScenarioDetails(details);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar el curso");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { void loadCourse(); }, [loadCourse]);

  const all = levels.flatMap((level) => level.scenarios);
  const count = all.filter((item) => item.status === "completed").length;
  const percent = all.length ? Math.round((count / all.length) * 100) : 0;

  if (selected) {
    return <div className="mx-auto max-w-4xl px-5 py-8">
      <VoiceConversation scenario={selected} userId={userId} onCourseCompleted={async () => { setSelected(null); await loadCourse(); }} />
    </div>;
  }

  const names: Record<string, string> = { A1: "Principiante", A2: "Elemental", B1: "Intermedio" };
  const colors: Record<string, string> = { A1: "from-emerald-500 to-green-600", A2: "from-blue-500 to-indigo-600", B1: "from-violet-500 to-purple-600" };

  return <div className="mx-auto max-w-4xl space-y-7 px-5 py-8 sm:px-8">
    <section className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/70 sm:p-8">
      <div className="flex items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-wider text-blue-600">Tu ruta de aprendizaje</p><h2 className="mt-1 text-2xl font-extrabold text-slate-900">Curso de Conversaciones</h2><p className="mt-2 text-slate-500">Practica hablando con LinguaFly, sin escribir ni pulsar botones durante la conversación.</p></div><div className="shrink-0 text-right"><p className="text-3xl font-black text-blue-600">{count}/10</p><p className="text-xs font-semibold text-slate-500">completados</p></div></div>
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600 transition-all duration-500" style={{ width: percent + "%" }} /></div><p className="mt-2 text-right text-xs font-semibold text-slate-500">{percent}% del curso</p>
    </section>
    {loading && <p className="animate-pulse py-8 text-center font-semibold text-slate-500">Preparando tu camino...</p>}
    {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}
    {completedInfo && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">Escenario completado: {completedInfo.score}/100 · {"⭐".repeat(completedInfo.stars)}</div>}
    {!loading && levels.map((level) => <section key={level.level} className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60 sm:p-8">
      <div className={"mb-6 rounded-2xl bg-gradient-to-r " + (colors[level.level] || "from-blue-500 to-violet-600") + " p-5 text-white"}><p className="text-sm font-semibold text-white/80">NIVEL {level.level}</p><h3 className="text-2xl font-extrabold">{level.level} · {names[level.level] || "Nivel"}</h3></div>
      <div className="ml-7 border-l-2 border-blue-200 pl-8">
        {level.scenarios.map((item, index) => {
          const done = item.status === "completed";
          const available = item.status === "available";
          return <div key={item.id} className={"relative " + (index === level.scenarios.length - 1 ? "pb-0" : "pb-8")}>
            <div className="absolute -left-[2.55rem] top-0 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white text-2xl shadow-md"><div className={"flex h-full w-full items-center justify-center rounded-full " + (done ? "bg-green-100 text-green-700" : available ? "animate-pulse bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-400")}>{done ? "✅" : available ? "🔓" : "🔒"}</div></div>
            <button type="button" disabled={item.status === "locked"} onClick={() => {
              if (done) { setCompletedInfo(item); return; }
              const details = scenarioDetails[item.id];
              if (!details?.persona_prompt || !details?.opening_line) {
                setError("No se han podido cargar los datos de voz de este escenario.");
                return;
              }
              setSelected({ ...item, ...details, level: level.level });
              setCompletedInfo(null);
            }} title={item.status === "locked" ? "Completa el escenario anterior" : item.title} className={"w-full rounded-2xl border p-5 text-left transition-all duration-300 hover:scale-[1.02] " + (done ? "border-green-200 bg-green-50" : available ? "border-blue-200 bg-blue-50 shadow-md hover:shadow-lg" : "cursor-not-allowed border-slate-100 bg-slate-50 opacity-70")}>
              <div className="flex flex-wrap items-center justify-between gap-2"><h4 className="text-lg font-bold text-slate-900">{item.course_order}. {item.title}</h4>{done ? <span className="font-bold text-green-700">{"⭐".repeat(item.stars)} · {item.score}/100</span> : <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">{available ? "Disponible" : "Bloqueado"}</span>}</div>
              <p className="mt-1 text-sm text-slate-600">{item.description}</p><p className="mt-2 text-xs font-semibold text-slate-400">{item.setting}</p>
            </button>
          </div>;
        })}
      </div>
    </section>)}
  </div>;
}
