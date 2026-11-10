"use client";

import { useState } from "react";

export default function MissionProgressButton({ missionNumber }: { missionNumber: number }) {
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function markComplete() {
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/pre-a1/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ missionNumber, completed: true }),
      });
      const data: { error?: string } = await response.json();
      if (!response.ok) throw new Error(data.error || "No se pudo guardar.");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button type="button" onClick={markComplete} disabled={saving || done}
        className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
        {done ? "Misión completada" : saving ? "Guardando…" : "Marcar como completada"}
      </button>
      {error && <span role="alert" className="max-w-xs text-right text-xs text-rose-700">{error}</span>}
    </div>
  );
}
