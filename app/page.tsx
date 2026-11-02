import Link from "next/link";
import { getArticles, getCategories } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, articles] = await Promise.all([getCategories(), getArticles(undefined, 3)]);

  return <main className="min-h-screen">
    <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.1fr_.9fr] md:py-24">
      <div>
        <p className="mb-5 inline-flex rounded-full bg-[#d9f5e8] px-4 py-2 text-sm font-bold text-[#176b4b]">British English · Practical resources</p>
        <h1 className="max-w-2xl text-5xl font-black leading-tight tracking-tight text-[#14213d] md:text-6xl">Build confidence in <span className="text-[#2457c5]">English.</span></h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Explore useful articles and resources to keep developing your English skills.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/blog" className="rounded-xl bg-[#2457c5] px-6 py-3 font-bold text-white">Explore the blog</Link>
          <Link href="/features" className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-bold">Practise English</Link>
        </div>
      </div>
      <div className="rounded-3xl bg-[#14213d] p-8 text-white shadow-xl">
        <p className="text-sm font-bold uppercase tracking-[.2em] text-blue-200">Keep learning</p>
        <h2 className="mt-5 text-3xl font-black">Small steps make progress.</h2>
        <p className="mt-4 text-sm leading-6 text-slate-300">Find ideas, explanations and practical resources for your English-learning journey.</p>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="mb-6"><p className="text-sm font-bold uppercase tracking-widest text-[#2457c5]">From the blog</p><h2 className="mt-2 text-3xl font-black">Learn something new</h2></div>
      <div className="grid gap-4 md:grid-cols-3">{articles.map(article => <Link key={article.id} href={`/blog/${encodeURIComponent(article.category)}/${article.slug}`} className="rounded-2xl border border-slate-200 bg-white p-6"><p className="text-xs font-bold uppercase tracking-wider text-[#2457c5]">{article.category}</p><h3 className="mt-3 text-lg font-bold">{article.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{article.excerpt || article.description}</p></Link>)}</div>
      <p className="mt-5 text-xs text-slate-400">{categories.length} article categories · content loaded from D1</p>
    </section>
  </main>;
}
