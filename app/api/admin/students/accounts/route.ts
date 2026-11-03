import { NextRequest, NextResponse } from "next/server";
import { ticketDb, adminAuthorized } from "@/lib/support-tickets";

export async function GET(request: NextRequest) {
  try {
    if (!adminAuthorized(request)) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    const rows = await ticketDb().prepare(
      `SELECT s.id,s.email,s.plan,s.subscription_status,s.created_at,
        m.full_name,m.admin_notes,m.is_test_account,m.test_expires_at,m.created_by_admin
       FROM students s LEFT JOIN admin_student_metadata m ON m.student_id=s.id
       ORDER BY s.created_at DESC LIMIT 500`
    ).all();
    return NextResponse.json({ students: rows.results || [] }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("List admin-created student accounts:", error);
    return NextResponse.json({ error: "No se pudieron cargar las cuentas." }, { status: 500 });
  }
}
