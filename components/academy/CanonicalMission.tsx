"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import missionSource from "@/content/canonical-missions/a1/001.json";

type Item = { itemId: string; english?: string; spanish?: string; prompt?: string; answer?: string; options?: string[]; word?: string; translation?: string; pronunciationGuide?: string; expectedAnswer?: string; kind?: string; modelAnswer?: string; focus?: string; expectedWordId?: string; gapToken?: string; position: number };
type Section = { sectionId: string; sectionKey: string; position: number; title: string; exercise: { exerciseId: string; type: string; items: Item[]; theory?: { title: string; explanation: string; tip: string; patterns: { label: string; pattern: string; examples: string[] }[] }; content?: { passageId?: string; passage?: string; audio?: string; audioTranscript?: string; transcriptTemplate?: string; wordBank?: { wordId: string; word: string }[] } } };
type Mission = { course: { level: string }; unit: { title: string }; mission: { title: string }; sections: Section[] };
const mission = missionSource as Mission;
const labels: Record<string, string> = { explore: "Exploración", practice: "Práctica", grammar: "Gramática", pronunciation: "Pronunciación", reading: "Lectura", writing: "Escritura", speaking: "Expresión oral", listening: "Comprensión auditiva" };

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-GB";
  window.speechSynthesis.speak(utterance);
}

export default function CanonicalMission() {
  const [sectionKey, setSectionKey] = useState("explore");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [matched, setMatched] = useState<number[]>([]);
  const [listeningAnswers, setListeningAnswers] = useState<Record<string, string>>({});
  const [selectedListeningWord, setSelectedListeningWord] = useState("");
  const [draft, setDraft] = useState("");
  const [recording, setRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState("");
  const [recordingMessage, setRecordingMessage] = useState("");
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (recordedUrl) URL.revokeObjectURL(recordedUrl);
  }, [recordedUrl]);

  async function startRecording() {
    try {
      if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
        setRecordingMessage("Este navegador no permite grabar audio."); return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => { if (event.data.size) chunksRef.current.push(event.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        setRecordedUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        setRecordingMessage("Grabación guardada temporalmente en esta página. No se ha enviado al servidor.");
      };
      recorder.start(); setRecording(true); setRecordingMessage("Grabando… habla cuando estés preparado.");
    } catch {
      setRecordingMessage("No se pudo acceder al micrófono. Revisa los permisos del navegador.");
    }
  }

  function stopRecording() {
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
    setRecording(false);
  }
  const section = mission.sections.find((item) => item.sectionKey === sectionKey) ?? mission.sections[0];
  const item = section.exercise.items[index];
  const listeningTemplate = section.exercise.content?.transcriptTemplate ?? "";
  const listeningItems = section.exercise.items;
  const progress = useMemo(() => section.exercise.items.length ? Math.round(((index + (checked ? 1 : 0)) / section.exercise.items.length) * 100) : 0, [index, checked, section.exercise.items.length]);

  function changeSection(key: string) {
    setSectionKey(key); setIndex(0); setFeedback(""); setChecked(false); setDraft(""); setListeningAnswers({}); setSelectedListeningWord("");
  }
  function mark(correct: boolean, expected: string) {
    if (checked) return;
    setChecked(true);
    setFeedback(correct ? "¡Correcto!" : `Respuesta correcta: ${expected}`);
    if (correct) setScore((value) => value + 1);
  }
  function next() {
    if (index === section.exercise.items.length - 1) {
      setFeedback("Sección completada. Has llegado al final de las actividades.");
      return;
    }
    setIndex((value) => value + 1);
    setChecked(false); setFeedback(""); setDraft("");
  }

  return (
    <div className="mx-auto w-full max-w-5xl text-[#172033]">
      <header className="relative mb-6 overflow-hidden rounded-[26px] border border-[#e8ebf0] bg-white p-6 shadow-[0_12px_34px_rgba(25,42,70,0.045)] sm:p-8">
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#55779d]">LINGUAFLY ACADEMY <span className="px-1 text-[#c1c9d3]">/</span> NIVEL A1</p>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div><h1 className="mt-2 text-3xl font-semibold tracking-[-.04em] text-[#172033]">{mission.mission.title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[#718096]">{mission.unit.title}</p><p className="mt-3 text-xs text-[#8792a3]">Avanza a tu ritmo. Puedes cambiar de sección cuando quieras.</p></div>
          <span className="rounded-full border border-[#e8ebf0] bg-[#f8fafc] px-3 py-1.5 text-xs font-semibold text-[#64748b]">MISIÓN 001</span>
        </div>
      </header>
      <nav aria-label="Secciones de la misión" className="mb-5 flex gap-2 overflow-x-auto rounded-2xl border border-[#e8ebf0] bg-white p-2 pb-3 shadow-[0_6px_20px_rgba(25,42,70,0.025)]">
        {mission.sections.map((entry, i) => <button key={entry.sectionId} onClick={() => changeSection(entry.sectionKey)} className={`shrink-0 rounded-xl border px-3 py-2.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#557da8] ${sectionKey === entry.sectionKey ? "border-[#183b67] bg-[#183b67] text-white shadow-sm" : "border-transparent bg-[#f7f8fa] text-[#647087] hover:border-[#dce4ed] hover:bg-[#f0f4f8]"}`}><span className="mr-1.5 text-xs opacity-70">{String(i + 1).padStart(2, "0")}</span>{labels[entry.sectionKey]}</button>)}
      </nav>
      <section className="rounded-[26px] border border-[#e8ebf0] bg-white p-5 shadow-[0_12px_34px_rgba(25,42,70,0.04)] sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#8290a3]">ETAPA {String(section.position).padStart(2, "0")} DE 08</p><h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#172033]">{labels[section.sectionKey] ?? section.title}</h2><p className="mt-1 text-xs text-[#8792a3]">Completa las actividades para avanzar y consolidar lo aprendido.</p></div>
          <span className="rounded-full bg-[#f3f6fa] px-3 py-1.5 text-xs font-semibold text-[#65758b]">{section.exercise.items.length} actividades</span>
        </div>
        <div className="mt-5" aria-label="Progreso de la sección"><div className="mb-2 flex justify-between text-[11px] font-medium text-[#8792a3]"><span>Tu avance en esta etapa</span><span className="tabular-nums">{sectionKey === "explore" ? matched.length * 10 : sectionKey === "listening" ? Object.keys(listeningAnswers).length * 10 : progress}%</span></div><div className="h-2 overflow-hidden rounded-full bg-[#edf0f4]" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={sectionKey === "explore" ? matched.length * 10 : sectionKey === "listening" ? Object.keys(listeningAnswers).length * 10 : progress}><div className="h-full rounded-full bg-[#557da8] transition-all duration-300" style={{ width: `${sectionKey === "explore" ? matched.length * 10 : sectionKey === "listening" ? Object.keys(listeningAnswers).length * 10 : progress}%` }} /></div></div>
        {section.exercise.theory && <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5"><h3 className="font-semibold">{section.exercise.theory.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{section.exercise.theory.explanation}</p><ul className="mt-4 grid gap-2 text-sm text-slate-700">{section.exercise.theory.patterns.map((pattern) => <li key={pattern.label}>• {pattern.pattern}</li>)}</ul><p className="mt-4 text-sm text-slate-600"><strong>Consejo:</strong> {section.exercise.theory.tip}</p><div className="mt-4 grid gap-2 sm:grid-cols-3">{section.exercise.theory.patterns.map((pattern) => <div key={pattern.label} className="rounded-lg border border-slate-200 bg-white p-3 text-sm"><p className="font-medium">{pattern.pattern}</p><p className="mt-1 text-slate-500">{pattern.examples.join(" · ")}</p></div>)}</div></div>}
        {section.exercise.content?.passage && <article className="mt-6 rounded-xl bg-slate-50 p-5 text-base leading-8 text-slate-700">{section.exercise.content?.passage}</article>}
        {sectionKey === "explore" && <div className="mt-7">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">Tu vocabulario esencial</p><h3 className="mt-1 text-lg font-semibold tracking-tight text-[#26364b]">Conoce y relaciona</h3><p className="mt-1 max-w-xl text-sm leading-6 text-[#7b8798]">Lee cada palabra en inglés, escucha su pronunciación y elige su significado en español.</p></div>
            <div className="rounded-2xl bg-[#f3f6fa] px-4 py-2.5 text-right"><p className="text-[10px] font-semibold uppercase tracking-wider text-[#8290a3]">Parejas encontradas</p><p className="mt-0.5 text-xl font-semibold tabular-nums text-[#183b67]">{matched.length}<span className="text-sm font-medium text-[#8792a3]"> / {section.exercise.items.length}</span></p></div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {section.exercise.items.map((entry, i) => {
              const isMatched = matched.includes(i);
              const chosen = answers[entry.itemId] ?? "";
              const isWrong = Boolean(chosen) && !isMatched;
              return <article key={entry.itemId} className={`group relative overflow-hidden rounded-2xl border p-4 transition-all duration-200 sm:p-5 ${isMatched ? "border-[#cfe3d7] bg-[#f6faf7]" : isWrong ? "border-[#ead8c9] bg-[#fffaf6]" : "border-[#e8ebf0] bg-white hover:-translate-y-0.5 hover:border-[#cbd7e5] hover:shadow-[0_10px_26px_rgba(25,42,70,0.055)]"}`}>
                <div className="flex items-start gap-3">
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[11px] font-bold tabular-nums ${isMatched ? "bg-[#e2f0e7] text-[#47775c]" : "bg-[#edf3fa] text-[#55779d]"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-lg font-semibold tracking-tight text-[#26364b]">{entry.english}</p>
                      <button type="button" onClick={() => speak(entry.english ?? "")} aria-label={`Escuchar ${entry.english}`} className="inline-flex items-center gap-1.5 rounded-lg border border-[#e5eaf0] bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[#55708f] transition hover:border-[#cbd7e5] hover:bg-[#f7f9fc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#557da8]"><span aria-hidden="true">♫</span> Escuchar</button>
                    </div>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[.13em] text-[#a0a9b6]">En inglés</p>
                    <div className="mt-4">
                      <label htmlFor={`explore-${entry.itemId}`} className="mb-1.5 block text-[11px] font-semibold text-[#718096]">¿Qué significa?</label>
                      <select id={`explore-${entry.itemId}`} aria-label={`Traducción de ${entry.english}`} value={chosen} disabled={isMatched} onChange={(e) => { const value = e.target.value; setAnswers((old) => ({ ...old, [entry.itemId]: value })); if (value === entry.spanish) { setMatched((old) => old.includes(i) ? old : [...old, i]); setFeedback(`¡Muy bien! “${entry.english}” significa “${entry.spanish}”.`); } else { setFeedback(`Sigue intentándolo: revisa el significado de “${entry.english}”.`); } }} className={`w-full rounded-xl border px-3 py-3 text-sm font-medium outline-none transition focus:ring-2 focus:ring-[#c6d7e8] disabled:cursor-default ${isMatched ? "border-[#cfe3d7] bg-[#edf6f0] text-[#47775c]" : isWrong ? "border-[#ead8c9] bg-white text-[#8a6246]" : "border-[#e1e7ee] bg-[#fbfcfd] text-[#526176] hover:border-[#cbd7e5]"}`}>
                        <option value="">Selecciona una traducción</option>
                        {section.exercise.items.map((option) => <option key={option.itemId} value={option.spanish} disabled={matched.some((matchedIndex) => section.exercise.items[matchedIndex]?.spanish === option.spanish && matchedIndex !== i)}>{option.spanish}</option>)}
                      </select>
                    </div>
                    {isMatched && <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#47775c]"><span aria-hidden="true">✓</span> ¡Pareja correcta!</p>}
                    {isWrong && <p className="mt-2 text-xs font-medium text-[#a16f4e]">No es esa. Puedes probar otra vez.</p>}
                  </div>
                </div>
              </article>;
            })}
          </div>
          {matched.length === section.exercise.items.length && <div className="mt-5 rounded-2xl border border-[#cfe3d7] bg-[#f3faf5] p-5 text-center"><span className="text-2xl" aria-hidden="true">✦</span><h4 className="mt-2 font-semibold text-[#315f46]">¡Exploración completada!</h4><p className="mt-1 text-sm text-[#64816f]">Has relacionado correctamente todo el vocabulario de esta etapa.</p></div>}
        </div>}
        {sectionKey === "pronunciation" && <div className="mt-6 grid gap-3 sm:grid-cols-2">{section.exercise.items.map((entry) => <article key={entry.itemId} className="rounded-xl border border-slate-200 p-4"><p className="text-lg font-semibold">{entry.word}</p><p className="text-sm text-slate-500">{entry.translation}</p><p className="mt-2 font-medium text-blue-700">{entry.pronunciationGuide}</p><p className="text-xs text-slate-400">Guía aproximada para hispanohablantes; no es IPA.</p><button onClick={() => speak(entry.word ?? "")} className="mt-3 rounded-lg border border-slate-200 px-3 py-2 text-sm">▶ Escuchar modelo británico</button></article>)}</div>}
        {["practice", "grammar", "reading"].includes(sectionKey) && item && <div className="mt-7"><p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Actividad {index + 1} de {section.exercise.items.length}</p><h3 className="mt-3 text-lg font-semibold leading-7">{item.prompt}</h3><div className="mt-5 grid gap-2">{item.options?.map((option) => <button key={option} disabled={checked} onClick={() => mark(option === item.answer, item.answer ?? "")} className={`rounded-xl border px-4 py-3 text-left text-sm transition disabled:cursor-default ${checked && option === item.answer ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:border-blue-400"}`}>{option}</button>)}</div></div>}
        {sectionKey === "writing" && item && <div className="mt-7"><p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Dictado {index + 1} de 10 · {item.kind === "word" ? "Palabra" : "Frase"}</p><p className="mt-3 text-sm text-slate-600">Escucha el audio británico y escribe exactamente lo que oyes.</p><button onClick={() => speak(item.expectedAnswer ?? "")} className="mt-4 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium">▶ Reproducir dictado</button><label className="mt-5 block text-sm font-medium">Tu respuesta<input value={draft} onChange={(e) => setDraft(e.target.value)} disabled={checked} className="mt-2 block w-full rounded-xl border border-slate-300 p-3" /></label><button disabled={checked || !draft.trim()} onClick={() => mark(draft.trim().toLowerCase().replace(/[.,!?']/g, "") === (item.expectedAnswer ?? "").toLowerCase().replace(/[.,!?']/g, ""), item.expectedAnswer ?? "")} className="mt-3 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-40">Comprobar dictado</button></div>}
        {sectionKey === "speaking" && item && <div className="mt-7"><p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Tarea oral {index + 1} de 10</p><h3 className="mt-3 text-lg font-semibold">{item.prompt}</h3><div className="mt-4 rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Modelo de referencia</p><p className="mt-2 text-sm text-slate-700">{item.modelAnswer}</p><button onClick={() => speak(item.modelAnswer ?? "")} className="mt-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">▶ Escuchar modelo</button></div><div className="mt-4 flex flex-wrap gap-2"><button onClick={recording ? stopRecording : startRecording} className={recording ? "rounded-xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white" : "rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white"}>{recording ? "■ Detener grabación" : "● Grabar mi respuesta"}</button>{recordedUrl && <audio controls src={recordedUrl} className="w-full" />}</div><p role="status" className="mt-3 text-sm text-slate-500">{recordingMessage || "La grabación permanece en esta página y no se envía al servidor."}</p><p className="mt-2 text-xs text-slate-400">No se genera una nota fonética automática en esta versión.</p><button disabled={checked} onClick={() => { setChecked(true); setFeedback("Tarea oral completada. Tu grabación permanece en esta página y no se ha evaluado."); }} className="mt-4 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold disabled:opacity-40">Marcar tarea como completada</button></div>}
        {sectionKey === "listening" && <div className="mt-7">
          <p className="text-sm leading-6 text-slate-600">Escucha el pasaje completo y completa los diez huecos seleccionando palabras del banco. Puedes mover o sustituir palabras antes de comprobar.</p>
          <button onClick={() => speak(section.exercise.content?.audioTranscript ?? "")} className="mt-3 rounded-xl border border-slate-200 px-4 py-3 text-sm">▶ Escuchar audio completo</button>
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5 text-base leading-10 text-slate-700">
            {listeningTemplate.split(/(\[\[gap-(?:0[1-9]|10)\]\])/g).map((part, i) => {
              const gap = listeningItems.find((entry) => entry.gapToken === part);
              if (!gap) return <span key={`text-${i}`}>{part}</span>;
              const placed = listeningAnswers[gap.itemId];
              return <button key={gap.itemId} disabled={checked} onClick={() => {
                if (selectedListeningWord) {
                  setListeningAnswers((old) => ({ ...old, [gap.itemId]: selectedListeningWord }));
                  setSelectedListeningWord("");
                } else if (placed) {
                  setListeningAnswers((old) => { const copy = { ...old }; delete copy[gap.itemId]; return copy; });
                }
              }} className={`mx-1 inline-flex min-w-24 items-center justify-center rounded-lg border px-3 py-1 text-sm font-semibold ${placed ? "border-blue-300 bg-blue-50 text-blue-800" : "border-slate-300 bg-white text-slate-500"}`}>{placed ?? (selectedListeningWord ? "Colocar aquí" : "____")}</button>;
            })}
          </div>
          <div className="mt-5 rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Banco de palabras</p><div className="mt-3 flex flex-wrap gap-2">{(section.exercise.content?.wordBank ?? []).map((bankItem) => bankItem.word).map((word) => <button key={word} disabled={checked || Object.values(listeningAnswers).includes(word)} onClick={() => setSelectedListeningWord(word)} className={`rounded-lg border px-3 py-2 text-sm ${selectedListeningWord === word ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-white"} disabled:opacity-30`}>{word}</button>)}</div><p className="mt-3 text-xs text-slate-500">{selectedListeningWord ? `Seleccionada: ${selectedListeningWord}. Pulsa un hueco para colocarla.` : `${Object.keys(listeningAnswers).length} de 10 palabras colocadas. Pulsa un hueco ocupado para devolver su palabra al banco.`}</p></div>
          <button disabled={checked || Object.keys(listeningAnswers).length !== 10} onClick={() => { const correct = listeningItems.filter((entry) => listeningAnswers[entry.itemId]?.toLowerCase() === entry.answer?.toLowerCase()).length; setScore((value) => value + correct); setChecked(true); setFeedback(`Resultado: ${correct} de 10 respuestas correctas. Soluciones: ${listeningItems.map((entry, i) => `${i + 1}. ${entry.answer}`).join(" · ")}`); }} className="mt-4 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-40">Comprobar las 10 respuestas</button>
        </div>}
        {feedback && <p role="status" aria-live="polite" className="mt-5 rounded-2xl border border-[#e4ebf2] bg-[#f5f8fb] p-4 text-sm font-semibold leading-6 text-[#43546b]">{feedback}</p>}
        {sectionKey !== "explore" && sectionKey !== "pronunciation" && sectionKey !== "listening" && <div className="mt-7 flex items-center justify-between gap-3"><span className="text-xs text-slate-400">Puntuación de esta sesión: {score}</span><button onClick={next} disabled={!checked} className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">{index === section.exercise.items.length - 1 ? "Finalizar sección" : "Siguiente →"}</button></div>}
        {sectionKey === "explore" && <p className="mt-5 text-sm text-slate-500" role="status">{matched.length} de 10 parejas correctas.</p>}
      </section>
      <p className="mt-4 text-center text-[11px] leading-5 text-[#9aa3b1]">Vista piloto · El progreso y las grabaciones son temporales y no se guardan en tu cuenta.</p>
    </div>
  );
}
