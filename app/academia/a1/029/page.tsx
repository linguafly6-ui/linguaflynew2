import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import missionData from "@/content/canonical-missions/a1/029.json";

export const metadata = {
  title: "Jobs and Workplaces · Misión 029 · Linguafly A1",
  description: "Nombra profesiones, lugares de trabajo y describe tareas sencillas."
};

export default function MissionPage() {
  return <CanonicalMission missionData={missionData as Mission} />;
}
