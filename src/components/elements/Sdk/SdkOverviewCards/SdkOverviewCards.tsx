// ⚠️  LLM MARKDOWN PIPELINE: the generated .md output renders this grid via
// scripts/component-handlers/sdk-overview-cards.mjs, which reads the same
// src/data/sdk-versions.json and the same SDK list (src/constants/sdkData.js).
// If you change what a card shows, update that handler too. See
// MARKDOWN_PIPELINE.md.
import React from 'react';
import Link from '@docusaurus/Link';
import SdkSvg from '../../SdkSvgs/SdkSvg';
import { SDKS } from '../../../../constants/sdks';
import sdkVersions from '../../../../data/sdk-versions.json';
import { isExternalHref } from '@site/src/utils/links';
import styles from './sdk-overview-cards.module.css';

export const SdkOverviewCards = () => {
  return (
    <div className={styles.root}>
      {SDKS.map(({ id, label, blockName, apiReferenceHref }) => {
        const version = sdkVersions.versions[id];
        return (
          <div key={id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.iconWrapper}>
                <SdkSvg name={blockName} title={label} />
              </span>
              <h3 className={styles.cardTitle}>{label}</h3>
              {version && <span className={styles.versionChip}>v{version}</span>}
            </div>
            <div className={styles.cardLinks}>
              <Link to={`/develop/${id}`} className={styles.link}>
                Developer guide
              </Link>
              <span className={styles.linkDivider} aria-hidden="true">
                |
              </span>
              <Link
                to={apiReferenceHref}
                className={styles.link}
                target={isExternalHref(apiReferenceHref) ? '_blank' : undefined}
                rel={isExternalHref(apiReferenceHref) ? 'noopener noreferrer' : undefined}
              >
                API reference
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
