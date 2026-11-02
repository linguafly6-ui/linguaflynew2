"use client";

import { useState } from "react";
import PronunciationTutor from "@/components/PronunciationTutor";
import ConversationPractice from "@/components/ConversationPractice";
import SpacedRepetition from "@/components/SpacedRepetition";

/**
 * ============================================================
 * PÁGINA: LinguaFly Features
 * ============================================================
 * Pestañas para las 3 funciones novedosas.
 * Ruta sugerida: /features  (o /app/features/page.tsx)
 */

type Tab = "pronunciation" | "conversation" | "repetition";

const TABS: { id: Tab; label: string; icon: string; desc: string }[] = [
  { id: "pronunciation", label: "Pronunciación", icon: "🎙️", desc: "Feedback instantáneo con IA" },
  { id: "conversation", label: "Conversación", icon: "💬", desc: "Role-play con personaje IA" },
  { id: "repetition", label: "Repaso", icon: "🧠", desc: "Repetición espaciada adaptativa" },
];

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("pronunciation");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50/40 pb-12">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-violet-700 text-white shadow-lg">
        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100 shadow-sm backdrop-blur"><span>✨</span><span>Tu estudio inteligente</span></div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">🦅 LinguaFly</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-blue-100">
            Aprende idiomas con IA: pronunciación, conversación y repetición adaptativa
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-auto -mt-8 max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group rounded-2xl border-2 p-5 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:ring-2 focus:ring-blue-500 sm:p-6 ${
                activeTab === tab.id
                  ? "border-blue-500 bg-white shadow-lg shadow-blue-100"
                  : "border-white bg-white/90 hover:border-blue-200 hover:bg-white"
              }`}
            >
              <span className="mb-2 block text-4xl transition-transform duration-300 group-hover:scale-110">{tab.icon}</span>
              <span className="mt-2 block font-bold text-slate-900">{tab.label}</span>
              <span className="mt-1 block text-sm text-slate-500">{tab.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contenido */}
      <div className="py-10 transition-all duration-300">
        {activeTab === "pronunciation" && <PronunciationTutor />}
        {activeTab === "conversation" && <ConversationPractice />}
        {activeTab === "repetition" && <SpacedRepetition />}
      </div>
    </div>
  );
}
