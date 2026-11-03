"use client";

import { useCallback, useState } from "react";

type TProps = { children: string; className?: string };

export const TRANSLATION_STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "am", "was", "were", "be", "been", "being",
  "and", "or", "but", "if", "of", "to", "in", "on", "at", "for", "from",
  "with", "by", "as", "it", "its", "this", "that", "these", "those", "i",
  "you", "he", "she", "we", "they", "me", "him", "her", "us", "them",
  "my", "your", "his", "our", "their", "do", "does", "did", "have", "has",
  "had", "will", "would", "can", "could", "should", "may", "might", "must",
  "not", "no", "yes", "so", "than", "then", "there", "here", "who", "what",
  "when", "where", "why", "how", "which", "while", "because"
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
      const data = await response.json() as { translation?: string; error?: string };
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
      onMouseEnter={show}
      onMouseLeave={() => setOpen(false)}
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
  const parts = text.split(/(\s+|[A-Za-z]+(?:['’-][A-Za-z]+)*)/g).filter(Boolean);
  return parts.map((part, index) => {
    if (/^[A-Za-z]+(?:['’-][A-Za-z]+)*$/.test(part) && !TRANSLATION_STOPWORDS.has(part.toLowerCase())) {
      return <T key={index}>{part}</T>;
    }
    return <span key={index}>{part}</span>;
  });
}
