import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";

/**
 * GET /api/pronunciation/phrases?language=en&level=A1
 * Devuelve frases para practicar pronunciación.
 */
export async function GET(request: NextRequest) {
  try {
    const env = getEnv();
    const { searchParams } = new URL(request.url);
    const language = searchParams.get("language") || "en";
    const level = searchParams.get("level") || "A1";

    const rows = await env.DB.prepare(
      "SELECT * FROM pronunciation_phrases WHERE language = ? AND level = ? ORDER BY RANDOM() LIMIT 10"
    ).bind(language, level).all();

    return NextResponse.json({ phrases: rows.results || [] });
  } catch (error) {
    console.error("Phrases error:", error);
    return NextResponse.json({ error: "Error al obtener frases" }, { status: 500 });
  }
}