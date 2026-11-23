import CanonicalMission from "@/components/academy/CanonicalMission";
import missionData from "@/content/canonical-missions/a1/002.json";
export const metadata={title:"Nice to Meet You · Misión 002 · Linguafly A1",description:"Saluda, preséntate y conoce a otras personas."};
export default function MissionPage(){return <main className="mx-auto min-h-[70vh] max-w-5xl px-5 py-10"><CanonicalMission missionData={missionData} /></main>}
