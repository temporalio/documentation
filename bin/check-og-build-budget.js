#!/usr/bin/env node

// Phase 6: catches build-time/output-size regressions in the og-image
// plugin instead of relying on someone noticing a slow build or a bloated
// deploy. Thresholds below were set from real measurements on the full
// ~625-page docs set (see plugins/og-image/render.js's PNG compression
// step, added specifically because the first measurement here came back
// at 142MB/232KB-per-card): a cold build renders every card fresh in
// ~86s total (~109ms/card) and produces ~17.7MB of PNGs (~29KB/card).
// Thresholds give ~3x headroom over those numbers so normal content growth
// doesn't trip this, while a real regression (e.g. a design change that
// balloons per-card size, or an accidentally-quadratic render path) does.

const fs = require('fs');
const path = require('path');

const STATS_FILE = path.join(process.cwd(), 'build', '.og-image-stats.json');

const MAX_AVG_RENDER_MS = 300;
const MAX_TOTAL_OUTPUT_BYTES = 60 * 1024 * 1024;
const MAX_AVG_IMAGE_BYTES = 80 * 1024;

function main() {
  if (!fs.existsSync(STATS_FILE)) {
    console.error(`Stats file not found at ${STATS_FILE}. Run \`yarn build\` first.`);
    process.exit(1);
  }

  const stats = JSON.parse(fs.readFileSync(STATS_FILE, 'utf8'));
  const { generated, cached, renderMs, outputBytes } = stats;
  const totalImages = generated + cached;
  const avgRenderMs = generated > 0 ? renderMs / generated : 0;
  const avgImageBytes = totalImages > 0 ? outputBytes / totalImages : 0;

  console.log(`[check-og-build-budget] ${generated} rendered this build, ${cached} from cache`);
  console.log(
    `[check-og-build-budget] render time: ${(renderMs / 1000).toFixed(1)}s total, ${avgRenderMs.toFixed(1)}ms/card avg (budget: ${MAX_AVG_RENDER_MS}ms/card)`,
  );
  console.log(
    `[check-og-build-budget] output size: ${(outputBytes / 1024 / 1024).toFixed(1)}MB total, ${(avgImageBytes / 1024).toFixed(1)}KB/card avg (budget: ${(MAX_TOTAL_OUTPUT_BYTES / 1024 / 1024).toFixed(0)}MB total, ${(MAX_AVG_IMAGE_BYTES / 1024).toFixed(0)}KB/card)`,
  );

  const failures = [];
  if (generated > 0 && avgRenderMs > MAX_AVG_RENDER_MS) {
    failures.push(`average render time ${avgRenderMs.toFixed(1)}ms/card exceeds budget of ${MAX_AVG_RENDER_MS}ms/card`);
  }
  if (outputBytes > MAX_TOTAL_OUTPUT_BYTES) {
    failures.push(`total output size ${(outputBytes / 1024 / 1024).toFixed(1)}MB exceeds budget of ${(MAX_TOTAL_OUTPUT_BYTES / 1024 / 1024).toFixed(0)}MB`);
  }
  if (avgImageBytes > MAX_AVG_IMAGE_BYTES) {
    failures.push(`average image size ${(avgImageBytes / 1024).toFixed(1)}KB exceeds budget of ${(MAX_AVG_IMAGE_BYTES / 1024).toFixed(0)}KB`);
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} budget check(s) failed:\n`);
    failures.forEach((f) => console.error(`  - ${f}`));
    process.exit(1);
  }

  console.log('\nOK: og-image build time and output size are within budget.');
}

main();
