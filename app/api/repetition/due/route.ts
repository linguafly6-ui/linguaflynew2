import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent, studentUserId } from "@/lib/student-auth";
import { getDueItems, getSRStats } from "@/lib/spaced-repetition";

export async function GET(request: NextRequest) {
  try {
    const student = await getStudent(request);
    if (!student) return NextResponse.json({ error: "Inicia sesión para consultar tus repasos." }, { status: 401 });
    const db = getEnv().DB;
    if (!db) return NextResponse.json({ error: "Servicio de repetición no disponible." }, { status: 503 });
    const requestedLimit = Number(new URL(request.url).searchParams.get("limit") || 20);
    const limit = Number.isInteger(requestedLimit) ? Math.min(50, Math.max(1, requestedLimit)) : 20;
    const userId = studentUserId(student);
    const [items, stats] = await Promise.all([getDueItems(db, userId, limit), getSRStats(db, userId)]);
    return NextResponse.json({ items, stats });
  } catch (error) {
    console.error("SR due error:", error);
    return NextResponse.json({ error: "Error al obtener los repasos." }, { status: 500 });
  }
}
