// Single source of truth for the Organization/SoftwareApplication JSON-LD.
// Per the JSON-LD audit, the same `@id` was showing conflicting `name`,
// `logo`, and `sameAs` values across temporal.io and docs.temporal.io —
// centralizing the canonical object here (instead of hand-authoring it in
// multiple places) is how we keep that from happening again on this
// property. temporal.io and learn.temporal.io maintain their own copies in
// their own codebases and need to be kept byte-identical to this by hand.

export const ORGANIZATION_ID = 'https://temporal.io/#organization';
export const SOFTWARE_APPLICATION_ID = 'https://temporal.io/#software';

// Rendered in full only on the docs landing page (see
// src/theme/DocItem/StructuredData). Every other page should reference it
// via `organizationReference` instead of repeating the full property set.
export const organizationSchema = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'Temporal',
  alternateName: 'Temporal Technologies',
  url: 'https://temporal.io/',
  description:
    'Temporal is a durable execution platform for building reliable, scalable applications using workflows and activities.',
  logo: {
    '@type': 'ImageObject',
    url: 'https://temporal.io/images/logos/logo-temporal-dark-on-white.png',
    width: 512,
    height: 512,
  },
  sameAs: [
    'https://www.youtube.com/temporalio',
    'https://www.linkedin.com/company/temporal-technologies',
    'https://github.com/temporalio',
    'https://x.com/temporalio',
  ],
};

export const softwareApplicationSchema = {
  '@type': 'SoftwareApplication',
  '@id': SOFTWARE_APPLICATION_ID,
  name: 'Temporal',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Cross-platform',
  url: 'https://temporal.io',
  downloadUrl: 'https://github.com/temporalio/temporal',
  description:
    'Temporal is a durable execution platform for building reliable, scalable applications using workflows and activities. This entry describes the open-source server distribution.',
  publisher: { '@id': ORGANIZATION_ID },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

// Bare reference for every non-canonical page — attach as `publisher` on
// that page's own schema rather than repeating the full Organization block.
export const organizationReference = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
};
