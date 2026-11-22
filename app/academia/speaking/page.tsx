"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";

type Example = { word: string; ipa: string; cue: string; sounds: string; tip: string };
const examples: Example[] = [
  { word: "future", ipa: "/ˈfjuː.tʃə/", cue: "FYOO-chuh", sounds: "fyoo-chuh", tip: "Empieza con /f/ y desliza hacia /j/ como una «y» suave. La primera sílaba lleva el acento; la r final no se pronuncia en el modelo británico no rótico." },
  { word: "water", ipa: "/ˈwɔː.tə/", cue: "WAW-tuh", sounds: "waw-tuh", tip: "Alarga la vocal /ɔː/. En inglés británico estándar la r final no suena; evita convertirla en una r española." },
  { word: "three", ipa: "/θriː/", cue: "THREE", sounds: "th-ríi", tip: "Coloca suavemente la punta de la lengua entre los dientes para /θ/. No lo sustituyas por /t/ ni por /s/. Mantén larga la /iː/." },
  { word: "thought", ipa: "/θɔːt/", cue: "THAWT", sounds: "thawt", tip: "Empieza con /θ/ colocando la lengua entre los dientes. Mantén /ɔː/ larga y termina con una /t/ clara." },
  { word: "comfortable", ipa: "/ˈkʌm.fə.tə.bəl/", cue: "KUM-fuh-tuh-buhl", sounds: "kam-fuh-tuh-bol", tip: "Tiene cuatro sílabas en esta pronunciación habitual. El acento cae en la primera: KUM. Las vocales no acentuadas se debilitan." },
  { word: "schedule", ipa: "/ˈʃed.juːl/", cue: "SHED-yool", sounds: "shed-yul", tip: "En la pronunciación británica habitual empieza por /ʃ/, como «sh», no por /sk/. La primera sílaba es la tónica." },
];

export default function SpeakingPage() {
  const [index, setIndex] = useState(0);
  const [recording, setRecording] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [level, setLevel] = useState("B1");
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const current = examples[index];
  const supported = typeof window !== "undefined" && !!navigator.mediaDevices?.getUserMedia;
  const pronounce = () => {
    const utterance = new SpeechSynthesisUtterance(current.word);
    utterance.lang = "en-GB";
    utterance.rate = 0.82;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };
  const start = async () => {
    setError(""); setResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "";
      const mr = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      chunks.current = [];
      mr.ondataavailable = e => { if (e.data.size) chunks.current.push(e.data); };
      mr.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        const blob = new Blob(chunks.current, { type: mr.mimeType || "audio/webm" });
        const form = new FormData();
        form.append("audio", blob, "speaking.webm");
        form.append("targetPhrase", current.word);
        form.append("language", "en");
        form.append("userId", "speaking");
        try {
          setBusy(true);
          const response = await fetch("/api/pronunciation/analyze", { method: "POST", body: form });
          const data: any = await response.json();
          if (!response.ok) throw new Error(data.error || "No se ha podido analizar la grabación.");
          setResult(data);
        } catch (e) { setError(e instanceof Error ? e.message : "Error de análisis"); }
        finally { setBusy(false); }
      };
      recorder.current = mr; mr.start(); setRecording(true);
    } catch { setError("No se ha podido acceder al micrófono. Comprueba los permisos del navegador."); }
  };
  const stop = () => { if (recorder.current?.state === "recording") { recorder.current.stop(); setRecording(false); } };
  const next = () => { setIndex(i => (i + 1) % examples.length); setResult(null); setError(""); };
  const scoreLabel = useMemo(() => result ? (result.similarityType === "phonetic" ? "Evaluación fonética" : "Coincidencia de transcripción") : "", [result]);
  return <main className="mx-auto min-h-[70vh] max-w-5xl px-5 py-10">
    <Link href="/academia" className="text-sm font-semibold text-blue-700">← Academia</Link>
    <section className="mt-5 overflow-hidden rounded-3xl bg-slate-950 px-7 py-10 text-white sm:px-12">
      <p className="text-sm font-bold uppercase tracking-[.2em] text-cyan-300">LINGUAFLY · SPEAKING LAB</p>
      <h1 className="mt-3 text-4xl font-black sm:text-5xl">Speak with confidence.</h1>
      <p className="mt-4 max-w-2xl text-slate-300">Practica la pronunciación del inglés británico, escucha un modelo, grábate y recibe orientación para mejorar sonidos, ritmo y acentuación.</p>
      <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold"><span className="rounded-full bg-white/10 px-3 py-2">🇬🇧 British English</span><span className="rounded-full bg-white/10 px-3 py-2">IPA + trucos fonéticos</span><span className="rounded-full bg-white/10 px-3 py-2">Micrófono</span></div>
    </section>
    <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-between"><p className="text-xs font-black uppercase tracking-widest text-blue-700">Pronunciation challenge · {index+1}/{examples.length}</p><select aria-label="Nivel" value={level} onChange={e=>setLevel(e.target.value)} className="rounded-full border border-slate-200 px-3 py-2 text-sm">{["A1","A2","B1","B2","C1","C2"].map(x=><option key={x}>{x}</option>)}</select></div>
        <h2 className="mt-7 text-5xl font-black tracking-tight text-slate-950">{current.word}</h2>
        <p className="mt-3 font-mono text-xl text-blue-700">{current.ipa}</p>
        <p className="mt-1 text-lg font-semibold text-slate-600">Aproximación: “{current.cue}”</p>
        <div className="mt-6 rounded-2xl bg-blue-50 p-5"><p className="text-xs font-black uppercase tracking-wider text-blue-800">Cómo colocar la boca y producir el sonido</p><p className="mt-2 leading-7 text-slate-700">{current.tip}</p></div>
        <div className="mt-6 flex flex-wrap gap-3"><button onClick={pronounce} className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700">🔊 Escuchar en inglés británico</button><button onClick={next} className="rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-700 hover:bg-slate-50">Siguiente palabra →</button></div>
        <div className="mt-8 border-t border-slate-100 pt-6">
          <p className="font-bold text-slate-900">Ahora te toca a ti</p><p className="mt-1 text-sm text-slate-500">Pulsa grabar, di la palabra con naturalidad y detén la grabación para analizarla.</p>
          <div className="mt-4 flex items-center gap-3"><button disabled={busy} onClick={recording?stop:start} className={`rounded-full px-6 py-4 font-bold text-white disabled:opacity-50 ${recording?"bg-red-600":"bg-slate-950"}`}>{recording?"■ Detener grabación":"🎙 Grabar pronunciación"}</button><span className="text-sm text-slate-500">{recording?"Grabando…":busy?"Analizando con Workers AI…":"Micro: listo"}</span></div>
          {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          {result && <div className="mt-5 rounded-2xl border border-slate-200 p-5"><p className="font-bold text-slate-900">Resultado: {scoreLabel}</p><p className="mt-2 text-sm text-slate-600">El sistema ha entendido: <strong>{result.transcription}</strong></p><p className="mt-2 text-sm leading-6 text-slate-700">{result.feedback}</p>{result.phoneticIssues?.length>0&&<ul className="mt-3 list-disc pl-5 text-sm text-amber-800">{result.phoneticIssues.map((x:string,i:number)=><li key={i}>{x}</li>)}</ul>}<p className="mt-3 text-xs text-slate-500">La transcripción comprueba qué palabra se ha reconocido. No mide por sí sola la calidad exacta de cada fonema.</p></div>}
        </div>
      </article>
      <aside className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-6"><h3 className="text-lg font-black text-slate-950">British pronunciation tip</h3><p className="mt-3 leading-7 text-slate-600">En el inglés británico estándar no rótico (por ejemplo, Received Pronunciation), la <strong>r</strong> escrita normalmente no se pronuncia al final de una sílaba: <em>car</em> /kɑː/, <em>water</em> /ˈwɔːtə/. Sí se enlaza cuando la siguiente palabra empieza por vocal.</p></div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6"><h3 className="text-lg font-black text-slate-950">Sounds to master</h3><div className="mt-4 space-y-3 text-sm">{[["/θ/","think, three"],["/ð/","this, mother"],["/ʃ/","ship, schedule"],["/tʃ/","chair, future"],["/ə/","about, teacher"],["/ɜː/","work, learn"]].map(([a,b])=><div key={a} className="flex justify-between gap-3 border-b border-slate-100 pb-2"><strong className="font-mono text-blue-700">{a}</strong><span className="text-slate-600">{b}</span></div>)}</div></div>
        <div className="rounded-3xl bg-cyan-50 p-6"><p className="font-bold text-cyan-950">Un consejo importante</p><p className="mt-2 text-sm leading-6 text-cyan-900">La transcripción automática ayuda a detectar palabras confundidas, pero no equivale a una evaluación fonética profesional. Linguafly mostrará por separado la evidencia medida y los consejos articulatorios.</p></div>
      </aside>
    </section>
  </main>;
}
