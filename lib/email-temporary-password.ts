import { getEnv } from "@/lib/cf-context";

export function generateTemporaryPassword(length = 14): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (byte) => chars[byte % chars.length]).join("");
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char] || char);
}

export async function sendWelcomeEmail(
  email: string,
  fullName: string | null,
  tempPassword: string
): Promise<boolean> {
  const EMAIL = getEnv().EMAIL;
  if (!EMAIL) {
    console.error("EMAIL binding unavailable — cannot send welcome email");
    return false;
  }

  const name = escapeHtml(fullName || "estudiante");
  const safeEmail = escapeHtml(email);
  const safePassword = escapeHtml(tempPassword);
  const loginUrl = "https://linguafly.app/iniciar-sesion";

  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#1a1a1a;">
  <h1 style="color:#2563eb;">¡Bienvenido/a a Linguafly, ${name}!</h1>
  <p>Tu cuenta ha sido creada correctamente. Estos son tus datos de acceso:</p>
  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:16px 0;">
    <p style="margin:4px 0;"><strong>Correo:</strong> ${safeEmail}</p>
    <p style="margin:4px 0;"><strong>Contraseña temporal:</strong> <code style="background:#fef3c7;padding:2px 6px;border-radius:4px;font-size:16px;">${safePassword}</code></p>
  </div>
  <p>Puedes iniciar sesión aquí:</p>
  <p><a href="${loginUrl}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;">Iniciar sesión</a></p>
  <p style="margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0;font-size:14px;color:#64748b;">Te recomendamos cambiar tu contraseña temporal desde Mi cuenta después de iniciar sesión.</p>
</body></html>`;
  const text = `¡Bienvenido/a a Linguafly, ${fullName || "estudiante"}!

Tu cuenta ha sido creada correctamente.

Correo: ${email}
Contraseña temporal: ${tempPassword}

Inicia sesión en: ${loginUrl}

Te recomendamos cambiar tu contraseña temporal desde Mi cuenta después de iniciar sesión.`;

  try {
    const boundary = "linguafly-" + crypto.randomUUID();
    const subject = "Bienvenido/a a Linguafly: tu contraseña temporal";
    const raw = [
      "From: Linguafly <noreply@linguafly.app>",
      "MIME-Version: 1.0",
      "Subject: " + subject,
      'Content-Type: multipart/alternative; boundary="' + boundary + '"',
      "",
      "--" + boundary,
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: 8bit",
      "",
      text,
      "--" + boundary,
      "Content-Type: text/html; charset=UTF-8",
      "Content-Transfer-Encoding: 8bit",
      "",
      html,
      "--" + boundary + "--",
      "",
    ].join("\r\n");
    await EMAIL.send(new EmailMessage("noreply@linguafly.app", email, raw) as any);
    return true;
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return false;
  }
}
