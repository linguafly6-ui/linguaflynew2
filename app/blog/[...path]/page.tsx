import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getArticles, getCategories } from "@/lib/blog";
import BlogArticle from "@/components/BlogArticle";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ path: string[] }> };
function decodeSegment(value: string) {
  try { return decodeURIComponent(value); } catch { return value; }
}
function parseFaqs(value: unknown): { question: string; answer: string }[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is { question: string; answer: string } =>
      Boolean(item && typeof item === "object" && typeof (item as any).question === "string" && typeof (item as any).answer === "string")
    );
  }
  if (typeof value !== "string" || !value.trim()) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parseFaqs(parsed) : [];
  } catch { return []; }
}
function articleCanonical(category: string, slug: string, article: Record<string, unknown>) {
  const configured = typeof article.canonical === "string" ? article.canonical.trim() : "";
  const fallback = `/blog/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`;
  try { return new URL(configured || fallback, "https://linguafly.app").toString(); }
  catch { return new URL(fallback, "https://linguafly.app").toString(); }
}

export default async function BlogPathPage({ params }: Props) {
  const { path = [] } = await params;

  if (path.length === 1) {
    const category = decodeSegment(path[0]);
    const [articles, categories] = await Promise.all([getArticles(category), getCategories()]);
    if (!categories.some((item: Awaited<ReturnType<typeof getCategories>>[number]) => item.category === category)) notFound();

    return (
      <main className="mx-auto min-h-screen max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:text-indigo-700">← Todos los artículos</Link>
        <div className="mt-8 max-w-3xl">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">Explora por tema</span>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">{category}</h1>
          <p className="mt-3 text-lg text-slate-500">Guías y recursos para avanzar en tu aprendizaje de idiomas.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link key={article.id} href={`/blog/${encodeURIComponent(article.category)}/${article.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">{article.category}</span>
              <h2 className="mt-3 text-xl font-extrabold leading-snug text-slate-950 group-hover:text-blue-700">{article.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{article.excerpt || article.description}</p>
              <span className="mt-6 inline-flex text-sm font-bold text-blue-700">Leer artículo →</span>
            </Link>
          ))}
        </div>
      </main>
    );
  }

  if (path.length === 2) {
    const [category, slug] = path.map(decodeSegment);
    const article = await getArticle(category, slug);
    if (!article) notFound();

    const content = typeof article.content === "string" ? article.content : "";
    const title = String(article.title);
    const excerpt = String(article.excerpt || article.description || "");
    const canonical = articleCanonical(category, slug, article as Record<string, unknown>);
    const articleJsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      datePublished: article.created_at ? String(article.created_at) : undefined,
      author: { "@type": "Organization", name: "Linguafly" },
      publisher: { "@type": "Organization", name: "Linguafly" },
      mainEntityOfPage: canonical,
    };
    const breadcrumbs = [{ label: "Blog", href: "/blog" }, { label: category, href: `/blog/${encodeURIComponent(category)}` }];

    return (
      <main className="min-h-screen px-0 py-4 sm:py-8">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }} />
        <BlogArticle
          content={content}
          title={title}
          excerpt={excerpt}
          author={String(article.author || "Linguafly")}
          readTime={String(article.read_time || "")}
          faqs={parseFaqs(article.faqs)}
          breadcrumbs={breadcrumbs}
        />
      </main>
    );
  }

  notFound();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path = [] } = await params;

  if (path.length === 1) {
    const category = decodeSegment(path[0]);
    const title = `${category} | Blog de Linguafly`.slice(0, 60);
    const description = `Artículos, consejos y recursos para aprender inglés sobre ${category}.`.slice(0, 155);
    const canonical = `/blog/${encodeURIComponent(category)}`;
    return {
      title,
      description,
      alternates: { canonical },
      openGraph: { type: "website", title, description, url: `https://linguafly.app${canonical}`, siteName: "Linguafly", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Linguafly — Aprende inglés con IA conversacional" }] },
      twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
    };
  }

  if (path.length !== 2) return {};
  const [category, slug] = path.map(decodeSegment);
  const article = await getArticle(category, slug);
  if (!article) return {};

  const title = String(article.title).slice(0, 60);
  const description = String(article.excerpt || article.description || "Artículo de Linguafly para mejorar tu inglés.").slice(0, 155);
  const canonical = articleCanonical(category, slug, article as Record<string, unknown>);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { type: "article", title, description, url: canonical, siteName: "Linguafly", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Linguafly — Aprende inglés con IA conversacional" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}
