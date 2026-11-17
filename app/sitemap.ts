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
    { url: `${SITE_URL}/biblioteca-pdf`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${SITE_URL}/biblioteca-pdf/a1/unidad-1-presentarse`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/biblioteca-pdf/a1/unidad-3-to-be-negativa-preguntas`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/biblioteca-pdf/a1/unidad-4-articulos-plurales-demostrativos`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/biblioteca-pdf/a1/unidad-5-present-simple-rutinas`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/biblioteca-pdf/a1/unidad-6-familia-posesivos-genitivo`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/biblioteca-pdf/a1/unidad-7-colores-descripciones-fisicas`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/biblioteca-pdf/a1/unidad-8-numeros-edad-precios`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/biblioteca-pdf/a1/unidad-9-profesiones-ocupaciones`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/biblioteca-pdf/a1/unidad-10-rutinas-diarias-hora`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/biblioteca-pdf/a1/unidad-11-lugares-ciudad`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/biblioteca-pdf/a1/unidad-12-dias-semana`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/biblioteca-pdf/a1/unidad-13-rutina-diaria`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/biblioteca-pdf/a1/unidad-14-present-simple-dont-do-you`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const a1UnitRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/biblioteca-pdf/a1/unidad-15-present-simple-does-doesnt`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/biblioteca-pdf/a1/unidad-16-at-the-cafe`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/biblioteca-pdf/a1/unidad-17-breakfast-lunch-dinner`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/biblioteca-pdf/a1/unidad-18-likes-dislikes`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/biblioteca-pdf/a1/unidad-19-months-dates-birthdays`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/biblioteca-pdf/a1/unidad-20-module-2-review`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/biblioteca-pdf/a1/unidad-21-rooms-in-a-house`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/biblioteca-pdf/a1/unidad-22-furniture-household-items`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/biblioteca-pdf/a1/unidad-23-there-is-there-are`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/biblioteca-pdf/a1/unidad-24-prepositions-of-place`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/biblioteca-pdf/a1/unidad-25-can-cant`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/biblioteca-pdf/a1/unidad-26-present-continuous`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/biblioteca-pdf/a1/unidad-27-past-simple-was-were`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/biblioteca-pdf/a1/unidad-28-past-simple-regular-verbs`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/biblioteca-pdf/a1/unidad-29-past-simple-irregular-verbs`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/biblioteca-pdf/a1/unidad-30-past-simple-negatives-questions`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/biblioteca-pdf/a1/unidad-31-past-continuous`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/biblioteca-pdf/a1/unidad-32-past-simple-vs-past-continuous`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/biblioteca-pdf/a1/unidad-33-comparatives-superlatives`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/biblioteca-pdf/a1/unidad-34-countable-uncountable-nouns`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/biblioteca-pdf/a1/unidad-35-pronouns-possessives`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/biblioteca-pdf/a1/unidad-36-prepositions-place-direction`, changeFrequency: "monthly", priority: 0.8 },
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

  return [...staticRoutes, ...a1UnitRoutes, ...articleRoutes];
}
