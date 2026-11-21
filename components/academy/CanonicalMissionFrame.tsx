"use client";

import { useCallback } from "react";

const canonicalStyles = `
  :root { color-scheme: light; font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif !important; color:#0f172a !important; background:#f8fafc !important; }
  *, *::before, *::after { box-sizing:border-box !important; }
  html, body { margin:0 !important; min-height:100% !important; background:#f8fafc !important; color:#0f172a !important; }
  body { background:#f8fafc !important; }
  main { max-width:900px !important; margin:0 auto !important; padding:28px 20px 48px !important; }
  h1 { color:#0f172a !important; font-size:clamp(28px,4vw,38px) !important; font-weight:700 !important; letter-spacing:-.035em !important; }
  h2,h3,h4 { color:#0f172a !important; font-weight:650 !important; letter-spacing:-.02em !important; }
  p, li, label { color:#475569; line-height:1.7; }
  .muted:first-child,.tag { display:inline-flex !important; align-items:center; background:#f1f5f9 !important; color:#475569 !important; border:1px solid #e2e8f0 !important; border-radius:999px !important; padding:6px 11px !important; font-size:11px !important; font-weight:650 !important; letter-spacing:.08em !important; box-shadow:none !important; }
  nav { display:flex !important; gap:7px !important; flex-wrap:wrap !important; margin:20px 0 !important; padding-bottom:12px !important; border-bottom:1px solid #e2e8f0 !important; }
  button { border:1px solid #e2e8f0 !important; border-radius:10px !important; padding:10px 13px !important; background:#fff !important; color:#334155 !important; font:600 13px ui-sans-serif,system-ui,sans-serif !important; box-shadow:none !important; cursor:pointer !important; }
  button.active, button.primary, button:focus-visible { background:#2563eb !important; border-color:#2563eb !important; color:#fff !important; box-shadow:none !important; }
  .panel { display:none; margin:0 0 18px !important; padding:clamp(18px,3vw,28px) !important; background:#fff !important; border:1px solid #e2e8f0 !important; border-radius:16px !important; box-shadow:none !important; }
  .panel.active { display:block !important; }
  .panel h2 { margin:0 0 8px !important; font-size:22px !important; }
  .panel>p.muted,.section-subtitle { background:transparent !important; border:0 !important; padding:0 !important; color:#64748b !important; font-size:14px !important; letter-spacing:0 !important; font-weight:400 !important; }
  .match-choice,.answers button,.a1extra-options button { background:#f8fafc !important; border:1px solid #e2e8f0 !important; border-radius:10px !important; color:#334155 !important; box-shadow:none !important; }
  .match-choice.selected,.match-choice.matched { border-color:#2563eb !important; background:#eff6ff !important; }
  .progress,.a1extra-progress>div { background:#e2e8f0 !important; border-radius:999px !important; height:7px !important; }
  .bar,.a1extra-progress i { background:#2563eb !important; border-radius:999px !important; }
  .translate,.translation-answer,.a1-theory-card,.a1extra-card { background:#f8fafc !important; border:1px solid #e2e8f0 !important; border-radius:12px !important; box-shadow:none !important; color:#334155 !important; }
  .recap>div,.recap div { background:#f8fafc !important; border:1px solid #e2e8f0 !important; border-radius:12px !important; }
  input,textarea,select { border:1px solid #cbd5e1 !important; border-radius:9px !important; padding:10px 12px !important; background:#fff !important; color:#0f172a !important; }
  @media(max-width:640px) { main { padding:18px 14px 32px !important; } nav { gap:6px !important; } nav button { padding:9px 10px !important; font-size:12px !important; } .panel { padding:17px !important; border-radius:13px !important; } }
`;

export default function CanonicalMissionFrame() {
  const applyCanonicalStyles = useCallback((frame: HTMLIFrameElement) => {
    const doc = frame.contentDocument;
    if (!doc?.head || doc.getElementById("linguafly-canonical-mission-theme")) return;
    const style = doc.createElement("style");
    style.id = "linguafly-canonical-mission-theme";
    style.textContent = canonicalStyles;
    doc.head.appendChild(style);
  }, []);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-4 sm:px-7">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">Linguafly Academy · A1</p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-950">Who Am I?</h1>
        <p className="mt-1 text-sm text-slate-500">Misión 001 · Información personal</p>
      </div>
      <iframe
        title="A1 · Misión 001 · Who Am I?"
        src="/missions/a1/001/index.html"
        onLoad={(event) => applyCanonicalStyles(event.currentTarget)}
        className="block min-h-[1500px] w-full bg-slate-50"
      />
    </section>
  );
}
