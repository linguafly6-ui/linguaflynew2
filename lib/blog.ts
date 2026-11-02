import { getDB } from "./db";

export type ArticleSummary = {
  id: number; slug: string; title: string; description: string | null;
  excerpt: string | null; category: string; author: string | null;
  read_time: string | null; image: string | null; alt: string | null;
  created_at: string;
};
const MAX_PAGE_SIZE = 100;
export async function getArticles(category?: string, limit = 20): Promise<ArticleSummary[]> {
  const db = await getDB();
  const safeLimit = Math.max(1, Math.min(MAX_PAGE_SIZE, Math.trunc(limit) || 20));
  const statement = category
    ? db.prepare("SELECT id, slug, title, description, excerpt, category, author, read_time, image, alt, created_at FROM articles WHERE category = ? AND is_published = 1 ORDER BY created_at DESC, id DESC LIMIT ?").bind(category, safeLimit)
    : db.prepare("SELECT id, slug, title, description, excerpt, category, author, read_time, image, alt, created_at FROM articles WHERE is_published = 1 ORDER BY created_at DESC, id DESC LIMIT ?").bind(safeLimit);
  const result = await statement.all<ArticleSummary>();
  return result.results ?? [];
}
export async function getArticle(category: string, slug: string) {
  const db = await getDB();
  return db.prepare("SELECT id, slug, title, description, content, category, created_at, excerpt, author, read_time, faqs, image, alt, canonical, related_routes FROM articles WHERE category = ? AND slug = ? AND is_published = 1 LIMIT 1")
    .bind(category, slug).first<Record<string, unknown>>();
}
export async function getCategories() {
  const db = await getDB();
  const result = await db.prepare("SELECT category, COUNT(*) AS count FROM articles WHERE is_published = 1 GROUP BY category ORDER BY count DESC, category ASC")
    .all<{ category: string; count: number }>();
  return result.results ?? [];
}
