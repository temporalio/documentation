import React from 'react';
import Head from '@docusaurus/Head';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

/**
 * Emits DocSearch meta tags so the Algolia crawler can index taxonomy
 * facets from rendered HTML. Values come from effective front matter
 * (including `_frontmatter.yml` folder defaults).
 *
 * Meta names follow DocSearch's `docsearch:$NAME` convention:
 * https://docsearch.algolia.com/docs/required-configuration
 *
 * Multi-valued facets use comma-separated tokens (same pattern as
 * `docsearch:version`).
 */
function formatFacetContent(value: unknown): string | null {
  if (value == null || value === '') {
    return null;
  }
  if (Array.isArray(value)) {
    const parts = value.map((item) => String(item).trim()).filter(Boolean);
    return parts.length > 0 ? parts.join(',') : null;
  }
  const trimmed = String(value).trim();
  return trimmed || null;
}

export default function DocItemTaxonomyMeta(): JSX.Element | null {
  const { frontMatter } = useDoc();
  const sdks = formatFacetContent((frontMatter as { sdks?: unknown }).sdks);
  const contentType = formatFacetContent((frontMatter as { content_type?: unknown }).content_type);

  if (!sdks && !contentType) {
    return null;
  }

  return (
    <Head>
      {sdks ? <meta name="docsearch:sdks" content={sdks} /> : null}
      {contentType ? <meta name="docsearch:content_type" content={contentType} /> : null}
    </Head>
  );
}
