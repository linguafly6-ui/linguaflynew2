import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getDueItems, getSRStats } from "@/lib/spaced-repetition";


/**
 * GET /api/repetition/due?userId=xxx&limit=20
 * Devuelve los items pendientes de repaso + estadÃ­sticas.
 */
export async function GET(request: NextRequest) {
  try {
    const env = getEnv();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "anonymous";
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const [items, stats] = await Promise.all([
      getDueItems(env.DB, userId, limit),
      getSRStats(env.DB, userId),
    ]);

    return NextResponse.json({ items, stats });
  } catch (error) {
    console.error("SR due error:", error);
    return NextResponse.json({ error: "Error al obtener items" }, { status: 500 });
  }
}
