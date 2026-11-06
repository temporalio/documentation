const { injectIntoHtml, searchSuggestions, toHtmlBlock } = require('./_not-found-lib');

// The 404 page for a missing docs URL, with suggested pages from Algolia added
// for readers and agents that don't run the page's JavaScript. vercel.json
// rewrites unmatched extensionless paths here. See readme/NOT-FOUND-SUGGESTIONS.md.

const PRODUCTION_HOST = 'docs.temporal.io';

// The static 404 page is fetched from the host the request came in on, so a
// preview deployment serves its own build. Any other host is ignored, so a
// forged Host header can't point this function at another server.
function ownHost(request) {
  const host = String(request.headers['x-forwarded-host'] || request.headers.host || '').split(',')[0].trim();
  return /^([a-z0-9-]+\.vercel\.app|localhost(:\d+)?)$/i.test(host) ? host : PRODUCTION_HOST;
}

const FALLBACK_PAGE =
  '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex">' +
  '<title>Page not found | Temporal Documentation</title></head><body><main style="max-width:40rem;margin:2rem auto;padding:0 1rem">' +
  '<h1>Page not found</h1><p>This URL does not match a page in the Temporal documentation. ' +
  '<a href="https://docs.temporal.io/">Go to the documentation home</a>.</p></main></body></html>';

async function staticPage(request) {
  try {
    const host = ownHost(request);
    const scheme = host.startsWith('localhost') ? 'http' : 'https';
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
