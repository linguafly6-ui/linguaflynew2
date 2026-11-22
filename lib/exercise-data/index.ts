import { A1_UNITS } from "./a1-units"; import { A2_UNITS } from "./a2-units"; import { B1_UNITS } from "./b1-units"; import { B2_UNITS } from "./b2-units"; import { C1_UNITS } from "./c1-units"; import { C2_UNITS } from "./c2-units";
export const COURSE_UNITS:Record<string,typeof A1_UNITS>={a1:A1_UNITS,a2:A2_UNITS,b1:B1_UNITS,b2:B2_UNITS,c1:C1_UNITS,c2:C2_UNITS};
export { LEVEL_TOPICS, buildUnit } from "./build";
