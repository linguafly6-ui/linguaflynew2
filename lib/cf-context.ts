import { getCloudflareContext } from "@opennextjs/cloudflare";
export function getRequestContext(): any { return getCloudflareContext(); }
export function getEnv(): any { return getRequestContext().env as any; }
export function generateId(prefix: string = "id"): string { return prefix + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10); }
