import { NextRequest, NextResponse } from "next/server";
import { ticketDb, adminAuthorized } from "@/lib/support-tickets";

export async function GET(request: NextRequest) {
  try {
    if (!adminAuthorized(request)) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    const email = String(request.nextUrl.searchParams.get("email") || "").trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Introduce un email válido." }, { status: 400 });
    }
    const existing = await ticketDb().prepare("SELECT id FROM students WHERE email=?").bind(email).first();
    return NextResponse.json({ available: !existing }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Check student email:", error);
    return NextResponse.json({ error: "No se pudo comprobar el email." }, { status: 500 });
  }
}
