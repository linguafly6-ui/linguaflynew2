import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent, studentUserId } from "@/lib/student-auth";
import { A2_UNIT_TITLES, A2_MODULE_TITLES } from "@/lib/a2-speaking-words";

function buildUnit(unitNumber: number) {
  const moduleNumber = Math.ceil(unitNumber / 4);
  return {
    id: unitNumber,
    unit_number: unitNumber,
    module_number: moduleNumber,
    module_title: A2_MODULE_TITLES[moduleNumber - 1],
    scenario: A2_UNIT_TITLES[unitNumber - 1],
    objective: "Practicar en voz alta los 10 elementos de " + A2_UNIT_TITLES[unitNumber - 1].toLowerCase() + " en inglés A2, con pronunciación clara y respuestas completas.",
    system_prompt: "Eres un tutor paciente de inglés Cambridge A2 Key. Evalúa la pronunciación del elemento objetivo y da feedback breve en castellano. Mantén el nivel A2.",
    difficulty: "A2",
    estimated_duration: "2-3 min",
    is_review: unitNumber >= 193 ? 1 : 0,
  };
}

export async function GET(req: NextRequest) {
  try {
    const env = getEnv();
    const student = await getStudent(req);
    const userId = studentUserId(student);
    const ps = student
      ? await env.COURSE_DB.prepare("SELECT * FROM a2_speaking_progress WHERE user_id=?").bind(userId).all()
      : { results: [] as any[] };
    const progressMap = new Map((ps.results || []).map((p: any) => [Number(p.unit_id), p]));
    const units = Array.from({ length: 200 }, (_, index) => {
      const n = index + 1;
      const u = buildUnit(n);
      const p = progressMap.get(n) as any;
      const prev = progressMap.get(n - 1) as any;
      const done = Boolean(p?.completed);
      const pro = (student?.plan === "pro" || student?.plan === "pro_test");
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
    const modules = A2_MODULE_TITLES.map((module_title, index) => ({
      module_number: index + 1,
      module_title,
      units: units.filter((u) => u.module_number === index + 1),
    }));
    return NextResponse.json({ modules, units, total: units.length, student });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "No se pudo cargar el curso A2 Speaking." }, { status: 500 });
  }
}
