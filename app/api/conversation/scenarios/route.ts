import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";

/**
 * GET /api/conversation/scenarios?language=en&level=A1
 * Lista los escenarios de conversación disponibles.
 */
export async function GET(request: NextRequest) {
  try {
    const env = getEnv();
    const { searchParams } = new URL(request.url);
    const language = searchParams.get("language");
    const level = searchParams.get("level");

    let query = "SELECT id, title, description, language, level, setting FROM conversation_scenarios";
    let params: string[] = [];

    if (language && level) {
      query += " WHERE language = ? AND level = ?";
      params = [language, level];
    } else if (language) {
      query += " WHERE language = ?";
      params = [language];
    }

    const stmt = env.DB.prepare(query);
    const rows = params.length > 0
      ? await stmt.bind(...params).all()
      : await stmt.all();

    return NextResponse.json({ scenarios: rows.results || [] });
  } catch (error) {
    console.error("Scenarios error:", error);
    return NextResponse.json({ error: "Error al obtener escenarios" }, { status: 500 });
  }
}