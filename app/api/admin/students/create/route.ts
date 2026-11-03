import { NextRequest, NextResponse } from "next/server";
import { ticketDb, adminAuthorized } from "@/lib/support-tickets";
import { hashPassword } from "@/lib/student-auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    if (!adminAuthorized(request)) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    const body = await request.json() as {
      email?: string; password?: string; plan?: string; fullName?: string; notes?: string; expiresAt?: string;
    };
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const fullName = String(body.fullName || "").trim().slice(0, 120);
    const notes = String(body.notes || "").trim().slice(0, 2000);
    const plan = ["free", "pro", "pro_test"].includes(String(body.plan)) ? String(body.plan) : "free";
    const expiresAt = String(body.expiresAt || "").trim();

    if (!email || !password) return NextResponse.json({ error: "Email y contraseña son obligatorios." }, { status: 400 });
    if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Email no válido." }, { status: 400 });
    if (password.length < 8 || password.length > 256) return NextResponse.json({ error: "La contraseña debe tener entre 8 y 256 caracteres." }, { status: 400 });
    if (expiresAt && (!/^\d{4}-\d{2}-\d{2}$/.test(expiresAt) || Number.isNaN(Date.parse(expiresAt)))) {
      return NextResponse.json({ error: "La fecha de expiración no es válida." }, { status: 400 });
    }
    if (expiresAt && plan !== "pro_test") return NextResponse.json({ error: "La fecha de expiración solo se aplica a cuentas Pro de prueba." }, { status: 400 });

    const db = ticketDb();
    const existing = await db.prepare("SELECT id FROM students WHERE email=?").bind(email).first();
    if (existing) return NextResponse.json({ error: "Ya existe una cuenta con este email." }, { status: 409 });

    const passwordHash = await hashPassword(password);
    const subscriptionStatus = plan === "free" ? "inactive" : "active";
    const inserted = await db.prepare(
      "INSERT INTO students (email,password_hash,plan,subscription_status,created_at) VALUES (?,?,?,?,datetime('now'))"
    ).bind(email, passwordHash, plan, subscriptionStatus).run();
    const studentId = Number(inserted.meta?.last_row_id || 0);
    if (!studentId) throw new Error("No se pudo recuperar el ID del alumno creado.");

    try {
      await db.prepare(
        "INSERT INTO admin_student_metadata (student_id,full_name,admin_notes,is_test_account,test_expires_at,created_by_admin) VALUES (?,?,?,?,?,1)"
      ).bind(studentId, fullName || null, notes || null, plan === "pro_test" ? 1 : 0, expiresAt || null).run();
    } catch (metadataError) {
      console.error("Student created but admin metadata could not be saved:", metadataError);
      // The account remains usable even if an older database has not received the metadata migration.
    }

    return NextResponse.json({
      success: true, studentId, email, plan,
      message: plan === "pro_test" ? "Cuenta de prueba creada con acceso completo sin Stripe." : `Cuenta creada con plan ${plan}.`,
    }, { status: 201 });
  } catch (error) {
    const message = String(error).toLowerCase();
    if (message.includes("unique")) return NextResponse.json({ error: "Ya existe una cuenta con este email." }, { status: 409 });
    console.error("Error creating student from admin:", error);
    return NextResponse.json({ error: "No se pudo crear la cuenta." }, { status: 500 });
  }
}
