import { getCloudflareContext } from "@opennextjs/cloudflare";

export function getEnv(): any {
  const ctx = getCloudflareContext();
  return ctx.env as any;
}

export function generateId(prefix: string = "id"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
