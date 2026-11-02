"use client";

import { useState } from "react";
import PronunciationTutor from "@/components/PronunciationTutor";
import ConversationPractice from "@/components/ConversationPractice";
import SpacedRepetition from "@/components/SpacedRepetition";

/**
 * ============================================================
 * PÃGINA: LinguaFly Features
 * ============================================================
 * PestaÃ±as para las 3 funciones novedosas.
 * Ruta sugerida: /features  (o /app/features/page.tsx)
 */

type Tab = "pronunciation" | "conversation" | "repetition";

const TABS: { id: Tab; label: string; icon: string; desc: string }[] = [
  { id: "pronunciation", label: "PronunciaciÃ³n", icon: "ðŸŽ™ï¸", desc: "Feedback instantÃ¡neo con IA" },
  { id: "conversation", label: "ConversaciÃ³n", icon: "ðŸ’¬", desc: "Role-play con personaje IA" },
  { id: "repetition", label: "Repaso", icon: "ðŸ§ ", desc: "RepeticiÃ³n espaciada adaptativa" },
];

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("pronunciation");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold">ðŸ¦… LinguaFly</h1>
          <p className="mt-2 text-blue-100">
            Aprende idiomas con IA: pronunciaciÃ³n, conversaciÃ³n y repeticiÃ³n adaptativa
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-3 gap-3">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 rounded-xl text-center transition ${
                activeTab === tab.id
                  ? "bg-white shadow-lg border-2 border-blue-500"
                  : "bg-white/80 border-2 border-transparent hover:bg-white"
              }`}
            >
              <span className="text-3xl block">{tab.icon}</span>
              <span className="font-semibold text-gray-900 block mt-2">{tab.label}</span>
              <span className="text-xs text-gray-500 block mt-1">{tab.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contenido */}
      <div className="py-8">
        {activeTab === "pronunciation" && <PronunciationTutor />}
        {activeTab === "conversation" && <ConversationPractice />}
        {activeTab === "repetition" && <SpacedRepetition />}
      </div>
    </div>
  );
}
