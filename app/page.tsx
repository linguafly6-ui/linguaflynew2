import Link from "next/link";
import { getArticles, getCategories } from "@/lib/blog";
import { getCourseLevels } from "@/lib/academy";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, articles, levels] = await Promise.all([getCategories(), getArticles(undefined, 3), getCourseLevels()]);
  return <main className="min-h-screen">
    <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.1fr_.9fr] md:py-24">
      <div><p className="mb-5 inline-flex rounded-full bg-[#d9f5e8] px-4 py-2 text-sm font-bold text-[#176b4b]">British English · CEFR A1–C2</p>
        <h1 className="max-w-2xl text-5xl font-black leading-tight tracking-tight text-[#14213d] md:text-6xl">Your English journey, <span className="text-[#2457c5]">step by step.</span></h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Build confidence with structured learning, meaningful practice and useful English resources.</p>
        <div className="mt-9 flex flex-wrap gap-3"><Link href="/academia" className="rounded-xl bg-[#2457c5] px-6 py-3 font-bold text-white">Explore the academy</Link><Link href="/blog" className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-bold">Read the blog</Link></div>
      </div>
      <div className="rounded-3xl bg-[#14213d] p-8 text-white shadow-xl"><p className="text-sm font-bold uppercase tracking-[.2em] text-blue-200">Learn at your pace</p><div className="mt-8 grid grid-cols-2 gap-3">{["A1 · Beginner","A2 · Elementary","B1 · Intermediate","B2 · Upper intermediate","C1 · Advanced","C2 · Proficiency"].map(level => <div key={level} className="rounded-xl border border-white/15 bg-white/5 p-4 text-sm font-semibold">{level}</div>)}</div><p className="mt-8 text-sm leading-6 text-slate-300">Course availability and published content are loaded from the learning database.</p></div>
    </section>
    <section className="mx-auto max-w-6xl px-6 pb-16"><div className="mb-6 flex items-end justify-between"><div><p className="text-sm font-bold uppercase tracking-widest text-[#2457c5]">Academy</p><h2 className="mt-2 text-3xl font-black">Choose your level</h2></div><Link href="/academia" className="text-sm font-bold text-[#2457c5]">View all levels →</Link></div>
      <div className="grid gap-3 sm:grid-cols-3">{levels.map((level: Awaited<ReturnType<typeof getCourseLevels>>[number]) => <Link key={level.level} href={`/academia/${level.level.toLowerCase()}`} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="text-2xl font-black">{level.level}</div><p className="mt-2 text-sm text-slate-500">{level.title}</p><p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#2457c5]">{level.units} units · {level.status}</p></Link>)}</div>
    </section>
    <section className="mx-auto max-w-6xl px-6 pb-20"><div className="mb-6"><p className="text-sm font-bold uppercase tracking-widest text-[#2457c5]">From the blog</p><h2 className="mt-2 text-3xl font-black">Learn something new</h2></div>
      <div className="grid gap-4 md:grid-cols-3">{articles.map(article => <Link key={article.id} href={`/blog/${encodeURIComponent(article.category)}/${article.slug}`} className="rounded-2xl border border-slate-200 bg-white p-6"><p className="text-xs font-bold uppercase tracking-wider text-[#2457c5]">{article.category}</p><h3 className="mt-3 text-lg font-bold">{article.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{article.excerpt || article.description}</p></Link>)}</div>
      <p className="mt-5 text-xs text-slate-400">{categories.length} article categories · content loaded from D1</p>
    </section>
  </main>;
}
