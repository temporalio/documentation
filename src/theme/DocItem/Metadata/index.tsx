import React from 'react';
import Head from '@docusaurus/Head';
import { PageMetadata } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { titleWithSection } from '@site/src/utils/sectionTitle';

// Swizzled from @docusaurus/theme-classic to add the page's `section_title`
// frontmatter (usually inherited from a folder's `_frontmatter.yml`) to the
// <title> and og:title: "Workflow basics - Java SDK | Temporal Documentation".
// The on-page heading still uses the plain page title. It also emits the raw
// value as <meta name="docsearch:section_title"> for the Algolia crawler (see
// "Search results" in readme/CONTRIBUTING.md).
export default function DocItemMetadata(): JSX.Element {
  const { metadata, frontMatter, assets } = useDoc();
  const sectionTitle = (frontMatter as { section_title?: unknown }).section_title;
  const searchSectionTitle = typeof sectionTitle === 'string' ? sectionTitle.trim() : '';
  return (
    <>
      <PageMetadata
        title={titleWithSection(metadata.title, sectionTitle)}
        description={metadata.description}
        keywords={frontMatter.keywords}
        image={assets.image ?? frontMatter.image}
      />
      {searchSectionTitle && (
        <Head>
          <meta name="docsearch:section_title" content={searchSectionTitle} />
        </Head>
      )}
    </>
  );
}
