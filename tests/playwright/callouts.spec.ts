import fs from 'fs';
import path from 'path';
import { expect, test } from './fixtures';
import { WaitForDocusaurusHydration } from './utils';

// Screenshots the callout fixture page (docs/internal/callouts.mdx) in both color modes at desktop and phone widths, so
// a change to admonition or ReleaseNoteHeader styles shows up in the visual comparison as one focused diff instead of
// scattered across hundreds of pages.
//
// The counts below match the fixture. When you add or remove a callout there, update them here.
//
// Snapshots have no baseline until the Screenshot Capture workflow runs on main after this spec merges. Until then the
// Visual Comparison workflow reports these tests as missing snapshots.

const FIXTURE_PATH = '/internal/callouts';
const ADMONITION_COUNT = 16;
const RELEASE_NOTE_HEADER_COUNT = 6;

const stylesheetPath = path.resolve('visuals/screenshot.css');
const stylesheet = fs.existsSync(stylesheetPath) ? fs.readFileSync(stylesheetPath).toString() : '';

const themes = ['light', 'dark'] as const;
const viewports = {
  desktop: { width: 1280, height: 900 },
  phone: { width: 390, height: 844 },
};

for (const theme of themes) {
  for (const [viewportName, viewport] of Object.entries(viewports)) {
    test(`callouts render in ${theme} mode at ${viewportName} width`, async ({ page }) => {
      await page.setViewportSize(viewport);
      // The site sets colorMode.respectPrefersColorScheme, so the emulated color scheme picks the mode. A fresh
      // browser context has no stored choice to override it.
      await page.emulateMedia({ colorScheme: theme });

      await page.goto(FIXTURE_PATH, { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(WaitForDocusaurusHydration);
      if (stylesheet) {
        await page.addStyleTag({ content: stylesheet });
      }
      await page.evaluate(() => document.fonts.ready);
      // Same settle time as screenshot.doc.spec.ts: WaitForDocusaurusHydration can pass on server-rendered markup.
      await page.waitForTimeout(1_000);

      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);

      const article = page.locator('article');
      await expect(article.locator('.theme-admonition')).toHaveCount(ADMONITION_COUNT);
      await expect(article.locator('[data-release-type]')).toHaveCount(RELEASE_NOTE_HEADER_COUNT);

      await expect(article).toHaveScreenshot(`callouts-${theme}-${viewportName}.png`, { timeout: 10_000 });
    });
  }
}
