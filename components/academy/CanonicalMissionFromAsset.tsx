"use client";

import { useEffect, useState } from "react";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";

type Props = {
  src: string;
  level: "C1" | "B2";
  routeKey: string;
  missionKey?: string;
};

export default function CanonicalMissionFromAsset({ src, level, routeKey, missionKey }: Props) {
  const [mission, setMission] = useState<Mission | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        let data: unknown = null;

        // Prefer D1. The static asset remains a temporary fallback until
        // production COURSE_DB has been migrated and verified.
        try {
          const response = await fetch(
            `/api/canonical-missions/${level}/${encodeURIComponent(routeKey)}`,
          );
          if (response.ok) data = await response.json();
        } catch {
          // Continue to the static fallback during the staged migration.
        }

        if (!data) {
          const response = await fetch(src);
          if (!response.ok) {
            throw new Error(`Mission asset request failed: ${response.status}`);
          }

          const payload: unknown = await response.json();
          data = missionKey
            ? (payload as Record<string, Mission>)[missionKey]
            : payload;
        }

        if (!data || typeof data !== "object") {
          throw new Error("Mission data was not found");
        }

        if (!cancelled) setMission(data as Mission);
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [src, level, routeKey, missionKey]);

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
