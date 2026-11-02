import { getCloudflareContext } from "@opennextjs/cloudflare";

// Native Cloudflare Workers D1 types used by the application.
export type DatabaseResult<T = unknown> = D1Result<T>;
export type DatabaseStatement = D1PreparedStatement;

export interface Env {
  DB: D1Database;
  COURSE_DB: D1Database;
  LINGUAFLY_MEDIA: R2Bucket;
  AI: Ai;
  AI_RATE_LIMITER?: RateLimit;
}

async function env(): Promise<Env> {
  const { env } = await getCloudflareContext();
  return env as unknown as Env;
}

export async function getDB(): Promise<D1Database> { return (await env()).DB; }
export async function getCourseDB(): Promise<D1Database> { return (await env()).COURSE_DB; }
export async function getR2(): Promise<R2Bucket> { return (await env()).LINGUAFLY_MEDIA; }
export async function getAI(): Promise<Ai> { return (await env()).AI; }
export async function getAIRateLimiter(): Promise<RateLimit | undefined> { return (await env()).AI_RATE_LIMITER; }
