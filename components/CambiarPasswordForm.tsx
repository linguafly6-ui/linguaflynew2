"use client";

import { useState } from "react";

export default function CambiarPasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Las contraseñas nuevas no coinciden." });
      return;
    }
    if (newPassword.length < 8) {
      setMessage({ type: "error", text: "La nueva contraseña debe tener al menos 8 caracteres." });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await response.json() as { success?: boolean; error?: string };
      if (!response.ok || !data.success) throw new Error(data.error || "No se pudo cambiar la contraseña.");
      setMessage({ type: "success", text: "Contraseña actualizada correctamente." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Error de conexión." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 max-w-md space-y-4">
      <label className="block text-sm font-semibold">Contraseña actual
        <input type="password" autoComplete="current-password" required value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 p-3" />
      </label>
      <label className="block text-sm font-semibold">Nueva contraseña
        <input type="password" autoComplete="new-password" required minLength={8} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 p-3" />
      </label>
      <label className="block text-sm font-semibold">Confirmar nueva contraseña
        <input type="password" autoComplete="new-password" required minLength={8} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 p-3" />
      </label>
      {message && <p role="status" className={message.type === "success" ? "rounded-lg bg-green-50 p-3 text-sm text-green-800" : "rounded-lg bg-red-50 p-3 text-sm text-red-700"}>{message.text}</p>}
      <button type="submit" disabled={loading} className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white disabled:opacity-50">{loading ? "Guardando…" : "Guardar nueva contraseña"}</button>
    </form>
  );
}
