import { NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";

export const dynamic = "force-dynamic";

const ALLOWED_LEVELS = new Set(["C1", "B2"]);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ level: string; mission: string }> },
) {
  const { level: rawLevel, mission: routeKey } = await params;
  const level = rawLevel.toUpperCase();

  if (!ALLOWED_LEVELS.has(level)) {
    return NextResponse.json({ error: "Nivel no válido" }, { status: 400 });
  }

  const validRoute = level === "C1"
    ? /^\d{3}$/.test(routeKey)
    : /^\d{3}-canonical$/.test(routeKey);

  if (!validRoute) {
    return NextResponse.json({ error: "Misión no válida" }, { status: 400 });
  }

  try {
    const env = getEnv();
    const db = env.COURSE_DB;
    if (!db) {
      return NextResponse.json(
        { error: "Base de datos educativa no disponible" },
        { status: 503 },
      );
    }

    const row = await db
      .prepare(
        "SELECT content_json FROM canonical_missions WHERE level = ? AND route_key = ? AND published = 1 LIMIT 1",
      )
      .bind(level, routeKey)
      .first();

    if (!row?.content_json) {
      return NextResponse.json({ error: "Misión no encontrada" }, { status: 404 });
    }

    const mission = JSON.parse(String(row.content_json));
    return NextResponse.json(mission, {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Could not load canonical mission from COURSE_DB:", error);
    return NextResponse.json(
      { error: "No se pudo cargar la misión" },
      { status: 503 },
    );
  }
}
