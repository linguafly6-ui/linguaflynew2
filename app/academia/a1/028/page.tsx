import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import missionData from "@/content/canonical-missions/a1/028.json";

export const metadata = {
  title: "School and Classroom · Misión 028 · Linguafly A1",
  description: "Identifica material escolar y comprende instrucciones habituales de clase."
};

export default function MissionPage() {
  return <CanonicalMission missionData={missionData as Mission} />;
}
