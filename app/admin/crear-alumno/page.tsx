"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Plan = "free" | "pro" | "pro_test";

type CheckEmailResponse = {
  error?: string;
  available?: boolean;
};

type CreateStudentResponse = {
  error?: string;
  success?: boolean;
  message?: string;
  email?: string;
  studentId?: number;
  plan?: Plan;
};

export default function AdminCreateStudentPage() {
  const [adminKey, setAdminKey] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [plan, setPlan] = useState<Plan>("pro_test");
  const [notes, setNotes] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [created, setCreated] = useState<any>(null);

  useEffect(() => {
    try {
      const key = sessionStorage.getItem("lf_admin_key") || "";
      if (!key) { window.location.replace("/admin"); return; }
      setAdminKey(key);
    } catch { window.location.replace("/admin"); }
  }, []);

  const checkEmail = async () => {
    const value = email.trim().toLowerCase();
    setEmailAvailable(null);
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return;
    setCheckingEmail(true);
    try {
      const response = await fetch("/api/admin/students/create/check-email?email=" + encodeURIComponent(value), {
        headers: { "x-admin-key": adminKey }, cache: "no-store",
      });
      const data = await response.json() as CheckEmailResponse;
      if (!response.ok) throw new Error(data.error || "No se pudo comprobar el email.");
      setEmailAvailable(Boolean(data.available));
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo comprobar el email.");
    } finally { setCheckingEmail(false); }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (password !== confirmPassword) { setError("Las contraseñas no coinciden."); return; }
    if (password.length < 8) { setError("La contraseña debe tener al menos 8 caracteres."); return; }
    if (emailAvailable === false) { setError("Ya existe una cuenta con este email."); return; }
    setLoading(true);
    try {
      const response = await fetch("/api/admin/students/create", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({ email, password, plan, fullName, notes, expiresAt: plan === "pro_test" ? expiresAt : "" }),
      });
      const data = await response.json() as CreateStudentResponse;
      if (!response.ok) throw new Error(data.error || "No se pudo crear la cuenta.");
      setCreated(data);
      setEmail(""); setPassword(""); setConfirmPassword(""); setFullName(""); setNotes(""); setExpiresAt(""); setEmailAvailable(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo crear la cuenta.");
    } finally { setLoading(false); }
  };

  if (!adminKey) return <main className="min-h-screen bg-slate-100 p-8 text-center text-slate-500">Comprobando acceso de administrador...</main>;

  return <main className="min-h-screen bg-slate-100 px-4 py-8">
    <div className="mx-auto max-w-3xl">
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500"><Link href="/admin" className="font-semibold text-blue-700 hover:underline">Panel Admin</Link><span>›</span><span>Crear alumno</span></nav>
      <header className="mb-7">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Administración · Alumnos</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">Crear cuenta de alumno</h1>
        <p className="mt-2 max-w-2xl text-slate-600">Crea cuentas Free, Pro o Pro de prueba. Las cuentas Pro de prueba tienen acceso completo sin Stripe.</p>
      </header>

      {created && <section className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-5">
        <p className="font-bold text-green-900">✓ {created.message}</p>
        <p className="mt-1 text-sm text-green-800">Email: {created.email} · ID: {created.studentId}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm"><Link href="/admin/alumnos" className="font-bold text-green-800 underline">Ver cuentas de alumnos →</Link><button type="button" onClick={() => setCreated(null)} className="font-semibold text-green-800 underline">Crear otra cuenta</button></div>
      </section>}

      {error && <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}

      {!created && <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <section className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="student-email" className="mb-2 block text-sm font-bold text-slate-700">Email del alumno</label>
            <input id="student-email" type="email" required autoComplete="off" value={email} onChange={e => { setEmail(e.target.value); setEmailAvailable(null); }} onBlur={checkEmail} placeholder="alumno@email.com" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"/>
            {checkingEmail && <p className="mt-1 text-xs text-slate-500">Comprobando email...</p>}
            {emailAvailable === true && <p className="mt-1 text-xs font-semibold text-green-700">✓ Email disponible</p>}
            {emailAvailable === false && <p className="mt-1 text-xs font-semibold text-red-700">✕ Ya existe una cuenta con este email</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="student-name" className="mb-2 block text-sm font-bold text-slate-700">Nombre completo <span className="font-normal text-slate-400">(opcional)</span></label>
            <input id="student-name" value={fullName} onChange={e => setFullName(e.target.value)} maxLength={120} placeholder="Nombre y apellidos" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"/>
          </div>
          <div>
            <label htmlFor="student-password" className="mb-2 block text-sm font-bold text-slate-700">Contraseña</label>
            <input id="student-password" type="password" required minLength={8} maxLength={256} autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 8 caracteres" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"/>
          </div>
          <div>
            <label htmlFor="student-confirm" className="mb-2 block text-sm font-bold text-slate-700">Confirmar contraseña</label>
            <input id="student-confirm" type="password" required minLength={8} maxLength={256} autoComplete="new-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Repite la contraseña" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"/>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-bold text-slate-700">Tipo de cuenta</h2>
          <div className="grid gap-3">
            {([
              {value:"pro_test",title:"🧪 Pro de prueba · Acceso completo",desc:"Acceso a todos los cursos y unidades sin pasar por Stripe. Ideal para pruebas internas."},
              {value:"pro",title:"⭐ Pro · Acceso completo",desc:"Cuenta Pro concedida por administración, sin crear un cobro de Stripe."},
              {value:"free",title:"🆓 Free · Acceso limitado",desc:"Acceso a las cinco primeras unidades de cada curso."},
            ] as const).map(option => <label key={option.value} className={"flex cursor-pointer gap-3 rounded-2xl border p-4 transition "+(plan===option.value?"border-blue-500 bg-blue-50":"border-slate-200 hover:bg-slate-50")}>
              <input type="radio" name="plan" value={option.value} checked={plan===option.value} onChange={() => setPlan(option.value)} className="mt-1"/>
              <span><span className="block font-bold text-slate-900">{option.title}</span><span className="mt-1 block text-sm text-slate-600">{option.desc}</span></span>
            </label>)}
          </div>
        </section>

        {plan === "pro_test" && <section>
          <label htmlFor="student-expiry" className="mb-2 block text-sm font-bold text-slate-700">Fecha de expiración <span className="font-normal text-slate-400">(opcional)</span></label>
          <input id="student-expiry" type="date" value={expiresAt} onChange={e => setExpiresAt(e.target.value)} className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"/>
          <p className="mt-2 text-xs text-slate-500">Al pasar esta fecha, el acceso de prueba se convierte automáticamente en Free, también para sesiones abiertas.</p>
        </section>}

        <section>
          <label htmlFor="student-notes" className="mb-2 block text-sm font-bold text-slate-700">Notas internas <span className="font-normal text-slate-400">(solo visibles para administración)</span></label>
          <textarea id="student-notes" rows={3} maxLength={2000} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Motivo de creación, pruebas que debe realizar, referencia interna..." className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"/>
        </section>
        <button type="submit" disabled={loading || !adminKey || emailAvailable===false || checkingEmail} className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-extrabold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">{loading?"Creando cuenta...":"Crear cuenta de alumno"}</button>
      </form>}

      <footer className="mt-6 flex flex-wrap gap-5 text-sm"><Link href="/admin" className="font-semibold text-slate-600 hover:text-blue-700">← Volver al panel</Link><Link href="/admin/alumnos" className="font-semibold text-blue-700 hover:underline">Ver todos los alumnos →</Link></footer>
    </div>
  </main>;
}
