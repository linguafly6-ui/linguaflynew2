import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: "Este endpoint ya no está en uso. Usa /api/conversation/start para lecciones." },
    { status: 400 }
  );
}
