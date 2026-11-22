"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import missionSource from "@/content/canonical-missions/a1/001.json";

type DictationSegment = { segmentId: string; text: string };
type Item = { itemId: string; english?: string; spanish?: string; prompt?: string; answer?: string; options?: string[]; word?: string; translation?: string; pronunciationGuide?: string; expectedAnswer?: string; kind?: string; audioLocale?: string; repeatCount?: number; segments?: DictationSegment[]; modelAnswer?: string; focus?: string; expectedWordId?: string; gapToken?: string; position: number };
type LessonEntry = { english: string; spanish: string; note?: string; prompt?: string; promptSpanish?: string; pronunciationGuide?: string };
type Lesson = { phrases: LessonEntry[]; grammar: LessonEntry[]; reading: LessonEntry[]; writing: LessonEntry[]; speaking: LessonEntry[]; listening: LessonEntry[] };
type Section = { sectionId: string; sectionKey: string; position: number; title?: string; exercise: { exerciseId: string; type: string; items: Item[]; lesson?: Lesson; theory?: { title: string; explanation: string; tip: string; patterns: { label: string; pattern: string; examples: string[] }[] }; content?: { passageId?: string; passage?: string; audio?: string; audioTranscript?: string; transcriptTemplate?: string; wordBank?: { wordId: string; word: string }[] } } };
export type Mission = { course: { level: string }; unit: { title: string }; mission: { title: string; position?: number }; sections: Section[] };
const labels: Record<string, string> = { explore: "Exploración", practice: "Práctica", grammar: "Gramática", pronunciation: "Pronunciación", reading: "Lectura", writing: "Escritura", speaking: "Expresión oral", listening: "Comprensión auditiva" };

const preA1Listening: Record<number, { audioTranscript: string; template: string; words: string[] }> = {
  1: { audioTranscript: "Hello! Hi! Hello! Hi! Goodbye! Bye! See you! Goodbye! Bye! See you!", template: "[[gap-01]] [[gap-02]] [[gap-03]] [[gap-04]] [[gap-05]] [[gap-06]] [[gap-07]] [[gap-08]] [[gap-09]] [[gap-10]]", words: ["Hello", "Hi", "Goodbye", "Bye", "See you", "Hello!", "Hi!", "Goodbye!", "Bye!", "See you!"] },
  2: { audioTranscript: "Hello! My name is Ana. What's your name? What is your name? Hi! My name is Ben. Goodbye!", template: "[[gap-01]] [[gap-02]] [[gap-03]] [[gap-04]] Ana. [[gap-05]] [[gap-06]] [[gap-07]] [[gap-08]]? Hi! [[gap-09]] [[gap-10]] Ben. Goodbye!", words: ["Hello!", "My", "name", "is", "What's", "your", "What", "name", "Hi!", "My name is"] },
  3: { audioTranscript: "Hello! How are you? I'm fine. I'm good. I'm very well. I'm OK. Not bad. And you? How are you?", template: "Hello! [[gap-01]] [[gap-02]] [[gap-03]]? I'm [[gap-04]]. I'm [[gap-05]]. I'm [[gap-06]] [[gap-07]]. I'm [[gap-08]]. [[gap-09]] [[gap-10]].", words: ["How", "are", "you", "fine", "good", "very", "well", "OK", "Not", "bad"] },
  4: { audioTranscript: "Please. Thank you. Thanks! You're welcome. Sorry. Excuse me. Yes, please. No, thank you. Help, please. Thank you!", template: "[[gap-01]]. [[gap-02]] you. [[gap-03]]! [[gap-04]]. [[gap-05]]. [[gap-06]]. [[gap-07]], please. [[gap-08]], thank you. [[gap-09]]. [[gap-10]]!", words: ["Please", "Thank", "Thanks", "You're welcome", "Sorry", "Excuse me", "Yes", "No", "Help, please", "Thank you"] },
  5: { audioTranscript: "Yes. No. Maybe. That's right. That's wrong. Correct. True. False. Okay. Sure!", template: "[[gap-01]]. [[gap-02]]. [[gap-03]]. That's [[gap-04]]. That's [[gap-05]]. [[gap-06]]. [[gap-07]]. [[gap-08]]. [[gap-09]]. [[gap-10]]!", words: ["Yes", "No", "Maybe", "right", "wrong", "Correct", "True", "False", "Okay", "Sure"] },
  6: { audioTranscript: "Listen to the letters. A, B, C, D, E. F, G, H, I, J. Now listen again: A, B, C. These are letters of the English alphabet.", template: "Listen to the letters. [[gap-01]], [[gap-02]], [[gap-03]], [[gap-04]], [[gap-05]]. [[gap-06]], [[gap-07]], [[gap-08]], [[gap-09]], [[gap-10]]. Now listen again: A, B, C. These are letters of the English alphabet.", words: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"] },
  7: { audioTranscript: "Hello! A hat. A house. A hand. Thin. Three. Thank you. This. That. A ship. A sheep. Listen to the first sounds.", template: "Hello! A [[gap-01]]. A [[gap-02]]. A [[gap-03]]. [[gap-04]]. [[gap-05]]. [[gap-06]] you. [[gap-07]]. [[gap-08]]. A [[gap-09]]. A [[gap-10]].", words: ["hat", "house", "hand", "thin", "three", "thank", "this", "that", "ship", "sheep"] },
  8: { audioTranscript: "I am happy. I am sad. I am tired. I am excited. I am a student. I am a teacher. I am a boy. I am a girl. I am happy today.", template: "[[gap-01]] [[gap-02]] [[gap-03]]. I am [[gap-04]]. I am [[gap-05]]. I am [[gap-06]]. I am a [[gap-07]]. I am a [[gap-08]]. I am a [[gap-09]]. I am a [[gap-10]].", words: ["I", "am", "happy", "sad", "tired", "excited", "student", "teacher", "boy", "girl"] },
  9: { audioTranscript: "I'm happy. You're happy. I'm fine. You're fine. I'm good. You're great. I'm a student. You're my friend. I am happy and you are happy.", template: "[[gap-01]] [[gap-05]]. [[gap-02]] [[gap-05]]. [[gap-01]] [[gap-06]]. [[gap-02]] [[gap-06]]. [[gap-01]] [[gap-07]]. [[gap-02]] [[gap-08]]. [[gap-01]] a [[gap-09]]. [[gap-02]] my [[gap-10]]. [[gap-03]] happy and [[gap-04]] happy.", words: ["I'm", "you're", "I am", "you are", "happy", "fine", "good", "great", "student", "friend"] },
  10: { audioTranscript: "Hello! Nice to meet you. Nice to meet you too. Pleased to meet you. You are my friend. I am a student. You are a teacher. Goodbye!", template: "[[gap-07]]! [[gap-01]]. [[gap-02]]. [[gap-03]] to [[gap-04]] you. [[gap-05]] to meet you [[gap-06]]. You are my [[gap-08]]. I am a [[gap-09]]. You are a [[gap-10]]. Goodbye!", words: ["Nice to meet you", "Nice to meet you too", "pleased", "meet", "nice", "too", "hello", "friend", "student", "teacher"] }
};

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-GB";
  window.speechSynthesis.speak(utterance);
}

export default function CanonicalMission({ missionData = missionSource as Mission }: { missionData?: Mission }) {
  const mission = missionData;
  const [sectionKey, setSectionKey] = useState("explore");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [listeningAnswers, setListeningAnswers] = useState<Record<string, string>>({});
  const [selectedListeningWord, setSelectedListeningWord] = useState("");
  const [draft, setDraft] = useState("");
  const [dictationPlaying, setDictationPlaying] = useState(false);
  const [dictationPaused, setDictationPaused] = useState(false);
  const [dictationSegment, setDictationSegment] = useState(0);
  const [dictationRepeat, setDictationRepeat] = useState(0);
  const [dictationMessage, setDictationMessage] = useState("");
  const dictationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dictationRunRef = useRef(0);
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

  useEffect(() => () => {
    dictationRunRef.current += 1;
    if (dictationTimerRef.current) clearTimeout(dictationTimerRef.current);
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  }, []);

  function stopDictation() {
    dictationRunRef.current += 1;
    if (dictationTimerRef.current) clearTimeout(dictationTimerRef.current);
    dictationTimerRef.current = null;
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setDictationPlaying(false); setDictationPaused(false);
    setDictationMessage("Dictado detenido. Puedes volver a escucharlo cuando quieras.");
  }

  function startDictation() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) { setDictationMessage("Este navegador no dispone de reproducción de voz."); return; }
    const segments = item?.segments?.map((segment) => segment.text) ?? [item?.expectedAnswer ?? ""];
    if (!segments.length || !segments.every((segment) => segment.trim())) return;
    stopDictation();
    const run = dictationRunRef.current;
    let segmentIndex = 0;
    let repetition = 0;
    const repeatCount = item?.repeatCount ?? 3;
    setDictationSegment(0); setDictationRepeat(0); setDictationPlaying(true); setDictationPaused(false);
    setDictationMessage("Escucha con atención. Cada fragmento se repetirá tres veces.");
    const playCurrentSegment = () => {
      if (run !== dictationRunRef.current) return;
      repetition += 1; setDictationSegment(segmentIndex); setDictationRepeat(repetition);
      const utterance = new SpeechSynthesisUtterance(segments[segmentIndex]);
      utterance.lang = item?.audioLocale ?? "en-GB";
      utterance.rate = repetition === 2 ? 0.78 : 0.92;
      const britishVoice = window.speechSynthesis.getVoices().find((voice) => voice.lang.toLowerCase() === "en-gb");
      if (britishVoice) utterance.voice = britishVoice;
      utterance.onend = () => {
        if (run !== dictationRunRef.current) return;
        if (repetition < repeatCount) dictationTimerRef.current = setTimeout(playCurrentSegment, 900);
        else if (segmentIndex < segments.length - 1) { segmentIndex += 1; repetition = 0; dictationTimerRef.current = setTimeout(playCurrentSegment, 1300); }
        else { setDictationPlaying(false); setDictationPaused(false); setDictationMessage("Dictado terminado. Revisa lo que has escrito antes de comprobarlo."); }
      };
      utterance.onerror = () => { if (run !== dictationRunRef.current) return; setDictationPlaying(false); setDictationPaused(false); setDictationMessage("No se pudo completar el audio. Puedes intentarlo de nuevo."); };
      window.speechSynthesis.speak(utterance);
    };
    playCurrentSegment();
  }

  function pauseDictation() { if (!dictationPlaying || dictationPaused) return; window.speechSynthesis.pause(); setDictationPaused(true); }
  function resumeDictation() { if (!dictationPaused) return; window.speechSynthesis.resume(); setDictationPaused(false); }
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
  const activeItems = sectionKey === "practice" ? section.exercise.items.slice(0, 10) : section.exercise.items;
  const item = activeItems[index];
  const preA1Audio = mission.course.level.toUpperCase() === "PRE-A1" ? preA1Listening[mission.mission.position ?? 0] : undefined;
  const listeningAudioTranscript = preA1Audio?.audioTranscript ?? section.exercise.content?.audioTranscript ?? "";
  const listeningTemplate = preA1Audio?.template ?? section.exercise.content?.transcriptTemplate ?? "";
  const listeningWordBank = preA1Audio
    ? preA1Audio.words.map((word, index) => ({ wordId: `pre-a1-m${String(mission.mission.position).padStart(3, "0")}-listening-word-${String(index + 1).padStart(2, "0")}`, word }))
    : section.exercise.content?.wordBank ?? [];
  const listeningItems = preA1Audio
    ? preA1Audio.words.map((_, index) => ({ itemId: `pre-a1-m${String(mission.mission.position).padStart(3, "0")}-listening-item-${String(index + 1).padStart(2, "0")}`, position: index + 1, gapToken: `[[gap-${String(index + 1).padStart(2, "0")}]]`, expectedWordId: `pre-a1-m${String(mission.mission.position).padStart(3, "0")}-listening-word-${String(index + 1).padStart(2, "0")}` }))
    : section.exercise.items;
  const pronunciationSection = mission.sections.find((entry) => entry.sectionKey === "pronunciation");
  const exploreItems = mission.sections.find((entry) => entry.sectionKey === "explore")?.exercise.items ?? [];
  const pronunciationByWord = new Map([...exploreItems, ...(pronunciationSection?.exercise.items ?? [])].map((entry) => [((entry.word ?? entry.english) ?? "").toLowerCase(), entry.pronunciationGuide ?? ""]));
  const progress = useMemo(() => activeItems.length ? Math.round(((index + (checked ? 1 : 0)) / activeItems.length) * 100) : 0, [index, checked, activeItems.length]);

  function changeSection(key: string) {
    stopDictation();
    setSectionKey(key); setIndex(0); setFeedback(""); setChecked(false); setDraft(""); setListeningAnswers({}); setSelectedListeningWord(""); setScore(0);
  }
  function mark(correct: boolean, expected: string) {
    if (checked) return;
    setChecked(true);
    setFeedback(correct ? "¡Correcto!" : `Respuesta correcta: ${expected}`);
    if (correct) setScore((value) => value + 1);
  }
  function next() {
    stopDictation();
    if (index === activeItems.length - 1) {
      setFeedback("Sección completada. Has llegado al final de las actividades.");
      return;
    }
    setIndex((value) => value + 1);
    setChecked(false); setFeedback(""); setDraft("");
  }

  return (
    <div className="mx-auto w-full max-w-5xl text-[#172033]">
      <header className="relative mb-6 overflow-hidden rounded-[26px] border border-[#e8ebf0] bg-white p-6 shadow-[0_12px_34px_rgba(25,42,70,0.045)] sm:p-8">
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#55779d]">LINGUAFLY ACADEMY <span className="px-1 text-[#c1c9d3]">/</span> NIVEL {mission.course.level}</p>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div><h1 className="mt-2 text-3xl font-semibold tracking-[-.04em] text-[#172033]">{mission.mission.title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[#718096]">{mission.unit.title}</p><p className="mt-3 text-xs text-[#8792a3]">Avanza a tu ritmo. Puedes cambiar de sección cuando quieras.</p></div>
          <span className="rounded-full border border-[#e8ebf0] bg-[#f8fafc] px-3 py-1.5 text-xs font-semibold text-[#64748b]">MISIÓN {String(mission.mission.position ?? 1).padStart(3, "0")}</span>
        </div>
      </header>
      <nav aria-label="Secciones de la misión" className="mb-5 flex gap-2 overflow-x-auto rounded-2xl border border-[#e8ebf0] bg-white p-2 pb-3 shadow-[0_6px_20px_rgba(25,42,70,0.025)]">
        {mission.sections.map((entry, i) => <button key={entry.sectionId} onClick={() => changeSection(entry.sectionKey)} className={`shrink-0 rounded-xl border px-3 py-2.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#557da8] ${sectionKey === entry.sectionKey ? "border-[#183b67] bg-[#183b67] text-white shadow-sm" : "border-transparent bg-[#f7f8fa] text-[#647087] hover:border-[#dce4ed] hover:bg-[#f0f4f8]"}`}><span className="mr-1.5 text-xs opacity-70">{String(i + 1).padStart(2, "0")}</span>{labels[entry.sectionKey]}</button>)}
      </nav>
      <section className="rounded-[26px] border border-[#e8ebf0] bg-white p-5 shadow-[0_12px_34px_rgba(25,42,70,0.04)] sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#8290a3]">ETAPA {String(section.position).padStart(2, "0")} DE 08</p><h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#172033]">{labels[section.sectionKey] ?? section.title}</h2><p className="mt-1 text-xs text-[#8792a3]">{sectionKey === "explore" ? "Explicación visual y traducción de todo el temario." : "Practica lo que has aprendido en Exploración."}</p></div>
          <span className="rounded-full bg-[#f3f6fa] px-3 py-1.5 text-xs font-semibold text-[#65758b]">{sectionKey === "explore" ? "Temario completo" : `${activeItems.length} actividades`}</span>
        </div>
        {sectionKey !== "explore" && <div className="mt-5" aria-label="Progreso de la sección"><div className="mb-2 flex justify-between text-[11px] font-medium text-[#8792a3]"><span>Tu avance en esta etapa</span><span className="tabular-nums">{sectionKey === "listening" ? Object.keys(listeningAnswers).length * 10 : progress}%</span></div><div className="h-2 overflow-hidden rounded-full bg-[#edf0f4]" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={sectionKey === "listening" ? Object.keys(listeningAnswers).length * 10 : progress}><div className="h-full rounded-full bg-[#557da8] transition-all duration-300" style={{ width: `${sectionKey === "listening" ? Object.keys(listeningAnswers).length * 10 : progress}%` }} /></div></div>}
        {section.exercise.theory && sectionKey !== "explore" && <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5"><h3 className="font-semibold">{section.exercise.theory.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{section.exercise.theory.explanation}</p><ul className="mt-4 grid gap-2 text-sm text-slate-700">{section.exercise.theory.patterns.map((pattern) => <li key={pattern.label}>• {pattern.pattern}</li>)}</ul><p className="mt-4 text-sm text-slate-600"><strong>Consejo:</strong> {section.exercise.theory.tip}</p><div className="mt-4 grid gap-2 sm:grid-cols-3">{section.exercise.theory.patterns.map((pattern) => <div key={pattern.label} className="rounded-lg border border-slate-200 bg-white p-3 text-sm"><p className="font-medium">{pattern.pattern}</p><p className="mt-1 text-slate-500">{pattern.examples.join(" · ")}</p></div>)}</div></div>}
        {section.exercise.content?.passage && <article className="mt-6 rounded-xl bg-slate-50 p-5 text-base leading-8 text-slate-700">{section.exercise.content?.passage}</article>}
        {sectionKey === "explore" && <div className="mt-7 space-y-8">
          <div className="rounded-2xl border border-[#dce8f4] bg-gradient-to-br from-[#f3f8fd] to-white p-5 sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#55779d]">ANTES DE PRACTICAR</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#203752]">Primero comprende. Después practica.</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#61738a]">Aquí tienes explicado y traducido todo lo que aparecerá en las actividades de esta misión. No hay preguntas ni ejercicios en esta sección: puedes leer, mirar y escuchar cada ejemplo a tu ritmo.</p><p className="mt-2 text-xs leading-5 text-[#8792a3]">Aviso: los botones de escucha usan voz sintética del navegador; todavía no representan grabaciones de audio reales revisadas por el equipo académico.</p>
          </div>

          <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">01 · VOCABULARIO</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Palabras esenciales</h3><p className="mt-1 text-sm text-[#7b8798]">Mira cada imagen, lee su significado y escucha cómo suena en inglés.</p></div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {section.exercise.items.map((entry) => {
                const visual: Record<string,string> = {
                  hello:"👋",goodbye:"👋",please:"🙏","thank you":"💛",yes:"👍",no:"👎",name:"🪪",friend:"🧑‍🤝‍🧑",teacher:"👩‍🏫",student:"🎒",
                  red:"🔴",blue:"🔵",yellow:"🟡",green:"🟢",black:"⚫",white:"⚪",orange:"🟠",pink:"🩷",purple:"🟣",brown:"🟤",
                  mother:"👩",father:"👨",sister:"👧",brother:"👦",grandmother:"👵",grandfather:"👴",parents:"👨‍👩‍👧",daughter:"👧",son:"👦",family:"👨‍👩‍👧‍👦",
                  dog:"🐶",cat:"🐱",bird:"🐦",fish:"🐟",rabbit:"🐰",horse:"🐴",cow:"🐮",duck:"🦆",sheep:"🐑",lion:"🦁",
                  apple:"🍎",bread:"🍞",cheese:"🧀",rice:"🍚",chicken:"🍗",banana:"🍌",water:"💧",milk:"🥛",juice:"🧃",carrot:"🥕",
                  book:"📘",pen:"🖊️",pencil:"✏️",ruler:"📏",rubber:"🧽",schoolbag:"🎒",notebook:"📓",desk:"🪑",chair:"🪑","pencil case":"🖍️",
                  head:"🙂",hair:"💇",eye:"👁️",ear:"👂",nose:"👃",mouth:"👄",tooth:"🦷",hand:"✋",arm:"💪",leg:"🦵",
                  house:"🏠",kitchen:"🍳",bedroom:"🛏️",bathroom:"🛁","living room":"🛋️",table:"🪑",bed:"🛏️",sofa:"🛋️",door:"🚪",window:"🪟",
                  "wake up":"⏰","get up":"🛌",wash:"🧼",brush:"🪥",eat:"🍽️",drink:"🥤",go:"🚶",study:"📚",play:"🧸",sleep:"😴",
                  run:"🏃",jump:"🤸",climb:"🧗",swing:"🛝",slide:"🛝",stop:"🛑",walk:"🚶",hop:"🐇",skip:"🦘"
                };
                const numberCounts: Record<string,number> = {one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10};
                const word = (entry.english ?? "").toLowerCase();
                const count = numberCounts[word];
                const pronunciationGuide = pronunciationByWord.get(word);
                return <article key={entry.itemId} className="flex min-w-0 flex-col items-center rounded-2xl border border-[#e8ebf0] bg-white p-3 text-center sm:p-4">
                  <div aria-hidden="true" className="grid h-16 w-16 place-items-center rounded-2xl bg-[#f2f6fb] sm:h-20 sm:w-20">
                    {count ? <div className="flex flex-col items-center justify-center"><span className="text-3xl font-extrabold leading-none text-[#2872c8] sm:text-4xl">{count}</span><span className="mt-1 grid grid-cols-5 gap-0.5 text-[10px] leading-none sm:text-xs">{Array.from({length:count},(_,i)=><span key={i}>🍎</span>)}</span></div> : <span className="text-4xl sm:text-5xl">{word.length === 1 && /^[a-z]$/.test(word) ? "🔠" : visual[word] ?? "🖼️"}</span>}
                  </div>
                  <p className="mt-3 break-words text-base font-bold text-[#26364b] sm:text-lg">{entry.english}</p>
                  <p className="mt-1 text-sm font-medium text-[#64816f]">{entry.spanish}</p>
                  <p className="mt-1 min-h-5 text-xs font-semibold text-[#55708f]">{pronunciationGuide || "Guía de pronunciación pendiente"}</p>
                  <button type="button" aria-label={`Escuchar pronunciación de ${entry.english}`} onClick={() => speak(entry.english ?? "")} className="mt-3 rounded-full border border-[#dce6f0] bg-white px-3 py-1.5 text-xs font-semibold text-[#55708f]">♫ Escuchar voz automática</button>
                </article>;
              })}
            </div>
          </section>

          <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">02 · EXPRESIONES</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Frases que vas a utilizar</h3><p className="mt-1 text-sm text-[#7b8798]">Estas son las expresiones que aparecerán en la práctica de traducción.</p></div>
            <div className="grid gap-3 sm:grid-cols-2">
              {(section.exercise.lesson?.phrases ?? []).map((entry,i) => <article key={i} className="flex items-start gap-3 rounded-xl border border-[#e8ebf0] bg-white p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f2f6fb] text-xl" aria-hidden="true">{["👋","🌅","☀️","🌆","👋","🗓️","🙏","💛","🤝","❓"][i]}</span>
                <div className="min-w-0 flex-1"><p className="font-semibold text-[#26364b]">{entry.english}</p><p className="mt-1 text-sm text-[#64816f]">{entry.spanish}</p>{entry.pronunciationGuide && <p className="mt-1 text-xs font-semibold text-[#55708f]">{entry.pronunciationGuide}</p>}{entry.note && <p className="mt-1 text-xs leading-5 text-[#8290a3]">{entry.note}</p>}</div>
                <button type="button" aria-label={`Escuchar ${entry.english}`} onClick={() => speak(entry.english)} className="shrink-0 rounded-full border border-[#dce6f0] px-3 py-2 text-xs text-[#55708f]">♫</button>
              </article>)}
            </div>
          </section>

          <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">03 · GRAMÁTICA</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">{section.exercise.theory?.title ?? "Gramática de la misión"}</h3><p className="mt-1 text-sm leading-6 text-[#7b8798]">{section.exercise.theory?.explanation}</p></div>
            <div className="grid gap-3 sm:grid-cols-2">
              {section.exercise.theory?.patterns.map((pattern) => <article key={pattern.label} className="rounded-xl border border-[#e8ebf0] bg-[#fbfcfe] p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-[#55779d]">{pattern.label}</p>
                <p className="mt-2 font-semibold text-[#26364b]">{pattern.pattern}</p>
                <ul className="mt-3 space-y-2">{pattern.examples.map(example => <li key={example} className="text-sm text-[#53657b]">• {example}</li>)}</ul>
              </article>)}
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {(section.exercise.lesson?.grammar ?? []).map((entry,i) => <article key={i} className="rounded-xl border border-[#e8ebf0] bg-white p-4">
                <p className="font-semibold text-[#26364b]">{entry.english}</p><p className="mt-1 text-sm font-medium text-[#64816f]">{entry.spanish}</p>{entry.note && <p className="mt-1 text-xs leading-5 text-[#8290a3]">{entry.note}</p>}
                <button type="button" onClick={() => speak(entry.english)} className="mt-2 text-xs font-semibold text-[#55708f]">♫ Escuchar ejemplo</button>
              </article>)}
            </div>
            {section.exercise.theory?.tip && <p className="mt-3 rounded-xl bg-[#f3f7fb] p-4 text-sm leading-6 text-[#53657b]"><strong>Recuerda:</strong> {section.exercise.theory.tip}</p>}
          </section>

          <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">04 · PRONUNCIACIÓN</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Así suenan las palabras</h3><p className="mt-1 text-sm text-[#7b8798]">La guía escrita es aproximada; escucha el modelo de inglés británico.</p></div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {mission.sections.find(s => s.sectionKey === "pronunciation")?.exercise.items.map(entry => <article key={entry.itemId} className="rounded-xl border border-[#e8ebf0] bg-white p-4">
                <p className="text-lg font-bold text-[#26364b]">{entry.word}</p><p className="text-sm text-[#64816f]">{entry.translation}</p><p className="mt-2 rounded-lg bg-[#f3f7fb] px-3 py-2 text-sm font-semibold text-[#55708f]">{entry.pronunciationGuide}</p>
                <button type="button" onClick={() => speak(entry.word ?? "")} className="mt-3 rounded-full border border-[#dce6f0] px-3 py-1.5 text-xs font-semibold text-[#55708f]">♫ Escuchar</button>
              </article>)}
            </div>
          </section>

          <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">05 · LECTURA</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Lee y comprende el texto</h3><p className="mt-1 text-sm text-[#7b8798]">Cada frase aparece con su traducción para que entiendas el texto antes de responder preguntas.</p></div>
            <div className="space-y-2">{(section.exercise.lesson?.reading ?? []).map((entry,i) => <article key={i} className="grid gap-1 rounded-xl border border-[#e8ebf0] bg-white p-4 sm:grid-cols-2 sm:gap-4"><p className="font-medium text-[#26364b]">{entry.english}</p><p className="text-sm text-[#64816f]">{entry.spanish}</p></article>)}</div>
          </section>

          <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">06 · ESCRITURA</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Frases del dictado</h3><p className="mt-1 text-sm text-[#7b8798]">Estas son exactamente las frases que escucharás y escribirás en la actividad.</p></div>
            <div className="grid gap-2 sm:grid-cols-2">{(section.exercise.lesson?.writing ?? []).map((entry,i) => <article key={i} className="rounded-xl border border-[#e8ebf0] bg-white p-4"><p className="font-semibold text-[#26364b]">{entry.english}</p><p className="mt-1 text-sm text-[#64816f]">{entry.spanish}</p><button type="button" onClick={() => speak(entry.english)} className="mt-2 text-xs font-semibold text-[#55708f]">♫ Escuchar frase</button></article>)}</div>
          </section>

          <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">07 · EXPRESIÓN ORAL</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Lo que podrás decir</h3><p className="mt-1 text-sm text-[#7b8798]">Primero entiende la consigna y aprende una posible respuesta.</p></div>
            <div className="grid gap-3 sm:grid-cols-2">{(section.exercise.lesson?.speaking ?? []).map((entry,i) => <article key={i} className="rounded-xl border border-[#e8ebf0] bg-white p-4">
              <p className="text-xs font-semibold text-[#8290a3]">{entry.promptSpanish}</p><p className="mt-2 font-semibold text-[#26364b]">{entry.english}</p><p className="mt-1 text-sm text-[#64816f]">{entry.spanish}</p><button type="button" onClick={() => speak(entry.english)} className="mt-2 text-xs font-semibold text-[#55708f]">♫ Escuchar modelo</button>
            </article>)}</div>
          </section>

          <section>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8290a3]">08 · COMPRENSIÓN AUDITIVA</p><h3 className="mt-1 text-lg font-semibold text-[#26364b]">Escucha el contenido antes del ejercicio</h3><p className="mt-1 text-sm text-[#7b8798]">Lee el audio completo con su traducción. Después podrás reconocer estas mismas palabras y expresiones al escucharlas.</p></div>
            <div className="mb-3 rounded-xl border border-[#dce8f4] bg-[#f3f8fd] p-4"><p className="text-xs font-bold uppercase tracking-wide text-[#55779d]">Audio completo</p><button type="button" onClick={() => speak(mission.sections.find(s => s.sectionKey === "listening")?.exercise.content?.audioTranscript?.replace(/^tts:en-GB:/,"") ?? "")} className="mt-2 rounded-full border border-[#dce6f0] bg-white px-3 py-2 text-xs font-semibold text-[#55708f]">♫ Escuchar audio modelo</button></div>
            <div className="space-y-2">{(section.exercise.lesson?.listening ?? []).map((entry,i) => <article key={i} className="grid gap-1 rounded-xl border border-[#e8ebf0] bg-white p-4 sm:grid-cols-2 sm:gap-4"><p className="font-medium text-[#26364b]">{entry.english}</p><p className="text-sm text-[#64816f]">{entry.spanish}</p></article>)}</div>
          </section>
          <div className="rounded-2xl border border-[#dce8f4] bg-[#f3f8fd] p-5 text-center"><p className="text-sm font-semibold text-[#284866]">Ya has visto y comprendido el temario de esta misión.</p><p className="mt-1 text-sm text-[#61738a]">Cuando estés preparado, pasa a las actividades para practicarlo.</p></div>
        </div>}
        {sectionKey === "pronunciation" && <div className="mt-6 grid gap-3 sm:grid-cols-2">{section.exercise.items.map((entry) => <article key={entry.itemId} className="rounded-xl border border-slate-200 p-4"><p className="text-lg font-semibold">{entry.word}</p><p className="text-sm text-slate-500">{entry.translation}</p><p className="mt-2 font-medium text-blue-700">{entry.pronunciationGuide}</p><p className="text-xs text-slate-400">Guía aproximada para hispanohablantes; no es IPA.</p><button onClick={() => speak(entry.word ?? "")} className="mt-3 rounded-lg border border-slate-200 px-3 py-2 text-sm">▶ Escuchar modelo británico</button></article>)}</div>}
        {["practice", "grammar", "reading"].includes(sectionKey) && item && <div className="mt-7"><p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Actividad {index + 1} de {activeItems.length}</p><h3 className="mt-3 text-lg font-semibold leading-7">{item.prompt}</h3><div className="mt-5 grid gap-2">{item.options?.map((option) => <button key={option} disabled={checked} onClick={() => mark(option === item.answer, item.answer ?? "")} className={`rounded-xl border px-4 py-3 text-left text-sm transition disabled:cursor-default ${checked && option === item.answer ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:border-blue-400"}`}>{option}</button>)}</div></div>}
{sectionKey === "writing" && item && <div className="mt-7"><p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Dictado {index + 1} de 10 · {item.kind === "passage" ? "Texto" : "Una frase"}</p><p className="mt-3 text-sm leading-6 text-slate-600">Escucha como en un dictado de clase. Cada frase se reproduce tres veces: a ritmo natural, más despacio y de nuevo a ritmo natural. El texto no se muestra hasta que compruebes tu respuesta.</p><div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5"><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-sm font-semibold text-slate-800">Dictado guiado</p><span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">3 repeticiones por frase</span></div><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={startDictation} className="rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white">▶ {dictationPlaying ? "Reiniciar dictado" : "Reproducir dictado"}</button><button type="button" onClick={dictationPaused ? resumeDictation : pauseDictation} disabled={!dictationPlaying} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 disabled:opacity-40">{dictationPaused ? "Continuar" : "Pausar"}</button><button type="button" onClick={stopDictation} disabled={!dictationPlaying} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 disabled:opacity-40">Detener</button></div><div className="mt-4 flex items-center justify-between gap-3 text-xs text-slate-500"><span>Frase {dictationSegment + 1} de {item.segments?.length ?? 1}</span><span>Repetición {dictationRepeat || 0} de {item.repeatCount ?? 3}</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-blue-700 transition-all" style={{ width: (((dictationSegment * (item.repeatCount ?? 3)) + dictationRepeat) / ((item.segments?.length ?? 1) * (item.repeatCount ?? 3))) * 100 + "%" }} /></div><p role="status" aria-live="polite" className="mt-3 text-xs leading-5 text-slate-500">{dictationMessage || "Pulsa reproducir para empezar. Puedes pausar o repetir el dictado."}</p></div><label className="mt-5 block text-sm font-medium">Escribe lo que has escuchado<textarea value={draft} onChange={(e) => setDraft(e.target.value)} disabled={checked} rows={item.kind === "passage" ? 7 : 3} placeholder="Escribe aquí el dictado completo…" className="mt-2 block w-full resize-y rounded-xl border border-slate-300 p-3 leading-7 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50" /></label><p className="mt-2 text-xs text-slate-500">Puedes volver a escuchar el audio tantas veces como necesites.</p><button disabled={checked || !draft.trim()} onClick={() => { const normalise = (value: string) => value.toLocaleLowerCase("en-GB").normalize("NFKC").replace(/[.,!?;:'’"]/g, "").replace(/\s+/g, " ").trim(); mark(normalise(draft) === normalise(item.expectedAnswer ?? ""), item.expectedAnswer ?? ""); }} className="mt-3 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-40">Comprobar dictado</button></div>}
        {sectionKey === "speaking" && item && <div className="mt-7"><p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Tarea oral {index + 1} de 10</p><h3 className="mt-3 text-lg font-semibold">{item.prompt}</h3><div className="mt-4 rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Modelo de referencia</p><p className="mt-2 text-sm text-slate-700">{item.modelAnswer}</p><button onClick={() => speak(item.modelAnswer ?? "")} className="mt-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">▶ Escuchar modelo</button></div><div className="mt-4 flex flex-wrap gap-2"><button onClick={recording ? stopRecording : startRecording} className={recording ? "rounded-xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white" : "rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white"}>{recording ? "■ Detener grabación" : "● Grabar mi respuesta"}</button>{recordedUrl && <audio controls src={recordedUrl} className="w-full" />}</div><p role="status" className="mt-3 text-sm text-slate-500">{recordingMessage || "La grabación permanece en esta página y no se envía al servidor."}</p><p className="mt-2 text-xs text-slate-400">No se genera una nota fonética automática en esta versión.</p><button disabled={checked} onClick={() => { setChecked(true); setFeedback("Tarea oral completada. Tu grabación permanece en esta página y no se ha evaluado."); }} className="mt-4 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold disabled:opacity-40">Marcar tarea como completada</button></div>}
        {sectionKey === "listening" && <div className="mt-7">
          <p className="text-sm leading-6 text-slate-600">Escucha el pasaje completo y completa los diez huecos seleccionando palabras del banco. Puedes mover o sustituir palabras antes de comprobar.</p>
          <button onClick={() => speak(listeningAudioTranscript)} className="mt-3 rounded-xl border border-slate-200 px-4 py-3 text-sm">▶ Escuchar audio completo</button>
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
          <div className="mt-5 rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Banco de palabras</p><div className="mt-3 flex flex-wrap gap-2">{listeningWordBank.map((bankItem) => bankItem.word).map((word) => <button key={word} disabled={checked || Object.values(listeningAnswers).includes(word)} onClick={() => setSelectedListeningWord(word)} className={`rounded-lg border px-3 py-2 text-sm ${selectedListeningWord === word ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-white"} disabled:opacity-30`}>{word}</button>)}</div><p className="mt-3 text-xs text-slate-500">{selectedListeningWord ? `Seleccionada: ${selectedListeningWord}. Pulsa un hueco para colocarla.` : `${Object.keys(listeningAnswers).length} de 10 palabras colocadas. Pulsa un hueco ocupado para devolver su palabra al banco.`}</p></div>
          <button disabled={checked || Object.keys(listeningAnswers).length !== 10} onClick={() => { const correct = listeningItems.filter((entry) => listeningAnswers[entry.itemId]?.toLowerCase() === entry.answer?.toLowerCase()).length; setScore((value) => value + correct); setChecked(true); setFeedback(`Resultado: ${correct} de 10 respuestas correctas. Soluciones: ${listeningItems.map((entry, i) => `${i + 1}. ${entry.answer}`).join(" · ")}`); }} className="mt-4 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-40">Comprobar las 10 respuestas</button>
        </div>}
        {feedback && <p role="status" aria-live="polite" className="mt-5 rounded-2xl border border-[#e4ebf2] bg-[#f5f8fb] p-4 text-sm font-semibold leading-6 text-[#43546b]">{feedback}</p>}
        {sectionKey !== "explore" && sectionKey !== "pronunciation" && sectionKey !== "listening" && <div className="mt-7 flex items-center justify-between gap-3"><span className="text-xs text-slate-400">Puntuación de esta sesión: {score}</span><button onClick={next} disabled={!checked} className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">{index === activeItems.length - 1 ? "Finalizar sección" : "Siguiente →"}</button></div>}
      </section>
      <p className="mt-4 text-center text-[11px] leading-5 text-[#9aa3b1]">Vista piloto · El progreso y las grabaciones son temporales y no se guardan en tu cuenta.</p>
    </div>
  );
}
