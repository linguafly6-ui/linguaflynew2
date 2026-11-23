import A1CurriculumMission from "@/components/academy/A1CurriculumMission";
import { getA1CurriculumMission } from "@/content/canonical-missions/a1/071-100";

export function getA1CurriculumMetadata(position: number) {
  const mission = getA1CurriculumMission(position);
  return {
    title: `${mission.title} · Misión ${String(position).padStart(3, "0")} · Linguafly A1`,
    description: mission.objective,
  };
}

export default function A1CurriculumMissionRoute({ position }: { position: number }) {
  const mission = getA1CurriculumMission(position);
  return <A1CurriculumMission mission={mission} />;
}
