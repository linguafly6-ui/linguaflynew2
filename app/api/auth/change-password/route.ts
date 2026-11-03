import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent, hashPassword, verifyPassword } from "@/lib/student-auth";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const student = await getStudent(req);
    if (!student) {
      return NextResponse.json({ success: false, error: "No autenticado" }, { status: 401 });
    }

    const body = await req.json() as { currentPassword?: string; newPassword?: string };
    const { currentPassword, newPassword } = body;
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, error: "Faltan campos requeridos" }, { status: 400 });
    }
    if (newPassword.length < 8 || newPassword.length > 256) {
      return NextResponse.json({ success: false, error: "La nueva contraseña debe tener entre 8 y 256 caracteres" }, { status: 400 });
    }

    const db = getEnv().COURSE_DB;
    if (!db) {
      return NextResponse.json({ success: false, error: "Base de datos no disponible" }, { status: 500 });
    }

    const row = await db.prepare("SELECT password_hash FROM students WHERE id = ?").bind(student.id).first() as { password_hash: string } | null;
    if (!row?.password_hash) {
      return NextResponse.json({ success: false, error: "Usuario no encontrado" }, { status: 404 });
    }
    if (!await verifyPassword(currentPassword, row.password_hash)) {
      return NextResponse.json({ success: false, error: "La contraseña actual es incorrecta" }, { status: 403 });
    }

    const newHash = await hashPassword(newPassword);
    await db.prepare("UPDATE students SET password_hash = ? WHERE id = ?").bind(newHash, student.id).run();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 });
  }
}
