import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle } from "@/lib/blog";
import { markdownToHtml } from "@/lib/markdown";
export const dynamic = "force-dynamic";
export default async function ArticlePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const article = await getArticle(decodeURIComponent(category), slug);
  if (!article) notFound();
  const content = typeof article.content === "string" ? article.content : "";
  return <main className="mx-auto min-h-screen max-w-4xl px-6 py-12"><Link href="/blog" className="font-bold text-blue-700">← Blog</Link><article className="mt-8"><p className="text-sm font-bold uppercase text-blue-700">{String(article.category)}</p><h1 className="mt-3 text-4xl font-black leading-tight">{String(article.title)}</h1><p className="mt-4 text-slate-500">{String(article.excerpt || article.description || "")}</p><div className="mt-10 max-w-none space-y-5 leading-8" dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} /></article></main>;
}
export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const article = await getArticle(decodeURIComponent(category), slug);
  if (!article) return {};
  return { title: String(article.title), description: String(article.excerpt || article.description || "") };
}
