"use client";
import { useEffect, useRef, useState } from "react";
type Scenario = { id: string; title: string; description?: string; setting?: string; language: string; level: string; persona_prompt?: string; system_prompt?: string; opening_line?: string };
type Msg = { role: "assistant" | "user"; correction?: string | null; content?: string; audioUrl?: string; messageId?: string };
export default function VoiceConversation({ scenario, userId = "demo-user", onCourseCompleted }: { scenario: Scenario; userId?: string; onCourseCompleted?: () => void; onNextUnit?: () => void }) {
  const [phase, setPhase] = useState<"idle" | "speaking" | "listening" | "processing" | "thinking" | "completed">("idle");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [error, setError] = useState("");
  const [correction, setCorrection] = useState("");
  const [result, setResult] = useState<any>(null);
  const [revealedText, setRevealedText] = useState("");
  const [transcription, setTranscription] = useState("");
  const [typedAnswer, setTypedAnswer] = useState("");
  const [speed, setSpeed] = useState(1);
  const [instruction, setInstruction] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(0);
  const [guided, setGuided] = useState(false);
  const [stepAdvanced, setStepAdvanced] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const chunks = useRef<Blob[]>([]);
  const audio = useRef<HTMLAudioElement | null>(null);

  const play = async (url: string) => {
    if (!url) return;
    audio.current?.pause();
    const player = new Audio(url);
    player.playbackRate = speed;
    audio.current = player;
    setPhase("speaking");
    player.onended = () => setPhase("listening");
    player.onerror = () => { setError("No se pudo reproducir el audio."); setPhase("listening"); };
    try { await player.play(); } catch { setError("No se pudo reproducir el audio."); setPhase("listening"); }
  };

  const start = async () => {
    setError("");
    try {
      const response = await fetch("/api/conversation/start", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ scenarioId: scenario.id, userId }) });
      const data = await response.json() as any;
      if (!response.ok) throw new Error(data.error || "No se pudo iniciar.");
      setSessionId(data.sessionId);
      setMessages([{ role: "assistant", audioUrl: data.audioUrl }]);
      if (typeof data.currentStep === "number") {
        setGuided(true);
        setCurrentStep(data.currentStep);
        setTotalSteps(data.totalSteps || 0);
        setInstruction(data.instruction_es || "");
      }
      await play(data.audioUrl);
    } catch (e) { setError(e instanceof Error ? e.message : "Error al iniciar."); }
  };

  const answer = async (value: string) => {
    const clean = value.trim();
    if (!clean) return;
    setError("");
    setTranscription(clean);
    setTypedAnswer("");
    setMessages(old => [...old, { role: "user", content: clean }]);
    setPhase("thinking");
    try {
      const response = await fetch("/api/conversation/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionId, message: clean, currentStep, level: scenario.level }) });
      const data = await response.json() as any;
      if (!response.ok) throw new Error(data.error || "Error del tutor.");
      setCorrection(data.correction || "");
      if (typeof data.currentStep === "number") setCurrentStep(data.currentStep);
      if (typeof data.totalSteps === "number") setTotalSteps(data.totalSteps);
      if (typeof data.instruction_es === "string") setInstruction(data.instruction_es);
      setStepAdvanced(Boolean(data.stepAdvanced));
      setMessages(old => [...old, { role: "assistant", audioUrl: data.audioUrl, correction: data.correction, messageId: data.messageId }]);
      if (data.completed) {
        await play(data.audioUrl);
        setPhase("completed");
      } else {
        await play(data.audioUrl);
      }
    } catch (e) { setError(e instanceof Error ? e.message : "Error de conversación."); setPhase("listening"); }
  };

  const listen = async () => {
    try {
      stream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunks.current = [];
      const mediaRecorder = new MediaRecorder(stream.current);
      recorder.current = mediaRecorder;
      mediaRecorder.ondataavailable = event => { if (event.data.size) chunks.current.push(event.data); };
      mediaRecorder.onstop = async () => {
        stream.current?.getTracks().forEach(track => track.stop());
        setPhase("processing");
        const blob = new Blob(chunks.current, { type: mediaRecorder.mimeType || "audio/webm" });
        const form = new FormData();
        form.append("audio", blob, "answer.webm");
        form.append("sessionId", sessionId);
        form.append("userId", userId);
        try {
          const response = await fetch("/api/conversation/voice-input", { method: "POST", body: form });
          const data = await response.json() as any;
          if (!response.ok) throw new Error(data.error || "No se ha podido reconocer la voz.");
          if (data.noSpeech) {
            setError("No te he oído. Repite, por favor.");
            if (data.audioUrl) await play(data.audioUrl); else setPhase("listening");
            return;
          }
          const spoken = String(data.transcription || "").trim();
          if (!spoken) { setPhase("listening"); return; }
          await answer(spoken);
        } catch (e) { setError(e instanceof Error ? e.message : "Error al escuchar."); setPhase("listening"); }
      };
      mediaRecorder.start();
      setPhase("listening");
    } catch { setError("Activa el permiso del micrófono en tu móvil u ordenador."); }
  };

  const stopRecording = () => {
    if (recorder.current && recorder.current.state !== "inactive") recorder.current.stop();
  };
  const finish = async () => {
    if (!sessionId) return;
    setPhase("processing");
    try {
      const response = await fetch("/api/conversation/complete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId, scenarioId: scenario.id, sessionId }) });
      const data = await response.json() as any;
      if (!response.ok) throw new Error(data.error || "No se pudo evaluar.");
      setResult(data);
      setPhase("completed");
    } catch (e) { setError(e instanceof Error ? e.message : "Error al evaluar."); setPhase("completed"); }
  };
  useEffect(() => () => { audio.current?.pause(); recorder.current?.stop(); stream.current?.getTracks().forEach(track => track.stop()); }, []);
  const levels: Record<string, string> = { A1: "Principiante", A2: "Elemental", B1: "Intermedio", B2: "Intermedio alto" };
  const levelColors: Record<string, string> = { A1: "bg-blue-100 text-blue-800", A2: "bg-green-100 text-green-800", B1: "bg-yellow-100 text-yellow-900", B2: "bg-orange-100 text-orange-900" };
  const progress = totalSteps ? Math.min(100, currentStep / totalSteps * 100) : 0;
  const lastAudio = [...messages].reverse().find(item => item.audioUrl)?.audioUrl;

  return <section className="mx-auto flex min-h-[min(760px,88vh)] max-w-4xl flex-col rounded-3xl border bg-gray-50 shadow-xl">
    <header className="border-b bg-white px-5 py-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div><h2 className="font-bold text-slate-900">{guided ? scenario.title : "Conversación en inglés"}</h2><p className="text-sm text-slate-500">{levels[scenario.level] || scenario.level}</p></div>
        <span className={"rounded-full px-3 py-1 text-sm font-bold " + (levelColors[scenario.level] || "bg-slate-100 text-slate-700")}>{scenario.level}</span>
      </div>
      {guided && totalSteps > 0 && <div className="mt-4"><div className="mb-2 flex justify-between text-sm font-semibold text-slate-700"><span>Paso {currentStep} de {totalSteps}</span><span>{Math.round(progress)}%</span></div><div className="h-2.5 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: progress + "%" }} /></div></div>}
    </header>
    <main className="flex flex-1 flex-col items-center justify-center gap-5 p-5 sm:p-7">
      {guided && instruction && <div className="w-full rounded-2xl border border-blue-200 bg-white p-4 shadow-sm"><div className="flex items-start gap-3"><span className="text-2xl" aria-hidden="true">🔊</span><div><p className="text-xs font-bold uppercase tracking-wide text-blue-700">Tu instrucción</p><p className="mt-1 text-base font-semibold text-slate-900">{instruction}</p></div></div></div>}
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-5xl">{phase === "speaking" ? "🔊" : phase === "listening" ? "🎙️" : phase === "completed" ? "🎉" : "🎧"}</div>
      <p className="text-center text-lg font-semibold text-slate-800">{phase === "speaking" ? "El tutor está hablando…" : phase === "listening" ? "Te escucho. Habla cuando quieras." : phase === "processing" ? "Procesando tu respuesta…" : phase === "thinking" ? "Tu profesor está evaluando la respuesta…" : phase === "completed" ? "¡Unidad completada!" : "Pulsa para empezar"}</p>
      {lastAudio && <div className="flex flex-wrap justify-center gap-2"><button onClick={() => void play(lastAudio)} className="rounded-full border bg-white px-6 py-3 font-semibold">Repetir</button><button onClick={() => void play(lastAudio)} className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white">Escuchar</button>{[0.75, 1, 1.25].map(rate => <button key={rate} onClick={() => setSpeed(rate)} className={"rounded-full border px-3 py-2 text-sm " + (speed === rate ? "bg-blue-100 text-blue-800" : "bg-white")}>{rate.toLocaleString("es-ES")}×</button>)}</div>}
      {transcription && <div className="w-full rounded-xl bg-white p-3 text-sm text-slate-700"><strong>Tu respuesta:</strong> {transcription}</div>}
      {correction && <div className="w-full rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950"><strong>Corrección</strong><p className="mt-1">{correction}</p></div>}
      {error && <p role="alert" className="w-full rounded-xl bg-red-50 p-3 text-red-700">{error}</p>}
      {phase === "listening" && <form className="w-full space-y-2" onSubmit={event => { event.preventDefault(); void answer(typedAnswer); }}><label className="block text-sm font-medium text-slate-700" htmlFor="spoken-answer">También puedes escribir tu respuesta</label><div className="flex gap-2"><input id="spoken-answer" value={typedAnswer} onChange={event => setTypedAnswer(event.target.value)} placeholder="Escribe aquí en inglés…" className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500" /><button type="submit" disabled={!typedAnswer.trim()} className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white disabled:opacity-40">Enviar</button></div></form>}
      {result && <div className="w-full rounded-xl bg-white p-4 text-center"><strong>{result.score}/100</strong><p>{result.feedback}</p><button onClick={async () => { const last = [...messages].reverse().find(item => item.role === "assistant" && item.messageId); if (!last?.messageId) return; const response = await fetch("/api/conversation/transcript", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionId, messageId: last.messageId, userId }) }); const data = await response.json() as any; if (response.ok) setRevealedText(data.transcript || ""); else setError(data.error || "No se ha podido mostrar la transcripción."); }} className="mt-3 rounded-lg border px-4 py-2">Ver transcripción</button>{revealedText && <p className="mt-3 rounded-lg bg-blue-50 p-3 text-left">{revealedText}</p>}</div>}
    </main>
    <footer className="flex flex-wrap justify-center gap-3 border-t bg-white p-5">
      {phase === "idle" && <button onClick={() => void start()} className="rounded-full bg-blue-600 px-7 py-3 font-bold text-white">Empezar conversación</button>}
      {phase === "listening" && <><button onClick={() => void listen()} className="rounded-full bg-blue-600 px-7 py-3 font-bold text-white">Hablar</button><button onClick={stopRecording} disabled={!recorder.current || recorder.current.state === "inactive"} className="rounded-full border border-blue-300 px-6 py-3 font-semibold text-blue-800 disabled:opacity-40">Enviar voz</button>{stepAdvanced && <button onClick={() => { setStepAdvanced(false); setError(""); }} className="rounded-full bg-blue-50 px-6 py-3 font-semibold text-blue-800">Siguiente</button>}</>}
      {phase === "speaking" && <button onClick={() => { audio.current?.pause(); setPhase("listening"); }} className="rounded-full bg-slate-200 px-6 py-3">Pausar audio</button>}
      {phase === "completed" && <button onClick={onCourseCompleted} className="rounded-full bg-blue-600 px-7 py-3 font-bold text-white">Volver al curso</button>}
      {!guided && phase === "listening" && <button onClick={() => void finish()} className="rounded-full bg-slate-200 px-6 py-3">Finalizar</button>}
    </footer>
  </section>;
}
