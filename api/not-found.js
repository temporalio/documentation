const { injectIntoHtml, pageHost, searchSuggestions, toHtmlBlock } = require('./_not-found-lib');

// The 404 page for a missing docs URL, with suggested pages from Algolia added
// for readers and agents that don't run the page's JavaScript. vercel.json
// rewrites unmatched extensionless paths here. See readme/NOT-FOUND-SUGGESTIONS.md.

const PRODUCTION_HOST = 'docs.temporal.io';

const FALLBACK_PAGE =
  '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex">' +
  '<title>Page not found | Temporal Documentation</title></head><body><main style="max-width:40rem;margin:2rem auto;padding:0 1rem">' +
  '<h1>Page not found</h1><p>This URL does not match a page in the Temporal documentation. ' +
  '<a href="https://docs.temporal.io/">Go to the documentation home</a>.</p></main></body></html>';

async function staticPage(request) {
  try {
    const host = pageHost(request.headers, process.env.VERCEL_ENV);
    const scheme = /^localhost(:\d+)?$/.test(host) ? 'http' : 'https';
    const response = await fetch(`${scheme}://${host}/404.html`, { signal: AbortSignal.timeout(3000) });
    if (response.ok) return await response.text();
  } catch {
    // Fall through to the minimal page.
  }
  return FALLBACK_PAGE;
}

module.exports = async (request, response) => {
  // A rewrite keeps the requested URL in request.url.
  const { pathname } = new URL(request.url, `https://${PRODUCTION_HOST}`);
  const [html, suggestions] = await Promise.all([staticPage(request), searchSuggestions(pathname)]);

  response
    .status(404)
    .setHeader('Content-Type', 'text/html; charset=utf-8')
    .setHeader('X-Robots-Tag', 'noindex, nofollow')
    // The CDN caches by path, so repeated misses don't each call Algolia.
    .setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=600')
    .send(injectIntoHtml(html, toHtmlBlock(suggestions)));
};
