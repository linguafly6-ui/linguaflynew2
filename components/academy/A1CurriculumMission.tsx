"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { A1CurriculumMission as Mission, ChoiceQuestion } from "@/content/canonical-missions/a1/a1-curriculum-types";

const sections = [
  { id: "grammar", label: "Grammar" },
  { id: "pronunciation", label: "Pronunciation" },
  { id: "reading", label: "Reading" },
  { id: "listening", label: "Listening" },
] as const;

function speakBritishEnglish(text: string, onUnavailable: () => void) {
  if (!("speechSynthesis" in window)) {
    onUnavailable();
    return;
  }

  window.speechSynthesis.cancel();
  let repetitions = 0;
  const speakNext = () => {
    if (repetitions === 3) return;
    repetitions += 1;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.onend = speakNext;
    window.speechSynthesis.speak(utterance);
  };
  speakNext();
}

function QuestionSet({ questions }: { questions: ChoiceQuestion[] }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const question = questions[index];

  if (finished) {
    return (
      <div className="mt-6 rounded-2xl bg-emerald-50 p-5" role="status">
        <p className="text-lg font-bold text-emerald-900">Bloque completado</p>
        <p className="mt-1 text-sm text-emerald-800">Aciertos: {score} de {questions.length}.</p>
        <button type="button" onClick={() => { setIndex(0); setSelected(null); setScore(0); setFinished(false); }} className="mt-4 rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-900">
          Repetir bloque
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>Pregunta {index + 1} de {questions.length}</span>
        <span>Aciertos: {score}</span>
      </div>
      <h3 className="text-lg font-bold leading-7 text-slate-900">{question.prompt}</h3>
      <div className="mt-4 grid gap-2">
        {question.options.map((option) => {
          const isCorrect = option === question.answer;
          const isSelected = option === selected;
          return (
            <button
              key={option}
              type="button"
              disabled={selected !== null}
              onClick={() => {
                setSelected(option);
                if (isCorrect) setScore((value) => value + 1);
              }}
              className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition disabled:cursor-default ${
                selected !== null && isCorrect
                  ? "border-emerald-400 bg-emerald-50 text-emerald-900"
                  : isSelected
                    ? "border-rose-300 bg-rose-50 text-rose-900"
                    : "border-slate-200 bg-white text-slate-800 hover:border-indigo-300"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3" role="status">
          <p className={`text-sm font-semibold ${selected === question.answer ? "text-emerald-700" : "text-rose-700"}`}>
            {selected === question.answer ? question.feedback : `No exactamente. ${question.feedback}`}
          </p>
          <button
            type="button"
            onClick={() => {
              if (index + 1 === questions.length) setFinished(true);
              else { setIndex((value) => value + 1); setSelected(null); }
            }}
            className="rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white"
          >
            {index + 1 === questions.length ? "Ver resultado" : "Siguiente"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function A1CurriculumMission({ mission }: { mission: Mission }) {
  const [activeSection, setActiveSection] = useState<(typeof sections)[number]["id"]>("grammar");
  const [audioMessage, setAudioMessage] = useState("");

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const playAudio = (text: string) => {
    setAudioMessage("");
    speakBritishEnglish(text, () => setAudioMessage("La síntesis de voz no está disponible en este navegador."));
  };

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-8 sm:px-6">
      <Link href="/academia/a1" className="text-sm font-semibold text-indigo-700 hover:text-indigo-900">
        ← Volver al curso A1
      </Link>
      <header className="mt-6 rounded-3xl bg-gradient-to-br from-blue-950 via-indigo-900 to-violet-800 px-6 py-8 text-white sm:px-9">
        <p className="text-xs font-extrabold uppercase tracking-[.18em] text-cyan-200">Linguafly Academy · A1 · Misión {String(mission.position).padStart(3, "0")}</p>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">{mission.title}</h1>
        <p className="mt-3 max-w-3xl leading-7 text-indigo-100">{mission.objective}</p>
      </header>

      <nav className="mt-6 flex gap-2 overflow-x-auto pb-2" aria-label="Secciones de la misión">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            aria-current={activeSection === section.id ? "step" : undefined}
            onClick={() => setActiveSection(section.id)}
            className={`shrink-0 rounded-xl px-4 py-3 text-sm font-bold ${activeSection === section.id ? "bg-indigo-700 text-white" : "border border-slate-200 bg-white text-slate-700"}`}
          >
            {section.label}
          </button>
        ))}
      </nav>

      <section className="mt-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        {activeSection === "grammar" && (
          <>
            <h2 className="text-2xl font-black text-slate-950">Grammar</h2>
            <p className="mt-3 leading-7 text-slate-700">{mission.grammar.explanation}</p>
            <div className="mt-4 grid gap-2 rounded-2xl bg-slate-50 p-4 text-sm text-slate-800">
              {mission.grammar.models.map((model) => <p key={model}><span className="font-semibold">{model.english}</span><span className="text-slate-500"> — {model.spanish}</span></p>)}
            </div>
            <p className="mt-4 text-sm font-semibold text-indigo-800">{mission.grammar.practice}</p>
            <QuestionSet key="grammar" questions={mission.grammar.questions} />
          </>
        )}

        {activeSection === "pronunciation" && (
          <>
            <h2 className="text-2xl font-black text-slate-950">Pronunciation</h2>
            <p className="mt-2 leading-7 text-slate-600">Escucha cada modelo en inglés británico y repítelo tres veces. La guía es aproximada para hispanohablantes; no es una transcripción fonética exacta.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {mission.pronunciation.map(([text, translation, activity, guide]) => (
                <article key={text} className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-lg font-bold text-slate-900">{text}</p>
                  <p className="mt-1 text-sm text-slate-600">{translation}</p>
                  <p className="mt-3 text-sm text-indigo-900"><strong>Prueba:</strong> {activity}</p>
                  <p className="mt-2 text-sm text-slate-600"><strong>Guía:</strong> {guide}</p>
                  <button type="button" onClick={() => playAudio(text)} className="mt-3 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-800">
                    Escuchar modelo ×3
                  </button>
                </article>
              ))}
            </div>
            {audioMessage && <p className="mt-4 text-sm text-rose-700" role="status">{audioMessage}</p>}
          </>
        )}

        {activeSection === "reading" && (
          <>
            <h2 className="text-2xl font-black text-slate-950">Reading</h2>
            <p className="mt-2 text-sm text-slate-600">Lee el texto las veces que necesites. Las preguntas comprueban detalles que aparecen en él.</p>
            <article className="mt-5 whitespace-pre-line rounded-2xl bg-blue-50 p-5 text-base leading-8 text-slate-800">{mission.reading.passage}</article>
            <QuestionSet key="reading" questions={mission.reading.questions} />
          </>
        )}

        {activeSection === "listening" && (
          <>
            <h2 className="text-2xl font-black text-slate-950">Listening</h2>
            <p className="mt-2 leading-7 text-slate-600">Escucha el audio en inglés británico y responde según la información que oigas.</p>
            <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
              <p className="text-xs font-extrabold uppercase tracking-wider text-indigo-700">Formato: {mission.listening.format}</p>
              <button type="button" onClick={() => playAudio(mission.listening.script)} className="mt-3 rounded-xl bg-indigo-700 px-4 py-3 text-sm font-bold text-white">
                Escuchar audio ×3
              </button>
              {audioMessage && <p className="mt-3 text-sm text-rose-700" role="status">{audioMessage}</p>}
            </div>
            <QuestionSet key="listening" questions={mission.listening.questions} />
          </>
        )}
      </section>
    </main>
  );
}
