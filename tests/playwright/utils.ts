import fs from 'fs';
import path from 'path';

const LOC_TAG_REGEX = /<loc>([^<]+)<\/loc>/gi;

export function extractSitemapPathnames(sitemapPath: string): string[] {
  const resolvedPath = path.resolve(sitemapPath);
  if (!fs.existsSync(resolvedPath)) {
    console.warn(`Sitemap not found at ${resolvedPath}`);
    return [];
  }

  const xml = fs.readFileSync(resolvedPath, 'utf8');
  const seen = new Set<string>();

  for (const match of xml.matchAll(LOC_TAG_REGEX)) {
    const loc = match[1];
    try {
      const url = new URL(loc);
      const pathname = url.pathname || '/';
      seen.add(pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname);
    } catch (error) {
      console.warn(`Skipping invalid sitemap location: ${loc}`);
    }
  }

  return Array.from(seen).sort();
}

export function WaitForDocusaurusHydration() {
  const root = document.querySelector('#__docusaurus');
  if (!root) {
    return false;
  }

  const html = document.documentElement;
  if (!html) {
    return false;
  }

  const hasDocusaurusObject = typeof (window as any).__docusaurus !== 'undefined';
  const hasClientContent = root.querySelector('[data-theme]') !== null;
  const hasNavbar = document.querySelector('.navbar') !== null;

  return hasDocusaurusObject || hasClientContent || hasNavbar;
}