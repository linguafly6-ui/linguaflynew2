"use client";

import { useState, useRef, useEffect } from "react";

interface Scenario {
  id: string;
  title: string;
  description: string;
  language: string;
  level: string;
  setting: string;
  persona_prompt: string;
  opening_line: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  correction?: string | null;
}

export default function ConversationPractice({ userId = "demo-user", initialScenarioId, onCourseCompleted }: { userId?: string; initialScenarioId?: string; onCourseCompleted?: () => void }) {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isVoiceProcessing, setIsVoiceProcessing] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [lastSpokenMessage, setLastSpokenMessage] = useState("");
  const [isCompleting, setIsCompleting] = useState(false);
  const [completionResult, setCompletionResult] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  useEffect(() => {
    fetch("/api/conversation/scenarios")
      .then((r) => r.json())
      .then((data: any) => setScenarios(data.scenarios || []))
      .catch(() => setError("Error al cargar escenarios"));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => {
      mediaRecorderRef.current?.stop();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      audioRef.current?.pause();
      if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
      window.speechSynthesis?.cancel();
    };
  }, []);

  const getSpeechLanguage = (language: string) => {
    const code = language.toLowerCase().split("-")[0];
    const locales: Record<string, string> = {
      en: "en-US",
      es: "es-ES",
      fr: "fr-FR",
      de: "de-DE",
      it: "it-IT",
      pt: "pt-PT",
    };
    return locales[code] || language;
  };

  const playBrowserFallback = (text: string, language: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getSpeechLanguage(language);
    window.speechSynthesis.speak(utterance);
  };

  const speakMessage = async (text: string, language: string) => {
    if (!text.trim()) return;
    setLastSpokenMessage(text);
    setIsAudioLoading(true);
    try {
      const response = await fetch("/api/conversation/voice-output", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language }),
      });

      if (!response.ok) throw new Error("TTS no disponible");

      const audioBlob = await response.blob();
      if (!audioBlob.size) throw new Error("Audio vacío");

      if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
      const audioUrl = URL.createObjectURL(audioBlob);
      audioUrlRef.current = audioUrl;
      audioRef.current?.pause();
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      await audio.play();
    } catch (voiceError) {
      // Fallback del navegador si MeloTTS no está configurado o falla la reproducción.
      playBrowserFallback(text, language);
    } finally {
      setIsAudioLoading(false);
    }
  };

  const replayLastMessage = () => {
    if (lastSpokenMessage && selectedScenario) {
      void speakMessage(lastSpokenMessage, selectedScenario.language);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording();
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError("Tu navegador no permite grabar audio. Puedes escribir tu respuesta.");
      return;
    }

    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      audioChunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      recorder.onerror = () => {
        setIsRecording(false);
        setError("No se pudo grabar el audio");
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.onstop = async () => {
        setIsRecording(false);
        stream.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;

        const audioBlob = new Blob(audioChunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });
        audioChunksRef.current = [];
        if (!audioBlob.size) {
          setError("La grabación está vacía. Inténtalo de nuevo.");
          return;
        }

        setIsVoiceProcessing(true);
        setError(null);
        try {
          const formData = new FormData();
          formData.append("audio", audioBlob, "conversation-recording.webm");
          formData.append("language", selectedScenario?.language || "");
          const response = await fetch("/api/conversation/voice-input", {
            method: "POST",
            body: formData,
          });
          const data = await response.json() as any as any;

          if (!response.ok || data.error) {
            throw new Error(data.error || "No se pudo transcribir el audio");
          }
          setInput(data.transcription || "");
        } catch (voiceError) {
          setError(voiceError instanceof Error ? voiceError.message : "Error al transcribir el audio");
        } finally {
          setIsVoiceProcessing(false);
        }
      };

      recorder.start();
      setIsRecording(true);
    } catch (voiceError) {
      setError("No se pudo acceder al micrófono. Revisa los permisos del navegador.");
    }
  };

  const startConversation = async (scenario: Scenario) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/conversation/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenarioId: scenario.id, userId }),
      });
      const data = await res.json() as any as any;

      if (data.error) {
        setError(data.error);
        return;
      }

      setSelectedScenario(data.scenario ? { ...scenario, ...data.scenario } : scenario);
      setSessionId(data.sessionId);
      setMessages([{ role: "assistant", content: data.openingLine }]);
      void speakMessage(data.openingLine, scenario.language);
    } catch (err) {
      setError("Error al iniciar la conversación");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialScenarioId && !selectedScenario && scenarios.length > 0) {
      const courseScenario = scenarios.find((scenario) => scenario.id === initialScenarioId);
      if (courseScenario) {
        void startConversation(courseScenario);
      } else if (initialScenarioId.includes("-speaking-")) {
        const level = initialScenarioId.split("-")[0].toUpperCase();
        void startConversation({
          id: initialScenarioId,
          title: "Speaking " + level,
          description: "Practica la conversación de esta unidad.",
          setting: "Práctica guiada",
          language: "en",
          level,
          persona_prompt: "You are a patient English speaking tutor. Keep your replies concise, encourage the student to speak in English, and explain corrections in Spanish.",
          opening_line: "Hello! Let's practise English together."
        });
      }
    }
  }, [initialScenarioId, scenarios, selectedScenario]);

  const finishCourseConversation = async () => {
    if (!sessionId || !selectedScenario || isCompleting) return;
    setIsCompleting(true);
    setError(null);
    try {
      const response = await fetch("/api/conversation/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, scenarioId: selectedScenario.id, sessionId }),
      });
      const data = await response.json() as any;
      if (!response.ok || data.error) throw new Error(data.error || "No se pudo evaluar la conversación");
      setCompletionResult(data);
      if (initialScenarioId && initialScenarioId.includes("-speaking-")) onCourseCompleted?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al evaluar la conversación");
    } finally {
      setIsCompleting(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !sessionId || !selectedScenario) return;

    const userMessage = input.trim();
    setInput("");
    setHint(null);
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/conversation/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: userMessage,
          personaPrompt: selectedScenario.persona_prompt,
          language: selectedScenario.language,
          level: selectedScenario.level,
        }),
      });
      const data = await res.json() as any as any;

      if (data.error) {
        setError(data.error);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
          correction: data.correction,
        },
      ]);
      void speakMessage(data.reply, selectedScenario.language);
    } catch (err) {
      setError("Error al enviar el mensaje");
    } finally {
      setIsLoading(false);
    }
  };

  const generateHint = async () => {
    if (!sessionId || !selectedScenario) return;

    setIsHintLoading(true);
    setHint(null);
    setError(null);

    try {
      const lastMessage = messages[messages.length - 1]?.content || selectedScenario.opening_line;
      const res = await fetch("/api/conversation/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          lastMessage,
          personaPrompt: selectedScenario.persona_prompt,
          language: selectedScenario.language,
          level: selectedScenario.level,
        }),
      });
      const data = await res.json() as any as any;

      if (!res.ok || data.error) {
        setError(data.error || "No se pudo generar la pista");
        return;
      }

      setHint(data.hint || null);
    } catch (err) {
      setError("Error al generar la pista");
    } finally {
      setIsHintLoading(false);
    }
  };

  const reset = () => {
    stopRecording();
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    audioRef.current?.pause();
    window.speechSynthesis?.cancel();
    setHint(null);
    setLastSpokenMessage("");
    setSelectedScenario(null);
    setSessionId(null);
    setMessages([]);
    setInput("");
    setError(null);
  };

  if (!selectedScenario) {
    return (
      <div className="mx-auto max-w-3xl space-y-7 px-5 py-8 sm:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">💬 Conversación Simulada</h2>
          <p className="mt-2 text-base text-slate-500">Practica con un personaje IA que te corrige en tiempo real</p>
        </div>

        {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-center font-medium text-red-700 shadow-sm">{error}</div>}

        <div className="grid gap-4">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => startConversation(scenario)}
              disabled={isLoading}
              className="group w-full rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-blue-300 hover:shadow-lg active:scale-[.99] disabled:opacity-50 focus:ring-2 focus:ring-blue-500"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{scenario.title}</h3>
                  <p className="mt-2 text-slate-500">{scenario.description}</p>
                  <p className="mt-3 text-sm text-slate-400">📍 {scenario.setting}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-4xl">
                    {scenario.language === "en" ? "🇬🇧" : scenario.language === "fr" ? "🇫🇷" : "🇪🇸"}
                  </span>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{scenario.level}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-[min(760px,85vh)] max-w-4xl flex-col rounded-3xl border border-slate-100 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-7">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{selectedScenario.title}</h2>
          <p className="text-sm text-slate-500">📍 {selectedScenario.setting}</p>
        </div>
        <div className="flex items-center gap-2">
        {initialScenarioId && !completionResult && <button type="button" onClick={finishCourseConversation} disabled={isCompleting || isLoading || messages.length < 2} className="rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:scale-105 hover:bg-green-700 disabled:opacity-50">{isCompleting ? "Evaluando..." : "Finalizar y evaluar"}</button>}
        <button
          onClick={reset}
          className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-300 hover:scale-105 hover:bg-slate-200 active:scale-95"
        >
          ← Cambiar escenario
        </button>
        </div>
      </div>

      {completionResult && (
        <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-950 shadow-sm">
          <p className="text-xl font-extrabold">Evaluación: {completionResult.score}/100 · {"⭐".repeat(completionResult.stars)}</p>
          <p className="mt-2">{completionResult.feedback}</p>
          <p className="mt-2 text-sm">Errores gramaticales: {completionResult.grammar_errors} · Vocabulario utilizado: {completionResult.vocabulary_used}</p>
          {completionResult.score < 60 && <><p className="mt-2 text-sm font-semibold">Necesitas 60 puntos para desbloquear el siguiente escenario. Puedes seguir practicando y volver a intentarlo.</p><button type="button" onClick={() => setCompletionResult(null)} className="mt-4 mr-2 rounded-xl bg-emerald-700 px-5 py-2 font-bold text-white transition hover:scale-105 hover:bg-emerald-800">Seguir practicando</button></>}
          <button type="button" onClick={() => onCourseCompleted?.()} className="mt-4 rounded-xl bg-blue-600 px-5 py-2 font-bold text-white transition hover:scale-105 hover:bg-blue-700">Volver al curso</button>
        </div>
      )}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl p-4 shadow-sm sm:max-w-[75%] ${
                msg.role === "user" ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-blue-200" : "bg-slate-100 text-slate-800"
              }`}
            >
              <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              {msg.role === "assistant" && (
                <button type="button" onClick={() => void speakMessage(msg.content, selectedScenario.language)} className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-white active:scale-95" aria-label="Escuchar mensaje">🔊 Escuchar</button>
              )}
              {msg.correction && (
                <div className="mt-3 rounded-xl border border-yellow-200 bg-yellow-50 p-3">
                  <p className="text-xs font-bold text-yellow-700">📝 Corrección</p>
                  <p className="mt-1 text-sm text-slate-700">{msg.correction}</p>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-slate-100 p-4 text-slate-600">
              <span className="animate-pulse">IA escribiendo<span className="ml-1 inline-block animate-bounce">...</span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {hint && (
        <div className="mb-3 animate-[slideDown_.3s_ease-out] rounded-2xl border border-yellow-300 bg-yellow-50 p-4 text-yellow-950 shadow-md">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">💡 Pista para responder</p>
              <p className="mt-1">{hint}</p>
            </div>
            <button
              type="button"
              onClick={() => setHint(null)}
              aria-label="Cerrar pista"
              className="rounded-full px-3 py-2 text-yellow-800 transition-all duration-300 hover:scale-105 hover:bg-yellow-100 active:scale-95"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {isRecording && (
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-red-600" aria-live="polite">
          <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse" />
          Grabando... pulsa el micrófono para detener
        </div>
      )}
      {isVoiceProcessing && (
        <p className="mb-2 text-sm text-blue-600 animate-pulse" aria-live="polite">
          Procesando audio y transcribiendo...
        </p>
      )}
      {isAudioLoading && (
        <p className="mb-2 text-sm text-gray-500" aria-live="polite">Generando voz para la respuesta...</p>
      )}
      {error && <div className="mb-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Escribe o dicta tu respuesta..."
          disabled={isLoading || isVoiceProcessing}
          className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-800 transition-all duration-300 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <button
          type="button"
          onClick={toggleRecording}
          disabled={isLoading || isVoiceProcessing}
          aria-label={isRecording ? "Detener grabación" : "Grabar respuesta"}
          title={isRecording ? "Detener grabación" : "Grabar respuesta"}
          className={`rounded-full border p-3 text-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 ${
            isRecording ? "border-red-500 bg-red-50 text-red-700 animate-pulse" : "border-gray-300 bg-white hover:bg-gray-50"
          }`}
        >
          🎤
        </button>
        <button
          onClick={sendMessage}
          disabled={isLoading || isVoiceProcessing || !input.trim()}
          className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-blue-700 active:scale-95 disabled:opacity-50 focus:ring-2 focus:ring-blue-500"
        >
          Enviar
        </button>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={generateHint}
          disabled={isLoading || isHintLoading}
          className="self-start rounded-xl bg-yellow-100 px-4 py-2 font-semibold text-yellow-900 transition-all duration-300 hover:scale-105 hover:bg-yellow-200 active:scale-95 disabled:opacity-50"
        >
          {isHintLoading ? "Generando pista..." : "💡 Pista"}
        </button>
        <button
          type="button"
          onClick={replayLastMessage}
          disabled={!lastSpokenMessage || isAudioLoading}
          className="rounded-xl bg-slate-100 px-4 py-2 font-semibold text-slate-700 transition-all duration-300 hover:scale-105 hover:bg-slate-200 active:scale-95 disabled:opacity-50"
        >
          🔊 Volver a escuchar
        </button>
      </div>
    </div>
  );
}
