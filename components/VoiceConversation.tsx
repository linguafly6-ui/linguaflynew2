"use client";
import { useState, useRef, useCallback } from "react";

interface LessonItem { english: string; spanish: string; example: string; }
interface LessonSection { title: string; explanation: string; items: LessonItem[]; }
interface Lesson { unitId: number; level: string; title: string; description: string; introduction: string; sections: LessonSection[]; tips: string; }

interface VoiceConversationProps { initialUnitId?: number; language?: string; }

export default function VoiceConversation({ initialUnitId = 1 }: VoiceConversationProps) {
  const [unitId, setUnitId] = useState<number>(initialUnitId);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [audioCache, setAudioCache] = useState<Record<string, string>>({});
  const audioRef = useRef<HTMLAudioElement>(null);

  const loadLesson = useCallback(async (selectedUnitId: number) => {
    setIsLoading(true); setError(null); setLesson(null);
    try {
      const res = await fetch("/api/conversation/start", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ unitId: selectedUnitId }) });
      const data: { lesson?: Lesson; error?: string } = await res.json();
      if (data.error) { setError(data.error); return; }
      if (data.lesson) { setLesson(data.lesson); setUnitId(selectedUnitId); }
    } catch { setError("Error al cargar la leccion"); } finally { setIsLoading(false); }
  }, []);

  const playAudio = useCallback(async (text: string) => {
    if (playingAudio === text) { if (audioRef.current) audioRef.current.pause(); setPlayingAudio(null); return; }
    setPlayingAudio(text);
    if (audioCache[text]) { if (audioRef.current) { audioRef.current.src = `data:audio/mp3;base64,${audioCache[text]}`; audioRef.current.play().catch(() => setPlayingAudio(null)); } return; }
    try {
      const res = await fetch("/api/conversation/pronounce", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) });
      const data: { audioBase64?: string; error?: string } = await res.json();
      if (data.audioBase64) { setAudioCache((prev) => ({ ...prev, [text]: data.audioBase64! })); if (audioRef.current) { audioRef.current.src = `data:audio/mp3;base64,${data.audioBase64}`; audioRef.current.play().catch(() => setPlayingAudio(null)); } }
    } catch { setPlayingAudio(null); }
  }, [playingAudio, audioCache]);

  const goToUnit = useCallback((newUnitId: number) => { if (newUnitId < 1 || newUnitId > 100) return; setAudioCache({}); loadLesson(newUnitId); }, [loadLesson]);

  if (!lesson && !isLoading) {
    return (
      <div className="space-y-6">
        {error && <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center">{error}</div>}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Selecciona una unidad (1-100)</label>
            <div className="flex items-center gap-3 flex-wrap">
              <input type="number" min={1} max={100} value={unitId} onChange={(e) => { const val = parseInt(e.target.value, 10); if (!isNaN(val) && val >= 1 && val <= 100) setUnitId(val); }} className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <span className="text-sm text-gray-500">Nivel: <span className="font-semibold">{unitId <= 25 ? "A1" : unitId <= 50 ? "A2" : unitId <= 75 ? "B1" : "B2"}</span></span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[{ label: "A1 (1-25)", range: 1 }, { label: "A2 (26-50)", range: 26 }, { label: "B1 (51-75)", range: 51 }, { label: "B2 (76-100)", range: 76 }].map((btn) => (
              <button key={btn.label} onClick={() => setUnitId(btn.range)} className="px-3 py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition">{btn.label}</button>
            ))}
          </div>
          <button onClick={() => loadLesson(unitId)} className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold">Abrir leccion {unitId}</button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (<div className="flex items-center justify-center h-[400px]"><div className="text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div><p className="mt-4 text-gray-500">Preparando tu leccion...</p></div></div>);
  }

  if (!lesson) return null;

  return (
    <div className="space-y-6">
      <audio ref={audioRef} onEnded={() => setPlayingAudio(null)} className="hidden" />
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-semibold">{lesson.level}</span>
            <span className="text-xs text-gray-500">Unidad {lesson.unitId}</span>
          </div>
          <button onClick={() => { setLesson(null); setAudioCache({}); }} className="px-3 py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition">Otras unidades</button>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{lesson.title}</h2>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5"><p className="text-gray-800 leading-relaxed">{lesson.introduction}</p></div>
      {lesson.sections.map((section, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <h3 className="text-lg font-bold text-gray-900">{section.title}</h3>
          <p className="text-gray-600 leading-relaxed">{section.explanation}</p>
          <div className="space-y-3">
            {section.items.map((item, j) => (
              <div key={j} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <button onClick={() => playAudio(item.english)} className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition" aria-label={`Escuchar ${item.english}`}>
                  {playingAudio === item.english ? <span className="text-lg">⏸</span> : <span className="text-lg">🔊</span>}
                </button>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900">{item.english}</span>
                    <span className="text-gray-400">—</span>
                    <span className="text-gray-600">{item.spanish}</span>
                  </div>
                  {item.example && <p className="text-sm text-gray-500 mt-1 italic">&ldquo;{item.example}&rdquo;</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {lesson.tips && <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5"><p className="text-sm font-semibold text-yellow-800">💡 Consejos de pronunciacion</p><p className="text-gray-700 mt-1 leading-relaxed">{lesson.tips}</p></div>}
      <div className="flex items-center justify-between gap-4 pt-4">
        <button onClick={() => goToUnit(unitId - 1)} disabled={unitId <= 1} className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition disabled:opacity-40 disabled:cursor-not-allowed font-semibold">← Anterior</button>
        <span className="text-sm text-gray-500">Unidad {unitId} de 100</span>
        <button onClick={() => goToUnit(unitId + 1)} disabled={unitId >= 100} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed font-semibold">Siguiente →</button>
      </div>
    </div>
  );
}

