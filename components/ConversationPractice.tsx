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

export default function ConversationPractice({ userId = "demo-user" }: { userId?: string }) {
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
      if (!audioBlob.size) throw new Error("Audio vacÃ­o");

      if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
      const audioUrl = URL.createObjectURL(audioBlob);
      audioUrlRef.current = audioUrl;
      audioRef.current?.pause();
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      await audio.play();
    } catch (voiceError) {
      // Fallback del navegador si MeloTTS no estÃ¡ configurado o falla la reproducciÃ³n.
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
          setError("La grabaciÃ³n estÃ¡ vacÃ­a. IntÃ©ntalo de nuevo.");
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
      setError("No se pudo acceder al micrÃ³fono. Revisa los permisos del navegador.");
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

      setSelectedScenario(scenario);
      setSessionId(data.sessionId);
      setMessages([{ role: "assistant", content: data.openingLine }]);
      void speakMessage(data.openingLine, scenario.language);
    } catch (err) {
      setError("Error al iniciar la conversaciÃ³n");
    } finally {
      setIsLoading(false);
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
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">ðŸ’¬ ConversaciÃ³n Simulada</h2>
          <p className="text-gray-500 mt-1">Practica con un personaje IA que te corrige en tiempo real</p>
        </div>

        {error && <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center">{error}</div>}

        <div className="grid gap-4">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => startConversation(scenario)}
              disabled={isLoading}
              className="text-left p-5 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition disabled:opacity-50"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{scenario.title}</h3>
                  <p className="text-gray-500 mt-1">{scenario.description}</p>
                  <p className="text-sm text-gray-400 mt-2">ðŸ“ {scenario.setting}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-2xl">
                    {scenario.language === "en" ? "ðŸ‡¬ðŸ‡§" : scenario.language === "fr" ? "ðŸ‡«ðŸ‡·" : "ðŸ‡ªðŸ‡¸"}
                  </span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{scenario.level}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col h-[600px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{selectedScenario.title}</h2>
          <p className="text-sm text-gray-500">ðŸ“ {selectedScenario.setting}</p>
        </div>
        <button
          onClick={reset}
          className="px-3 py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          â† Cambiar escenario
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] rounded-2xl p-4 ${
                msg.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
              }`}
            >
              <p>{msg.content}</p>
              {msg.correction && (
                <div className="mt-2 pt-2 border-t border-gray-300/50">
                  <p className="text-xs font-semibold text-yellow-600">ðŸ“ CorrecciÃ³n</p>
                  <p className="text-sm text-gray-700 mt-1">{msg.correction}</p>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl p-4">
              <span className="animate-pulse">Escribiendo...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {hint && (
        <div className="mb-3 rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-yellow-900 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">ðŸ’¡ Pista para responder</p>
              <p className="mt-1">{hint}</p>
            </div>
            <button
              type="button"
              onClick={() => setHint(null)}
              aria-label="Cerrar pista"
              className="rounded-lg px-2 py-1 text-yellow-800 hover:bg-yellow-100 transition"
            >
              âœ•
            </button>
          </div>
        </div>
      )}

      {isRecording && (
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-red-600" aria-live="polite">
          <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse" />
          Grabando... pulsa el micrÃ³fono para detener
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
      {error && <div className="mb-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <div className="flex gap-2 pt-4 border-t border-gray-200">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Escribe o dicta tu respuesta..."
          disabled={isLoading || isVoiceProcessing}
          className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <button
          type="button"
          onClick={toggleRecording}
          disabled={isLoading || isVoiceProcessing}
          aria-label={isRecording ? "Detener grabaciÃ³n" : "Grabar respuesta"}
          title={isRecording ? "Detener grabaciÃ³n" : "Grabar respuesta"}
          className={`px-4 py-3 rounded-xl border transition disabled:opacity-50 ${
            isRecording ? "border-red-500 bg-red-50 text-red-700 animate-pulse" : "border-gray-300 bg-white hover:bg-gray-50"
          }`}
        >
          ðŸŽ¤
        </button>
        <button
          onClick={sendMessage}
          disabled={isLoading || isVoiceProcessing || !input.trim()}
          className="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
        >
          Enviar
        </button>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={generateHint}
          disabled={isLoading || isHintLoading}
          className="self-start px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition disabled:opacity-50"
        >
          {isHintLoading ? "Generando pista..." : "ðŸ’¡ Pista"}
        </button>
        <button
          type="button"
          onClick={replayLastMessage}
          disabled={!lastSpokenMessage || isAudioLoading}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
        >
          ðŸ”Š Volver a escuchar
        </button>
      </div>
    </div>
  );
}
