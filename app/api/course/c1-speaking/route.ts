import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent, studentUserId } from "@/lib/student-auth";
import { getSpeakingR2Content } from "@/lib/speaking-r2";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
  try {
    const env = getEnv();
    const student = await getStudent(_req);
    const metadata = await getSpeakingR2Content("c1");
    const unitTitles = metadata.unitTitles || [];
    const moduleTitles = metadata.moduleTitles || [];
    if (unitTitles.length !== 200 || moduleTitles.length !== 50) {
      throw new Error("C1 Speaking metadata is incomplete in R2");
    }

    const db = env.COURSE_DB || env.DB;
    let rows: any[] = [];
    if (student && db) {
      try {
        const progress = await db.prepare("SELECT * FROM c1_speaking_progress WHERE user_id=?")
          .bind(studentUserId(student)).all();
        rows = progress.results || [];
      } catch (error) {
        console.error("Could not load C1 progress:", error);
      }
    }

    const progressMap = new Map(rows.map((row: any) => [Number(row.unit_id), row]));
    const units = Array.from({ length: 200 }, (_, index) => {
      const n = index + 1;
      const moduleNumber = Math.ceil(n / 4);
      const title = unitTitles[n - 1];
      const moduleTitle = moduleTitles[moduleNumber - 1];
      const isConversation = n % 4 === 0;
      const progress = progressMap.get(n) as any;
      const previous = progressMap.get(n - 1) as any;
      const completed = Boolean(progress?.completed);
      const pro = student?.plan === "pro" || student?.plan === "pro_test";
      const unlocked = n <= 5 || (pro && (n === 6 || Boolean(previous?.completed && Number(previous.score) >= 60)));
      return {
        id: n,
        unit_number: n,
        module_number: moduleNumber,
        module_title: moduleTitle,
        scenario: title,
        objective: isConversation
          ? "Practicar un diálogo guiado de 10 líneas sobre " + moduleTitle + " en inglés C1."
          : "Practicar 10 frases completas sobre " + title.toLowerCase() + " en inglés C1, con pronunciación clara y respuestas desarrolladas.",
        system_prompt: "Eres un tutor paciente de inglés Cambridge C1 Advanced. Evalúa la pronunciación y claridad de frases completas. Da feedback breve en castellano y anima al alumno a ampliar sus respuestas.",
        difficulty: "C1",
        estimated_duration: "4-5 min",
        is_review: n >= 193 ? 1 : 0,
        key_phrases: [],
        vocabulary: [],
        score: progress?.score ?? null,
        attempts: progress?.attempts || 0,
        completed,
        unlocked,
        status: completed ? "completed" : unlocked ? "unlocked" : "locked",
        proRequired: n > 5 && !pro,
      };
    });
    const modules = moduleTitles.map((module_title, index) => ({
      module_number: index + 1,
      module_title,
      units: units.filter((unit) => unit.module_number === index + 1),
    }));
    return NextResponse.json({ modules, units, total: units.length, student });
  } catch (error) {
    console.error("C1 Speaking course loading error:", error);
    return NextResponse.json({ error: "No se pudo cargar el curso C1 Speaking desde R2." }, { status: 503 });
  }
}
