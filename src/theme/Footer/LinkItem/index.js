import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import { isExternalHref } from '@site/src/utils/links';

// Swizzled (not wrapped) because the default Footer/LinkItem decides the
// external-link icon from Docusaurus's own protocol-only "external" check,
// which isn't exposed as a prop — so wrapping it can't fix the icon to match
// the temporal.io-aware target/rel decision below. This otherwise mirrors the
// original implementation.
export default function FooterLinkItem({ item }) {
  const { to, href, label, prependBaseUrlToHref, className, ...props } = item;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });
  const external = isExternalHref(to ?? href);

  return (
    <Link
      className={clsx('footer__link-item', className)}
      {...(href ? { href: prependBaseUrlToHref ? normalizedHref : href } : { to: toUrl })}
      {...props}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {label}
      {external && <IconExternalLink />}
    </Link>
  );
}
