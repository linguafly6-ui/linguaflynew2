import { getDB } from "./db";

export type ArticleSummary = {
  id: number; slug: string; title: string; description: string | null;
  excerpt: string | null; category: string; author: string | null;
  read_time: string | null; image: string | null; alt: string | null;
  created_at: string;
};
export async function getArticles(category?: string, limit = 20): Promise<ArticleSummary[]> {
  const db = await getDB();
  const safeLimit = Math.max(1, Math.min(100, Math.trunc(limit)));
  const query = category
    ? db.prepare("SELECT id, slug, title, description, excerpt, category, author, read_time, image, alt, created_at FROM articles WHERE category = ? AND is_published = 1 ORDER BY created_at DESC LIMIT ?").bind(category, safeLimit)
    : db.prepare("SELECT id, slug, title, description, excerpt, category, author, read_time, image, alt, created_at FROM articles WHERE is_published = 1 ORDER BY created_at DESC LIMIT ?").bind(safeLimit);
  const result = await query.all<ArticleSummary>();
  return result.results ?? [];
}
export async function getArticle(category: string, slug: string) {
  const db = await getDB();
  return db.prepare("SELECT * FROM articles WHERE category = ? AND slug = ? AND is_published = 1 LIMIT 1")
    .bind(category, slug).first<Record<string, unknown>>();
}
export async function getCategories() {
  const db = await getDB();
  const result = await db.prepare("SELECT category, COUNT(*) AS count FROM articles WHERE is_published = 1 GROUP BY category ORDER BY count DESC")
    .all<{ category: string; count: number }>();
  return result.results ?? [];
}
