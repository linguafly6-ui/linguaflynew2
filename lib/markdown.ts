function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function inline(value: string) {
  let text = escapeHtml(String(value ?? ""));
  text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*(.+?)\*/g, "<em>$1</em>");
  text = text.replace(/~~(.+?)~~/g, "<del>$1</del>");
  text = text.replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="nofollow noopener noreferrer">$1</a>');
  return text;
}
export function markdownToHtml(markdown: string): string {
  const output: string[] = [];
  let paragraph: string[] = [];
  let list: "ul" | "ol" | null = null;
  let quote = false;
  let table = false;
  let code = false;
  let codeLines: string[] = [];
  const flush = () => { if (paragraph.length) { output.push("<p>" + paragraph.map(inline).join("<br>") + "</p>"); paragraph = []; } };
  const closeList = () => { if (list) { output.push(`</${list}>`); list = null; } };
  for (const raw of markdown.replace(/\r\n?/g, "\n").split("\n")) {
    const line = raw.trim();
    if (line.startsWith("```")) {
      flush(); closeList();
      if (code) { output.push("<pre><code>" + escapeHtml(codeLines.join("\n")) + "</code></pre>"); codeLines = []; code = false; }
      else { if (quote) { output.push("</blockquote>"); quote = false; } if (table) { output.push("</tbody></table>"); table = false; } code = true; }
      continue;
    }
    if (code) { codeLines.push(raw); continue; }
    if (!line) { flush(); closeList(); if (quote) { output.push("</blockquote>"); quote = false; } if (table) { output.push("</tbody></table>"); table = false; } continue; }
    const heading = /^(#{1,6})\s+(.+)$/.exec(line);
    if (heading) { flush(); closeList(); const n = heading[1].length; output.push(`<h${n}>${inline(heading[2])}</h${n}>`); continue; }
    if (/^---+$/.test(line)) { flush(); closeList(); output.push("<hr>"); continue; }
    if (line.startsWith(">")) { flush(); closeList(); if (!quote) { output.push("<blockquote>"); quote = true; } output.push(`<p>${inline(line.replace(/^>\s?/, ""))}</p>`); continue; }
    if (/^\|.*\|$/.test(line)) {
      flush(); closeList();
      const cells = line.split("|").slice(1, -1).map(x => x.trim());
      if (cells.every(x => /^:?-{3,}:?$/.test(x))) continue;
      if (!table) { output.push("<table><thead><tr>" + cells.map(x => `<th>${inline(x)}</th>`).join("") + "</tr></thead><tbody>"); table = true; }
      else output.push("<tr>" + cells.map(x => `<td>${inline(x)}</td>`).join("") + "</tr>");
      continue;
    }
    const item = /^([-*+])\s+(.+)$/.exec(line) || /^(\d+)\.\s+(.+)$/.exec(line);
    if (item) { flush(); const next = /^\d/.test(item[1]) ? "ol" : "ul"; if (list !== next) { closeList(); output.push(`<${next}>`); list = next; } output.push(`<li>${inline(item[2])}</li>`); continue; }
    closeList(); if (quote) { output.push("</blockquote>"); quote = false; } paragraph.push(line);
  }
  flush(); closeList(); if (quote) output.push("</blockquote>"); if (table) output.push("</tbody></table>");
  if (code) output.push("<pre><code>" + escapeHtml(codeLines.join("\n")) + "</code></pre>");
  return output.join("\n");
}
