"use client";

import { useState } from "react";
import PronunciationTutor from "@/components/PronunciationTutor";
import ConversationPractice from "@/components/ConversationPractice";
import VoiceConversation from "@/components/VoiceConversation";
import SpacedRepetition from "@/components/SpacedRepetition";

type Tab = "pronunciation" | "conversation" | "voice" | "repetition";

const TABS: { id: Tab; label: string; icon: string; desc: string }[] = [
  { id: "pronunciation", label: "Pronunciación", icon: "🎙️", desc: "Feedback instantáneo con IA" },
  { id: "conversation", label: "Conversación", icon: "💬", desc: "Role-play con personaje IA" },
  { id: "voice", label: "Voice Tutor", icon: "🎤", desc: "100 unidades con guion y audio" },
  { id: "repetition", label: "Repaso", icon: "🧠", desc: "Repetición espaciada adaptativa" },
];

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("pronunciation");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold">🦅 LinguaFly</h1>
          <p className="mt-2 text-blue-100">
            Aprende idiomas con IA: pronunciación, conversación y repetición adaptativa
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-4 gap-3">
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

      <div className="py-8">
        {activeTab === "pronunciation" && <PronunciationTutor />}
        {activeTab === "conversation" && <ConversationPractice />}
        {activeTab === "voice" && <VoiceConversation />}
        {activeTab === "repetition" && <SpacedRepetition />}
      </div>
    </div>
  );
}
