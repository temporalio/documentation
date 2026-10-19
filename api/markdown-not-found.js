const { compileRedirects, markdownRedirect } = require('../bin/redirect-utils');
const { redirects } = require('../vercel.json');

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
`;

module.exports = (request, response) => {
  // A rewrite keeps the requested URL in request.url.
  const { pathname } = new URL(request.url, 'https://docs.temporal.io');
  const moved = markdownRedirect(pathname, compiledRedirects);
  if (moved) {
    response.redirect(moved.status, moved.location);
    return;
  }

  response
    .status(404)
    .setHeader('Content-Type', 'text/markdown; charset=utf-8')
    .setHeader('Vary', 'Accept, Accept-Encoding')
    .send(body);
};
