import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import { isExternalHref } from '@site/src/utils/links';
import styles from './styles.module.css';

function LogoImage({ logo }) {
  const { withBaseUrl } = useBaseUrlUtils();
  const sources = {
    light: withBaseUrl(logo.src),
    dark: withBaseUrl(logo.srcDark ?? logo.src),
  };
  return (
    <ThemedImage
      className={clsx('footer__logo', logo.className)}
      alt={logo.alt}
      sources={sources}
      width={logo.width}
      height={logo.height}
      style={logo.style}
    />
  );
}

// Swizzled (not wrapped) because the default only ever overrides `target`,
// leaving Link's default rel="noopener noreferrer" in place even when the
// link — https://temporal.io — doesn't leave the temporal.io family and
// doesn't open a new tab. Otherwise mirrors the original implementation.
export default function FooterLogo({ logo }) {
  if (!logo.href) {
    return <LogoImage logo={logo} />;
  }

  const external = isExternalHref(logo.href);
  return (
    <Link
      href={logo.href}
      className={styles.footerLogoLink}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      <LogoImage logo={logo} />
    </Link>
  );
}
