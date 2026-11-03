"use client";

import { useMemo, useRef, useState } from "react";
import { TRANSLATION_STOPWORDS } from "@/components/T";

type Tooltip = { word: string; translation: string; x: number; y: number } | null;

function decorateKeywords(html: string) {
  return html.replace(/<(strong|em|h2|h3|li)\b([^>]*)>([\s\S]*?)<\/\1>/gi, (_match, tag: string, attrs: string, inner: string) => {
    const enhanced = inner.replace(/(^|>)([^<>]+)(?=<|$)/g, (_text, prefix: string, plain: string) => {
      const words = plain.replace(/\b[A-Za-z][A-Za-z'’-]*\b/g, (word) => {
        if (TRANSLATION_STOPWORDS.has(word.toLowerCase())) return word;
        return '<span tabindex="0" data-lf-word="' + word.replace(/"/g, "&quot;") + '" class="cursor-help border-b border-dotted border-blue-400">' + word + "</span>";
      });
      return prefix + words;
    });
    return "<" + tag + attrs + ">" + enhanced + "</" + tag + ">";
  });
}

export default function TranslatedBlogContent({ html }: { html: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<string>("");
  const [tooltip, setTooltip] = useState<Tooltip>(null);
  const decorated = useMemo(() => decorateKeywords(html), [html]);

  async function reveal(target: EventTarget | null) {
    const element = target instanceof HTMLElement ? target.closest<HTMLElement>("[data-lf-word]") : null;
    const word = element?.dataset.lfWord;
    if (!element || !word || activeRef.current === word) return;
    activeRef.current = word;
    const root = rootRef.current;
    if (!root) return;
    const rect = element.getBoundingClientRect();
    const parent = root.getBoundingClientRect();
    setTooltip({ word, translation: "Traduciendo…", x: rect.left - parent.left + rect.width / 2, y: rect.top - parent.top });
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word })
      });
      const data = await response.json() as { translation?: string };
      setTooltip((current) => current?.word === word
        ? { ...current, translation: response.ok ? data.translation || "Traducción no disponible" : "Traducción no disponible" }
        : current);
    } catch {
      setTooltip((current) => current?.word === word ? { ...current, translation: "Traducción no disponible" } : current);
    }
  }

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseOver={(event) => void reveal(event.target)}
      onFocus={(event) => void reveal(event.target)}
      onClick={(event) => void reveal(event.target)}
      onMouseLeave={() => { activeRef.current = ""; setTooltip(null); }}
    >
      <div dangerouslySetInnerHTML={{ __html: decorated }} />
      {tooltip && (
        <span
          className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-full rounded-xl bg-slate-950 px-3 py-2 text-xs font-semibold leading-5 text-white shadow-xl"
          style={{ left: tooltip.x, top: Math.max(38, tooltip.y - 10) }}
        >
          {tooltip.translation}
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-8 border-transparent border-t-slate-950" />
        </span>
      )}
    </div>
  );
}
