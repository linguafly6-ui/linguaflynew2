import { buildA2ExerciseSections, getA2ReadingPassages } from "@/lib/a2-exercise-generator";
import type { A2PdfUnit } from "@/lib/a2-pdf-unit-types";

export const buildB1ExerciseSections = (unit: A2PdfUnit) => buildA2ExerciseSections(unit);
export const getB1ReadingPassages = (unit: A2PdfUnit) => getA2ReadingPassages(unit);
