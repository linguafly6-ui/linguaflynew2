import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as any;
    const env = getEnv();
    const adminKey = String(body?.adminKey || "");
    if (!adminKey || !env.SUPPORT_ADMIN_KEY || adminKey !== env.SUPPORT_ADMIN_KEY) {
      return NextResponse.json({ authorized: false, error: "Clave de administrador incorrecta" }, { status: 401 });
    }
    return NextResponse.json({ authorized: true, token: "admin-session" });
  } catch (error) {
    console.error("Admin auth error:", error);
    return NextResponse.json({ authorized: false, error: "No se pudo verificar el acceso" }, { status: 500 });
  }
}