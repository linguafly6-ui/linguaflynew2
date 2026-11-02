"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * ============================================================
 * COMPONENTE: RepeticiÃ³n Espaciada Adaptativa
 * ============================================================
 * Sistema SM-2 con generaciÃ³n de contenido adaptativo por IA.
 * Cuando el usuario falla, la IA crea un nuevo ejemplo.
 */

interface SRItem {
  id: string;
  word: string;
  translation: string;
  language: string;
  context_sentence: string | null;
  interval_days: number;
  ease_factor: number;
  repetitions: number;
  next_review_at: string;
  total_reviews: number;
  correct_reviews: number;
}

interface SRStats {
  totalItems: number;
  dueToday: number;
  mastered: number;
  accuracy: number;
}

export default function SpacedRepetition({ userId = "demo-user" }: { userId?: string }) {
  const [items, setItems] = useState<SRItem[]>([]);
  const [stats, setStats] = useState<SRStats | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adaptiveContent, setAdaptiveContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Cargar items pendientes
  const loadDueItems = useCallback(async () => {
    try {
      const res = await fetch(`/api/repetition/due?userId=${userId}&limit=20`);
      const data = await res.json() as any;
      setItems(data.items || []);
      setStats(data.stats || null);
      setCurrentIndex(0);
      setShowAnswer(false);
      setAdaptiveContent(null);
    } catch (err) {
      setError("Error al cargar items");
    }
  }, [userId]);

  useEffect(() => {
    loadDueItems();
  }, [loadDueItems]);

  const currentItem = items[currentIndex];

  // Calificar respuesta (SM-2: 0-5)
  const rateAnswer = async (rating: number) => {
    if (!currentItem) return;
    setIsSubmitting(true);
    setError(null);

    const wasCorrect = rating >= 3;

    try {
      const res = await fetch("/api/repetition/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: currentItem.id,
          userId,
          rating,
          wasCorrect,
          word: currentItem.word,
          translation: currentItem.translation,
          language: currentItem.language,
          userLevel: "A1", // Ajustar segÃºn nivel del usuario
        }),
      });
      const data = await res.json() as any;

      if (data.error) {
        setError(data.error);
        return;
      }

      // Si fallÃ³ y hay contenido adaptativo, mostrarlo
      if (!wasCorrect && data.adaptiveContent) {
        setAdaptiveContent(data.adaptiveContent);
        // Esperar a que el usuario vea el contenido antes de continuar
        return;
      }

      nextItem();
    } catch (err) {
      setError("Error al procesar la revisiÃ³n");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextItem = () => {
    setAdaptiveContent(null);
    setShowAnswer(false);
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // No hay mÃ¡s items
      setItems([]);
      setCurrentIndex(0);
    }
  };

  // Pantalla de estadÃ­sticas cuando no hay items
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl space-y-7 px-5 py-8 sm:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">ðŸ§  RepeticiÃ³n Espaciada</h2>
          <p className="mt-2 text-base text-slate-500">Algoritmo SM-2 con contenido adaptativo generado por IA</p>
        </div>

        {stats && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-lg shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <p className="text-4xl font-black tracking-tight text-blue-600">{stats.totalItems}</p>
              <p className="mt-2 text-base text-slate-500">Palabras totales</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-lg shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <p className="text-4xl font-black tracking-tight text-green-600">{stats.mastered}</p>
              <p className="mt-2 text-base text-slate-500">Dominadas</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-lg shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <p className="text-4xl font-black tracking-tight text-orange-600">{stats.dueToday}</p>
              <p className="mt-2 text-base text-slate-500">Pendientes hoy</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-lg shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <p className="text-4xl font-black tracking-tight text-purple-600">{stats.accuracy}%</p>
              <p className="mt-2 text-base text-slate-500">PrecisiÃ³n</p>
            </div>
          </div>
        )}

        <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-8 text-center shadow-lg shadow-emerald-100/60">
          <p className="text-5xl">ðŸŽ‰</p>
          <p className="mt-3 text-xl font-bold text-slate-900">Â¡No tienes repasos pendientes!</p>
          <p className="mt-2 text-base text-slate-500">Vuelve mÃ¡s tarde o aÃ±ade nuevas palabras.</p>
          <button
            onClick={loadDueItems}
            className="mt-5 rounded-xl bg-blue-600 px-7 py-3 font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-blue-700 active:scale-95"
          >
            Recargar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-7 px-5 py-8 sm:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">ðŸ§  RepeticiÃ³n Espaciada</h2>
        <p className="mt-2 text-base text-slate-500">
          Repaso {currentIndex + 1} de {items.length}
        </p>
      </div>

      {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-center font-medium text-red-700 shadow-sm">{error}</div>}

      {stats && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[{ label: "Palabras", value: stats.totalItems, color: "text-blue-600", icon: "📚" }, { label: "Dominadas", value: stats.mastered, color: "text-green-600", icon: "🏆" }, { label: "Pendientes", value: stats.dueToday, color: "text-orange-600", icon: "⏳" }, { label: "Precisión", value: `${stats.accuracy}%`, color: "text-violet-600", icon: "🎯" }].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between"><span className="text-xl">{stat.icon}</span><span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span></div>
              <p className="mt-1 text-xs font-semibold text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold text-slate-500"><span>Tu progreso de hoy</span><span>Repaso {currentIndex + 1} de {items.length}</span></div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600 transition-all duration-500" style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }} /></div>
      </div>

      {/* Flashcard */}
      <div className="[perspective:1200px] min-h-[340px] rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-slate-200/70 transition-all duration-500 sm:p-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
          {currentItem.language === "en" ? "ðŸ‡¬ðŸ‡§ InglÃ©s" : currentItem.language === "fr" ? "ðŸ‡«ðŸ‡· FrancÃ©s" : "ðŸ‡ªðŸ‡¸ EspaÃ±ol"}
        </p>
        <p className="text-center text-5xl font-black tracking-tight text-slate-900">{currentItem.word}</p>

        {currentItem.context_sentence && (
          <p className="mt-5 text-center text-slate-500 italic">"{currentItem.context_sentence}"</p>
        )}

        {!showAnswer ? (
          <button
            onClick={() => setShowAnswer(true)}
            className="mt-8 rounded-xl bg-blue-600 px-8 py-4 font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-blue-700 active:scale-95"
          >
            Mostrar respuesta
          </button>
        ) : (
          <>
            <div className="mt-6 animate-[slideDown_.3s_ease-out] text-center">
              <p className="text-5xl text-green-600 font-semibold">{currentItem.translation}</p>
            </div>

            {/* Contenido adaptativo si fallÃ³ */}
            {adaptiveContent && (
              <div className="mt-6 w-full animate-[slideDown_.3s_ease-out] rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-violet-100 p-5 shadow-sm">
                <p className="text-sm font-bold text-purple-800">ðŸ¤– Nuevo ejemplo generado por IA:</p>
                <p className="mt-2 text-slate-700 italic">"{adaptiveContent}"</p>
                <button
                  onClick={nextItem}
                  className="mt-4 w-full rounded-xl bg-purple-600 py-3 font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-purple-700 active:scale-95"
                >
                  Entendido, continuar â†’
                </button>
              </div>
            )}

            {/* Botones de calificaciÃ³n SM-2 */}
            {!adaptiveContent && (
              <div className="mt-8 w-full">
                <p className="mb-3 text-center text-sm font-semibold text-slate-500">Â¿QuÃ© tal lo recordabas?</p>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => rateAnswer(0)}
                    disabled={isSubmitting}
                    className="rounded-xl bg-red-100 py-3 font-bold text-red-800 transition-all duration-300 hover:scale-105 hover:bg-red-200 active:scale-95 disabled:opacity-50"
                  >
                    Nada
                  </button>
                  <button
                    onClick={() => rateAnswer(2)}
                    disabled={isSubmitting}
                    className="rounded-xl bg-orange-100 py-3 font-bold text-orange-800 transition-all duration-300 hover:scale-105 hover:bg-orange-200 active:scale-95 disabled:opacity-50"
                  >
                    Mal
                  </button>
                  <button
                    onClick={() => rateAnswer(4)}
                    disabled={isSubmitting}
                    className="rounded-xl bg-yellow-100 py-3 font-bold text-yellow-800 transition-all duration-300 hover:scale-105 hover:bg-yellow-200 active:scale-95 disabled:opacity-50"
                  >
                    Bien
                  </button>
                  <button
                    onClick={() => rateAnswer(5)}
                    disabled={isSubmitting}
                    className="rounded-xl bg-green-100 py-3 font-bold text-green-800 transition-all duration-300 hover:scale-105 hover:bg-green-200 active:scale-95 disabled:opacity-50"
                  >
                    FÃ¡cil
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Info del item */}
      <div className="flex justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
        <span>Repeticiones: {currentItem.repetitions}</span>
        <span>PrÃ³ximo repaso: {currentItem.interval_days} dÃ­as</span>
      </div>
    </div>
  );
}
