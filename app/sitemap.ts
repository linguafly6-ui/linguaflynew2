import type { MetadataRoute } from "next";
import { getDB } from "@/lib/db";

export const dynamic = "force-dynamic";

const SITE_URL = "https://linguafly.app";

type SitemapArticle = {
  category: string;
  slug: string;
  created_at: string | null;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/features`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/iniciar-sesion`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/crear-cuenta`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/suscripcion`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const db = await getDB();
  // The live articles table uses is_published (not published) and articles
  // are addressed by both category and slug in app/blog/[...path].
  const result = await db
    .prepare("SELECT category, slug, created_at FROM articles WHERE is_published = 1 ORDER BY created_at DESC")
    .all<SitemapArticle>();

  const articleRoutes: MetadataRoute.Sitemap = (result.results ?? [])
    .filter((article) => article.category && article.slug)
    .map((article) => ({
      url: `${SITE_URL}/blog/${encodeURIComponent(article.category)}/${encodeURIComponent(article.slug)}`,
      lastModified: article.created_at ? new Date(article.created_at) : undefined,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...articleRoutes];
}
