import Link from "next/link";
import { getArticles, getCategories } from "@/lib/blog";
export const dynamic = "force-dynamic";
export default async function BlogPage() {
  const [articles, categories] = await Promise.all([getArticles(), getCategories()]);
  return <main className="mx-auto min-h-screen max-w-6xl px-6 py-12"><Link href="/" className="font-bold text-blue-700">← LinguaFly</Link><h1 className="mt-8 text-4xl font-black">English learning blog</h1><p className="mt-3 text-slate-600">Articles and resources from the LinguaFly library.</p>
    <div className="my-8 flex flex-wrap gap-2">{categories.map((c: Awaited<ReturnType<typeof getCategories>>[number]) => <Link key={c.category} href={`/blog/${encodeURIComponent(c.category)}`} className="rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm">{c.category} · {c.count}</Link>)}</div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{articles.map(a => <Link key={a.id} href={`/blog/${encodeURIComponent(a.category)}/${a.slug}`} className="rounded-2xl border bg-white p-6"><p className="text-xs font-bold uppercase text-blue-700">{a.category}</p><h2 className="mt-3 text-xl font-bold">{a.title}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{a.excerpt || a.description}</p><p className="mt-5 text-xs text-slate-400">{a.read_time || ""}</p></Link>)}</div>
  </main>;
}
