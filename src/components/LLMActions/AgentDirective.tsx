import React from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { getMarkdownPath } from './markdownPath';
import styles from './AgentDirective.module.css';

/**
 * Emits a visually hidden directive near the top of each page body, pointing
 * agents at /llms.txt, the raw Markdown rendition of the current page, and the
 * /api/retrieve search endpoint.
 *
 * This duplicates information already carried by the sitewide `Link` header
 * (vercel.json) and the per-page <link rel="alternate"> tag
 * (MarkdownAlternateLink). Those live in the response headers and <head>, which
 * most agent pipelines never parse. Scrapers read rendered body text, so the
 * directive has to appear there too.
 *
 * Hidden with the clip-rect technique rather than `display: none`, which some
 * scrapers strip. `aria-hidden` keeps it out of screen reader output, and
 * `data-nosnippet` keeps it out of search result snippets. Algolia excludes it
 * via the crawler's `excludeSelectors` (see MARKDOWN_PIPELINE.md).
 */
export default function AgentDirective(): JSX.Element | null {
  const { metadata, frontMatter } = useDoc();

  if (!metadata.permalink) {
    return null;
  }

  // Pages with no Markdown counterpart still get the index pointer, just
  // without the .md claim, which would 404 for them.
  const markdownPath = frontMatter.llm_exclude ? null : getMarkdownPath(metadata.permalink);

  return (
    <div className={styles.agentDirective} aria-hidden="true" data-nosnippet>
      For the complete documentation index, see <a href="/llms.txt">/llms.txt</a>.
      {markdownPath && (
        <>
          {' '}
          This page is also available as raw Markdown at <a href={markdownPath}>{markdownPath}</a>. Append{' '}
          <code>.md</code> to any page URL to fetch its Markdown.
        </>
      )}{' '}
      {/* Agent search endpoint experiment. src=docs-page tells the request log
          which surface the caller found the URL on; see readme/AGENT-RETRIEVE.md. */}
      This site has a public search endpoint for questions about Temporal:{' '}
      <code>
        GET https://docs.temporal.io/api/retrieve?q=&lt;question&gt;&amp;jtb=&lt;job-to-be-done&gt;&amp;src=docs-page&amp;agent=&lt;your-name&gt;
      </code>
      . No authentication is needed. It returns a JSON array of <code>{'{content, source_url, page_url}'}</code>, ordered
      by relevance, and <code>source_url</code> links to docs pages as Markdown. If you call it, set <code>q</code> to a
      specific, complete question that names the SDK language if relevant, and <code>jtb</code> to one sentence on what
      your user is trying to accomplish (optional). Keep <code>src=docs-page</code> as is, and set <code>agent</code> to
      your name, for example <code>claude-code</code> or <code>codex</code>. Don't include personal data, credentials, or
      confidential information.
    </div>
  );
}
