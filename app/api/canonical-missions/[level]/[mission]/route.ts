import { NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";

export const dynamic = "force-dynamic";

const LEVELS = new Set(["PRE-A1", "A1", "A2", "B1", "B2", "C1", "C2"]);

function isValidRoute(level: string, routeKey: string) {
  if (level === "B2") return /^\d{3}-canonical$/.test(routeKey) && Number(routeKey.slice(0, 3)) >= 2;
  if (level === "C2") return /^\d{3}$/.test(routeKey) && Number(routeKey) >= 1 && Number(routeKey) <= 90;
  if (level === "A1") return /^00[12]$/.test(routeKey);
  if (level === "A2") return /^0(?:0[1-9]|1\d|2[0-2])$/.test(routeKey);
  return ["PRE-A1", "B1", "C1"].includes(level) && /^\d{3}$/.test(routeKey) && Number(routeKey) >= 1 && Number(routeKey) <= 100;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ level: string; mission: string }> },
) {
  const { level: rawLevel, mission: routeKey } = await params;
  const level = rawLevel.toUpperCase();

  if (!LEVELS.has(level) || !isValidRoute(level, routeKey)) {
    return NextResponse.json({ error: "Misión no válida" }, { status: 400 });
  }

  try {
    const db = getEnv().COURSE_DB;
    if (!db) {
      return NextResponse.json({ error: "Base de datos educativa no disponible" }, { status: 503 });
    }

    const row = await db.prepare(
      "SELECT content_json FROM canonical_missions WHERE level = ? AND route_key = ? AND published = 1 LIMIT 1",
    ).bind(level, routeKey).first();

    if (!row?.content_json) {
      return NextResponse.json({ error: "Misión no encontrada" }, { status: 404 });
    }

    return new Response(String(row.content_json), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Could not load canonical mission from COURSE_DB:", error);
    return NextResponse.json({ error: "No se pudo cargar la misión" }, { status: 503 });
  }
}
