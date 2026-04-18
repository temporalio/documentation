'use strict';

const { existsSync, mkdirSync, writeFileSync } = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(__dirname, '..');
const outputDirFromEnv = process.env.AI_COOKBOOK_OUTPUT_DIR ?? 'ai-cookbook';
const OUTPUT_DIR = path.resolve(WORKSPACE_ROOT, outputDirFromEnv);

if (OUTPUT_DIR !== WORKSPACE_ROOT && !OUTPUT_DIR.startsWith(`${WORKSPACE_ROOT}${path.sep}`)) {
  throw new Error('[ensure-ai-cookbook] AI_COOKBOOK_OUTPUT_DIR must resolve within the repository root');
}

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
  console.log('[ensure-ai-cookbook] Created placeholder directory');
}

