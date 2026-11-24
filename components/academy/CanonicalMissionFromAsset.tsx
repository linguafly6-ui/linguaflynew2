"use client";

import { useEffect, useState } from "react";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";

type Props = {
  src: string;
  missionKey?: string;
};

export default function CanonicalMissionFromAsset({ src, missionKey }: Props) {
  const [mission, setMission] = useState<Mission | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`Mission asset request failed: ${response.status}`);
        }

        const payload: unknown = await response.json();
        const data = missionKey
          ? (payload as Record<string, Mission>)[missionKey]
          : (payload as Mission);

        if (!data || typeof data !== "object") {
          throw new Error("Mission data was not found");
        }

        if (!cancelled) setMission(data);
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [src, missionKey]);

  if (failed) {
    return (
      <div
        role="alert"
        className="rounded-2xl border border-rose-200 bg-white p-6 text-sm text-rose-700"
      >
        No se ha podido cargar esta misión. Comprueba tu conexión y vuelve a intentarlo.
      </div>
    );
  }

  if (!mission) {
    return (
      <div
        aria-live="polite"
        className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500"
      >
        Cargando misión…
      </div>
    );
  }

  return <CanonicalMission missionData={mission} />;
}
