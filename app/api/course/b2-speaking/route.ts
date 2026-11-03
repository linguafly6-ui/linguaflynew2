import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent, studentUserId } from "@/lib/student-auth";
import { B2_UNIT_TITLES, B2_MODULE_TITLES } from "@/lib/b2-speaking-words";

function buildUnit(unitNumber: number) {
  const moduleNumber = Math.ceil(unitNumber / 4);
  const title = B2_UNIT_TITLES[unitNumber - 1];
  const isConversation = unitNumber % 4 === 0;
  return {
    id: unitNumber,
    unit_number: unitNumber,
    module_number: moduleNumber,
    module_title: B2_MODULE_TITLES[moduleNumber - 1],
    scenario: title,
    objective: isConversation
      ? "Practicar un diálogo guiado de 10 líneas sobre " + B2_MODULE_TITLES[moduleNumber - 1] + " en inglés B2."
      : "Practicar 10 frases completas sobre " + title.toLowerCase() + " en inglés B2, con pronunciación clara y respuestas desarrolladas.",
    system_prompt: "Eres un tutor paciente de inglés Cambridge B2 First. Evalúa la pronunciación y claridad de frases completas. Da feedback breve en castellano y anima al alumno a ampliar sus respuestas.",
    difficulty: "B2",
    estimated_duration: "4-5 min",
    is_review: unitNumber >= 193 ? 1 : 0,
  };
}

export async function GET(req: NextRequest) {
  try {
    const env = getEnv();
    const student = await getStudent(req);
    const db = env.COURSE_DB || env.DB;
    let rows: any[] = [];
    if (student && db) {
      try {
        const ps = await db.prepare("SELECT * FROM b2_speaking_progress WHERE user_id=?").bind(studentUserId(student)).all();
        rows = ps.results || [];
      } catch (error) {
        console.error("Could not load B2 progress:", error);
      }
    }
    const progressMap = new Map(rows.map((p: any) => [Number(p.unit_id), p]));
    const units = Array.from({ length: 200 }, (_, index) => {
      const n = index + 1;
      const u = buildUnit(n);
      const p = progressMap.get(n) as any;
      const prev = progressMap.get(n - 1) as any;
      const done = Boolean(p?.completed);
      const pro = student?.plan === "pro";
      const unlocked = n <= 5 || (pro && (n === 6 || Boolean(prev?.completed && Number(prev.score) >= 60)));
      return {
        ...u,
        key_phrases: [],
        vocabulary: [],
        score: p?.score ?? null,
        attempts: p?.attempts || 0,
        completed: done,
        unlocked,
        status: done ? "completed" : unlocked ? "unlocked" : "locked",
        proRequired: n > 5 && !pro,
      };
    });
    const modules = B2_MODULE_TITLES.map((module_title, index) => ({
      module_number: index + 1,
      module_title,
      units: units.filter((u) => u.module_number === index + 1),
    }));
    return NextResponse.json({ modules, units, total: units.length, student });
  } catch (error) {
    console.error("B2 course loading error:", error);
    return NextResponse.json({ error: "No se pudo cargar el curso B2 Speaking." }, { status: 500 });
  }
}
