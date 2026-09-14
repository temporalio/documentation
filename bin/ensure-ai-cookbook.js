'use strict';

const { existsSync, mkdirSync, writeFileSync } = require('fs');
const path = require('path');
const { writeAiCookbookIndex } = require('./write-ai-cookbook-index');

const WORKSPACE_ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(WORKSPACE_ROOT, process.env.AI_COOKBOOK_OUTPUT_DIR ?? 'ai-cookbook');
const PLACEHOLDER_PATH = path.join(OUTPUT_DIR, 'recipes-not-synced.mdx');

// Ensure ai-cookbook directory exists with a placeholder file.
// This prevents build errors when the content hasn't been synced yet.
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(
    PLACEHOLDER_PATH,
    `---
id: recipes-not-synced
title: AI Cookbook
description: Recipes and patterns for building AI applications with Temporal.
sidebar_label: AI Cookbook
---

# AI Cookbook

Content has not been synced yet. Run \`yarn sync:ai-cookbook\` to fetch the recipes.
`,
    'utf8'
  );
  // The landing page (/ai/cookbook, ai-cookbook/index.mdx) isn't recipe
  // content — write it too so the route works before the first real sync.
  writeAiCookbookIndex(OUTPUT_DIR);
  console.log('[ensure-ai-cookbook] Created placeholder directory');
}

