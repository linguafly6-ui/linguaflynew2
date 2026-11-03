"use client";

import { useEffect, useRef, useState } from "react";
import CourseAd from "@/components/CourseAd";
import { markdownToHtml } from "@/lib/markdown";

interface BlogArticleProps {
  content: string;
  title?: string;
  excerpt?: string;
  author?: string;
  readTime?: string;
  faqs?: { question: string; answer: string }[];
  breadcrumbs?: { label: string; href: string }[];
}

function splitArticleContent(content: string): { first: string; rest: string } {
  const normalized = content.replace(/\r\n?/g, "\n");
  const lines = normalized.split("\n");
  const h2Indexes: number[] = [];
  let inCodeBlock = false;
  lines.forEach((line, index) => {
    if (/^\s*```/.test(line)) { inCodeBlock = !inCodeBlock; return; }
    if (!inCodeBlock && /^##\s+/.test(line)) h2Indexes.push(index);
  });
  if (h2Indexes.length >= 2) {
    const splitAt = h2Indexes[1];
    return { first: lines.slice(0, splitAt).join("\n").trim(), rest: lines.slice(splitAt).join("\n").trim() };
  }
  const boundaries: number[] = [];
  inCodeBlock = false;
  lines.forEach((line, index) => {
    if (/^\s*```/.test(line)) { inCodeBlock = !inCodeBlock; return; }
    if (!inCodeBlock && !line.trim() && index > 0 && index < lines.length - 1) boundaries.push(index);
  });
  if (!boundaries.length) return { first: normalized.trim(), rest: "" };
  const midpoint = Math.floor(lines.length / 2);
  const splitAt = boundaries.reduce((best, current) => Math.abs(current - midpoint) < Math.abs(best - midpoint) ? current : best, boundaries[0]);
  return { first: lines.slice(0, splitAt).join("\n").trim(), rest: lines.slice(splitAt).join("\n").trim() };
}

export default function BlogArticle({ content, title, excerpt, author = "LinguaFly", readTime, faqs = [], breadcrumbs = [{ label: "Blog", href: "/blog" }] }: BlogArticleProps) {
  const articleRef = useRef<HTMLElement>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const { first, rest } = splitArticleContent(content);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const article = articleRef.current;
        if (!article) return;
        const rect = article.getBoundingClientRect();
        const total = article.scrollHeight - window.innerHeight;
        const travelled = Math.max(0, -rect.top);
        setReadingProgress(total > 0 ? Math.min(100, Math.max(0, (travelled / total) * 100)) : 0);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <div className="blog-reading-track" aria-hidden="true">
        <div className="blog-reading-progress" style={{ width: `${readingProgress}%` }} />
      </div>
      <article ref={articleRef} className="blog-article mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-10">
          <nav aria-label="Migas de pan" className="mb-7 flex flex-wrap items-center gap-2 text-sm text-slate-400">
            {breadcrumbs.map((crumb, index) => (
              <span key={`${crumb.href}-${index}`} className="inline-flex items-center gap-2">
                <a href={crumb.href} className="transition-colors hover:text-blue-700">{crumb.label}</a>
                {index < breadcrumbs.length - 1 ? <span aria-hidden="true">›</span> : null}
              </span>
            ))}
          </nav>
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">LinguaFly · Blog</span>
          {title ? <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">{title}</h1> : null}
          {excerpt ? <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">{excerpt}</p> : null}
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-slate-100 py-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2"><span aria-hidden="true">✍️</span> Por {author}</span>
            {readTime ? <span className="inline-flex items-center gap-2"><span aria-hidden="true">◷</span> {readTime} de lectura</span> : null}
          </div>
        </header>
        <div className="blog-prose max-w-none">
          {first ? <div dangerouslySetInnerHTML={{ __html: markdownToHtml(first) }} /> : null}
          <CourseAd variant="mid" />
          {rest ? <div dangerouslySetInnerHTML={{ __html: markdownToHtml(rest) }} /> : null}
        </div>
        {faqs.length ? (
          <section className="mt-16" aria-labelledby="blog-faq-title">
            <h2 id="blog-faq-title" className="mb-7 border-b-2 border-blue-100 pb-3 text-2xl font-black text-slate-950">Preguntas frecuentes</h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <details key={index} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-800">
                    {faq.question}<span className="shrink-0 text-blue-600 transition-transform group-open:rotate-180" aria-hidden="true">⌄</span>
                  </summary>
                  <p className="mt-4 leading-7 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}
        <CourseAd variant="end" />
      </article>
    </>
  );
}
