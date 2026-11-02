import { getCloudflareContext } from "@opennextjs/cloudflare";

export interface D1Result<T> {
  results: T[];
  success: boolean;
  meta?: Record<string, unknown>;
}
export interface D1Statement {
  bind(...values: unknown[]): D1Statement;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run(): Promise<unknown>;
}
export interface D1Database {
  prepare(query: string): D1Statement;
}
type Env = {
  DB: D1Database;
  COURSE_DB: D1Database;
  LINGUAFLY_MEDIA: { put(key: string, value: ArrayBuffer | ReadableStream): Promise<unknown> };
  AI: { run(model: string, input: Record<string, unknown>): Promise<unknown> };
  AI_RATE_LIMITER?: { limit(options: { key: string }): Promise<{ success: boolean }> };
};
async function env(): Promise<Env> {
  const { env } = await getCloudflareContext();
  return env as unknown as Env;
}
export async function getDB() { return (await env()).DB; }
export async function getCourseDB() { return (await env()).COURSE_DB; }
export async function getR2() { return (await env()).LINGUAFLY_MEDIA; }
export async function getAI() { return (await env()).AI; }
export async function getAIRateLimiter() { return (await env()).AI_RATE_LIMITER; }
