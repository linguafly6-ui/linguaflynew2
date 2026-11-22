import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent } from "@/lib/student-auth";
import { PLACEMENT_QUESTIONS } from "@/lib/placement-questions";

type Answer = { questionId?: number; selectedOption?: string };
export async function POST(request: NextRequest) {
  try {
    const student = await getStudent(request);
    if (!student) return NextResponse.json({ error: "Inicia sesión para guardar el resultado." }, { status: 401 });
    const db = getEnv().COURSE_DB;
    if (!db) return NextResponse.json({ error: "Base de datos no disponible." }, { status: 503 });
    const existing = await db.prepare("SELECT placement_level FROM students WHERE id=?").bind(student.id).first() as { placement_level?: string | null } | null;
    if (existing?.placement_level) return NextResponse.json({ error: "Ya has completado el test.", level: existing.placement_level }, { status: 409 });

    const body = await request.json() as { answers?: Answer[] };
    if (!Array.isArray(body.answers) || body.answers.length !== PLACEMENT_QUESTIONS.length) {
      return NextResponse.json({ error: "Debes responder las 20 preguntas." }, { status: 400 });
    }
    const submitted = new Map<number, string>();
    for (const answer of body.answers) {
      const id = Number(answer.questionId);
      if (!Number.isInteger(id) || typeof answer.selectedOption !== "string" || submitted.has(id)) {
        return NextResponse.json({ error: "El formato de las respuestas no es válido." }, { status: 400 });
      }
      submitted.set(id, answer.selectedOption);
    }
    if (PLACEMENT_QUESTIONS.some((question) => !submitted.has(question.id) || !question.options.includes(submitted.get(question.id)!))) {
      return NextResponse.json({ error: "Faltan respuestas o hay opciones no válidas." }, { status: 400 });
    }

    const detail = (["A1", "A2", "B1", "B2"] as const).map((level) => {
      const questions = PLACEMENT_QUESTIONS.filter((question) => question.level === level);
      const correct = questions.filter((question) => submitted.get(question.id) === question.correctOption).length;
      return { level, correct, total: questions.length };
    });
    const byLevel = Object.fromEntries(detail.map((item) => [item.level, item.correct])) as Record<string, number>;
    let level: "A1" | "A2" | "B1" | "B2" | "C1" = "A1";
    if (byLevel.A1 >= 4) level = "A2";
    if (level === "A2" && byLevel.A2 >= 4) level = "B1";
    if (level === "B1" && byLevel.B1 >= 4) level = "B2";
    if (level === "B2" && byLevel.B2 >= 4) level = "C1";
    const totalCorrect = detail.reduce((sum, item) => sum + item.correct, 0);
    const answersJson = JSON.stringify(PLACEMENT_QUESTIONS.map((question) => ({ questionId: question.id, level: question.level, selectedOption: submitted.get(question.id), correct: submitted.get(question.id) === question.correctOption })));
    await db.batch([
      db.prepare("INSERT INTO placement_results(student_id,level_assigned,total_correct,answers_json) VALUES(?,?,?,?)").bind(student.id, level, totalCorrect, answersJson),
      db.prepare("UPDATE students SET placement_level=? WHERE id=? AND placement_level IS NULL").bind(level, student.id)
    ]);
    return NextResponse.json({ level, totalCorrect, detail });
  } catch (error) {
    console.error("Placement test submit:", error);
    return NextResponse.json({ error: "No se pudo guardar tu resultado." }, { status: 500 });
  }
}
