"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateAccountPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json() as { error?: string };
      if (!response.ok) throw new Error(data.error || "No se pudo crear la cuenta.");
      router.push("/test-nivel");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "No se pudo crear la cuenta.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-black">Crear cuenta</h1>
      <p className="mt-2 text-slate-600">Empieza gratis con las primeras cinco unidades de A1 Speaking.</p>
      <p className="mt-2 text-sm text-slate-600">Te enviaremos por email una contraseña temporal para acceder y podrás cambiarla desde Mi cuenta.</p>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <label className="block text-sm font-semibold">Email
          <input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 w-full rounded-xl border p-3" />
        </label>
        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <button disabled={busy} className="w-full rounded-xl bg-blue-600 px-4 py-3 font-bold text-white disabled:opacity-50">{busy ? "Creando cuenta…" : "Crear cuenta gratis"}</button>
      </form>
      <p className="mt-6 text-sm text-slate-600">¿Ya tienes cuenta? <Link className="font-bold text-blue-700" href="/iniciar-sesion">Inicia sesión</Link></p>
    </main>
  );
}
