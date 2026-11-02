"use client";

import { useState } from "react";

type Content = {
  prompt?: string;
  options?: string[];
  stimulus?: string;
  sentence?: string;
};

type Props = {
  exerciseId: string;
  level: string;
  unit: string;
  title: string;
  exerciseType: string;
  content: Content;
};

type AttemptResult = {
  isCorrect?: boolean;
  feedback?: { message?: string };
  error?: string;
};

export default function ExerciseCard({ exerciseId, level, unit, title, exerciseType, content }: Props) {
  const [selected, setSelected] = useState("");
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<AttemptResult | null>(null);
  const [loading, setLoading] = useState(false);

  const options = content.options ?? [];
  const hasOptions = options.length > 0;

  async function submit() {
    if (loading || (hasOptions ? !selected : !answer.trim())) return;
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch(`/api/academia/${encodeURIComponent(level)}/${encodeURIComponent(unit)}/attempt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exerciseId,
          response: hasOptions ? selected : { answer },
          idempotencyKey: crypto.randomUUID(),
        }),
      });
      const data = await response.json() as AttemptResult;
      if (!response.ok) throw new Error(data.error || "No se pudo comprobar la respuesta.");
      setResult(data);
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : "Error al enviar la respuesta." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="rounded-xl bg-slate-50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-bold uppercase text-blue-700">{exerciseType.replaceAll("-", " ")}</p>
        <p className="text-xs text-slate-500">{title}</p>
      </div>
      {content.stimulus ? <p className="mt-3 whitespace-pre-wrap rounded-lg bg-white p-3 text-sm leading-6">{content.stimulus}</p> : null}
      {content.prompt ? <h3 className="mt-3 font-semibold">{content.prompt}</h3> : null}
      {content.sentence ? <p className="mt-2 text-sm">{content.sentence}</p> : null}

      {hasOptions ? (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {options.map((option, index) => {
            const key = String.fromCharCode(65 + index);
            const active = selected === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => { setSelected(key); setResult(null); }}
                aria-pressed={active}
                className={`rounded-lg border px-4 py-3 text-left text-sm transition ${active ? "border-blue-600 bg-blue-50 font-semibold text-blue-900" : "border-slate-200 bg-white hover:border-blue-300"}`}
              >
                <span className="mr-2 font-bold">{key}.</span>{option}
              </button>
            );
          })}
        </div>
      ) : (
        <label className="mt-4 block">
          <span className="sr-only">Tu respuesta</span>
          <input value={answer} onChange={(event) => { setAnswer(event.target.value); setResult(null); }} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" placeholder="Escribe tu respuesta" />
        </label>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" onClick={submit} disabled={loading || (hasOptions ? !selected : !answer.trim())} className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? "Comprobando…" : "Comprobar"}
        </button>
        {result?.isCorrect !== undefined ? (
          <p role="status" className={result.isCorrect ? "text-sm font-semibold text-green-700" : "text-sm font-semibold text-amber-700"}>
            {result.feedback?.message || (result.isCorrect ? "¡Correcto!" : "Inténtalo de nuevo.")}
          </p>
        ) : null}
        {result?.error ? <p role="alert" className="text-sm text-red-700">{result.error}</p> : null}
      </div>
    </article>
  );
}
