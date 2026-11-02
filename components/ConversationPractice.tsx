"use client";

import { useState, useRef, useEffect } from "react";

/**
 * ============================================================
 * COMPONENTE: Conversación Simulada con IA
 * ============================================================
 * Role-play con personaje IA que corrige errores en tiempo real.
 */

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Cargar escenarios
  useEffect(() => {
    fetch("/api/conversation/scenarios")
      .then((r) => r.json())
      .then((data) => setScenarios(data.scenarios || []))
      .catch(() => setError("Error al cargar escenarios"));
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Iniciar conversación
  const startConversation = async (scenario: Scenario) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/conversation/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenarioId: scenario.id, userId }),
      });
      const data = await res.json() as any;

      if (data.error) {
        setError(data.error);
        return;
      }

      setSelectedScenario(scenario);
      setSessionId(data.sessionId);
      setMessages([{ role: "assistant", content: data.openingLine }]);
    } catch (err) {
      setError("Error al iniciar la conversación");
    } finally {
      setIsLoading(false);
    }
  };

  // Enviar mensaje
  const sendMessage = async () => {
    if (!input.trim() || !sessionId || !selectedScenario) return;

    const userMessage = input.trim();
    setInput("");
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
      const data = await res.json() as any;

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
    } catch (err) {
      setError("Error al enviar el mensaje");
    } finally {
      setIsLoading(false);
    }
  };

  // Volver a selección de escenarios
  const reset = () => {
    setSelectedScenario(null);
    setSessionId(null);
    setMessages([]);
    setError(null);
  };

  // Pantalla de selección de escenarios
  if (!selectedScenario) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">💬 Conversación Simulada</h2>
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
                  <p className="text-sm text-gray-400 mt-2">📍 {scenario.setting}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-2xl">
                    {scenario.language === "en" ? "🇬🇧" : scenario.language === "fr" ? "🇫🇷" : "🇪🇸"}
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

  // Pantalla de conversación
  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col h-[600px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{selectedScenario.title}</h2>
          <p className="text-sm text-gray-500">📍 {selectedScenario.setting}</p>
        </div>
        <button
          onClick={reset}
          className="px-3 py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          ← Cambiar escenario
        </button>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] rounded-2xl p-4 ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <p>{msg.content}</p>
              {msg.correction && (
                <div className="mt-2 pt-2 border-t border-gray-300/50">
                  <p className="text-xs font-semibold text-yellow-600">📝 Corrección</p>
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

      {/* Input */}
      <div className="flex gap-2 pt-4 border-t border-gray-200">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Escribe tu respuesta..."
          disabled={isLoading}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}