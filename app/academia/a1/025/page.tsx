import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import missionData from "@/content/canonical-missions/a1/025.json";

export const metadata = {
  title: "Personality and Feelings · Misión 025 · Linguafly A1",
  description: "Habla de personalidad y expresa cómo se sienten las personas."
};

export default function MissionPage() {
  return <CanonicalMission missionData={missionData as Mission} />;
}
