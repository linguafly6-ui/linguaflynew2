import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { loadUnitFromDb, generateLessonWithAI, getLevelForUnit, type UnitInfo } from "@/lib/conversation-script";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const env = getEnv();
    const body = await request.json() as { unitId?: number };
    const unitId: number | undefined = body.unitId;
    if (unitId === undefined) return NextResponse.json({ error: "Falta unitId" }, { status: 400 });
    if (unitId < 1 || unitId > 100) return NextResponse.json({ error: "unitId debe estar entre 1 y 100" }, { status: 400 });
    let unit: UnitInfo | null = await loadUnitFromDb(env.DB, unitId);
    if (!unit) {
      const level = getLevelForUnit(unitId);
      unit = { id: unitId, level, title: `Unidad ${unitId}`, description: `Leccion nivel ${level}`, language: "en", topic: "general" };
    }
    const lesson = await generateLessonWithAI(env.AI, unit);
    return NextResponse.json({ lesson });
  } catch (error) {
    console.error("Lesson error:", error);
    return NextResponse.json({ error: "Error al generar la leccion" }, { status: 500 });
  }
}
