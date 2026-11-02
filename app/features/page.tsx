"use client";

import { useState } from "react";
import PronunciationTutor from "@/components/PronunciationTutor";
import ConversationPractice from "@/components/ConversationPractice";
import SpacedRepetition from "@/components/SpacedRepetition";

type Tab = "pronunciation" | "conversation" | "repetition";

const TABS: { id: Tab; label: string; icon: string; desc: string }[] = [
  { id: "pronunciation", label: "Pronunciación", icon: "🎙️", desc: "Feedback instantáneo con IA" },
  { id: "conversation", label: "Conversación", icon: "💬", desc: "Role-play con personaje IA" },
  { id: "repetition", label: "Repaso", icon: "🧠", desc: "Repetición espaciada adaptativa" },
];

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("pronunciation");

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 text-white shadow-xl shadow-indigo-900/10">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-14">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-2xl ring-1 ring-white/20 shadow-inner">🦅</div>
            <div><h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">LinguaFly</h1><p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-100/80">AI language studio</p></div>
          </div>
          <p className="mt-3 max-w-2xl text-blue-100">Aprende idiomas con IA: pronunciación, conversación y repetición adaptativa.</p>
        </div>
      </section>
      <nav aria-label="Herramientas de aprendizaje" className="relative z-10 mx-auto -mt-7 grid max-w-6xl grid-cols-1 gap-3 px-4 sm:grid-cols-3 sm:px-8">
        {TABS.map((tab) => (
          <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} aria-pressed={activeTab === tab.id}
            className={`rounded-2xl border p-4 text-center transition-all duration-200 hover:-translate-y-0.5 sm:p-5 ${activeTab === tab.id ? "border-indigo-300 bg-white shadow-xl shadow-indigo-100/80 ring-2 ring-indigo-100" : "border-slate-200/70 bg-white/90 hover:border-indigo-200 hover:bg-white hover:shadow-lg hover:shadow-indigo-100/60"}`}>
            <span className="block text-3xl">{tab.icon}</span><span className="mt-2 block font-semibold text-slate-900">{tab.label}</span><span className="mt-1 block text-xs text-slate-500">{tab.desc}</span>
          </button>
        ))}
      </nav>
      <section className="py-8" aria-live="polite">
        {activeTab === "pronunciation" && <PronunciationTutor />}
        {activeTab === "conversation" && <ConversationPractice />}
        {activeTab === "repetition" && <SpacedRepetition />}
      </section>
    </main>
  );
}
