"use client";

import { useCallback, useEffect, useRef, useState } from "react";


const UNIT_WORDS: Record<string, string[]> = {
  "a1-speaking-1": [
    "Hello",
    "Good morning",
    "Good afternoon",
    "Good evening",
    "Hi there",
    "Goodbye",
    "See you later",
    "Good night",
    "Nice to meet you",
    "Have a nice day"
  ],
  "a1-speaking-2": [
    "How are you",
    "I'm fine thank you",
    "What's your name",
    "My name is",
    "Nice to meet you",
    "Where are you from",
    "I'm from Spain",
    "How old are you",
    "I'm twenty years old",
    "See you soon"
  ],
  "a1-speaking-3": [
    "Can you help me",
    "Excuse me",
    "Sorry",
    "Thank you",
    "You're welcome",
    "Please",
    "Of course",
    "No problem",
    "I don't understand",
    "Could you repeat that"
  ],
};

const DEFAULT_WORDS = ["Hello", "Please", "Thank you", "Sorry", "Goodbye", "Yes", "No", "Maybe", "Excuse me", "See you later"];

interface VoiceScenario {
  id: string;
  title: string;
  description?: string;
  setting?: string;
  language: string;
  level: string;
  persona_prompt: string;
  opening_line: string;
  system_prompt?: string;
}
interface VoiceMessage { role: "assistant" | "user"; content: string; correction?: string | null; }

function extractEnglishPhrase(text: string): { spanishText: string; englishPhrase: string | null } {
  // 1. Buscar marcador explícito [ENGLISH: ...]
  const markerMatch = text.match(/\[ENGLISH:\s*(.+?)\]/i);
  if (markerMatch) {
    const englishPhrase = markerMatch[1].trim();
    const spanishText = text.replace(/\[ENGLISH:\s*.+?\]/i, "").trim();
    return { spanishText, englishPhrase };
  }

  // 2. Fallback: buscar frases entre comillas dobles, simples o tipográficas
  const quotedMatches = text.match(/["“”']([^"“”']{1,100})["“”']/g);
  if (quotedMatches && quotedMatches.length > 0) {
    // Usar la última frase entre comillas como la frase en inglés
    const lastQuoted = quotedMatches[quotedMatches.length - 1];
    const englishPhrase = lastQuoted.replace(/^["“”']|["“”']$/g, "").trim();
    if (englishPhrase) {
      // Quitar las comillas del texto visible pero mantener el resto
      const spanishText = text.replace(/["“”']([^"“”']{1,100})["“”']/g, "$1").trim();
      return { spanishText, englishPhrase };
    }
  }

  return { spanishText: text, englishPhrase: null };
}

function getVisibleTutorText(text: string): string {
  const { spanishText, englishPhrase } = extractEnglishPhrase(text);
  return [spanishText, englishPhrase].filter(Boolean).join("\n");
}

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
  const [progress, setProgress] = useState(0);

  const activeRef = useRef(false);
  const sessionRef = useRef<string | null>(null);
  const wordListRef = useRef<string[]>([]);
  const currentWordIndexRef = useRef(0);
  const correctCountRef = useRef(0);
  const finishConversationRef = useRef<(() => Promise<void>) | null>(null);
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
  const speechStartedAtRef = useRef(0);
  const lastVoiceAtRef = useRef(0);

  const VOICE_THRESHOLD = 0.008;
  const SILENCE_DURATION = 2500;
  const MIN_SPEECH_DURATION = 500;
  const hintRequestedRef = useRef(false);
  const discardRecordingRef = useRef(false);
  const lastSpokenRef = useRef("");
  const processingRef = useRef(false);
  const requestControllersRef = useRef<Set<AbortController>>(new Set());
  const startCancelledRef = useRef(false);
  const beginListeningRef = useRef<(() => Promise<void>) | null>(null);

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

  const cleanupAudioResources = useCallback((stopRecorder = true) => {
    stopMonitor();

    const recorder = recorderRef.current;
    if (stopRecorder && recorder && recorder.state !== "inactive") {
      discardRecordingRef.current = true;
      recorder.stop();
    }
    recorderRef.current = null;

    const stream = streamRef.current;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    analyserRef.current = null;

    const context = contextRef.current;
    if (context) {
      contextRef.current = null;
      void context.close().catch(() => undefined);
    }
  }, [stopMonitor]);

  const releaseAudio = useCallback(() => {
    cleanupAudioResources();
    if (subtitleTimerRef.current !== null) { window.clearInterval(subtitleTimerRef.current); subtitleTimerRef.current = null; }
    audioRef.current?.pause();
    audioRef.current = null;
    if (audioUrlRef.current) { URL.revokeObjectURL(audioUrlRef.current); audioUrlRef.current = null; }
    window.speechSynthesis?.cancel();
  }, [cleanupAudioResources]);

  const beginListening = useCallback(async () => {
    if (!activeRef.current) return;
    try {
      // Cada turno obtiene recursos nuevos; los de la grabación anterior ya deben estar liberados.
      cleanupAudioResources(false);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      if (!activeRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      streamRef.current = stream;

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const context = new AudioContextClass();
      contextRef.current = context;

      // Forzar resume antes de nada
      if (context.state === "suspended") {
        await context.resume();
      }

      const analyser = context.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.75;
      const source = context.createMediaStreamSource(stream);
      source.connect(analyser);
      analyserRef.current = analyser;

      if (!activeRef.current) {
        cleanupAudioResources(false);
        return;
      }

      chunksRef.current = [];
      voiceStartedRef.current = false;
      speechStartedAtRef.current = 0;
      hintRequestedRef.current = false;
      processingRef.current = false;
      listeningStartedRef.current = Date.now();
      lastVoiceAtRef.current = 0;
      const mimeType = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"].find((type) => MediaRecorder.isTypeSupported(type));
      const recorder = mimeType ? new MediaRecorder(streamRef.current, { mimeType }) : new MediaRecorder(streamRef.current);
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => { if (event.data.size > 0) chunksRef.current.push(event.data); };
      recorder.onstop = async () => {
        if (discardRecordingRef.current || !activeRef.current) {
          discardRecordingRef.current = false;
          chunksRef.current = [];
          cleanupAudioResources(false);
          return;
        }
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        chunksRef.current = [];
        // El blob ya contiene los datos; liberar micrófono y AudioContext antes de llamar a la API.
        cleanupAudioResources(false);
        if (!blob.size) {
          setNotice("No he podido oírte. Vamos otra vez.");
          if (activeRef.current) void beginListeningRef.current?.();
          return;
        }
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
          cleanupAudioResources(false);
          if (!activeRef.current) return;
          setError(err instanceof Error ? err.message : "Error al procesar tu voz");
          activeRef.current = false;
          cleanupAudioResources();
          releaseAudio();
          setPhase("idle");
        }
      };
      recorder.onerror = () => {
        if (activeRef.current) {
          setError("Ha ocurrido un problema con el micrófono. Comprueba los permisos e inténtalo de nuevo.");
          activeRef.current = false;
          releaseAudio();
          setPhase("idle");
        }
      };
      recorder.start(250);
      setNotice(null);
      setPhase("listening");

      monitorRef.current = window.setInterval(() => {
        if (!activeRef.current) return;
        const currentAnalyser = analyserRef.current;
        if (!currentAnalyser) return;
        const samples = new Uint8Array(currentAnalyser.fftSize);
        currentAnalyser.getByteTimeDomainData(samples);
        let sum = 0;
        for (let index = 0; index < samples.length; index++) { const normalized = (samples[index] - 128) / 128; sum += normalized * normalized; }
        const volume = Math.sqrt(sum / samples.length);
        const now = Date.now();
        const elapsed = now - listeningStartedRef.current;
        if (volume > VOICE_THRESHOLD) {
          if (!voiceStartedRef.current) {
            voiceStartedRef.current = true;
            speechStartedAtRef.current = now;
          }
          lastVoiceAtRef.current = now;
        }

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
        if (!voiceStartedRef.current && elapsed >= 30000) {
          stopMonitor();
          discardRecordingRef.current = true;
          if (recorder.state !== "inactive") recorder.stop();
          setError("No he detectado voz en estos 30 segundos. Comprueba el micrófono y vuelve a iniciar la conversación.");
          activeRef.current = false;
          releaseAudio();
          setPhase("idle");
          return;
        }
        if (voiceStartedRef.current && now - lastVoiceAtRef.current >= SILENCE_DURATION && !processingRef.current) {
          const speechDuration = lastVoiceAtRef.current - speechStartedAtRef.current;
          if (speechDuration < MIN_SPEECH_DURATION) {
            // Ignorar golpes de micrófono/ruidos breves y seguir escuchando.
            voiceStartedRef.current = false;
            speechStartedAtRef.current = 0;
            lastVoiceAtRef.current = 0;
            return;
          }
          processingRef.current = true;
          stopMonitor();
          if (recorder.state !== "inactive") recorder.stop();
        }
      }, 100);
    } catch (err) {
      cleanupAudioResources();
      if (activeRef.current) {
        activeRef.current = false;
        setError(err instanceof Error ? err.message : "No se pudo iniciar la escucha. Comprueba los permisos del micrófono.");
        setPhase("idle");
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario, stopMonitor, conversationFetch, releaseAudio, cleanupAudioResources]);

  beginListeningRef.current = beginListening;

  const speakLine = useCallback(async (text: string) => {
    if (!activeRef.current || !text.trim()) return;
    lastSpokenRef.current = text;
    setRevealedText("");
    setPhase("speaking");
    setNotice(null);
    setHint(null);

    const { englishPhrase } = extractEnglishPhrase(text);
    const visibleText = getVisibleTutorText(text);

    // Mostrar instrucciones y feedback en castellano; la frase inglesa también queda visible.
    if (subtitleTimerRef.current !== null) window.clearInterval(subtitleTimerRef.current);
    let visibleCharacters = 0;
    subtitleTimerRef.current = window.setInterval(() => {
      visibleCharacters = Math.min(visibleText.length, visibleCharacters + 2);
      setRevealedText(visibleText.slice(0, visibleCharacters));
      if (visibleCharacters >= visibleText.length && subtitleTimerRef.current !== null) {
        window.clearInterval(subtitleTimerRef.current);
        subtitleTimerRef.current = null;
      }
    }, 28);

    // Solo reproducir el fragmento inglés marcado. El texto del tutor nunca se envía al TTS.
    if (englishPhrase) {
      try {
        const response = await conversationFetch("/api/conversation/voice-output", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: englishPhrase, language: "en" }),
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
        if (activeRef.current) setError("No se pudo generar el audio de la palabra en inglés.");
      }
    }

    if (subtitleTimerRef.current !== null) {
      window.clearInterval(subtitleTimerRef.current);
      subtitleTimerRef.current = null;
    }
    setRevealedText(visibleText);

    // Solo se abre el micrófono cuando hay una frase inglesa concreta que repetir.
    if (englishPhrase && activeRef.current) {
      await beginListening();
    }
  }, [beginListening, conversationFetch]);

  const answerStudent = useCallback(async (message: string) => {
    if (!activeRef.current || !sessionRef.current) return;
    setPhase("thinking");
    try {
      const currentWord = wordListRef.current[currentWordIndexRef.current] || "";
      const totalWords = wordListRef.current.length;
      const evaluationPrompt =
        'Eres un tutor de inglés. El alumno está practicando la palabra: "' + currentWord + '". ' +
        "Responde SOLO en castellano en 1-2 frases. Dile si pronunció bien o mal. " +
        "NO incluyas palabras en inglés ni el formato [ENGLISH: ...] en tu respuesta. " +
        'Solo da feedback breve en castellano sobre si dijo bien la palabra "' + currentWord + '".';

      const response = await conversationFetch("/api/conversation/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionRef.current,
          message: `Palabra objetivo: "${currentWord}". El alumno ha dicho: ${message}`,
          personaPrompt: evaluationPrompt,
          scenarioContext: {
            id: scenario.id,
            title: scenario.title,
            description: scenario.description || "",
            setting: scenario.setting || "",
            persona: "Tutor de inglés",
            system_prompt: evaluationPrompt,
          },
          language: scenario.language,
          level: scenario.level,
        }),
      });
      const data = await response.json() as any;
      if (!response.ok || data.error) throw new Error(data.error || "No se pudo generar la respuesta");
      let feedback = String(data.reply || "").trim();
      if (!feedback) feedback = "Bien hecho.";

      // Limpiar cualquier marcador que la IA pueda incluir en el feedback.
      feedback = feedback.replace(/\[ENGLISH:\s*.+?\]/gi, "").trim();

      // Registrar aciertos solo cuando la API proporciona una señal explícita.
      if (data.isCorrect === true || data.correct === true) correctCountRef.current += 1;

      // Avanzar a la siguiente palabra; la secuencia la controla el componente.
      currentWordIndexRef.current += 1;
      setProgress(currentWordIndexRef.current);
      const nextIndex = currentWordIndexRef.current;
      const isLastWord = nextIndex >= totalWords;

      let fullMessage: string;
      if (isLastWord) {
        fullMessage = `${feedback} ¡Has completado las ${totalWords} palabras! Muy buen trabajo. Vamos a ver tu puntuación.`;
        setMessages((previous) => [...previous, { role: "assistant", content: fullMessage }]);
        setRevealedText(fullMessage);
        window.setTimeout(() => {
          if (activeRef.current) void finishConversationRef.current?.();
        }, 2000);
        return;
      }

      const nextWord = wordListRef.current[nextIndex];
      fullMessage = `${feedback} Palabra ${nextIndex + 1} de ${totalWords}: [ENGLISH: ${nextWord}]`;
      setMessages((previous) => [...previous, { role: "assistant", content: fullMessage }]);
      await speakLine(fullMessage);
    } catch (err) {
      if (!activeRef.current) return;
      setError(err instanceof Error ? err.message : "Error en la conversación");
      activeRef.current = false;
      releaseAudio();
      setPhase("idle");
    }
  }, [scenario, speakLine, conversationFetch, releaseAudio]);

  const startConversation = async () => {
    if (starting || activeRef.current) return;
    startCancelledRef.current = false;
    setStarting(true);
    setError(null);
    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") throw new Error("Este navegador no permite acceder al micrófono.");
      cleanupAudioResources();
      const response = await conversationFetch("/api/conversation/start", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenarioId: scenario.id, userId }),
      });
      const data = await response.json() as any;
      if (startCancelledRef.current) return;
      if (!response.ok || data.error) throw new Error(data.error || "No se pudo iniciar la conversación");
      sessionRef.current = data.sessionId;
      activeRef.current = true;

      // Cargar la lista de palabras de esta unidad.
      wordListRef.current = UNIT_WORDS[scenario.id] || DEFAULT_WORDS;
      currentWordIndexRef.current = 0;
      correctCountRef.current = 0;
      setProgress(0);
      const totalWords = wordListRef.current.length;
      const firstWord = wordListRef.current[0];

      // Mensaje de inicio del tutor.
      const introText = `¡Bienvenido a la unidad! Vamos a practicar ${totalWords} palabras en inglés. Escucha cada palabra y repítela en voz alta. Empezamos con la palabra 1 de ${totalWords}: [ENGLISH: ${firstWord}]`;
      setMessages([{ role: "assistant", content: introText }]);
      await speakLine(introText);
    } catch (err) {
      cleanupAudioResources();
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
      if (scenario.id.startsWith("a1-speaking-")) {
        const saved = await fetch("/api/course/a1-speaking/progress", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId, unitId: Number(scenario.id.replace("a1-speaking-", "")), score: data.score, feedback: data.feedback }) });
        const progress = await saved.json() as any;
        if (!saved.ok) throw new Error(progress.error || "No se pudo guardar el progreso");
        data.courseProgress = progress;
      }
      setResult(data);
      setPhase("completed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo evaluar la conversación");
      setPhase("completed");
    }
  };

  finishConversationRef.current = finishConversation;

  const retry = () => {
    releaseAudio();
    activeRef.current = false;
    sessionRef.current = null;
    wordListRef.current = [];
    currentWordIndexRef.current = 0;
    correctCountRef.current = 0;
    setProgress(0);
    setMessages([]);
    setResult(null);
    setHint(null);
    setNotice(null);
    setError(null);
    setPhase("idle");
  };

  useEffect(() => () => {
    activeRef.current = false;
    startCancelledRef.current = true;
    abortConversationRequests();
    cleanupAudioResources();
    releaseAudio();
  }, [abortConversationRequests, cleanupAudioResources, releaseAudio]);

  const status = phase === "speaking" ? "🤖 Hablando..." : phase === "listening" ? "🔴 Te escucho... habla ahora" : phase === "processing" ? "⏳ Procesando..." : phase === "thinking" ? "🤖 Pensando..." : phase === "completed" ? "Conversación finalizada" : "Listo para hablar";
  const passed = Number(result?.score || 0) >= 60;

  return (
    <div className="relative mx-auto flex min-h-[min(780px,88vh)] max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-slate-50 via-white to-blue-50 shadow-xl shadow-slate-200/70">
      <style jsx>{`@keyframes fade-in-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <header className="flex items-center justify-between gap-3 border-b border-slate-100/80 px-5 py-4 sm:px-7">
        <div className="min-w-0"><h2 className="truncate text-base font-bold text-slate-800">{scenario.title}</h2><p className="text-xs text-slate-400">{scenario.level} · {scenario.setting}</p>
          {wordListRef.current.length > 0 && phase !== "idle" && phase !== "completed" && (
            <p className="text-xs font-semibold text-blue-500">Palabra {Math.min(progress + 1, wordListRef.current.length)} de {wordListRef.current.length}</p>
          )}
        </div>
        {(phase !== "idle" && phase !== "completed" || starting) && <button type="button" onClick={finishConversation} className="shrink-0 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-100">■ Detener conversación</button>}
      </header>
      <main className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-6 sm:px-8">
        {messages.map((message, index) => <div key={index} style={{ animation: "fade-in-up .35s ease-out" }} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
          <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${message.role === "user" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-800"}`}>
            <p className="mb-1 text-[11px] font-bold opacity-65">{message.role === "user" ? "🧑 Alumno" : "🤖 LinguaFly"}</p>
            <p className="whitespace-pre-wrap leading-relaxed">{index === messages.length - 1 && message.role === "assistant" && phase === "speaking" ? revealedText : message.role === "assistant" ? getVisibleTutorText(message.content) : message.content}</p>
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
