import CourseAd from "@/components/CourseAd";
import { markdownToHtml } from "@/lib/markdown";

interface BlogArticleProps {
  content: string;
}

/**
 * Inserta el anuncio compacto tras la primera sección H2. Si un artículo no
 * tiene suficientes encabezados, divide por bloques de párrafo para mantener
 * la lectura natural sin alterar el texto original.
 */
function splitArticleContent(content: string): { first: string; rest: string } {
  const normalized = content.replace(/\r\n?/g, "\n");
  const lines = normalized.split("\n");
  const h2Indexes: number[] = [];
  let inCodeBlock = false;

  lines.forEach((line, index) => {
    if (/^\s*```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      return;
    }
    if (!inCodeBlock && /^##\s+/.test(line)) h2Indexes.push(index);
  });

  // Put the ad after the first complete H2 section, before the next H2.
  if (h2Indexes.length >= 2) {
    const splitAt = h2Indexes[1];
    return {
      first: lines.slice(0, splitAt).join("\n").trim(),
      rest: lines.slice(splitAt).join("\n").trim(),
    };
  }

  // Short articles still receive both placements: split near the midpoint
  // at a blank line, never inside a fenced code block.
  const boundaries: number[] = [];
  inCodeBlock = false;
  lines.forEach((line, index) => {
    if (/^\s*```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      return;
    }
    if (!inCodeBlock && !line.trim() && index > 0 && index < lines.length - 1) boundaries.push(index);
  });

  if (!boundaries.length) return { first: normalized.trim(), rest: "" };
  const midpoint = Math.floor(lines.length / 2);
  const splitAt = boundaries.reduce((best, current) =>
    Math.abs(current - midpoint) < Math.abs(best - midpoint) ? current : best
  , boundaries[0]);

  return {
    first: lines.slice(0, splitAt).join("\n").trim(),
    rest: lines.slice(splitAt).join("\n").trim(),
  };
}

export default function BlogArticle({ content }: BlogArticleProps) {
  const { first, rest } = splitArticleContent(content);
  return (
    <>
      {first ? <div dangerouslySetInnerHTML={{ __html: markdownToHtml(first) }} /> : null}
      <CourseAd variant="mid" />
      {rest ? <div dangerouslySetInnerHTML={{ __html: markdownToHtml(rest) }} /> : null}
      <CourseAd variant="end" />
    </>
  );
}
