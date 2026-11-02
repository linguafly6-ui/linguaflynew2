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
    <div className="mx-auto max-w-3xl space-y-7 px-5 py-8 sm:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">🎙️ Tutor de Pronunciación</h2>
        <p className="mt-2 text-base text-slate-500">Grábate diciendo la frase y recibe feedback instantáneo</p>
      </div>

      {/* Selectores */}
      <div className="flex flex-wrap justify-center gap-3">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="en">🇬🇧 Inglés</option>
          <option value="fr">🇫🇷 Francés</option>
          <option value="es">🇪🇸 Español</option>
        </select>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="A1">A1 - Principiante</option>
          <option value="A2">A2 - Elemental</option>
          <option value="B1">B1 - Intermedio</option>
        </select>
      </div>

      {/* Frase actual */}
      {currentPhrase && (
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-sky-50 to-white p-8 text-center shadow-lg shadow-blue-100/60 sm:p-10">
          <p className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">{currentPhrase.phrase}</p>
          <p className="mt-3 text-slate-500">{currentPhrase.translation}</p>
          <button
            onClick={playReference}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md shadow-blue-200 transition-all duration-300 hover:scale-105 hover:bg-blue-700 active:scale-95 focus:ring-2 focus:ring-blue-500"
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
            className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-600 text-4xl text-white shadow-xl shadow-red-200 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 focus:ring-2 focus:ring-blue-500"
          >
            🎤
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-red-700 text-4xl text-white shadow-xl shadow-red-200 ring-8 ring-red-100 transition-all duration-300 animate-pulse hover:scale-105 active:scale-95 focus:ring-2 focus:ring-red-400"
          >
            ⏹
          </button>
        )}
        <p className="text-sm font-medium text-slate-500">
          {isRecording ? "Grabando... Pulsa para parar" : isAnalyzing ? "Analizando..." : "Pulsa para grabar"}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-center font-medium text-red-700 shadow-sm">{error}</div>
      )}

      {/* Resultado */}
      {result && (
        <div className="space-y-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/70 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-slate-800">Puntuación</span>
            <span
              className={`text-4xl font-black tracking-tight ${
                result.score >= 75 ? "text-green-600" : result.score >= 50 ? "text-yellow-600" : "text-red-600"
              }`}
            >
              {result.score}/100
            </span>
          </div>

          {/* Barra de progreso */}
          <div className="h-4 w-full overflow-hidden rounded-full bg-gradient-to-r from-red-100 via-yellow-100 to-green-100">
            <div
              className={`h-4 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 transition-all duration-700 ${
                result.score >= 75 ? "bg-green-500" : result.score >= 50 ? "bg-yellow-500" : "bg-red-500"
              }`}
              style={{ width: `${result.score}%` }}
            />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">Lo que detectamos:</p>
            <p className="text-lg italic text-slate-500">"{result.transcription}"</p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">Feedback:</p>
            <p className="leading-relaxed text-slate-800">{result.feedback}</p>
          </div>

          {result.phoneticIssues.length > 0 && (
            <div>
              <p className="text-sm font-medium text-slate-500">Problemas detectados:</p>
              <ul className="list-disc list-inside text-slate-700">
                {result.phoneticIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={nextPhrase}
            className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-blue-700 active:scale-95 focus:ring-2 focus:ring-blue-500"
          >
            Siguiente frase →
          </button>
        </div>
      )}
    </div>
  );
}
