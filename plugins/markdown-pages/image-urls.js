const path = require('path');

const IMAGE_RE = /!\[([^\]]*)\]\(([^)\s]+)((?:\s+"[^"]*")?)\)/g;
const EXTERNAL_RE = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

/**
 * Make every Markdown image URL absolute so the .md file works when read on
 * its own (an LLM gets the text, not the page it was served from).
 *
 *  - Root-relative (/img/x.png)  -> <siteUrl>/img/x.png
 *  - Page-relative (assets/x.png) -> <siteUrl>/<page dir>/assets/x.png, and the
 *    file is reported through `copyAsset` so the plugin can place it in the
 *    build output. Docusaurus hashes these assets in the HTML build, so no
 *    stable URL exists unless we publish a copy.
 *  - Absolute URLs and data: URIs are left alone. Fenced code is skipped.
 */
function absolutizeImageUrls(markdown, { siteUrl, urlPath, sourceDir, fileExists, copyAsset }) {
  const pageDir = path.posix.dirname(urlPath);
  let inFence = false;

  return markdown
    .split('\n')
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;

      return line.replace(IMAGE_RE, (match, alt, src, title) => {
        if (EXTERNAL_RE.test(src)) return match;
        if (src.startsWith('/')) return `![${alt}](${siteUrl}${src}${title})`;

        const [pathPart, suffix = ''] = src.split(/([?#].*)$/);
        const abs = path.resolve(sourceDir, decodeURI(pathPart));
        if (!fileExists(abs)) return match;

        const publishedPath = path.posix.normalize(path.posix.join(pageDir, pathPart));
        copyAsset(abs, publishedPath);
        return `![${alt}](${siteUrl}/${publishedPath}${suffix}${title})`;
      });
    })
    .join('\n');
}

module.exports = { absolutizeImageUrls };
