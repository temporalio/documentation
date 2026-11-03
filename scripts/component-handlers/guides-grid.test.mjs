import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { guidesGridToMarkdown } from "./guides-grid.mjs";

function projectWith(data) {
  const root = mkdtempSync(join(tmpdir(), "guides-grid-"));
  mkdirSync(join(root, "src/components/GuidesGrid"), { recursive: true });
  writeFileSync(join(root, "src/components/GuidesGrid/guides-data.json"), data);
  return root;
}

test("lists each guide with description, SDK, and tags", () => {
  const root = projectWith(
    JSON.stringify([
      { name: "A", description: "Does A.", tags: ["X", "Y"], sdk: "Python", href: "/guides/a" },
      { name: "B", description: "Does B.", tags: [], href: "/guides/b" },
    ])
  );
  assert.equal(
    guidesGridToMarkdown({ projectRoot: root }),
    "- [A](/guides/a): Does A. (Python, X, Y)\n- [B](/guides/b): Does B."
  );
});

test("warns and returns empty output when data is missing or invalid", () => {
  const warnings = [];
  assert.equal(guidesGridToMarkdown({ projectRoot: projectWith("{oops"), warnings }), "");
  assert.equal(guidesGridToMarkdown({ projectRoot: "/nonexistent", warnings }), "");
  assert.equal(warnings.length, 2);
});
