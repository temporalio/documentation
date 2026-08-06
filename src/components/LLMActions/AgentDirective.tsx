import React from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { getMarkdownPath } from './markdownPath';
import styles from './AgentDirective.module.css';

/**
 * Emits a visually hidden directive near the top of each page body, pointing
 * agents at /llms.txt and the raw Markdown rendition of the current page.
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
      )}
    </div>
  );
}
