import { test } from "node:test";
import assert from "node:assert/strict";
import { forOsLabel, forOsInlineToMarkdown, forOsBlockLineToMarkdown } from "./for-os.mjs";
import { transformMdx } from "../mdx-to-md.mjs";

test("labels one, two, or more OS values", () => {
  assert.equal(forOsLabel('os="windows"'), "Windows");
  assert.equal(forOsLabel("os='macos linux'"), "macOS and Linux");
  assert.equal(forOsLabel('os="macos linux windows"'), "macOS, Linux, and Windows");
});

test("groups adjacent inline elements into one parenthetical", () => {
  assert.equal(
    forOsInlineToMarkdown(
      'Open <ForOs os="windows">PowerShell</ForOs> <ForOs os="macos linux">a terminal</ForOs> and run it.'
    ),
    "Open (**Windows:** PowerShell; **macOS and Linux:** a terminal) and run it."
  );
});

test("a line of only ForOs elements becomes labeled paragraphs", () => {
  assert.equal(
    forOsInlineToMarkdown('<ForOs os="windows">Use `dir`.</ForOs><ForOs os="linux">Use `ls`.</ForOs>'),
    "**Windows:** Use `dir`.\n\n**Linux:** Use `ls`."
  );
});

test("block open and close tags", () => {
  assert.equal(forOsBlockLineToMarkdown('  <ForOs os="macos">'), "  **macOS:**");
  assert.equal(forOsBlockLineToMarkdown("</ForOs>"), "");
  assert.equal(forOsBlockLineToMarkdown('<ForOs os="macos">x</ForOs>'), null);
  assert.equal(forOsBlockLineToMarkdown("Some prose."), null);
});

test("transformMdx keeps every variant, in code-free blocks and admonitions", () => {
  const mdx = [
    '<ForOs os="windows">',
    "",
    "Run the installer.",
    "",
    "```powershell",
    "<ForOs os=\"linux\">not a tag in code</ForOs>",
    "```",
    "",
    "</ForOs>",
    '<ForOs os="macos linux">',
    "",
    "Use Homebrew.",
    "",
    "</ForOs>",
    "",
    ":::note",
    '<ForOs os="windows">',
    "Restart the shell.",
    "</ForOs>",
    ":::",
  ].join("\n");
  const { markdown, warnings } = transformMdx(mdx);
  assert.deepEqual(warnings, []);
  assert.equal(
    markdown,
    [
      "**Windows:**",
      "",
      "Run the installer.",
      "",
      "```powershell",
      '<ForOs os="linux">not a tag in code</ForOs>',
      "```",
      "",
      "**macOS and Linux:**",
      "",
      "Use Homebrew.",
      "",
      "> **📝 Note:**",
      "> **Windows:**",
      "> Restart the shell.",
      ">",
    ].join("\n")
  );
});
