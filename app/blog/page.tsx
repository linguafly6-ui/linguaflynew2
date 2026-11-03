import Link from "next/link";
import { getArticles, getCategories } from "@/lib/blog";
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const [articles, categories] = await Promise.all([getArticles(), getCategories()]);
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:text-indigo-700">← LinguaFly</Link>
      <header className="mt-9 overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-700 via-blue-700 to-indigo-900 px-6 py-10 text-white shadow-xl shadow-blue-950/10 sm:px-10 sm:py-14">
        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-100">LinguaFly · Recursos</span>
        <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">Ideas y recursos para aprender idiomas</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">Consejos prácticos, herramientas y guías para mejorar tu inglés y avanzar con confianza.</p>
      </header>
      <nav aria-label="Categorías del blog" className="my-9 flex flex-wrap gap-2">
        {categories.map((c: Awaited<ReturnType<typeof getCategories>>[number]) => (
          <Link key={c.category} href={`/blog/${encodeURIComponent(c.category)}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">{c.category}<span className="ml-2 text-slate-400">{c.count}</span></Link>
        ))}
      </nav>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div><p className="text-xs font-bold uppercase tracking-widest text-blue-700">Biblioteca LinguaFly</p><h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Últimos artículos</h2></div>
        <span className="text-sm text-slate-400">{articles.length} artículos</span>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <Link key={a.id} href={`/blog/${encodeURIComponent(a.category)}/${a.slug}`} className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
            <p className="text-xs font-extrabold uppercase tracking-wider text-blue-700">{a.category}</p>
            <h3 className="mt-3 text-xl font-extrabold leading-snug text-slate-950 transition-colors group-hover:text-blue-700">{a.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{a.excerpt || a.description}</p>
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400"><span>{a.read_time || "Lectura"}</span><span className="font-bold text-blue-700">Leer artículo →</span></div>
          </Link>
        ))}
      </div>
    </main>
  );
}
