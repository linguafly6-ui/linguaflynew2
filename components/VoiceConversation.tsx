"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface VoiceScenario {
  id: string;
  title: string;
  description?: string;
  setting?: string;
  language: string;
  level: string;
  persona_prompt: string;
  opening_line: string;
}
interface VoiceMessage { role: "assistant" | "user"; content: string; correction?: string | null; }
type Phase = "idle" | "speaking" | "listening" | "processing" | "thinking" | "completed";

export default function VoiceConversation({ scenario, userId = "demo-user", onCourseCompleted }: { scenario: VoiceScenario; userId?: string; onCourseCompleted?: () => void }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [hint, setHint] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [starting, setStarting] = useState(false);
  const [revealedText, setRevealedText] = useState("");

  const activeRef = useRef(false);
  const sessionRef = useRef<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const monitorRef = useRef<number | null>(null);
  const subtitleTimerRef = useRef<number | null>(null);
  const listeningStartedRef = useRef(0);
  const voiceStartedRef = useRef(false);
  const lastVoiceAtRef = useRef(0);
  const hintRequestedRef = useRef(false);
  const discardRecordingRef = useRef(false);
  const lastSpokenRef = useRef("");
  const processingRef = useRef(false);
  const requestControllersRef = useRef<Set<AbortController>>(new Set());
  const startCancelledRef = useRef(false);

  const conversationFetch = useCallback(async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const controller = new AbortController();
    requestControllersRef.current.add(controller);
    try {
      return await fetch(input, { ...init, signal: controller.signal });
    } finally {
      requestControllersRef.current.delete(controller);
    }
  }, []);

  const abortConversationRequests = useCallback(() => {
    requestControllersRef.current.forEach((controller) => controller.abort());
    requestControllersRef.current.clear();
  }, []);

  const stopMonitor = useCallback(() => {
    if (monitorRef.current !== null) { window.clearInterval(monitorRef.current); monitorRef.current = null; }
  }, []);

  const releaseAudio = useCallback(() => {
    stopMonitor();
    if (subtitleTimerRef.current !== null) { window.clearInterval(subtitleTimerRef.current); subtitleTimerRef.current = null; }
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== "inactive") { discardRecordingRef.current = true; recorder.stop(); }
    recorderRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    analyserRef.current = null;
    if (contextRef.current) { void contextRef.current.close().catch(() => undefined); contextRef.current = null; }
    audioRef.current?.pause();
    audioRef.current = null;
    if (audioUrlRef.current) { URL.revokeObjectURL(audioUrlRef.current); audioUrlRef.current = null; }
    window.speechSynthesis?.cancel();
  }, [stopMonitor]);

  const browserSpeak = useCallback((text: string) => new Promise<void>((resolve) => {
    if (!( "speechSynthesis" in window)) { resolve(); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const code = scenario.language.toLowerCase().split("-")[0];
    const locales: Record<string, string> = { en: "en-US", es: "es-ES", fr: "fr-FR", de: "de-DE", it: "it-IT", pt: "pt-PT" };
    utterance.lang = locales[code] || scenario.language;
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  }), [scenario.language]);

  const beginListening = useCallback(() => {
    if (!activeRef.current || !streamRef.current || !analyserRef.current) return;
    try {
      chunksRef.current = [];
      voiceStartedRef.current = false;
      hintRequestedRef.current = false;
      processingRef.current = false;
      listeningStartedRef.current = Date.now();
      lastVoiceAtRef.current = 0;
      const mimeType = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"].find((type) => MediaRecorder.isTypeSupported(type));
      const recorder = mimeType ? new MediaRecorder(streamRef.current, { mimeType }) : new MediaRecorder(streamRef.current);
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => { if (event.data.size > 0) chunksRef.current.push(event.data); };
      recorder.onstop = async () => {
        if (discardRecordingRef.current || !activeRef.current) { discardRecordingRef.current = false; chunksRef.current = []; return; }
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        chunksRef.current = [];
        if (!blob.size) { setNotice("No he podido oírte. Vamos otra vez."); if (activeRef.current) beginListening(); return; }
        setPhase("processing");
        try {
          const form = new FormData();
          form.append("audio", blob, "linguafly-voice.webm");
          form.append("language", scenario.language);
          const response = await conversationFetch("/api/conversation/voice-input", { method: "POST", body: form });
          const data = await response.json() as any;
          if (!response.ok || data.error) throw new Error(data.error || "No se pudo transcribir el audio");
          const transcription = String(data.transcription || "").trim();
          if (!transcription) throw new Error("No se ha reconocido ninguna frase");
          setMessages((previous) => [...previous, { role: "user", content: transcription }]);
          setHint(null);
          await answerStudent(transcription);
        } catch (err) {
          if (!activeRef.current) return;
          setError(err instanceof Error ? err.message : "Error al procesar tu voz");
          setPhase("listening");
          beginListening();
        }
      };
      recorder.onerror = () => { if (activeRef.current) { setError("Ha ocurrido un problema con el micrófono."); setPhase("listening"); } };
      recorder.start(250);
      setNotice(null);
      setPhase("listening");

      const analyser = analyserRef.current;
      const samples = new Uint8Array(analyser.fftSize);
      monitorRef.current = window.setInterval(() => {
        if (!activeRef.current) return;
        analyser.getByteTimeDomainData(samples);
        let sum = 0;
        for (let index = 0; index < samples.length; index++) { const normalized = (samples[index] - 128) / 128; sum += normalized * normalized; }
        const volume = Math.sqrt(sum / samples.length);
        const now = Date.now();
        const elapsed = now - listeningStartedRef.current;
        if (volume > 0.01) { voiceStartedRef.current = true; lastVoiceAtRef.current = now; }

        if (!voiceStartedRef.current && elapsed >= 8000 && !hintRequestedRef.current) {
          hintRequestedRef.current = true;
          setNotice("¿No te escucho? Intenta hablar.");
          void conversationFetch("/api/conversation/hint", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId: sessionRef.current, lastMessage: lastSpokenRef.current, personaPrompt: scenario.persona_prompt, language: scenario.language, level: scenario.level }),
          }).then(async (response) => {
            const data = await response.json() as any;
            if (response.ok && data.hint && activeRef.current) setHint(data.hint);
          }).catch(() => undefined);
        }
        if (!voiceStartedRef.current && elapsed >= 15000) {
          stopMonitor();
          discardRecordingRef.current = true;
          if (recorder.state !== "inactive") recorder.stop();
          void speakLine(lastSpokenRef.current || scenario.opening_line);
          return;
        }
        if (voiceStartedRef.current && now - lastVoiceAtRef.current >= 1500 && !processingRef.current) {
          processingRef.current = true;
          stopMonitor();
          if (recorder.state !== "inactive") recorder.stop();
        }
      }, 100);
    } catch {
      setError("No se pudo iniciar la escucha. Comprueba los permisos del micrófono.");
      setPhase("idle");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario, stopMonitor, conversationFetch]);

  const speakLine = useCallback(async (text: string) => {
    if (!activeRef.current || !text.trim()) return;
    lastSpokenRef.current = text;
    setRevealedText("");
    if (subtitleTimerRef.current !== null) window.clearInterval(subtitleTimerRef.current);
    let visibleCharacters = 0;
    subtitleTimerRef.current = window.setInterval(() => {
      visibleCharacters = Math.min(text.length, visibleCharacters + 2);
      setRevealedText(text.slice(0, visibleCharacters));
      if (visibleCharacters >= text.length && subtitleTimerRef.current !== null) {
        window.clearInterval(subtitleTimerRef.current);
        subtitleTimerRef.current = null;
      }
    }, 28);
    setPhase("speaking");
    setNotice(null);
    setHint(null);
    try {
      const response = await conversationFetch("/api/conversation/voice-output", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language: scenario.language }),
      });
      if (!response.ok) throw new Error("TTS no disponible");
      const blob = await response.blob();
      if (!blob.size) throw new Error("Audio vacío");
      if (!activeRef.current) return;
      if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
      const url = URL.createObjectURL(blob);
      audioUrlRef.current = url;
      const audio = new Audio(url);
      audioRef.current = audio;
      await new Promise<void>((resolve, reject) => {
        audio.onended = () => resolve();
        audio.onerror = () => reject(new Error("No se pudo reproducir el audio"));
        audio.play().catch(reject);
      });
    } catch {
      await browserSpeak(text);
    }
    if (subtitleTimerRef.current !== null) { window.clearInterval(subtitleTimerRef.current); subtitleTimerRef.current = null; }
    setRevealedText(text);
    if (activeRef.current) beginListening();
  }, [browserSpeak, beginListening, scenario.language, conversationFetch]);

  const answerStudent = useCallback(async (message: string) => {
    if (!activeRef.current || !sessionRef.current) return;
    setPhase("thinking");
    try {
      const response = await conversationFetch("/api/conversation/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionRef.current, message, personaPrompt: scenario.persona_prompt, language: scenario.language, level: scenario.level }),
      });
      const data = await response.json() as any;
      if (!response.ok || data.error) throw new Error(data.error || "No se pudo generar la respuesta");
      const reply = String(data.reply || "").trim();
      if (!reply) throw new Error("La IA no ha devuelto una respuesta");
      setMessages((previous) => [...previous, { role: "assistant", content: reply, correction: data.correction || null }]);
      await speakLine(reply);
    } catch (err) {
      if (!activeRef.current) return;
      setError(err instanceof Error ? err.message : "Error en la conversación");
      setPhase("listening");
      beginListening();
    }
  }, [scenario, speakLine, beginListening, conversationFetch]);

  const startConversation = async () => {
    if (starting || activeRef.current) return;
    startCancelledRef.current = false;
    setStarting(true);
    setError(null);
    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") throw new Error("Este navegador no permite acceder al micrófono.");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
      if (startCancelledRef.current) { stream.getTracks().forEach((track) => track.stop()); return; }
      streamRef.current = stream;
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const context = new AudioContextClass();
      contextRef.current = context;
      const analyser = context.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.75;
      context.createMediaStreamSource(stream).connect(analyser);
      analyserRef.current = analyser;
      await context.resume();
      const response = await conversationFetch("/api/conversation/start", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenarioId: scenario.id, userId }),
      });
      const data = await response.json() as any;
      if (startCancelledRef.current) return;
      if (!response.ok || data.error) throw new Error(data.error || "No se pudo iniciar la conversación");
      sessionRef.current = data.sessionId;
      activeRef.current = true;
      const opening = String(data.openingLine || scenario.opening_line);
      setMessages([{ role: "assistant", content: opening }]);
      await speakLine(opening);
    } catch (err) {
      releaseAudio();
      activeRef.current = false;
      setError(err instanceof Error ? err.message : "No se pudo iniciar la conversación");
      setPhase("idle");
    } finally { setStarting(false); }
  };

  const finishConversation = async () => {
    startCancelledRef.current = true;
    if (!sessionRef.current || !activeRef.current) {
      abortConversationRequests();
      activeRef.current = false;
      releaseAudio();
      setStarting(false);
      setPhase("idle");
      setNotice(null);
      setError("Conversación detenida.");
      return;
    }
    activeRef.current = false;
    abortConversationRequests();
    stopMonitor();
    releaseAudio();
    setPhase("processing");
    setError(null);
    try {
      const response = await fetch("/api/conversation/complete", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, scenarioId: scenario.id, sessionId: sessionRef.current }),
      });
      const data = await response.json() as any;
      if (!response.ok || data.error) throw new Error(data.error || "No se pudo evaluar la conversación");
      setResult(data);
      setPhase("completed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo evaluar la conversación");
      setPhase("completed");
    }
  };

  const retry = () => {
    releaseAudio();
    activeRef.current = false;
    sessionRef.current = null;
    setMessages([]);
    setResult(null);
    setHint(null);
    setNotice(null);
    setError(null);
    setPhase("idle");
  };

  useEffect(() => () => { activeRef.current = false; startCancelledRef.current = true; abortConversationRequests(); releaseAudio(); }, [abortConversationRequests, releaseAudio]);

  const status = phase === "speaking" ? "🤖 Hablando..." : phase === "listening" ? "🔴 Te escucho... habla ahora" : phase === "processing" ? "⏳ Procesando..." : phase === "thinking" ? "🤖 Pensando..." : phase === "completed" ? "Conversación finalizada" : "Listo para hablar";
  const passed = Number(result?.score || 0) >= 60;

  return (
    <div className="relative mx-auto flex min-h-[min(780px,88vh)] max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-slate-50 via-white to-blue-50 shadow-xl shadow-slate-200/70">
      <style jsx>{`@keyframes fade-in-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <header className="flex items-center justify-between gap-3 border-b border-slate-100/80 px-5 py-4 sm:px-7">
        <div className="min-w-0"><h2 className="truncate text-base font-bold text-slate-800">{scenario.title}</h2><p className="text-xs text-slate-400">{scenario.level} · {scenario.setting}</p></div>
        {(phase !== "idle" && phase !== "completed" || starting) && <button type="button" onClick={finishConversation} className="shrink-0 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-100">■ Detener conversación</button>}
      </header>
      <main className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-6 sm:px-8">
        {messages.map((message, index) => <div key={index} style={{ animation: "fade-in-up .35s ease-out" }} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
          <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${message.role === "user" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-800"}`}>
            <p className="mb-1 text-[11px] font-bold opacity-65">{message.role === "user" ? "🧑 Alumno" : "🤖 LinguaFly"}</p>
            <p className="whitespace-pre-wrap leading-relaxed">{index === messages.length - 1 && message.role === "assistant" && phase === "speaking" ? revealedText : message.content}</p>
            {message.correction && <div className="mt-3 rounded-xl border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-950"><p className="mb-1 font-bold">📝 Corrección</p>{message.correction}</div>}
          </div>
        </div>)}
        {hint && phase === "listening" && <div className="self-center rounded-full border border-yellow-200 bg-yellow-50/90 px-4 py-2 text-sm text-yellow-900 shadow-sm">💡 {hint}</div>}
        {notice && phase === "listening" && <p className="self-center text-xs text-slate-400">{notice}</p>}
        {error && <p className="self-center rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>}
      </main>
      <footer className="flex min-h-24 flex-col items-center justify-center gap-2 border-t border-slate-100/80 bg-white/60 px-4 py-5">
        {phase === "speaking" && <div className="flex h-7 items-end gap-1.5" aria-label="Hablando"><span className="h-3 w-1.5 animate-pulse rounded-full bg-blue-500" /><span className="h-6 w-1.5 animate-pulse rounded-full bg-blue-500 [animation-delay:100ms]" /><span className="h-4 w-1.5 animate-pulse rounded-full bg-blue-500 [animation-delay:200ms]" /><span className="h-7 w-1.5 animate-pulse rounded-full bg-blue-500 [animation-delay:300ms]" /></div>}
        {phase === "listening" && <span className="h-4 w-4 animate-pulse rounded-full bg-red-500 shadow-[0_0_0_7px_rgba(239,68,68,0.12)]" />}
        {(phase === "processing" || phase === "thinking") && <span className="h-6 w-6 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />}
        <p className={`text-center text-lg font-semibold transition-all duration-300 ${phase === "listening" ? "text-red-600" : "text-slate-700"}`}>{status}</p>
        {phase === "thinking" && <div className="flex gap-1"><span className="animate-bounce">•</span><span className="animate-bounce [animation-delay:120ms]">•</span><span className="animate-bounce [animation-delay:240ms]">•</span></div>}
        {phase === "idle" && <button type="button" onClick={startConversation} disabled={starting} className="mt-2 rounded-full bg-blue-600 px-7 py-3 font-bold text-white shadow-lg shadow-blue-200 transition duration-300 hover:scale-[1.02] hover:bg-blue-700 disabled:opacity-60">{starting ? "Conectando..." : "🔊 Empezar conversación"}</button>}
        {phase === "completed" && result && <div className="mt-3 w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <p className="text-2xl font-extrabold text-slate-900">{result.score}/100 · {"⭐".repeat(result.stars || 0)}</p>
          <p className="mt-2 text-sm text-slate-600">{result.feedback}</p>
          <p className="mt-2 text-xs text-slate-500">Errores gramaticales: {result.grammar_errors} · Vocabulario utilizado: {result.vocabulary_used}</p>
          {passed ? <p className="mt-3 font-bold text-emerald-700">🎉 ¡Enhorabuena! Has desbloqueado el siguiente escenario.</p> : <p className="mt-3 text-sm font-semibold text-amber-700">Necesitas 60 puntos para desbloquear el siguiente. Puedes volver a intentarlo.</p>}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {!passed && <button type="button" onClick={retry} className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700">Reintentar</button>}
            <button type="button" onClick={onCourseCompleted} className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-200">{passed ? "Continuar curso" : "Volver al curso"}</button>
          </div>
        </div>}
        {phase === "completed" && !result && <button type="button" onClick={onCourseCompleted} className="mt-2 rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-bold text-slate-700">Volver al curso</button>}
      </footer>
    </div>
  );
}
