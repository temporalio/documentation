import fs from 'fs';
import path from 'path';
import { expect, test } from '@playwright/test';
import { extractSitemapPathnames, WaitForDocusaurusHydration } from './utils';

const siteUrl = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';
const sitemapPath = path.resolve('build/sitemap.xml');
const stylesheetPath = path.resolve('visuals/screenshot.css');
const stylesheet = fs.existsSync(stylesheetPath) ? fs.readFileSync(stylesheetPath).toString() : '';
const excludeList: string[] = require('./exclude.json');

test.describe.configure({ mode: 'parallel' });

function isVersionedDocsPathname(pathname: string, list: string[]): boolean {
  if (list.includes(pathname)) {
    console.log(`Excluding ${pathname}`);
    return false;
  }

  if (pathname.startsWith('/api/')) {
    return false;
  }

  if (/\/\d+\.\d+\.x\//.test(pathname)) {
    return false;
  }

  return true;
}

function sanitizePathname(pathname: string): string {
  const cleaned = pathname.replace(/^\/+/, '').replace(/[^a-zA-Z0-9]+/g, '_');
  return cleaned === '' ? 'home' : cleaned;
}

test.beforeAll(async () => {
  console.log('Excluded pages: ', excludeList);
  console.log('Total pages: ', extractSitemapPathnames(sitemapPath).length);
});

function screenshotPathname(pathname: string) {
  test(`pathname ${pathname}`, async ({ page }, testInfo) => {
    const url = siteUrl + pathname;
    console.log(`Taking screenshot of ${url}`);

    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(WaitForDocusaurusHydration);
    await page.waitForLoadState('networkidle');

    if (stylesheet) {
      await page.addStyleTag({ content: stylesheet });
    }

    await page.waitForTimeout(1_000);

    const snapshotName = `${sanitizePathname(pathname)}.png`;
    await expect(page).toHaveScreenshot({
      fullPage: true,
      path: testInfo.snapshotPath(snapshotName),
      timeout: 10_000,
    });
  });
}

test.describe('Docs screenshots', () => {
  const pathnames = extractSitemapPathnames(sitemapPath).filter((pathname) =>
    isVersionedDocsPathname(pathname, excludeList)
  );

  pathnames.forEach(screenshotPathname);
});