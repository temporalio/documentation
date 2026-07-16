import React from 'react';
import Head from '@docusaurus/Head';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  organizationReference,
  organizationSchema,
  softwareApplicationSchema,
} from '@site/src/constants/organizationSchema';

// The docs landing page is the one canonical page on this property that
// carries the full Organization + SoftwareApplication block (see the
// JSON-LD audit's "Implementation Guidance" on full block placement).
// Duplicating that full block on every page is what caused the drift the
// audit flagged, so every other page gets a lightweight WebPage node with a
// bare `publisher` reference instead.
const CANONICAL_LANDING_PERMALINK = '/';

export default function DocItemStructuredData(): JSX.Element {
  const { metadata } = useDoc();
  const { siteConfig } = useDocusaurusContext();

  if (metadata.permalink === CANONICAL_LANDING_PERMALINK) {
    return (
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [organizationSchema, softwareApplicationSchema],
          })}
        </script>
      </Head>
    );
  }

  const pageUrl = `${siteConfig.url}${metadata.permalink}`;

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${pageUrl}#webpage`,
          url: pageUrl,
          name: metadata.title,
          publisher: organizationReference,
        })}
      </script>
    </Head>
  );
}
