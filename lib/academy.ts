import { getCourseDB } from "./db";

export type CourseLevel = { level: string; title: string; description: string | null; status: string; units: number };
export type CourseUnit = { course_id: string; level: string; unit_number: number; unit_id: string; title: string; status: string };

const LEVELS = new Set(["A1", "A2", "B1", "B2", "C1", "C2"]);
function validLevel(value: string) {
  const level = value.trim().toUpperCase();
  return LEVELS.has(level) ? level : null;
}
export async function getCourseLevels() {
  const db = await getCourseDB();
  const result = await db.prepare(
    "SELECT c.cefr_level AS level, c.title, c.description, c.status, COUNT(u.id) AS units FROM courses c LEFT JOIN units u ON u.course_id = c.id AND u.status = 'published' WHERE c.language_code = 'en' AND c.status = 'published' GROUP BY c.id, c.cefr_level, c.title, c.description, c.status ORDER BY c.sort_order"
  ).all<{ level: string; title: string; description: string | null; status: string; units: number }>();
  return result.results ?? [];
}
export async function getCourseUnits(level: string) {
  const cefr = validLevel(level);
  if (!cefr) return [];
  const db = await getCourseDB();
  const result = await db.prepare(
    "SELECT c.id AS course_id, c.cefr_level AS level, u.unit_number, u.id AS unit_id, u.title, u.status FROM courses c JOIN units u ON u.course_id = c.id WHERE c.cefr_level = ? AND c.language_code = 'en' AND c.status = 'published' AND u.status = 'published' ORDER BY u.unit_number"
  ).bind(cefr).all<{ course_id:string; level:string; unit_number:number; unit_id:string; title:string; status:string }>();
  return result.results ?? [];
}
export async function getCourseUnit(level: string, unitNumber: number) {
  const cefr = validLevel(level);
  if (!cefr || !Number.isInteger(unitNumber) || unitNumber < 1 || unitNumber > 100) return null;
  const db = await getCourseDB();
  const unit = await db.prepare(
    "SELECT c.id AS course_id, c.cefr_level AS level, u.unit_number, u.id AS unit_id, u.title, u.learning_objectives_json, u.status FROM courses c JOIN units u ON u.course_id = c.id WHERE c.cefr_level = ? AND c.language_code = 'en' AND c.status = 'published' AND u.status = 'published' AND u.unit_number = ? LIMIT 1"
  ).bind(cefr, unitNumber).first<Record<string, unknown>>();
  if (!unit) return null;
  const rows = await db.prepare(
    "SELECT s.id AS section_id, s.section_type, s.title AS section_title, s.position AS section_position, s.instructions AS section_instructions, e.id AS exercise_id, e.exercise_type_id, e.title AS exercise_title, e.instructions AS exercise_instructions, e.content_json, e.position AS exercise_position, e.points FROM sections s JOIN exercises e ON e.section_id = s.id WHERE s.unit_id = ? AND s.status = 'published' AND e.status = 'published' ORDER BY s.position, e.position"
  ).bind(unit.unit_id).all<Record<string, unknown>>();
  return { unit, exercises: rows.results ?? [] };
}
