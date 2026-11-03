"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface StartResponse {
  sessionId: string;
  unitId: number;
  level: string;
  title: string;
  description: string;
  instructions: string;
  teacherText: string;
  stepInstructions: string | null;
  audioBase64: string | null;
  currentStep: number;
  totalSteps: number;
  progress: number;
  isComplete: boolean;
}

interface ChatResponse {
  reply: string;
  correction: string | null;
  isAccepted: boolean;
  audioBase64: string | null;
  nextTeacherText: string | null;
  stepInstructions: string | null;
  currentStep: number;
  totalSteps: number;
  progress: number;
  isComplete: boolean;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  correction?: string | null;
  audioBase64?: string | null;
}

interface VoiceConversationProps {
  userId?: string;
  language?: string;
  initialUnitId?: number;
}

export default function VoiceConversation({
  userId = "demo-user",
  language = "en",
  initialUnitId = 1,
}: VoiceConversationProps) {
  const [unitId, setUnitId] = useState<number>(initialUnitId);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [level, setLevel] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [stepInstructions, setStepInstructions] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [totalSteps, setTotalSteps] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const playAudio = useCallback((base64: string | null) => {
    if (!base64 || !audioRef.current) return;
    audioRef.current.src = `data:audio/mp3;base64,${base64}`;
    audioRef.current.play().catch((err) => {
      console.error("Audio playback error:", err);
    });
  }, []);

  const startConversation = useCallback(
    async (selectedUnitId: number) => {
      setIsStarting(true);
      setError(null);
      setMessages([]);
      setIsComplete(false);
      setCurrentStep(0);
      setProgress(0);

      try {
        const res = await fetch("/api/conversation/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            unitId: selectedUnitId,
            userId,
            language,
          }),
        });

        const data: StartResponse & { error?: string } = await res.json();

        if (data.error) {
          setError(data.error);
          return;
        }

        setSessionId(data.sessionId);
        setLevel(data.level);
        setTitle(data.title);
        setInstructions(data.instructions);
        setStepInstructions(data.stepInstructions);
        setCurrentStep(data.currentStep);
        setTotalSteps(data.totalSteps);
        setProgress(data.progress);
        setUnitId(data.unitId);

        setMessages([
          {
            role: "assistant",
            content: data.teacherText,
            audioBase64: data.audioBase64,
          },
        ]);

        playAudio(data.audioBase64);
      } catch {
        setError("Error al iniciar la conversación");
      } finally {
        setIsStarting(false);
      }
    },
    [userId, language, playAudio]
  );

  const sendMessage = useCallback(async () => {
    if (!input.trim() || !sessionId || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);

    try {
      const res = await fetch("/api/conversation/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: userMessage,
        }),
      });

      const data: ChatResponse & { error?: string } = await res.json();

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
          audioBase64: data.audioBase64,
        },
      ]);

      setCurrentStep(data.currentStep);
      setProgress(data.progress);
      setStepInstructions(data.stepInstructions);

      if (!data.isComplete && data.nextTeacherText) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.nextTeacherText,
            audioBase64: data.audioBase64,
          },
        ]);
      }

      playAudio(data.audioBase64);

      if (data.isComplete) {
        setIsComplete(true);
      }
    } catch {
      setError("Error al enviar el mensaje");
    } finally {
      setIsLoading(false);
    }
  }, [input, sessionId, isLoading, playAudio]);

  const nextUnit = useCallback(() => {
    if (unitId >= 100) return;
    startConversation(unitId + 1);
  }, [unitId, startConversation]);

  const reset = useCallback(() => {
    setSessionId(null);
    setMessages([]);
    setError(null);
    setIsComplete(false);
    setProgress(0);
    setCurrentStep(0);
    setStepInstructions(null);
  }, []);

  if (!sessionId && !isStarting) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            🎤 Voice Conversation
          </h2>
          <p className="text-gray-500 mt-1">
            Practice speaking with an AI teacher across 100 units (A1–B2)
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Unit (1–100)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                max={100}
                value={unitId}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (!isNaN(val) && val >= 1 && val <= 100) {
                    setUnitId(val);
                  }
                }}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-500">
                Level:{" "}
                <span className="font-semibold">
                  {unitId <= 25
                    ? "A1"
                    : unitId <= 50
                      ? "A2"
                      : unitId <= 75
                        ? "B1"
                        : "B2"}
                </span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { label: "A1 (1-25)", range: 1 },
              { label: "A2 (26-50)", range: 26 },
              { label: "B1 (51-75)", range: 51 },
              { label: "B2 (76-100)", range: 76 },
            ].map((btn) => (
              <button
                key={btn.label}
                onClick={() => setUnitId(btn.range)}
                className="px-3 py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                {btn.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => startConversation(unitId)}
            className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
          >
            Start Unit {unitId}
          </button>
        </div>
      </div>
    );
  }

  if (isStarting) {
    return (
      <div className="max-w-2xl mx-auto p-6 flex items-center justify-center h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Starting your lesson...</p>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-8 text-center space-y-6">
          <div className="text-6xl">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900">Unit Complete!</h2>
          <p className="text-gray-600">
            You finished <strong>Unit {unitId}: {title}</strong>
          </p>
          <div className="bg-white rounded-xl p-4 inline-block">
            <p className="text-sm text-gray-500">Your level</p>
            <p className="text-3xl font-bold text-blue-600">{level}</p>
          </div>
          <div className="flex gap-3 justify-center pt-4">
            {unitId < 100 ? (
              <button
                onClick={nextUnit}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
              >
                Next Unit ({unitId + 1}) →
              </button>
            ) : (
              <p className="text-green-600 font-semibold">
                🏆 You completed all 100 units!
              </p>
            )}
            <button
              onClick={reset}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-semibold"
            >
              Back to Units
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col h-[700px]">
      <audio ref={audioRef} className="hidden" />

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Unit {unitId}: {title}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-semibold">
                {level}
              </span>
              <span className="text-xs text-gray-500">
                Step {currentStep + 1} of {totalSteps}
              </span>
            </div>
          </div>
          <button
            onClick={reset}
            className="px-3 py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            ← Exit
          </button>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-right text-xs text-gray-400 mt-1">{progress}%</p>
      </div>

      {stepInstructions && (
        <div className="mb-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-blue-700">📋 Instructions</p>
          <p className="text-sm text-blue-900 mt-1">{stepInstructions}</p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl p-4 ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <p>{msg.content}</p>

              {msg.role === "assistant" && msg.audioBase64 && (
                <button
                  onClick={() => playAudio(msg.audioBase64!)}
                  className="mt-2 text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  🔊 Play audio
                </button>
              )}

              {msg.correction && (
                <div className="mt-2 pt-2 border-t border-gray-300/50">
                  <p className="text-xs font-semibold text-yellow-600">
                    📝 Correction
                  </p>
                  <p className="text-sm text-gray-700 mt-1">{msg.correction}</p>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl p-4">
              <span className="animate-pulse">Teacher is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-200">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Type your answer..."
          disabled={isLoading}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 font-semibold"
        >
          Send
        </button>
      </div>

      {error && (
        <div className="mt-2 bg-red-50 text-red-700 p-3 rounded-lg text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
}
