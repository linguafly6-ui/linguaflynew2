"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import missionSource from "@/content/canonical-missions/a1/001.json";

type Item = { itemId: string; english?: string; spanish?: string; prompt?: string; answer?: string; options?: string[]; word?: string; translation?: string; pronunciationGuide?: string; expectedAnswer?: string; kind?: string; modelAnswer?: string; focus?: string; expectedWordId?: string; gapToken?: string; position: number };
type Section = { sectionId: string; sectionKey: string; position: number; title: string; exercise: { exerciseId: string; type: string; items: Item[]; theory?: { title: string; explanation: string; tip: string; patterns: { label: string; pattern: string; examples: string[] }[] }; content?: { passageId?: string; passage?: string; audio?: string; audioTranscript?: string; transcriptTemplate?: string; wordBank?: { wordId: string; word: string }[] } } };
type Mission = { course: { level: string }; unit: { title: string }; mission: { title: string }; sections: Section[] };
const mission = missionSource as Mission;
const labels: Record<string, string> = { explore: "Exploración", practice: "Practice", grammar: "Grammar", pronunciation: "Pronunciation", reading: "Reading", writing: "Writing", speaking: "Speaking", listening: "Listening" };

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
    setIndex((value) => Math.min(value + 1, section.exercise.items.length - 1));
    setChecked(false); setFeedback(""); setDraft("");
  }

  return (
    <div className="mx-auto w-full max-w-5xl text-slate-900">
      <header className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[.16em] text-blue-700">LINGUAFLY ACADEMY · A1</p>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div><h1 className="text-3xl font-semibold tracking-tight">{mission.mission.title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{mission.unit.title}</p></div>
          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">Misión 001</span>
        </div>
      </header>
      <nav aria-label="Secciones de la misión" className="mb-5 flex gap-2 overflow-x-auto pb-2">
        {mission.sections.map((entry, i) => <button key={entry.sectionId} onClick={() => changeSection(entry.sectionKey)} className={`shrink-0 rounded-xl border px-3 py-2 text-sm font-medium transition ${sectionKey === entry.sectionKey ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}><span className="mr-1.5 text-xs opacity-70">{String(i + 1).padStart(2, "0")}</span>{labels[entry.sectionKey]}</button>)}
      </nav>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><p className="text-xs font-semibold uppercase tracking-widest text-blue-700">A1 · MISIÓN 001</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">{section.title}</h2></div>
          <span className="text-sm text-slate-500">{section.exercise.items.length} actividades</span>
        </div>
        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${sectionKey === "explore" ? matched.length * 10 : sectionKey === "listening" ? Object.keys(listeningAnswers).length * 10 : progress}%` }} /></div>
        {section.exercise.theory && <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5"><h3 className="font-semibold">{section.exercise.theory.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{section.exercise.theory.explanation}</p><ul className="mt-4 grid gap-2 text-sm text-slate-700">{section.exercise.theory.patterns.map((pattern) => <li key={pattern.label}>• {pattern.pattern}</li>)}</ul><p className="mt-4 text-sm text-slate-600"><strong>Consejo:</strong> {section.exercise.theory.tip}</p><div className="mt-4 grid gap-2 sm:grid-cols-3">{section.exercise.theory.patterns.map((pattern) => <div key={pattern.label} className="rounded-lg border border-slate-200 bg-white p-3 text-sm"><p className="font-medium">{pattern.pattern}</p><p className="mt-1 text-slate-500">{pattern.examples.join(" · ")}</p></div>)}</div></div>}
        {section.exercise.content?.passage && <article className="mt-6 rounded-xl bg-slate-50 p-5 text-base leading-8 text-slate-700">{section.exercise.content?.passage}</article>}
        {sectionKey === "explore" && <div className="mt-6 grid gap-3 sm:grid-cols-2">{section.exercise.items.map((entry, i) => <div key={entry.itemId} className="flex items-center gap-2 rounded-xl border border-slate-200 p-3"><span className="min-w-0 flex-1 text-sm font-medium">{entry.english}</span><select aria-label={`Traducción de ${entry.english}`} value={answers[entry.itemId] ?? ""} disabled={matched.includes(i)} onChange={(e) => { const value = e.target.value; setAnswers((old) => ({ ...old, [entry.itemId]: value })); if (value === entry.spanish) setMatched((old) => [...old, i]); }} className="max-w-[55%] rounded-lg border border-slate-300 bg-white p-2 text-sm"><option value="">Elige traducción</option>{section.exercise.items.map((option) => <option key={option.itemId} value={option.spanish}>{option.spanish}</option>)}</select>{matched.includes(i) && <span aria-label="Correcto" className="text-emerald-700">✓</span>}</div>)}</div>}
        {sectionKey === "pronunciation" && <div className="mt-6 grid gap-3 sm:grid-cols-2">{section.exercise.items.map((entry) => <article key={entry.itemId} className="rounded-xl border border-slate-200 p-4"><p className="text-lg font-semibold">{entry.word}</p><p className="text-sm text-slate-500">{entry.translation}</p><p className="mt-2 font-medium text-blue-700">{entry.pronunciationGuide}</p><p className="text-xs text-slate-400">Guía aproximada para hispanohablantes; no es IPA.</p><button onClick={() => speak(entry.word ?? "")} className="mt-3 rounded-lg border border-slate-200 px-3 py-2 text-sm">▶ Escuchar modelo británico</button></article>)}</div>}
        {["practice", "grammar", "reading"].includes(sectionKey) && item && <div className="mt-7"><p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Actividad {index + 1} de {section.exercise.items.length}</p><h3 className="mt-3 text-lg font-semibold leading-7">{item.prompt}</h3><div className="mt-5 grid gap-2">{item.options?.map((option) => <button key={option} disabled={checked} onClick={() => mark(option === item.answer, item.answer ?? "")} className={`rounded-xl border px-4 py-3 text-left text-sm transition disabled:cursor-default ${checked && option === item.answer ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:border-blue-400"}`}>{option}</button>)}</div></div>}
        {sectionKey === "writing" && item && <div className="mt-7"><p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Dictado {index + 1} de 10 · {item.kind === "word" ? "Palabra" : "Frase"}</p><p className="mt-3 text-sm text-slate-600">Escucha el audio británico y escribe exactamente lo que oyes.</p><button onClick={() => speak(item.expectedAnswer ?? "")} className="mt-4 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium">▶ Reproducir dictado</button><label className="mt-5 block text-sm font-medium">Tu respuesta<input value={draft} onChange={(e) => setDraft(e.target.value)} disabled={checked} className="mt-2 block w-full rounded-xl border border-slate-300 p-3" /></label><button disabled={checked || !draft.trim()} onClick={() => mark(draft.trim().toLowerCase().replace(/[.,!?']/g, "") === (item.expectedAnswer ?? "").toLowerCase().replace(/[.,!?']/g, ""), item.expectedAnswer ?? "")} className="mt-3 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-40">Comprobar dictado</button></div>}
        {sectionKey === "speaking" && item && <div className="mt-7"><p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Tarea oral {index + 1} de 10</p><h3 className="mt-3 text-lg font-semibold">{item.prompt}</h3><div className="mt-4 rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Modelo de referencia</p><p className="mt-2 text-sm text-slate-700">{item.modelAnswer}</p><button onClick={() => speak(item.modelAnswer ?? "")} className="mt-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">▶ Escuchar modelo</button></div><div className="mt-4 flex flex-wrap gap-2"><button onClick={recording ? stopRecording : startRecording} className={recording ? "rounded-xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white" : "rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white"}>{recording ? "■ Detener grabación" : "● Grabar mi respuesta"}</button>{recordedUrl && <audio controls src={recordedUrl} className="w-full" />}</div><p role="status" className="mt-3 text-sm text-slate-500">{recordingMessage || "La grabación permanece en esta página y no se envía al servidor."}</p><p className="mt-2 text-xs text-slate-400">No se genera una nota fonética automática en esta versión.</p></div>}
        {sectionKey === "listening" && <div className="mt-7">
          <p className="text-sm leading-6 text-slate-600">Escucha el pasaje completo y completa los diez huecos seleccionando palabras del banco. Puedes retirar una palabra colocada y usarla en otro hueco.</p>
          <button onClick={() => speak(section.exercise.content?.audioTranscript ?? "")} className="mt-3 rounded-xl border border-slate-200 px-4 py-3 text-sm">▶ Escuchar audio completo</button>
          <div className="mt-6 grid gap-3">
            {section.exercise.items.map((entry, i) => <div key={entry.itemId} className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 p-3">
              <span className="w-7 text-xs font-semibold text-slate-400">{i + 1}.</span>
              <span className="min-w-0 flex-1 text-sm">{entry.prompt?.replace("____", "________")}</span>
              <button disabled={checked} onClick={() => { if (selectedListeningWord) { setListeningAnswers((old) => ({ ...old, [entry.itemId]: selectedListeningWord })); setSelectedListeningWord(""); } else if (listeningAnswers[entry.itemId]) { setListeningAnswers((old) => { const copy = { ...old }; delete copy[entry.itemId]; return copy; }); } }} className={`min-w-28 rounded-lg border px-3 py-2 text-sm font-medium ${listeningAnswers[entry.itemId] ? "border-blue-300 bg-blue-50 text-blue-800" : "border-slate-300 bg-white"}`}>{listeningAnswers[entry.itemId] ?? (selectedListeningWord ? "Colocar aquí" : "Hueco libre")}</button>
            </div>)}
          </div>
          <div className="mt-5 rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Banco de palabras</p><div className="mt-3 flex flex-wrap gap-2">{(section.exercise.content?.wordBank ?? []).map((bankItem) => bankItem.word).map((word) => <button key={word} disabled={checked || Object.values(listeningAnswers).includes(word)} onClick={() => setSelectedListeningWord(word)} className={`rounded-lg border px-3 py-2 text-sm ${selectedListeningWord === word ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-white"} disabled:opacity-30`}>{word}</button>)}</div><p className="mt-3 text-xs text-slate-500">{selectedListeningWord ? `Seleccionada: ${selectedListeningWord}. Pulsa un hueco para colocarla.` : `${Object.keys(listeningAnswers).length} de 10 palabras colocadas. Pulsa un hueco ocupado sin seleccionar palabra para devolverla al banco.`}</p></div>
          <button disabled={checked || Object.keys(listeningAnswers).length !== 10} onClick={() => { const correct = section.exercise.items.filter((entry) => listeningAnswers[entry.itemId]?.toLowerCase() === entry.answer?.toLowerCase()).length; setScore((value) => value + correct); setChecked(true); setFeedback(`Resultado: ${correct} de 10 respuestas correctas. Soluciones: ${section.exercise.items.map((entry, i) => `${i + 1}. ${entry.answer}`).join(" · ")}`); }} className="mt-4 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-40">Comprobar las 10 respuestas</button>
        </div>}
        {feedback && <p role="status" className="mt-5 rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-700">{feedback}</p>}
        {sectionKey !== "explore" && sectionKey !== "pronunciation" && sectionKey !== "listening" && <div className="mt-7 flex items-center justify-between gap-3"><span className="text-xs text-slate-400">Puntuación de esta sesión: {score}</span><button onClick={next} disabled={!checked || index === section.exercise.items.length - 1} className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">Siguiente →</button></div>}
        {sectionKey === "explore" && <p className="mt-5 text-sm text-slate-500" role="status">{matched.length} de 10 parejas correctas.</p>}
      </section>
      <p className="mt-4 text-center text-xs leading-5 text-slate-400">El progreso de esta vista es local y temporal; todavía no se guarda en la cuenta del alumno.</p>
    </div>
  );
}
