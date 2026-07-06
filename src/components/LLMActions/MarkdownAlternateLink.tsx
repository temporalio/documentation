import React from 'react';
import Head from '@docusaurus/Head';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { getMarkdownPath } from './markdownPath';

/**
 * Emits a per-page <link rel="alternate" type="text/markdown"> into the page
 * <head>, pointing at the generated clean Markdown (<permalink>.md). This lets
 * crawlers and LLMs discover the Markdown rendition without constructing the URL.
 *
 * Rendered server-side into the static HTML by the swizzled DocItem/Content.
 * Skipped on pages with no Markdown counterpart (llm_exclude), matching the
 * markdown-pages plugin and LLMActions. See MARKDOWN_PIPELINE.md.
 */
export default function MarkdownAlternateLink(): JSX.Element | null {
  const { metadata, frontMatter } = useDoc();

  if (!metadata.permalink || frontMatter.llm_exclude) {
    return null;
  }

  const href = getMarkdownPath(metadata.permalink);

  return (
    <Head>
      <link
        rel="alternate"
        type="text/markdown"
        href={href}
        title={metadata.title}
      />
    </Head>
  );
}
