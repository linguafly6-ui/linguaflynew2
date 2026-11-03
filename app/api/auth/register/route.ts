import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { createStudentSession, hashPassword } from "@/lib/student-auth";
import { generateTemporaryPassword, sendWelcomeEmail } from "@/lib/email-temporary-password";

export async function POST(req: NextRequest) {
  try {
    const env = getEnv();
    if (!env.COURSE_DB) return NextResponse.json({ error: "Base de datos de alumnos no disponible." }, { status: 503 });
    const body = await req.json() as { email?: string };
    const email = String(body.email || "").trim().toLowerCase();
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Introduce un email válido." }, { status: 400 });
    }

    const tempPassword = generateTemporaryPassword();
    const result = await env.COURSE_DB.prepare(
      "INSERT INTO students (email,password_hash,plan,subscription_status) VALUES (?,?,'free','inactive')"
    ).bind(email, await hashPassword(tempPassword)).run();
    const id = Number(result.meta?.last_row_id || 0);
    if (!id) throw new Error("No se pudo recuperar el ID de la cuenta creada.");

    const emailSent = await sendWelcomeEmail(email, null, tempPassword);
    if (!emailSent) {
      await env.COURSE_DB.prepare("DELETE FROM students WHERE id = ?").bind(id).run();
      return NextResponse.json({ error: "No se pudo enviar el email con tu contraseña temporal. Inténtalo más tarde." }, { status: 502 });
    }

    const response = NextResponse.json({ success: true, student: { id, email, plan: "free" } });
    await createStudentSession(id, response);
    return response;
  } catch (error) {
    if (String(error).toLowerCase().includes("unique")) {
      return NextResponse.json({ error: "Ya existe una cuenta con ese email." }, { status: 409 });
    }
    console.error("Error registering student:", error);
    return NextResponse.json({ error: "No se pudo crear la cuenta." }, { status: 500 });
  }
}
