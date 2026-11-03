import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getArticles, getCategories } from "@/lib/blog";
import BlogArticle from "@/components/BlogArticle";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ path: string[] }> };
function decodeSegment(value: string) {
  try { return decodeURIComponent(value); } catch { return value; }
}

export default async function BlogPathPage({ params }: Props) {
  const { path = [] } = await params;

  if (path.length === 1) {
    const category = decodeSegment(path[0]);
    const [articles, categories] = await Promise.all([getArticles(category), getCategories()]);
    if (!categories.some((item: Awaited<ReturnType<typeof getCategories>>[number]) => item.category === category)) notFound();

    return (
      <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">
        <Link href="/blog" className="font-bold text-blue-700">← All articles</Link>
        <h1 className="mt-8 text-4xl font-black">{category}</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link key={article.id} href={`/blog/${encodeURIComponent(article.category)}/${article.slug}`} className="rounded-2xl border bg-white p-6">
              <h2 className="text-xl font-bold">{article.title}</h2>
              <p className="mt-3 text-sm text-slate-600">{article.excerpt || article.description}</p>
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
    return (
      <main className="mx-auto min-h-screen max-w-4xl px-6 py-12">
        <Link href="/blog" className="font-bold text-blue-700">← Blog</Link>
        <article className="mt-8">
          <p className="text-sm font-bold uppercase text-blue-700">{String(article.category)}</p>
          <h1 className="mt-3 text-4xl font-black leading-tight">{String(article.title)}</h1>
          <p className="mt-4 text-slate-500">{String(article.excerpt || article.description || "")}</p>
          {typeof article.image === "string" && article.image.startsWith("https://") ? (
            <img src={article.image} alt={String(article.alt || article.title)} className="mt-8 max-h-[28rem] w-full rounded-2xl object-cover" />
          ) : null}
          <div className="prose-content mt-10 max-w-none leading-8"><BlogArticle content={content} /></div>
          <p className="mt-10 border-t pt-5 text-sm text-slate-500">{String(article.author || "LinguaFly")} · {String(article.read_time || "")}</p>
        </article>
      </main>
    );
  }

  notFound();
}

export async function generateMetadata({ params }: Props) {
  const { path = [] } = await params;
  if (path.length !== 2) return {};
  const [category, slug] = path.map(decodeSegment);
  const article = await getArticle(category, slug);
  if (!article) return {};
  return { title: String(article.title), description: String(article.excerpt || article.description || "") };
}
