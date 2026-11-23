import { buildMission, type A1CurriculumMission } from "./a1-curriculum-types";
import missions071To080 from "./a1-071-080";
import missions081To090 from "./a1-081-090";
import missions091To100 from "./a1-091-100";

const specs = [...missions071To080, ...missions081To090, ...missions091To100];
const missions = new Map<number, A1CurriculumMission>();

for (const spec of specs) {
  if (missions.has(spec.position)) {
    throw new Error(`Duplicate A1 mission position: ${spec.position}`);
  }
  missions.set(spec.position, buildMission(spec));
}

export function getA1CurriculumMission(position: number): A1CurriculumMission {
  const mission = missions.get(position);
  if (!mission) {
    throw new Error(`A1 curriculum mission ${position} is not defined.`);
  }
  return mission;
}

export const a1CurriculumMissionSummaries = Array.from(missions.values()).map(({ position, title, objective }) => ({
  position,
  title,
  objective,
}));
