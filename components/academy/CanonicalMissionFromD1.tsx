"use client";

import { useEffect, useState } from "react";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";

type Props = { level: "PRE-A1" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2"; routeKey: string };

export default function CanonicalMissionFromD1({ level, routeKey }: Props) {
  const [mission, setMission] = useState<Mission | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/canonical-missions/${level}/${encodeURIComponent(routeKey)}`)
      .then(async (response) => {
        if (!response.ok) throw new Error(`Mission request failed: ${response.status}`);
        return response.json() as Promise<Mission>;
      })
      .then((data) => { if (!cancelled) setMission(data); })
      .catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, [level, routeKey]);

  if (failed) return <div role="alert" className="rounded-2xl border border-rose-200 bg-white p-6 text-sm text-rose-700">No se ha podido cargar esta misión. Comprueba tu conexión y vuelve a intentarlo.</div>;
  if (!mission) return <div aria-live="polite" className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">Cargando misión…</div>;
  return <CanonicalMission missionData={mission} />;
}
