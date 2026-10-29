'use strict';

const fs = require('fs');
const path = require('path');

// ai-cookbook/ (gitignored — see .gitignore) is entirely populated at build
// time: bin/sync-ai-cookbook.js clones temporalio/ai-cookbook and writes one
// .mdx per recipe README, wiping and re-writing every top-level .mdx on each
// run. The landing page (routed at /ai/cookbook via ai-cookbook/index.mdx —
// see plugins/shared/docsRouting.js's docsDir-root-index handling) isn't
// recipe content and doesn't come from that repo, so it can't be committed
// directly into ai-cookbook/ itself — it would just get deleted by the next
// sync. Instead its source lives here, tracked in git, and gets written into
// the gitignored output directory by both sync-ai-cookbook.js (every real
// build) and ensure-ai-cookbook.js (the yarn start fallback for a fresh
// checkout that hasn't synced yet).
const TEMPLATE_PATH = path.join(__dirname, 'ai-cookbook-index-template.mdx');

function writeAiCookbookIndex(outputDir) {
  fs.mkdirSync(outputDir, { recursive: true });
  fs.copyFileSync(TEMPLATE_PATH, path.join(outputDir, 'index.mdx'));
}

module.exports = { writeAiCookbookIndex };
