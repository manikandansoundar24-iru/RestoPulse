import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const rootDir = process.cwd();
const docsDir = path.join(rootDir, "docs");
const markdownDir = path.join(docsDir, "markdown");
const pdfDir = path.join(docsDir, "pdf");

if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

// Find Chrome or Edge executable
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browserPath = fs.existsSync(chromePath) ? chromePath : edgePath;

function markdownToHtml(md, title) {
  let lines = md.split("\n");
  let html = [];
  let inTable = false;
  let inList = false;
  let inCodeBlock = false;
  let codeLang = "";
  let codeLines = [];

  for (let line of lines) {
    let trimmed = line.trim();

    // Code block toggle
    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        html.push(`<pre class="code-block"><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        codeLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeLang = trimmed.slice(3).trim();
      }
      continue;
    }
    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    // Table
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      if (trimmed.includes("---")) continue;
      if (!inTable) {
        html.push('<table class="data-table"><tbody>');
        inTable = true;
      }
      let cells = trimmed.split("|").slice(1, -1).map(c => c.trim());
      let rowHtml = cells.map(c => `<td>${inlineFormat(c)}</td>`).join("");
      html.push(`<tr>${rowHtml}</tr>`);
      continue;
    } else if (inTable) {
      html.push('</tbody></table>');
      inTable = false;
    }

    // List
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (!inList) {
        html.push('<ul>');
        inList = true;
      }
      html.push(`<li>${inlineFormat(trimmed.slice(2))}</li>`);
      continue;
    } else if (inList) {
      html.push('</ul>');
      inList = false;
    }

    // Image: ![alt](url)
    const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      html.push(`<div class="img-container"><img src="${imgMatch[2]}" alt="${imgMatch[1]}" /><p class="caption">${imgMatch[1]}</p></div>`);
      continue;
    }

    // Headers
    if (trimmed.startsWith("# ")) {
      html.push(`<h1>${inlineFormat(trimmed.slice(2))}</h1>`);
    } else if (trimmed.startsWith("## ")) {
      html.push(`<h2>${inlineFormat(trimmed.slice(3))}</h2>`);
    } else if (trimmed.startsWith("### ")) {
      html.push(`<h3>${inlineFormat(trimmed.slice(4))}</h3>`);
    } else if (trimmed.startsWith("#### ")) {
      html.push(`<h4>${inlineFormat(trimmed.slice(5))}</h4>`);
    } else if (trimmed.startsWith("> ")) {
      html.push(`<blockquote>${inlineFormat(trimmed.slice(2))}</blockquote>`);
    } else if (trimmed.startsWith("---")) {
      html.push('<hr />');
    } else if (trimmed.length > 0) {
      html.push(`<p>${inlineFormat(trimmed)}</p>`);
    }
  }

  if (inTable) html.push('</tbody></table>');
  if (inList) html.push('</ul>');
  if (inCodeBlock) html.push(`<pre class="code-block"><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    @page { margin: 16mm 14mm; size: A4; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 10pt;
      line-height: 1.5;
      color: #1e293b;
      margin: 0;
      padding: 0;
    }
    h1 {
      font-size: 18pt;
      font-weight: 900;
      color: #ea580c;
      border-bottom: 2px solid #ea580c;
      padding-bottom: 6px;
      margin-top: 0;
      margin-bottom: 10px;
    }
    h2 {
      font-size: 13pt;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
      margin-top: 16px;
      margin-bottom: 6px;
      page-break-after: avoid;
    }
    h3 {
      font-size: 11pt;
      font-weight: 700;
      color: #c2410c;
      margin-top: 12px;
      margin-bottom: 4px;
      page-break-after: avoid;
    }
    h4 {
      font-size: 10pt;
      font-weight: 700;
      color: #334155;
      margin-top: 10px;
      margin-bottom: 3px;
    }
    p { margin: 5px 0; }
    blockquote {
      border-left: 4px solid #ea580c;
      background-color: #fff7ed;
      padding: 6px 10px;
      margin: 8px 0;
      border-radius: 4px;
      font-style: italic;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
      font-size: 9pt;
      page-break-inside: avoid;
    }
    table.data-table td, table.data-table th {
      border: 1px solid #cbd5e1;
      padding: 5px 8px;
      text-align: left;
    }
    table.data-table tr:nth-child(even) {
      background-color: #f8fafc;
    }
    table.data-table tr:first-child {
      background-color: #ffedd5;
      font-weight: bold;
      color: #9a3412;
    }
    ul { margin: 4px 0; padding-left: 20px; }
    li { margin: 2px 0; }
    code {
      background: #f1f5f9;
      padding: 1px 4px;
      border-radius: 3px;
      font-family: Consolas, monospace;
      font-size: 9pt;
      color: #0f172a;
    }
    pre.code-block {
      background: #0f172a;
      color: #f8fafc;
      padding: 8px 12px;
      border-radius: 6px;
      font-family: Consolas, monospace;
      font-size: 8.5pt;
      line-height: 1.4;
      overflow-x: auto;
      margin: 8px 0;
      page-break-inside: avoid;
    }
    pre.code-block code {
      background: transparent;
      color: inherit;
      padding: 0;
    }
    strong { font-weight: 700; color: #0f172a; }
    hr { border: 0; border-top: 1px solid #cbd5e1; margin: 12px 0; }
    .img-container {
      text-align: center;
      margin: 12px 0;
      page-break-inside: avoid;
    }
    .img-container img {
      max-width: 90%;
      height: auto;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .caption {
      font-size: 8pt;
      font-weight: bold;
      color: #c2410c;
      margin-top: 4px;
    }
  </style>
</head>
<body>
  ${html.join("\n")}
</body>
</html>`;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inlineFormat(text) {
  let s = text;
  s = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  return s;
}

const filesToConvert = [
  {
    src: path.join(docsDir, "RESTOPULSE_FULL_OPERATIONS_MANUAL.md"),
    dest: path.join(pdfDir, "RESTOPULSE_FULL_OPERATIONS_MANUAL.pdf"),
    destRoot: path.join(docsDir, "RESTOPULSE_FULL_OPERATIONS_MANUAL.pdf"),
    title: "RestoPulse — Complete Multi-Tenant Cloud ERP & POS Operations Manual"
  },
  {
    src: path.join(docsDir, "RESTOPULSE_MULTI_TENANT_MASTER_GUIDE.md"),
    dest: path.join(pdfDir, "RESTOPULSE_MULTI_TENANT_MASTER_GUIDE.pdf"),
    destRoot: path.join(docsDir, "RESTOPULSE_MULTI_TENANT_MASTER_GUIDE.pdf"),
    title: "RestoPulse — Master Architecture Guide & Diagrams"
  },
  {
    src: path.join(docsDir, "DOCUMENTATION_INDEX_AND_EXPLANATION.md"),
    dest: path.join(pdfDir, "DOCUMENTATION_INDEX_AND_EXPLANATION.pdf"),
    destRoot: path.join(docsDir, "DOCUMENTATION_INDEX_AND_EXPLANATION.pdf"),
    title: "RestoPulse — Master Documentation Index & Curriculum Guide"
  },
  {
    src: path.join(docsDir, "ARCHITECTURE.md"),
    dest: path.join(pdfDir, "ARCHITECTURE.pdf"),
    destRoot: path.join(docsDir, "ARCHITECTURE.pdf"),
    title: "RestoPulse — System Architecture & Multi-Tenant Blueprint"
  },
  {
    src: path.join(docsDir, "RESTAURANT_SALES_BATTLECARD_AND_CLOSING_STRATEGY.md"),
    dest: path.join(pdfDir, "RESTAURANT_SALES_BATTLECARD_AND_CLOSING_STRATEGY.pdf"),
    title: "RestoPulse — Restaurant Sales Playbook & Objection-Handling Battlecard"
  },
  {
    src: path.join(markdownDir, "PETPOOJA_VS_RESTOPULSE_BATTLECARD.md"),
    dest: path.join(pdfDir, "PETPOOJA_VS_RESTOPULSE_BATTLECARD.pdf"),
    title: "RestoPulse vs Petpooja — Commercial Battlecard"
  },
  {
    src: path.join(docsDir, "BUSINESS-PLAYBOOK.md"),
    dest: path.join(pdfDir, "BUSINESS-PLAYBOOK.pdf"),
    destRoot: path.join(docsDir, "BUSINESS-PLAYBOOK.pdf"),
    title: "RestoPulse — Restaurant Business Economics & Playbook"
  },
  {
    src: path.join(docsDir, "SETUP.md"),
    dest: path.join(pdfDir, "SETUP.pdf"),
    destRoot: path.join(docsDir, "SETUP.pdf"),
    title: "RestoPulse — Developer Setup & Installation Manual"
  },
  {
    src: path.join(docsDir, "CODE_WALKTHROUGH_LINE_BY_LINE.md"),
    dest: path.join(pdfDir, "CODE_WALKTHROUGH_LINE_BY_LINE.pdf"),
    destRoot: path.join(docsDir, "CODE_WALKTHROUGH_LINE_BY_LINE.pdf"),
    title: "RestoPulse — Code Walkthrough Line by Line"
  }
];

filesToConvert.forEach((item) => {
  if (!fs.existsSync(item.src)) {
    console.warn(`File not found: ${item.src}`);
    return;
  }
  const md = fs.readFileSync(item.src, "utf-8");
  const html = markdownToHtml(md, item.title);
  const targetHtmlPath = path.join(docsDir, `temp_${path.basename(item.dest, ".pdf")}.html`);
  fs.writeFileSync(targetHtmlPath, html, "utf-8");

  try {
    const cmd = `"${browserPath}" --headless=new --no-sandbox --disable-gpu --no-pdf-header-footer --print-to-pdf="${item.dest}" "file:///${targetHtmlPath.replace(/\\/g, "/")}"`;
    execSync(cmd, { stdio: "ignore" });
    console.log(`Generated: ${path.basename(item.dest)} in docs/pdf`);

    if (item.destRoot) {
      fs.copyFileSync(item.dest, item.destRoot);
      console.log(`Copied to: ${path.basename(item.destRoot)} in docs/`);
    }
  } catch (err) {
    console.error(`Failed to generate ${path.basename(item.dest)}:`, err);
  } finally {
    if (fs.existsSync(targetHtmlPath)) fs.unlinkSync(targetHtmlPath);
  }
});

console.log("All RestoPulse PDF documents generated successfully!");
