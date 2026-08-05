import React from 'react';
import Link from '@docusaurus/Link';
import SdkSvg from '../../SdkSvgs/SdkSvg';
import styles from './sdk-guide-links.module.css';
import { SDKS } from '../../../../constants/sdks';

const DEFAULT_SDKS = SDKS.map(({ id, label, blockName }) => ({
  name: blockName,
  sdk: id,
  label,
}));

/**
 * Renders a vertical list of SDK guide links with block icons.
 *
 * Standard usage — auto-generates links for all SDKs from a shared path:
 *   <SdkGuideLinks path="client/temporal-client" />
 *   → /develop/go/client/temporal-client, /develop/java/client/temporal-client, …
 *
 * Filter to specific SDKs (ignored when `links` is provided):
 *   <SdkGuideLinks path="client/temporal-client" filter={['go', 'java', 'python']} />
 *
 * Custom usage — pass explicit links for pages that don't follow the standard pattern.
 * Note: `path` and `filter` are ignored when `links` is provided:
 *   <SdkGuideLinks links={[{ name: 'goLangBlock', href: '/some/path', label: 'Go' }]} />
 */
export const SdkGuideLinks = ({ path, links, filter, title }) => {
  if (!links && !path) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[SdkGuideLinks] Either `path` or `links` prop is required.');
    }
    return null;
  }

  const items = links
    ? links
    : DEFAULT_SDKS
        .filter(({ sdk }) => !filter || filter.includes(sdk))
        .map(({ name, sdk, label }) => ({
          name,
          href: `/develop/${sdk}/${path}`,
          label: title ? `${title} - ${label}` : label,
        }));

  return (
    <div className={styles.list}>
      {items.map(({ name, href, label }) => (
        <Link key={name} to={href} className={styles.link}>
          <span className={styles.iconWrapper}>
            <span className={styles.iconInner}>
              <SdkSvg name={name} />
            </span>
          </span>
          <span>{label}</span>
        </Link>
      ))}
    </div>
  );
};
