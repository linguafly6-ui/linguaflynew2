function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function inline(value: string) {
  let text = escapeHtml(String(value ?? ""));
  text = text.replace(/`([^`]+)`/g, '<code class="blog-inline-code">$1</code>');
  text = text.replace(/**(.+?)**/g, '<strong class="blog-strong">$1</strong>');
  text = text.replace(/*(.+?)*/g, "<em>$1</em>");
  text = text.replace(/~~(.+?)~~/g, "<del>$1</del>");
  text = text.replace(/[([^]]+)]((https?:\/\/[^\s)]+|\/[^\s)]*))/g, (_match, label: string, url: string) => {
    const internal = url.startsWith("/");
    const safeUrl = escapeHtml(url);
    return `<a href="${safeUrl}" class="blog-link"${internal ? "" : ' target="_blank" rel="nofollow noopener noreferrer"'}>${label}${internal ? "" : ' <span aria-hidden="true" class="blog-link-icon">↗</span>'}</a>`;
  });
  return text;
}

export function markdownToHtml(markdown: string): string {
  const output: string[] = [];
  let paragraph: string[] = [];
  let list: "ul" | "ol" | null = null;
  let quote = false;
  let table = false;
  let tableRows = 0;
  let code = false;
  let codeLines: string[] = [];
  let firstParagraph = true;

  const flush = () => {
    if (!paragraph.length) return;
    const className = firstParagraph ? "blog-paragraph blog-paragraph-lead" : "blog-paragraph";
    output.push(`<p class="${className}">${paragraph.map(inline).join("<br>")}</p>`);
    paragraph = [];
    firstParagraph = false;
  };
  const closeList = () => {
    if (list) { output.push(`</${list}>`); list = null; }
  };
  const closeQuote = () => {
    if (quote) { output.push("</blockquote>"); quote = false; }
  };
  const closeTable = () => {
    if (table) { output.push("</tbody></table></div>"); table = false; tableRows = 0; }
  };

  for (const raw of markdown.replace(/\r\n?/g, "\n").split("\n")) {
    const line = raw.trim();
    if (line.startsWith("```")) {
      flush(); closeList(); closeQuote(); closeTable();
      if (code) {
        output.push('<pre class="blog-code"><code>' + escapeHtml(codeLines.join("\n")) + "</code></pre>");
        codeLines = []; code = false;
      } else code = true;
      continue;
    }
    if (code) { codeLines.push(raw); continue; }
    if (!line) { flush(); closeList(); closeQuote(); closeTable(); continue; }

    const heading = /^(#{1,6})\s+(.+)$/.exec(line);
    if (heading) {
      flush(); closeList(); closeQuote(); closeTable();
      const n = heading[1].length;
      const cls = n === 1 ? "blog-h1" : n === 2 ? "blog-h2" : n === 3 ? "blog-h3" : "blog-h4";
      output.push(`<h${n} class="${cls}">${n === 3 ? '<span class="blog-heading-dot" aria-hidden="true">▸</span>' : ""}${inline(heading[2])}</h${n}>`);
      continue;
    }
    if (/^---+$/.test(line)) {
      flush(); closeList(); closeQuote(); closeTable();
      output.push('<div class="blog-divider" role="separator"><span></span></div>');
      continue;
    }
    if (line.startsWith(">")) {
      flush(); closeList(); closeTable();
      if (!quote) { output.push('<blockquote class="blog-quote">'); quote = true; }
      output.push(`<p>${inline(line.replace(/^>\s?/, ""))}</p>`);
      continue;
    }
    if (/^\|.*\|$/.test(line)) {
      flush(); closeList(); closeQuote();
      const cells = line.split("|").slice(1, -1).map(x => x.trim());
      if (cells.every(x => /^:?-{3,}:?$/.test(x))) continue;
      if (!table) {
        output.push('<div class="blog-table-wrap"><table class="blog-table"><thead><tr>' + cells.map(x => `<th>${inline(x)}</th>`).join("") + "</tr></thead><tbody>");
        table = true;
      } else {
        tableRows++;
        output.push(`<tr class="${tableRows % 2 === 0 ? "blog-table-even" : ""}">` + cells.map(x => `<td>${inline(x)}</td>`).join("") + "</tr>");
      }
      continue;
    }
    const item = /^([-*+])\s+(.+)$/.exec(line) || /^(\d+)\.\s+(.+)$/.exec(line);
    if (item) {
      flush(); closeQuote(); closeTable();
      const next = /^\d/.test(item[1]) ? "ol" : "ul";
      if (list !== next) { closeList(); output.push(`<${next} class="${next === "ol" ? "blog-list-ordered" : "blog-list"}">`); list = next; }
      output.push(`<li>${inline(item[2])}</li>`);
      continue;
    }
    closeList(); closeQuote(); closeTable();
    paragraph.push(line);
  }
  flush(); closeList(); closeQuote(); closeTable();
  if (code) output.push('<pre class="blog-code"><code>' + escapeHtml(codeLines.join("\n")) + "</code></pre>");
  return output.join("\n");
}
