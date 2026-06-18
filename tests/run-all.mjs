#!/usr/bin/env node
/**
 * tests/run-all.mjs
 *
 * Runs all test files and reports a combined summary.
 * Use this in CI: node tests/run-all.mjs
 */

import { spawnSync } from "child_process";
import { readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const testFiles = readdirSync(__dirname)
  .filter((f) => f.startsWith("test-") && f.endsWith(".mjs"))
  .map((f) => join(__dirname, f));

console.log(`\n🧪 Running ${testFiles.length} test suites\n${"═".repeat(60)}`);

let allPassed = true;

for (const file of testFiles) {
  const name = file.split("/").pop();
  console.log(`\n▶ ${name}`);

  const result = spawnSync(process.execPath, [file], { stdio: "inherit" });
  if (result.status !== 0) {
    allPassed = false;
  }
}

console.log(`\n${"═".repeat(60)}`);
if (allPassed) {
  console.log("✅ All test suites passed\n");
  process.exit(0);
} else {
  console.log("❌ One or more test suites failed\n");
  process.exit(1);
}
