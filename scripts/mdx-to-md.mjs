/**
 * mdx-to-md.mjs
 *
 * Transforms a Docusaurus MDX file into clean Markdown suitable for LLM
 * ingestion and search indexing. No npm dependencies — pure Node.js built-ins.
 *
 * Strategy: line-oriented state-machine parser that understands JSX block
 * boundaries. Works on the text level rather than a full AST, which is
 * pragmatic given the highly structured patterns in this specific repo.
 *
 * Component handling (see COMPONENT_REGISTRY below for the full map):
 *   - <Tabs> / <TabItem>          → flatten all tabs with bold label headers
 *   - <SdkTabs> / <SdkTabs.Lang>  → flatten SDK tabs with bold language headers
 *   - :::note/tip/caution/danger  → blockquote with bold type prefix
 *   - <CodeSnippet language="x">  → fenced code block
 *   - <CallToAction href>         → markdown link (h3 title + p description)
 *   - <ReleaseNoteHeader>         → availability blockquote + body
 *   - <RelatedReadContainer>      → markdown link list from <RelatedReadItem>s
 *   - <RelatedReadList>           → markdown link list from readList prop
 *   - <ToolTipTerm term="x" />    → inline replacement with the term text
 *   - <JsonTable filename=".." /> → markdown table resolved from static/ JSON
 *   - <SetupSteps>/<SetupStep>    → prose children + code from the `code={}` prop
 *   - <ZoomPanPinch>              → transparent wrapper, pass inner content
 *   - imported .md components      → transcluded inline (e.g. <AWSRegions />)
 *   - import / export stmts        → stripped
 *   - {/* MDX comments *​/}         → stripped
 *   - Unknown JSX blocks           → strip tags, preserve inner text content
 *
 * If deeply nested JSX ever outgrows this approach, the upgrade path is
 * unified + remark-mdx (AST-based).
 */

import { jsonTableToMarkdown } from "./component-handlers/data-tables.mjs";
import { integrationsGridToMarkdown } from "./component-handlers/integrations.mjs";
import { homePageHeroToMarkdown } from "./component-handlers/home-page-hero.mjs";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

// ---------------------------------------------------------------------------
// COMPONENT_REGISTRY
// Maps component names to their rendering strategy (a string key dispatched
// by the transformer). Data-driven strategies like `json-table` delegate to a
// handler in scripts/component-handlers/.
// ---------------------------------------------------------------------------
export const COMPONENT_REGISTRY = {
  // Docusaurus theme components
  Tabs: "tabs",
  TabItem: "tabitem",

  // Temporal custom components — content-bearing
  ZoomPanPinch: "transparent",
  DiscoverableDisclosure: "transparent",
  RelatedReadList: "related-read",
  RelatedReadContainer: "related-read-container",
  RelatedReadItem: "related-read-item",
  CaptionedImage: "captioned-image",
  EnlargeImage: "captioned-image",
  ZoomingImage: "captioned-image",
  PhotoCarousel: "photo-carousel",
  CodeSnippet: "code-snippet",
  SdkTabs: "sdk-tabs",
  ToolTipTerm: "tooltip-term",
  ReleaseNoteHeader: "release-note-header",
  CallToAction: "call-to-action",
  SetupSteps: "setup-steps",
  SetupStep: "setup-step",
  JsonTable: "json-table",
  IntegrationsGrid: "integrations-grid",
  HomePageHero: "home-page-hero",
  DefinitionList: "strip-tag",
  DL: "strip-tag",
  DT: "strip-tag",
  DD: "strip-tag",

  // Layout / navigation / visual (no extractable content value)
  DocCardList: "strip-block",
  CardList: "strip-block",
  LandingCard: "strip-block",
  ThemedImage: "strip-block",
  PatternCards: "strip-block",
  QuickstartCards: "strip-block",
  SdkLogos: "strip-block",
  SdkSvg: "strip-block",
  CloudRegionCount: "strip-block",
  RetrySimulator: "strip-block",
  ServerlessWorkerDemo: "strip-block",
  OperationsTable: "strip-block",
  InvitationContent: "strip-block",

  // Details/summary (HTML, handled natively)
  details: "details",
  summary: "summary",
};

// Components handled by their own state branch / inline pass rather than the
// generic strip path. The generic "unknown component" warning suppresses these.
const COMPONENTS_BY_STRATEGY = (strategy) =>
  Object.entries(COMPONENT_REGISTRY)
    .filter(([, s]) => s === strategy)
    .map(([name]) => name);

const STRIP_BLOCK_COMPONENTS = COMPONENTS_BY_STRATEGY("strip-block");
const STRIP_TAG_COMPONENTS = COMPONENTS_BY_STRATEGY("strip-tag");

// Availability labels for ReleaseNoteHeader `type` prop values.
const RELEASE_NOTE_LABELS = {
  prerelease: "Pre-release",
  publicPreview: "Public Preview",
  publicpreview: "Public Preview",
  ga: "Generally Available",
  deprecated: "Deprecated",
};

// SdkTabs sub-component name → display label.
const SDK_TAB_LABELS = {
  Go: "Go",
  Java: "Java",
  Python: "Python",
  TypeScript: "TypeScript",
  DotNet: ".NET",
  Ruby: "Ruby",
  Php: "PHP",
  PHP: "PHP",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Parse YAML-ish frontmatter from the top of an MDX file.
 * Returns { data, content } where data is a plain object.
 * We only need title + description for the output; parse conservatively.
 */
export function parseFrontmatter(text) {
  if (!text.startsWith("---")) return { data: {}, content: text };

  const end = text.indexOf("\n---", 3);
  if (end === -1) return { data: {}, content: text };

  const yaml = text.slice(4, end).trim();
  const content = text.slice(end + 4).trimStart();

  const data = {};
  for (const line of yaml.split("\n")) {
    // Only parse simple scalar values — skip arrays/objects
    const m = line.match(/^(\w[\w-]*):\s*(.+)$/);
    if (m) {
      // Strip surrounding quotes if present
      data[m[1]] = m[2].replace(/^['"]|['"]$/g, "").trim();
    }
  }
  return { data, content };
}

/**
 * Extract the value of a JSX prop from a tag string.
 * e.g. extractProp('<TabItem value="go" label="Go">', 'label') => 'Go'
 * Handles both value="..." and value={`...`} and value={'...'} forms.
 */
export function extractProp(tagStr, propName) {
  // value="..."  or  value='...'
  const dq = new RegExp(`${propName}=["']([^"']+)["']`);
  const mq = tagStr.match(dq);
  if (mq) return mq[1];

  // value={"..."} or value={'...'}
  const bq = new RegExp(`${propName}=\\{["'\`]([^"'\`]+)["'\`]\\}`);
  const mb = tagStr.match(bq);
  if (mb) return mb[1];

  return null;
}

/**
 * Parse a JSX values/items array prop used by Tabs:
 *   values={[{label: 'Go', value: 'go'}, ...]}
 * Returns array of {label, value} objects.
 */
export function parseTabValues(tagStr) {
  // Extract the full array literal between [ and ]
  const m = tagStr.match(/values=\{(\[[\s\S]*?\])\}/);
  if (!m) return [];

  const arr = m[1];
  const results = [];
  // Match each {label: '...', value: '...'} object
  const itemRe = /\{[^}]*label:\s*['"`]([^'"`]+)['"`][^}]*value:\s*['"`]([^'"`]+)['"`][^}]*\}/g;
  let im;
  while ((im = itemRe.exec(arr)) !== null) {
    results.push({ label: im[1], value: im[2] });
  }
  return results;
}

/**
 * Parse the readList prop used by RelatedReadList:
 *   readList={[["Title", "/path", "type"], ...]}
 * Returns array of {text, href} objects.
 */
export function parseReadList(tagStr) {
  // Match entire prop value including multi-line
  const m = tagStr.match(/readList=\{(\[[\s\S]*?\])\}/);
  if (!m) return [];

  const arr = m[1];
  const results = [];
  // Match each inner array ["text", "/path", "type"]
  const itemRe = /\[\s*["']([^"']+)["']\s*,\s*["']([^"']+)["']/g;
  let im;
  while ((im = itemRe.exec(arr)) !== null) {
    results.push({ text: im[1], href: im[2] });
  }
  return results;
}

/**
 * Parse a JSX string-array prop: images={['a', 'b']} → ['a', 'b'].
 */
export function parseStringArrayProp(tagStr, propName) {
  const m = tagStr.match(new RegExp(`${propName}=\\{(\\[[\\s\\S]*?\\])\\}`));
  if (!m) return [];
  return [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]);
}

/**
 * Remove the common leading whitespace from a block of lines (dedent).
 */
export function dedent(lines) {
  const nonEmpty = lines.filter((l) => l.trim());
  if (nonEmpty.length === 0) return lines.map(() => "");
  const minIndent = Math.min(
    ...nonEmpty.map((l) => l.match(/^[ \t]*/)[0].length)
  );
  return lines.map((l) => l.slice(minIndent));
}

/**
 * Strip MDX expression comments ({​/* ... *​/}) and replace inline
 * <ToolTipTerm term="x" /> with the bare term. Applied only to prose content
 * lines (never inside code fences).
 */
export function applyInlineTransforms(line) {
  let out = line;

  // Strip single-line MDX comments: {/* ... */}
  out = out.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");

  // Inline <ToolTipTerm term="x" /> → x  (self-closing or paired)
  out = out.replace(/<ToolTipTerm\b[^>]*\/>/g, (m) => extractProp(m, "term") || "");
  out = out.replace(
    /<ToolTipTerm\b[^>]*>([\s\S]*?)<\/ToolTipTerm>/g,
    (m, inner) => extractProp(m, "term") || inner
  );

  // Collapse a line left whitespace-only (e.g. after a comment was stripped)
  // to a true blank line — an indented blank could otherwise read as code.
  if (/^\s+$/.test(out)) return "";

  return out;
}

/**
 * Extract <CodeSnippet language="x">...</CodeSnippet> blocks from a set of
 * lines (used for the SetupStep `code={}` prop). Returns an array of fenced
 * code-block strings.
 */
function extractCodeSnippets(lines) {
  const blocks = [];
  for (let i = 0; i < lines.length; i++) {
    const open = lines[i].match(/<CodeSnippet\b[^>]*>/);
    if (!open) continue;
    const lang = extractProp(open[0], "language") || "";

    // Same-line close: <CodeSnippet ...>code</CodeSnippet>
    const sameLine = lines[i].match(/<CodeSnippet\b[^>]*>([\s\S]*?)<\/CodeSnippet>/);
    if (sameLine) {
      blocks.push("```" + lang + "\n" + sameLine[1].trim() + "\n```");
      continue;
    }

    const inner = [];
    i++;
    while (i < lines.length && !/<\/CodeSnippet>/.test(lines[i])) {
      inner.push(lines[i]);
      i++;
    }
    const code = dedent(inner).join("\n").replace(/^\n+|\n+$/g, "");
    blocks.push("```" + lang + "\n" + code + "\n```");
  }
  return blocks;
}

/**
 * Pre-scan import statements for components backed by a Markdown file:
 *   import AWSRegions from '@site/docs/.../awsregions.md';
 * Returns a map { ComponentName: '@site/...md' } for transclusion.
 */
export function scanMarkdownImports(content) {
  const map = {};
  const re = /import\s+([A-Z][A-Za-z0-9]*)\s+from\s+['"]([^'"]+\.mdx?)['"]/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    map[m[1]] = m[2];
  }
  return map;
}

// ---------------------------------------------------------------------------
// Core transformer
// ---------------------------------------------------------------------------

const State = {
  NORMAL: "NORMAL",
  ADMONITION: "ADMONITION",
  TABS: "TABS",
  TABITEM: "TABITEM",
  SDK_TABS: "SDK_TABS",
  SDK_TABITEM: "SDK_TABITEM",
  DETAILS: "DETAILS",
  STRIP_BLOCK: "STRIP_BLOCK",
  CODE_SNIPPET: "CODE_SNIPPET",
  CALL_TO_ACTION: "CALL_TO_ACTION",
  RELEASE_NOTE: "RELEASE_NOTE",
  RELATED_READ_CONTAINER: "RELATED_READ_CONTAINER",
  SETUP_STEPS: "SETUP_STEPS",
  SETUP_STEP: "SETUP_STEP",
};

/**
 * Main transform function.
 * @param {string} mdxContent - raw MDX file content
 * @param {object} options
 * @param {string} options.sourceFile  - path for error messages
 * @param {string} [options.projectRoot] - Docusaurus root (for data handlers / transclusion)
 * @param {string} [options.mdxDir]     - directory of the source file (for relative transclusion)
 * @param {number} [options._depth]     - internal recursion guard
 * @returns {{ markdown: string, warnings: string[] }}
 */
export function transformMdx(mdxContent, options = {}) {
  const sourceFile = options.sourceFile || "<unknown>";
  const projectRoot = options.projectRoot;
  const depth = options._depth || 0;
  const warnings = [];

  const { data: frontmatter, content } = parseFrontmatter(mdxContent);
  const lines = content.split("\n");

  // Map of <Name /> components imported from .md(x) files, for transclusion.
  const mdImports = scanMarkdownImports(mdxContent);

  const outputLines = [];

  // Write frontmatter title/description as a clean markdown header block.
  if (frontmatter.title) {
    outputLines.push(`# ${frontmatter.title}`);
    if (frontmatter.description && frontmatter.description !== frontmatter.title) {
      outputLines.push("");
      outputLines.push(`> ${frontmatter.description}`);
    }
    outputLines.push("");
  }

  let state = State.NORMAL;

  // --- Tabs / SdkTabs state ---
  let tabsValues = [];
  let currentTabLabel = null;
  let tabItemLines = [];
  let tabsOutputLines = [];

  // --- Admonition state ---
  let admonitionType = null;
  let admonitionLines = [];

  // --- Details state ---
  let detailsLines = [];
  let detailsSummary = null;

  // --- Strip-block state ---
  let stripDepth = 0;
  let stripTag = null;

  // --- ZoomPanPinch (transparent) — strip wrapper tags, pass content through ---
  let transparentDepth = 0;

  // --- CodeSnippet state ---
  let codeSnippetLang = "";
  let codeSnippetLines = [];

  // --- CallToAction state ---
  let ctaHref = null;
  let ctaLines = [];

  // --- ReleaseNoteHeader state ---
  let releaseNoteLabel = null;
  let releaseNoteLangs = "";
  let releaseNoteLines = [];

  // --- RelatedReadContainer state ---
  let relatedItems = [];

  // --- SetupStep state ---
  let setupCodeBlocks = [];
  let setupChildLines = [];
  let collectingSetupCode = false;
  let setupCodePropLines = [];

  // --- Code fence tracking ---
  let inCodeBlock = false;
  let codeBlockFence = null;

  function isOpenTag(line, name) {
    const n = name.replace(/[.]/g, "\\.");
    return new RegExp(`^\\s*<${n}[\\s>]|^\\s*<${n}$`).test(line);
  }
  function isCloseTag(line, name) {
    const n = name.replace(/[.]/g, "\\.");
    return new RegExp(`^\\s*</${n}>`).test(line) || new RegExp(`^\\s*</${n}\\s`).test(line);
  }

  // Route a content line to the active buffer.
  function pushLine(l) {
    if (state === State.TABITEM || state === State.SDK_TABITEM) tabItemLines.push(l);
    else if (state === State.ADMONITION) admonitionLines.push(l);
    else if (state === State.DETAILS) detailsLines.push(l);
    else outputLines.push(l);
  }

  // Emit prose content with inline transforms applied (comments, ToolTipTerm).
  function emitContent(l) {
    pushLine(applyInlineTransforms(l));
  }

  function flushTabItem(label) {
    if (label === null || label === undefined) return;
    tabsOutputLines.push(`**${label}**`);
    tabsOutputLines.push("");
    const inner = transformMdx(tabItemLines.join("\n"), {
      sourceFile: sourceFile + "#tab",
      projectRoot,
      mdxDir: options.mdxDir,
      _depth: depth + 1,
    });
    warnings.push(...inner.warnings);
    tabsOutputLines.push(...inner.markdown.split("\n"));
    tabsOutputLines.push("");
    tabItemLines = [];
  }

  function transcludeMarkdown(importPath) {
    if (depth > 8) return null; // recursion guard
    if (!projectRoot) return null;
    let rel = importPath;
    if (rel.startsWith("@site/")) rel = rel.slice("@site/".length);
    const full = join(projectRoot, rel);
    if (!existsSync(full)) {
      warnings.push(`[${sourceFile}] transclusion target not found: ${importPath}`);
      return null;
    }
    try {
      const raw = readFileSync(full, "utf8");
      const inner = transformMdx(raw, {
        sourceFile: importPath,
        projectRoot,
        mdxDir: options.mdxDir,
        _depth: depth + 1,
      });
      warnings.push(...inner.warnings);
      return inner.markdown;
    } catch (err) {
      warnings.push(`[${sourceFile}] transclusion failed: ${importPath} — ${err.message}`);
      return null;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // ------------------------------------------------------------------
    // Code fence detection — suspend all JSX parsing inside fences
    // ------------------------------------------------------------------
    if (!inCodeBlock) {
      const fenceMatch = trimmed.match(/^(`{3,}|~{3,})/);
      if (fenceMatch && state !== State.SETUP_STEP) {
        inCodeBlock = true;
        codeBlockFence = fenceMatch[1];
        pushLine(line);
        continue;
      }
    } else {
      const closeMatch = trimmed.startsWith(codeBlockFence);
      pushLine(line);
      if (closeMatch && trimmed.length <= codeBlockFence.length + 10) {
        inCodeBlock = false;
        codeBlockFence = null;
      }
      continue;
    }

    // ==================================================================
    // Active-state handlers (must come before NORMAL detection)
    // ==================================================================

    // --- CodeSnippet block ---
    if (state === State.CODE_SNIPPET) {
      if (/<\/CodeSnippet>/.test(line)) {
        const code = dedent(codeSnippetLines).join("\n").replace(/^\n+|\n+$/g, "");
        outputLines.push("```" + codeSnippetLang);
        outputLines.push(code);
        outputLines.push("```");
        outputLines.push("");
        state = State.NORMAL;
        codeSnippetLines = [];
        codeSnippetLang = "";
      } else {
        codeSnippetLines.push(line);
      }
      continue;
    }

    // --- CallToAction block ---
    if (state === State.CALL_TO_ACTION) {
      if (isCloseTag(line, "CallToAction")) {
        const joined = ctaLines.join("\n");
        const title =
          (joined.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i) || [])[1] || "";
        const desc = (joined.match(/<p[^>]*>([\s\S]*?)<\/p>/i) || [])[1] || "";
        const cleanTitle = title.replace(/<[^>]+>/g, "").trim();
        const cleanDesc = desc.replace(/<[^>]+>/g, "").trim();
        if (ctaHref && cleanTitle) {
          let entry = `- [${cleanTitle}](${ctaHref})`;
          if (cleanDesc) entry += `: ${cleanDesc}`;
          outputLines.push(entry);
          outputLines.push("");
        }
        state = State.NORMAL;
        ctaHref = null;
        ctaLines = [];
      } else {
        ctaLines.push(line);
      }
      continue;
    }

    // --- ReleaseNoteHeader block ---
    if (state === State.RELEASE_NOTE) {
      if (isCloseTag(line, "ReleaseNoteHeader")) {
        let note = `> **${releaseNoteLabel}**`;
        if (releaseNoteLangs) note += ` — ${releaseNoteLangs}`;
        outputLines.push(note);
        const body = transformMdx(releaseNoteLines.join("\n"), {
          sourceFile: sourceFile + "#release-note",
          projectRoot,
          mdxDir: options.mdxDir,
          _depth: depth + 1,
        });
        warnings.push(...body.warnings);
        const bodyLines = dedent(body.markdown.split("\n"));
        for (const bl of bodyLines) {
          outputLines.push(bl.trim() === "" ? ">" : `> ${bl}`);
        }
        outputLines.push("");
        state = State.NORMAL;
        releaseNoteLines = [];
        releaseNoteLabel = null;
        releaseNoteLangs = "";
      } else {
        releaseNoteLines.push(line);
      }
      continue;
    }

    // --- RelatedReadContainer block ---
    if (state === State.RELATED_READ_CONTAINER) {
      if (isCloseTag(line, "RelatedReadContainer")) {
        if (relatedItems.length > 0) {
          outputLines.push("**Related:**");
          outputLines.push("");
          for (const it of relatedItems) outputLines.push(`- [${it.text}](${it.href})`);
          outputLines.push("");
        }
        state = State.NORMAL;
        relatedItems = [];
      } else if (/<RelatedReadItem\b/.test(line)) {
        // May span lines until /> — accumulate
        let tag = line;
        while (!/\/>/.test(tag) && i + 1 < lines.length) {
          i++;
          tag += " " + lines[i].trim();
        }
        const text = extractProp(tag, "text");
        const href = extractProp(tag, "path");
        if (text && href) relatedItems.push({ text, href });
      }
      continue;
    }

    // --- SdkTabs / SdkTabs.Lang ---
    if (state === State.SDK_TABS) {
      const sub = trimmed.match(/^<SdkTabs\.([A-Za-z]+)[\s>]/);
      if (sub) {
        const lang = sub[1];
        currentTabLabel = SDK_TAB_LABELS[lang] || lang;
        tabItemLines = [];
        state = State.SDK_TABITEM;
        continue;
      }
      if (isCloseTag(line, "SdkTabs")) {
        state = State.NORMAL;
        outputLines.push(...tabsOutputLines);
        tabsOutputLines = [];
        continue;
      }
      continue; // skip stray content between sub-tabs
    }
    if (state === State.SDK_TABITEM) {
      const subClose = trimmed.match(/^<\/SdkTabs\.[A-Za-z]+>/);
      if (subClose) {
        flushTabItem(currentTabLabel);
        currentTabLabel = null;
        state = State.SDK_TABS;
        continue;
      }
      tabItemLines.push(line);
      continue;
    }

    // --- SetupSteps container (transparent) ---
    if (state === State.SETUP_STEPS) {
      if (isCloseTag(line, "SetupSteps")) {
        state = State.NORMAL;
        continue;
      }
      if (isOpenTag(line, "SetupStep")) {
        state = State.SETUP_STEP;
        setupCodeBlocks = [];
        setupChildLines = [];
        setupCodePropLines = [];
        // The open tag usually ends with `code={` — begin collecting the prop.
        collectingSetupCode = /code=\{/.test(line);
        continue;
      }
      continue; // whitespace between steps
    }

    // --- SetupStep: collect code={} prop, then prose children ---
    if (state === State.SETUP_STEP) {
      if (collectingSetupCode) {
        // The prop closes on a line that is (or ends with) `}>`.
        if (trimmed === "}>" || /\}>\s*$/.test(trimmed)) {
          collectingSetupCode = false;
          setupCodeBlocks = extractCodeSnippets(setupCodePropLines);
          continue;
        }
        setupCodePropLines.push(line);
        continue;
      }
      if (isCloseTag(line, "SetupStep")) {
        // Emit prose children, then the code blocks extracted from the prop.
        const inner = transformMdx(setupChildLines.join("\n"), {
          sourceFile: sourceFile + "#setup-step",
          projectRoot,
          mdxDir: options.mdxDir,
          _depth: depth + 1,
        });
        warnings.push(...inner.warnings);
        const childMd = inner.markdown.trim();
        if (childMd) {
          outputLines.push(childMd);
          outputLines.push("");
        }
        for (const block of setupCodeBlocks) {
          outputLines.push(block);
          outputLines.push("");
        }
        state = State.SETUP_STEPS;
        setupChildLines = [];
        setupCodeBlocks = [];
        continue;
      }
      setupChildLines.push(line);
      continue;
    }

    // ------------------------------------------------------------------
    // Strip import / export statements
    // ------------------------------------------------------------------
    if (/^import\s+/.test(trimmed) || /^export\s+(default\s+)?/.test(trimmed)) {
      if (
        !trimmed.endsWith(";") &&
        !trimmed.endsWith("}") &&
        !trimmed.endsWith("'") &&
        !trimmed.endsWith('"')
      ) {
        while (i + 1 < lines.length) {
          i++;
          const next = lines[i].trim();
          if (next.endsWith(";") || next.endsWith("}") || next === "") break;
        }
      }
      continue;
    }

    // ------------------------------------------------------------------
    // Admonitions  :::note / :::tip / :::caution / :::danger / :::info / :::warning
    // ------------------------------------------------------------------
    if (state === State.NORMAL) {
      const admonitionOpen = trimmed.match(/^:::(note|tip|caution|danger|info|warning)(\s.*)?$/i);
      if (admonitionOpen) {
        state = State.ADMONITION;
        admonitionType = admonitionOpen[1].toLowerCase();
        admonitionLines = [];
        if (admonitionOpen[2] && admonitionOpen[2].trim()) {
          admonitionLines.push(admonitionOpen[2].trim());
        }
        continue;
      }
    }
    if (state === State.ADMONITION) {
      if (trimmed === ":::") {
        const typeLabels = {
          note: "📝 Note",
          tip: "💡 Tip",
          caution: "⚠️ Caution",
          danger: "🚨 Danger",
          info: "ℹ️ Info",
          warning: "⚠️ Warning",
        };
        const label = typeLabels[admonitionType] || admonitionType.toUpperCase();
        outputLines.push(`> **${label}:**`);
        for (const al of admonitionLines) {
          outputLines.push(al.trim() === "" ? ">" : `> ${applyInlineTransforms(al)}`);
        }
        outputLines.push("");
        state = State.NORMAL;
        admonitionLines = [];
        admonitionType = null;
      } else {
        admonitionLines.push(line);
      }
      continue;
    }

    // ------------------------------------------------------------------
    // <Tabs> handling
    // ------------------------------------------------------------------
    if (state === State.NORMAL && isOpenTag(line, "Tabs")) {
      state = State.TABS;
      let fullTabsTag = line;
      if (!line.includes(">")) {
        while (i + 1 < lines.length) {
          i++;
          fullTabsTag += " " + lines[i].trim();
          if (lines[i].includes(">")) break;
        }
      }
      tabsValues = parseTabValues(fullTabsTag);
      tabsOutputLines = [];
      tabItemLines = [];
      currentTabLabel = null;
      continue;
    }
    if (state === State.TABS) {
      if (isOpenTag(line, "TabItem")) {
        if (currentTabLabel !== null) flushTabItem(currentTabLabel);
        const value = extractProp(line, "value");
        const label = extractProp(line, "label");
        if (label) currentTabLabel = label;
        else if (value && tabsValues.length > 0) {
          const match = tabsValues.find((v) => v.value === value);
          currentTabLabel = match ? match.label : value;
        } else currentTabLabel = value || "Tab";
        state = State.TABITEM;
        tabItemLines = [];
        continue;
      }
      if (isCloseTag(line, "Tabs")) {
        state = State.NORMAL;
        outputLines.push(...tabsOutputLines);
        tabsOutputLines = [];
        continue;
      }
      continue;
    }
    if (state === State.TABITEM) {
      if (isCloseTag(line, "TabItem")) {
        flushTabItem(currentTabLabel);
        currentTabLabel = null;
        state = State.TABS;
        continue;
      }
      tabItemLines.push(line);
      continue;
    }

    // ------------------------------------------------------------------
    // NORMAL-state component detection
    // ------------------------------------------------------------------

    // --- SdkTabs open ---
    if (state === State.NORMAL && isOpenTag(line, "SdkTabs")) {
      state = State.SDK_TABS;
      tabsOutputLines = [];
      tabItemLines = [];
      currentTabLabel = null;
      continue;
    }

    // --- CodeSnippet open (standalone) ---
    if (state === State.NORMAL && /^\s*<CodeSnippet\b/.test(line)) {
      const open = line.match(/<CodeSnippet\b[^>]*>/);
      const lang = open ? extractProp(open[0], "language") || "" : "";
      // Same-line close?
      const sameLine = line.match(/<CodeSnippet\b[^>]*>([\s\S]*?)<\/CodeSnippet>/);
      if (sameLine) {
        outputLines.push("```" + lang);
        outputLines.push(sameLine[1].trim());
        outputLines.push("```");
        outputLines.push("");
      } else {
        state = State.CODE_SNIPPET;
        codeSnippetLang = lang;
        codeSnippetLines = [];
      }
      continue;
    }

    // --- CallToAction open ---
    if (state === State.NORMAL && isOpenTag(line, "CallToAction")) {
      let tag = line;
      while (!/>/.test(tag) && i + 1 < lines.length) {
        i++;
        tag += " " + lines[i].trim();
      }
      ctaHref = extractProp(tag, "href");
      ctaLines = [];
      state = State.CALL_TO_ACTION;
      continue;
    }

    // --- ReleaseNoteHeader open ---
    if (state === State.NORMAL && isOpenTag(line, "ReleaseNoteHeader")) {
      let tag = line;
      while (!/>/.test(tag) && i + 1 < lines.length) {
        i++;
        tag += " " + lines[i].trim();
      }
      const type = extractProp(tag, "type") || "";
      releaseNoteLabel = RELEASE_NOTE_LABELS[type] || RELEASE_NOTE_LABELS[type.toLowerCase()] || type;
      const langsMatch = tag.match(/languages=\{(\[[^\]]*\])\}/);
      if (langsMatch) {
        const langs = [...langsMatch[1].matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1]);
        releaseNoteLangs = langs.join(", ");
      } else {
        releaseNoteLangs = "";
      }
      releaseNoteLines = [];
      state = State.RELEASE_NOTE;
      continue;
    }

    // --- RelatedReadContainer open ---
    if (state === State.NORMAL && isOpenTag(line, "RelatedReadContainer")) {
      state = State.RELATED_READ_CONTAINER;
      relatedItems = [];
      continue;
    }

    // --- RelatedReadList (self-contained, multi-line prop) ---
    if (state === State.NORMAL && isOpenTag(line, "RelatedReadList")) {
      let fullTag = line;
      if (!trimmed.endsWith("/>") && !trimmed.includes("</RelatedReadList>")) {
        while (i + 1 < lines.length) {
          i++;
          fullTag += " " + lines[i].trim();
          if (lines[i].trim().endsWith("/>") || lines[i].includes("</RelatedReadList>")) break;
        }
      }
      const items = parseReadList(fullTag);
      if (items.length > 0) {
        outputLines.push("**Related:**");
        outputLines.push("");
        for (const item of items) outputLines.push(`- [${item.text}](${item.href})`);
        outputLines.push("");
      }
      continue;
    }

    // --- SetupSteps open ---
    if (state === State.NORMAL && isOpenTag(line, "SetupSteps")) {
      state = State.SETUP_STEPS;
      continue;
    }

    // --- ZoomPanPinch / transparent wrappers — strip tags, keep content ---
    let transparentName = null;
    for (const name of COMPONENTS_BY_STRATEGY("transparent")) {
      if (isOpenTag(line, name) || isCloseTag(line, name)) {
        transparentName = name;
        break;
      }
    }
    if (state === State.NORMAL && transparentName) {
      // Self-closing or paired — either way we just drop the wrapper line.
      continue;
    }

    // --- Image components (self-closing, may span lines) ---
    //     <CaptionedImage|EnlargeImage|ZoomingImage|Components.CaptionedImage
    //     src="..." alt|caption|title="..." />  →  ![text](src)
    if (
      state === State.NORMAL &&
      /^\s*<(CaptionedImage|EnlargeImage|ZoomingImage|Components\.CaptionedImage)\b/.test(line)
    ) {
      let tag = line;
      while (!/\/>/.test(tag) && i + 1 < lines.length) {
        i++;
        tag += " " + lines[i].trim();
      }
      const src = extractProp(tag, "src");
      const alt =
        extractProp(tag, "alt") ||
        extractProp(tag, "caption") ||
        extractProp(tag, "title") ||
        "";
      if (src) {
        outputLines.push(`![${alt}](${src})`);
        outputLines.push("");
      }
      continue;
    }

    // --- PhotoCarousel (images + captions arrays) → list of images ---
    if (state === State.NORMAL && /^\s*<PhotoCarousel\b/.test(line)) {
      let tag = line;
      while (!/\/>/.test(tag) && i + 1 < lines.length) {
        i++;
        tag += "\n" + lines[i];
      }
      const images = parseStringArrayProp(tag, "images");
      const captions = parseStringArrayProp(tag, "captions");
      for (let k = 0; k < images.length; k++) {
        outputLines.push(`![${captions[k] || ""}](${images[k]})`);
      }
      if (images.length) outputLines.push("");
      continue;
    }

    // --- JsonTable (self-closing data component) ---
    if (state === State.NORMAL && /^\s*<JsonTable\b/.test(line)) {
      let tag = line;
      while (!/\/?>/.test(tag) && i + 1 < lines.length) {
        i++;
        tag += " " + lines[i].trim();
      }
      const filename = extractProp(tag, "filename");
      const table = jsonTableToMarkdown(filename, { projectRoot, warnings, sourceFile });
      outputLines.push(table);
      outputLines.push("");
      continue;
    }

    // --- IntegrationsGrid (self-closing) → resolved Markdown list ---
    if (state === State.NORMAL && /^\s*<IntegrationsGrid\b/.test(line)) {
      let tag = line;
      while (!/\/?>/.test(tag) && i + 1 < lines.length) {
        i++;
        tag += " " + lines[i].trim();
      }
      const defaultSdks = parseStringArrayProp(tag, "defaultSdks");
      const md = integrationsGridToMarkdown(defaultSdks, { projectRoot, warnings, sourceFile });
      outputLines.push(md);
      outputLines.push("");
      continue;
    }

    // --- HomePageHero (self-closing) → hardcoded hero content ---
    // See scripts/component-handlers/home-page-hero.mjs (kept in sync with
    // src/components/elements/HomePageHero.js).
    if (state === State.NORMAL && /^\s*<HomePageHero\b/.test(line)) {
      outputLines.push(homePageHeroToMarkdown());
      outputLines.push("");
      continue;
    }

    // --- Markdown-import transclusion: <AWSRegions /> etc. ---
    const transcludeMatch = trimmed.match(/^<([A-Z][A-Za-z0-9]*)\s*\/>$/);
    if (state === State.NORMAL && transcludeMatch && mdImports[transcludeMatch[1]]) {
      const md = transcludeMarkdown(mdImports[transcludeMatch[1]]);
      if (md !== null) {
        outputLines.push(md);
        outputLines.push("");
      }
      continue;
    }

    // ------------------------------------------------------------------
    // <details> / <summary>
    // ------------------------------------------------------------------
    if (state === State.NORMAL && isOpenTag(line, "details")) {
      state = State.DETAILS;
      detailsLines = [];
      detailsSummary = null;
      continue;
    }
    if (state === State.DETAILS) {
      if (isCloseTag(line, "details")) {
        if (detailsSummary) {
          outputLines.push(`#### ${detailsSummary}`);
          outputLines.push("");
        }
        const inner = transformMdx(detailsLines.join("\n"), {
          sourceFile,
          projectRoot,
          mdxDir: options.mdxDir,
          _depth: depth + 1,
        });
        warnings.push(...inner.warnings);
        outputLines.push(...inner.markdown.split("\n"));
        outputLines.push("");
        state = State.NORMAL;
        detailsLines = [];
        detailsSummary = null;
        continue;
      }
      if (isOpenTag(line, "summary")) {
        const sumMatch = line.match(/<summary>(.*?)<\/summary>/);
        if (sumMatch) detailsSummary = sumMatch[1].trim();
        continue;
      }
      if (isCloseTag(line, "summary")) continue;
      detailsLines.push(line);
      continue;
    }

    // ------------------------------------------------------------------
    // Strip-block components: DocCardList, IntegrationsGrid, etc.
    // ------------------------------------------------------------------
    let matchedStripComponent = null;
    for (const comp of STRIP_BLOCK_COMPONENTS) {
      if (isOpenTag(line, comp)) {
        matchedStripComponent = comp;
        break;
      }
    }
    if (state === State.NORMAL && matchedStripComponent) {
      if (!trimmed.endsWith("/>")) {
        state = State.STRIP_BLOCK;
        stripTag = matchedStripComponent;
        stripDepth = 1;
      }
      continue;
    }
    if (state === State.STRIP_BLOCK) {
      if (isOpenTag(line, stripTag)) stripDepth++;
      if (isCloseTag(line, stripTag)) {
        stripDepth--;
        if (stripDepth === 0) {
          state = State.NORMAL;
          stripTag = null;
        }
      }
      continue;
    }

    // ------------------------------------------------------------------
    // Strip-tag components: <DL>, <DT>, <DD>, <DefinitionList>
    // Strip the JSX tags but keep their text content.
    // ------------------------------------------------------------------
    let isStripTagLine = false;
    for (const comp of STRIP_TAG_COMPONENTS) {
      if (trimmed.startsWith(`<${comp}`) || trimmed.startsWith(`</${comp}`)) {
        isStripTagLine = true;
        break;
      }
    }
    if (isStripTagLine) continue;

    // ------------------------------------------------------------------
    // Generic unknown JSX open/close/self-close — strip the tag line,
    // keep content between. Warn so we can add to the registry.
    // ------------------------------------------------------------------
    const genericJsxOpen = trimmed.match(/^<([A-Z][A-Za-z0-9]*)[^>]*>?\s*$/);
    const genericJsxSelfClose = trimmed.match(/^<([A-Z][A-Za-z0-9]*)[^>]*\/>\s*$/);
    const genericJsxClose = trimmed.match(/^<\/([A-Z][A-Za-z0-9]*)>\s*$/);
    const KNOWN_INLINE = ["Tabs", "TabItem", "ZoomPanPinch", "RelatedReadList"];

    if (genericJsxSelfClose) {
      const compName = genericJsxSelfClose[1];
      if (!COMPONENT_REGISTRY[compName] && !mdImports[compName]) {
        warnings.push(`[${sourceFile}] Unknown self-closing component: <${compName} />`);
      }
      continue;
    }
    if (genericJsxOpen && !KNOWN_INLINE.includes(genericJsxOpen[1])) {
      const compName = genericJsxOpen[1];
      if (!COMPONENT_REGISTRY[compName] && !mdImports[compName]) {
        warnings.push(`[${sourceFile}] Unknown open component: <${compName}>`);
      }
      continue;
    }
    if (genericJsxClose && !KNOWN_INLINE.includes(genericJsxClose[1])) {
      const compName = genericJsxClose[1];
      if (!COMPONENT_REGISTRY[compName] && !mdImports[compName]) {
        warnings.push(`[${sourceFile}] Unknown close component: </${compName}>`);
      }
      continue;
    }

    // ------------------------------------------------------------------
    // Section anchor syntax: ## Heading {#anchor-id} → ## Heading
    // ------------------------------------------------------------------
    const anchorHeading = line.match(/^(#{1,6}\s+.*?)\s*\{#[^}]+\}\s*$/);
    if (anchorHeading) {
      emitContent(anchorHeading[1]);
      continue;
    }

    // ------------------------------------------------------------------
    // Pass through everything else (with inline transforms).
    // ------------------------------------------------------------------
    emitContent(line);
  }

  // Clean up: collapse 3+ consecutive blank lines to 2.
  const result = outputLines.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd();

  return { markdown: result, warnings };
}
