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
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">ðŸ§  RepeticiÃ³n Espaciada</h2>
          <p className="text-gray-500 mt-1">Algoritmo SM-2 con contenido adaptativo generado por IA</p>
        </div>

        {stats && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-blue-600">{stats.totalItems}</p>
              <p className="text-gray-500 mt-1">Palabras totales</p>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-green-600">{stats.mastered}</p>
              <p className="text-gray-500 mt-1">Dominadas</p>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-orange-600">{stats.dueToday}</p>
              <p className="text-gray-500 mt-1">Pendientes hoy</p>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-purple-600">{stats.accuracy}%</p>
              <p className="text-gray-500 mt-1">PrecisiÃ³n</p>
            </div>
          </div>
        )}

        <div className="bg-green-50 rounded-xl p-8 text-center">
          <p className="text-2xl">ðŸŽ‰</p>
          <p className="text-lg font-semibold text-gray-900 mt-2">Â¡No tienes repasos pendientes!</p>
          <p className="text-gray-500 mt-1">Vuelve mÃ¡s tarde o aÃ±ade nuevas palabras.</p>
          <button
            onClick={loadDueItems}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Recargar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">ðŸ§  RepeticiÃ³n Espaciada</h2>
        <p className="text-gray-500 mt-1">
          Repaso {currentIndex + 1} de {items.length}
        </p>
      </div>

      {error && <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center">{error}</div>}

      {/* Flashcard */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 min-h-[300px] flex flex-col items-center justify-center">
        <p className="text-sm text-gray-400 mb-2">
          {currentItem.language === "en" ? "ðŸ‡¬ðŸ‡§ InglÃ©s" : currentItem.language === "fr" ? "ðŸ‡«ðŸ‡· FrancÃ©s" : "ðŸ‡ªðŸ‡¸ EspaÃ±ol"}
        </p>
        <p className="text-4xl font-bold text-gray-900 text-center">{currentItem.word}</p>

        {currentItem.context_sentence && (
          <p className="text-gray-500 italic mt-4 text-center">"{currentItem.context_sentence}"</p>
        )}

        {!showAnswer ? (
          <button
            onClick={() => setShowAnswer(true)}
            className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Mostrar respuesta
          </button>
        ) : (
          <>
            <div className="mt-6 text-center">
              <p className="text-2xl text-green-600 font-semibold">{currentItem.translation}</p>
            </div>

            {/* Contenido adaptativo si fallÃ³ */}
            {adaptiveContent && (
              <div className="mt-6 w-full bg-purple-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-purple-700">ðŸ¤– Nuevo ejemplo generado por IA:</p>
                <p className="text-gray-800 mt-2 italic">"{adaptiveContent}"</p>
                <button
                  onClick={nextItem}
                  className="mt-4 w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Entendido, continuar â†’
                </button>
              </div>
            )}

            {/* Botones de calificaciÃ³n SM-2 */}
            {!adaptiveContent && (
              <div className="mt-8 w-full">
                <p className="text-sm text-gray-500 text-center mb-3">Â¿QuÃ© tal lo recordabas?</p>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => rateAnswer(0)}
                    disabled={isSubmitting}
                    className="py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition disabled:opacity-50"
                  >
                    Nada
                  </button>
                  <button
                    onClick={() => rateAnswer(2)}
                    disabled={isSubmitting}
                    className="py-3 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition disabled:opacity-50"
                  >
                    Mal
                  </button>
                  <button
                    onClick={() => rateAnswer(4)}
                    disabled={isSubmitting}
                    className="py-3 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition disabled:opacity-50"
                  >
                    Bien
                  </button>
                  <button
                    onClick={() => rateAnswer(5)}
                    disabled={isSubmitting}
                    className="py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition disabled:opacity-50"
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
      <div className="flex justify-between text-sm text-gray-400">
        <span>Repeticiones: {currentItem.repetitions}</span>
        <span>PrÃ³ximo repaso: {currentItem.interval_days} dÃ­as</span>
      </div>
    </div>
  );
}
