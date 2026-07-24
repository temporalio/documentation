#!/usr/bin/env node

// Aeonik Light/Regular are preloaded (docusaurus.config.js headTags,
// vercel.json's Link header) by their literal webpack output filename,
// because that's the only way to preload a font before the browser has HTML
// to read a <link> tag or CSS to parse an @font-face from. That filename is
// content-hashed by webpack and hardcoded in src/constants/preloadFonts.js —
// it only changes if src/fonts/Aeonik/Aeonik-{Light,Regular}.woff2's bytes
// change, which is rare, but silent drift here means the preload references
// a file the browser will never actually request: wasted bandwidth on a
// resource nothing uses, and a real one that gets no early-fetch benefit.
// This check fails the build if that ever happens, instead of relying on
// someone noticing a "preloaded but not used" warning in devtools.

const fs = require('fs');
const path = require('path');

const CSS_DIR = path.join(process.cwd(), 'build', 'assets', 'css');
const VERCEL_JSON_PATH = path.join(process.cwd(), 'vercel.json');
const PRELOAD_FONTS_PATH = path.join(process.cwd(), 'src', 'constants', 'preloadFonts.js');

const FONTS = [
  { key: 'AEONIK_LIGHT_FILENAME', prefix: 'Aeonik-Light' },
  { key: 'AEONIK_REGULAR_FILENAME', prefix: 'Aeonik-Regular' },
];

function findActualFilename(cssContent, prefix) {
  const match = cssContent.match(new RegExp(`${prefix}-[0-9a-f]+\\.woff2`));
  return match ? match[0] : null;
}

function main() {
  if (!fs.existsSync(CSS_DIR)) {
    console.error(`[check-font-preload-hash] ${CSS_DIR} not found. Run \`yarn build\` first.`);
    process.exit(1);
  }

  const cssContent = fs
    .readdirSync(CSS_DIR)
    .filter((f) => f.endsWith('.css'))
    .map((f) => fs.readFileSync(path.join(CSS_DIR, f), 'utf8'))
    .join('\n');

  // eslint-disable-next-line import/no-dynamic-require, global-require
  const preloadFonts = require(PRELOAD_FONTS_PATH);
  const vercelJson = fs.readFileSync(VERCEL_JSON_PATH, 'utf8');

  const failures = [];

  for (const { key, prefix } of FONTS) {
    const actual = findActualFilename(cssContent, prefix);
    const expected = preloadFonts[key];

    if (!actual) {
      failures.push(`Could not find a "${prefix}-<hash>.woff2" reference anywhere in ${CSS_DIR}/*.css. Did the Aeonik @font-face rules move or get removed from src/css/custom.css?`);
      continue;
    }

    if (actual !== expected) {
      failures.push(
        `${prefix}: build now produces "${actual}", but src/constants/preloadFonts.js:${key} says "${expected}".\n` +
          `    Fix: in src/constants/preloadFonts.js, set ${key} to '${actual}'.\n` +
          `    Then in vercel.json, replace "${expected}" with "${actual}" in the Link header value (source: "/(.*)").`,
      );
      continue;
    }

    if (!vercelJson.includes(actual)) {
      failures.push(
        `${prefix}: src/constants/preloadFonts.js:${key} ("${actual}") matches the build, but vercel.json's Link header doesn't reference it.\n` +
          `    Fix: in vercel.json, update the Link header value (source: "/(.*)") to include "</assets/fonts/${actual}>; rel=preload; as=font; type=\\"font/woff2\\"; crossorigin".`,
      );
    }
  }

  if (failures.length > 0) {
    console.error(`\n[check-font-preload-hash] ${failures.length} check(s) failed:\n`);
    failures.forEach((f) => console.error(`  - ${f}\n`));
    process.exit(1);
  }

  console.log('[check-font-preload-hash] OK: preloaded font hashes match the build output.');
}

main();
