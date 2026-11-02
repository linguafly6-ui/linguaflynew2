import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Obtiene el contexto de Cloudflare (env, ctx, cf) dentro de Next.js
 * usando OpenNext. Todos los bindings (DB, AI, R2, etc.) están en env.
 */
export function getEnv() {
  const ctx = getCloudflareContext();
  return ctx.env;
}

/**
 * Genera un ID único simple sin dependencias externas.
 */
export function generateId(prefix: string = "id"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}