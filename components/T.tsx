"use client";

import { useCallback, useState, type ReactNode } from "react";

type TProps = { children: string; className?: string };

export const STOPWORDS = new Set([
  "the", "a", "an", "of", "in", "on", "at", "for", "with", "by", "from",
  "as", "or", "and", "but", "to"
]);

export const TRANSLATABLE = new Set([
  "was", "am", "are", "is", "were", "have", "has", "had", "do", "does",
  "did", "will", "would", "can", "could", "should", "not", "work", "wait",
  "play", "be", "been", "being", "may", "might", "must", "go", "come",
  "eat", "drink", "sleep", "study", "learn", "write", "read", "make", "take"
]);

export default function T({ children, className = "" }: TProps) {
  const [translation, setTranslation] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTranslation = useCallback(async () => {
    if (translation || loading) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: children })
      });
      const data = await response.json() as any;
      if (!response.ok || !data.translation) throw new Error(data.error || "No se pudo traducir");
      setTranslation(data.translation);
    } catch {
      setError("Traducción no disponible");
    } finally {
      setLoading(false);
    }
  }, [children, loading, translation]);

  const show = () => {
    setOpen(true);
    void loadTranslation();
  };

  return (
    <span
      className={"relative inline cursor-help border-b border-dotted border-blue-400 " + className}
      tabIndex={0}
      role="button"
      aria-label={"Traducir: " + children}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") show(); }}
      onPointerLeave={(event) => { if (event.pointerType === "mouse") setOpen(false); }}
      onFocus={show}
      onBlur={() => setOpen(false)}
      onClick={() => open ? setOpen(false) : show()}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open ? setOpen(false) : show();
        }
      }}
    >
      {children}
      {open && (
        <span className="absolute bottom-full left-1/2 z-50 mb-3 w-max max-w-64 -translate-x-1/2 rounded-xl bg-slate-950 px-3 py-2 text-xs font-semibold leading-5 text-white shadow-xl">
          {loading ? "Traduciendo…" : translation || error || children}
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-8 border-transparent border-t-slate-950" />
        </span>
      )}
    </span>
  );
}

export function wrapWithTranslation(text: string) {
  const parts = text.split(/(\\s+|[A-Za-z]+)/g).filter(Boolean);
  const output: ReactNode[] = [];
  for (let index = 0; index < parts.length; index++) {
    const part = parts[index];
    const next = parts[index + 1];
    const afterNext = parts[index + 2];
    if (part.toLowerCase() === "to" && /^\\s+$/.test(next || "") && afterNext && TRANSLATABLE.has(afterNext.toLowerCase())) {
      output.push(<T key={index}>{part + next + afterNext}</T>);
      index += 2;
    } else if (/^[A-Za-z]+$/.test(part) && !STOPWORDS.has(part.toLowerCase())) {
      output.push(<T key={index}>{part}</T>);
    } else {
      output.push(<span key={index}>{part}</span>);
    }
  }
  return output;
}
