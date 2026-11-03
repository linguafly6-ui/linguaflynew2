import { getCloudflareContext } from "@opennextjs/cloudflare";

export function getEnv(): any {
  const ctx = getCloudflareContext();
  if (!ctx || !ctx.env) {
    throw new Error("Cloudflare context no disponible. ¿Estás ejecutando en un Worker con OpenNext?");
  }
  return ctx.env as any;
}

export function generateId(prefix: string = "id"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
