"use client";

import { useState, useRef, useEffect } from "react";

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
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

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
      const utterance = new SpeechSynthesisUtterance(currentPhrase.phrase);
      utterance.lang = language === "en" ? "en-US" : language === "fr" ? "fr-FR" : "es-ES";
      speechSynthesis.speak(utterance);
    }
  };

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
    <div className="w-full max-w-3xl mx-auto px-4 py-8 sm:px-6 sm:py-10 space-y-7">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">🎙️ Tutor de Pronunciación</h2>
        <p className="text-slate-500 mt-2">Grábate diciendo la frase y recibe feedback instantáneo</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
        >
          <option value="en">🇬🇧 Inglés</option>
          <option value="fr">🇫🇷 Francés</option>
          <option value="es">🇪🇸 Español</option>
        </select>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
        >
          <option value="A1">A1 - Principiante</option>
          <option value="A2">A2 - Elemental</option>
          <option value="B1">B1 - Intermedio</option>
        </select>
      </div>

      {currentPhrase && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 sm:p-8 text-center shadow-sm">
          <p className="text-2xl font-semibold text-slate-900">{currentPhrase.phrase}</p>
          <p className="text-slate-500 mt-2">{currentPhrase.translation}</p>
          <button
            onClick={playReference}
            className="mt-5 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-md shadow-indigo-200 hover:from-blue-700 hover:to-indigo-700 hover:-translate-y-0.5 transition-all duration-200"
          >
            🔊 Escuchar referencia
          </button>
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            disabled={isAnalyzing}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-red-600 text-white text-3xl flex items-center justify-center shadow-lg shadow-rose-200 hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🎤
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="w-20 h-20 rounded-full bg-slate-800 text-white text-3xl flex items-center justify-center hover:bg-slate-900 transition-all duration-200 animate-pulse shadow-lg shadow-slate-300"
          >
            ⏹
          </button>
        )}
        <p className="text-sm font-medium text-slate-500">
          {isRecording ? "Grabando... Pulsa para parar" : isAnalyzing ? "Analizando..." : "Pulsa para grabar"}
        </p>
        {isAnalyzing && <div className="h-1.5 w-48 overflow-hidden rounded-full bg-indigo-100"><div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-purple-500" /></div>}
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-100 p-4 rounded-2xl text-center">{error}</div>
      )}

      {result && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl shadow-slate-200/50">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-slate-800">Puntuación</span>
            <span
              className={`text-4xl font-extrabold tracking-tight ${
                result.score >= 75 ? "text-green-600" : result.score >= 50 ? "text-yellow-600" : "text-red-600"
              }`}
            >
              {result.score}/100
            </span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                result.score >= 75 ? "bg-green-500" : result.score >= 50 ? "bg-yellow-500" : "bg-red-500"
              }`}
              style={{ width: `${result.score}%` }}
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-500">Lo que detectamos:</p>
            <p className="text-slate-800 italic mt-1">"{result.transcription}"</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-500">Feedback:</p>
            <p className="text-slate-800 mt-1">{result.feedback}</p>
          </div>

          {result.phoneticIssues.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-slate-500">Problemas detectados:</p>
              <ul className="list-disc list-inside text-slate-700 mt-2 space-y-1">
                {result.phoneticIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={nextPhrase}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            Siguiente frase →
          </button>
        </div>
      )}
    </div>
  );
}
