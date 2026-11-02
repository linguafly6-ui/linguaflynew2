import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles, getCategories } from "@/lib/blog";
export const dynamic = "force-dynamic";
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: raw } = await params;
  const category = decodeURIComponent(raw);
  const [articles, categories] = await Promise.all([getArticles(category), getCategories()]);
  if (!categories.some(c => c.category === category)) notFound();
  return <main className="mx-auto min-h-screen max-w-6xl px-6 py-12"><Link href="/blog" className="font-bold text-blue-700">← All articles</Link><h1 className="mt-8 text-4xl font-black">{category}</h1>
    <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{articles.map(a => <Link key={a.id} href={`/blog/${encodeURIComponent(a.category)}/${a.slug}`} className="rounded-2xl border bg-white p-6"><h2 className="text-xl font-bold">{a.title}</h2><p className="mt-3 text-sm text-slate-600">{a.excerpt || a.description}</p></Link>)}</div>
  </main>;
}
