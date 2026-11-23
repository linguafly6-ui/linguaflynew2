import A1CurriculumMissionRoute, { getA1CurriculumMetadata } from "@/components/academy/A1CurriculumMissionRoute";

export const metadata = getA1CurriculumMetadata(85);

export default function MissionPage() { return <A1CurriculumMissionRoute position={85} />; }
