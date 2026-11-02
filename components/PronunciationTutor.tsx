"use client";

import { useState, useRef, useEffect } from "react";

/**
 * ============================================================
 * COMPONENTE: Tutor de Pronunciación
 * ============================================================
 * Graba audio del usuario, lo envía a Workers AI Whisper,
 * y muestra puntuación + feedback.
 */

interface Phrase {
  id: string;
  phrase: string;
  translation: string;
  language: string;
  level: string;
  category: string;
}

interface AnalysisResult {
  sessionId: string;
  score: number;
  transcription: string;
  feedback: string;
  phoneticIssues: string[];
}

export default function PronunciationTutor({ userId = "demo-user" }: { userId?: string }) {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [currentPhrase, setCurrentPhrase] = useState<Phrase | null>(null);
  const [language, setLanguage] = useState("en");
  const [level, setLevel] = useState("A1");
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Cargar frases
  const loadPhrases = async () => {
    const res = await fetch(`/api/pronunciation/phrases?language=${language}&level=${level}`);
    const data = await res.json() as any;
    setPhrases(data.phrases || []);
    if (data.phrases?.length > 0) {
      setCurrentPhrase(data.phrases[0]);
    }
  };

  useEffect(() => {
    loadPhrases();
  }, [language, level]);

  // Generar audio de referencia
  const playReference = async () => {
    if (!currentPhrase) return;
    try {
      const res = await fetch("/api/pronunciation/reference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phrase: currentPhrase.phrase, language }),
      });
      const data = await res.json() as any;
      if (data.audioUrl) {
        const audio = new Audio(data.audioUrl);
        audio.play();
      }
    } catch (err) {
      // Fallback: usar Web Speech API del navegador
      const utterance = new SpeechSynthesisUtterance(currentPhrase.phrase);
      utterance.lang = language === "en" ? "en-US" : language === "fr" ? "fr-FR" : "es-ES";
      speechSynthesis.speak(utterance);
    }
  };

  // Grabar audio
  const startRecording = async () => {
    setError(null);
    setResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        stream.getTracks().forEach((t) => t.stop());
        await analyzeAudio(audioBlob);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch (err) {
      setError("No se pudo acceder al micrófono. Permite el acceso en tu navegador.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Analizar audio
  const analyzeAudio = async (audioBlob: Blob) => {
    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob);
      formData.append("targetPhrase", currentPhrase!.phrase);
      formData.append("language", language);
      formData.append("phraseId", currentPhrase!.id);
      formData.append("userId", userId);

      const res = await fetch("/api/pronunciation/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await res.json() as any;

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Error al analizar el audio");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const nextPhrase = () => {
    setResult(null);
    const idx = phrases.findIndex((p) => p.id === currentPhrase?.id);
    const next = phrases[(idx + 1) % phrases.length];
    setCurrentPhrase(next);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">🎙️ Tutor de Pronunciación</h2>
        <p className="text-gray-500 mt-1">Grábate diciendo la frase y recibe feedback instantáneo</p>
      </div>

      {/* Selectores */}
      <div className="flex gap-4 justify-center">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300"
        >
          <option value="en">🇬🇧 Inglés</option>
          <option value="fr">🇫🇷 Francés</option>
          <option value="es">🇪🇸 Español</option>
        </select>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300"
        >
          <option value="A1">A1 - Principiante</option>
          <option value="A2">A2 - Elemental</option>
          <option value="B1">B1 - Intermedio</option>
        </select>
      </div>

      {/* Frase actual */}
      {currentPhrase && (
        <div className="bg-blue-50 rounded-xl p-6 text-center">
          <p className="text-2xl font-semibold text-gray-900">{currentPhrase.phrase}</p>
          <p className="text-gray-500 mt-2">{currentPhrase.translation}</p>
          <button
            onClick={playReference}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            🔊 Escuchar referencia
          </button>
        </div>
      )}

      {/* Botón de grabación */}
      <div className="flex flex-col items-center gap-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            disabled={isAnalyzing}
            className="w-20 h-20 rounded-full bg-red-500 text-white text-3xl flex items-center justify-center hover:bg-red-600 transition disabled:opacity-50"
          >
            🎤
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="w-20 h-20 rounded-full bg-gray-700 text-white text-3xl flex items-center justify-center hover:bg-gray-800 transition animate-pulse"
          >
            ⏹
          </button>
        )}
        <p className="text-sm text-gray-500">
          {isRecording ? "Grabando... Pulsa para parar" : isAnalyzing ? "Analizando..." : "Pulsa para grabar"}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center">{error}</div>
      )}

      {/* Resultado */}
      {result && (
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Puntuación</span>
            <span
              className={`text-4xl font-bold ${
                result.score >= 75 ? "text-green-600" : result.score >= 50 ? "text-yellow-600" : "text-red-600"
              }`}
            >
              {result.score}/100
            </span>
          </div>

          {/* Barra de progreso */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${
                result.score >= 75 ? "bg-green-500" : result.score >= 50 ? "bg-yellow-500" : "bg-red-500"
              }`}
              style={{ width: `${result.score}%` }}
            />
          </div>

          <div>
            <p className="text-sm text-gray-500">Lo que detectamos:</p>
            <p className="text-gray-800 italic">"{result.transcription}"</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Feedback:</p>
            <p className="text-gray-800">{result.feedback}</p>
          </div>

          {result.phoneticIssues.length > 0 && (
            <div>
              <p className="text-sm text-gray-500">Problemas detectados:</p>
              <ul className="list-disc list-inside text-gray-700">
                {result.phoneticIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={nextPhrase}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Siguiente frase →
          </button>
        </div>
      )}
    </div>
  );
}