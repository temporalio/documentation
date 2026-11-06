const { compileRedirects, markdownRedirect } = require('../bin/redirect-utils');
const { redirects } = require('../vercel.json');
const { searchSuggestions, toMarkdownList } = require('./_not-found-lib');

// vercel.json redirects match page paths, so a moved page's `.md` URL would
// 404 here. Follow the same rules and send it to the new page's `.md`.
// Compiled once per function instance.
const compiledRedirects = compileRedirects(redirects);

const body = `# Page not found

This URL does not match a page in the Temporal documentation.

## Where to look next

- [Documentation index](https://docs.temporal.io/llms.txt)
- [Documentation sitemap](https://docs.temporal.io/sitemap.xml)
- [Temporal documentation home](https://docs.temporal.io/)

## Report a broken link

If a link on a docs page led you here, you can report it. If you built or guessed this URL yourself, don't. No
authentication is required. Set \`page_url\` to the page that had the link, not to this URL, and don't include personal
data or credentials:

\`\`\`
GET https://docs.temporal.io/api/feedback?title=Broken+link&message=<where-the-link-was-and-where-it-pointed>&category=documentation&page_url=<page-with-the-link>&src=md-404&agent=<your-name>
\`\`\`
`;
// The intro is static on purpose: echoing the requested path would let anyone
// put text of their choosing on a docs.temporal.io page an agent reads. The
// suggested pages come from the search index, not from the request.
// src=md-404 tells the feedback store which surface the caller found the URL
// on; see readme/FEEDBACK.md.

module.exports = async (request, response) => {
  // A rewrite keeps the requested URL in request.url.
  const { pathname } = new URL(request.url, 'https://docs.temporal.io');
  const moved = markdownRedirect(pathname, compiledRedirects);
  if (moved) {
    response.redirect(moved.status, moved.location);
    return;
  }

  const suggestions = await searchSuggestions(pathname);
  const suggested = suggestions.length
    ? `\n## Pages that match this URL\n\n${toMarkdownList(suggestions)}\n`
    : '';

  response
    .status(404)
    .setHeader('Content-Type', 'text/markdown; charset=utf-8')
    .setHeader('Vary', 'Accept, Accept-Encoding')
    .setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=600')
    .send(body.replace('\n## Where to look next', `${suggested}\n## Where to look next`));
};
