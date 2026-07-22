// Set up a browser-like DOM before loading mermaid. mermaid.parse() uses DOM
// APIs for some diagram syntaxes (for example a sequence diagram `box`) and
// otherwise fails headless with "window is not defined".
import 'global-jsdom/register';

import fs from 'node:fs/promises';
import path from 'node:path';
import mermaid from 'mermaid';
const DOCS_ROOT = path.resolve('docs');
const MARKDOWN_EXTENSIONS = new Set(['.md', '.mdx']);

function isMarkdownFile(filePath) {
  return MARKDOWN_EXTENSIONS.has(path.extname(filePath));
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await walk(fullPath)));
    } else if (entry.isFile() && isMarkdownFile(fullPath)) {
      results.push(fullPath);
    }
  }
  return results;
}

function extractMermaidBlocks(content) {
  const lines = content.split(/\r?\n/);
  const blocks = [];
  let inBlock = false;
  let blockStartLine = 0;
  let blockLines = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!inBlock) {
      if (/^\s*```mermaid\s*$/.test(line)) {
        inBlock = true;
        blockStartLine = i + 2; // first content line, 1-indexed
        blockLines = [];
      }
      continue;
    }

    if (/^\s*```\s*$/.test(line)) {
      blocks.push({
        startLine: blockStartLine,
        content: blockLines.join('\n'),
      });
      inBlock = false;
      blockLines = [];
      continue;
    }

    blockLines.push(line);
  }

  if (inBlock) {
    blocks.push({
      startLine: blockStartLine,
      content: blockLines.join('\n'),
      unterminated: true,
    });
  }

  return blocks;
}

function extractRelativeLineFromError(errorMessage) {
  const match = errorMessage.match(/line\s+(\d+)/i);
  return match ? Number(match[1]) : null;
}

async function lintFile(filePath) {
  const content = await fs.readFile(filePath, 'utf8');
  const blocks = extractMermaidBlocks(content);
  const errors = [];

  for (const block of blocks) {
    if (block.unterminated) {
      errors.push({
        filePath,
        line: block.startLine,
        message: 'Unterminated mermaid code fence.',
      });
      continue;
    }

    if (!block.content.trim()) {
      continue;
    }

    try {
      await mermaid.parse(block.content);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const relativeLine = extractRelativeLineFromError(message);
      const absoluteLine = relativeLine ? block.startLine + relativeLine - 1 : block.startLine;
      errors.push({
        filePath,
        line: absoluteLine,
        message,
      });
    }
  }

  return errors;
}

async function main() {
  mermaid.initialize({ startOnLoad: false });

  const markdownFiles = await walk(DOCS_ROOT);
  const allErrors = [];

  for (const filePath of markdownFiles) {
    const fileErrors = await lintFile(filePath);
    allErrors.push(...fileErrors);
  }

  if (allErrors.length > 0) {
    console.error(`Mermaid lint failed with ${allErrors.length} error(s):`);
    for (const err of allErrors) {
      const relPath = path.relative(process.cwd(), err.filePath);
      console.error(`- ${relPath}:${err.line} ${err.message}`);
    }
    process.exit(1);
  }

  console.log(`Mermaid lint passed. Checked ${markdownFiles.length} markdown files.`);
}

await main();
