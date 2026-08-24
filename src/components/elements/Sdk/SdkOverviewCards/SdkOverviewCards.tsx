// ⚠️  LLM MARKDOWN PIPELINE: the generated .md output renders this grid via
// scripts/component-handlers/sdk-overview-cards.mjs, which reads the same
// src/data/sdk-versions.json and mirrors each SDK's label and
// apiReferenceHref from src/constants/sdks.js. If you change the SDK list,
// labels, or API reference links there, update that handler too. See
// MARKDOWN_PIPELINE.md.
import React from 'react';
import Link from '@docusaurus/Link';
import SdkSvg from '../../SdkSvgs/SdkSvg';
import { SDKS } from '../../../../constants/sdks';
import sdkVersions from '../../../../data/sdk-versions.json';
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
                target="_blank"
                rel="noopener noreferrer"
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
