// ⚠️  LLM MARKDOWN PIPELINE: the `items` prop (href/title/description) is
// still the single source of truth for the generated Markdown — see
// scripts/component-handlers/cards.mjs. The icon and version chip below are
// resolved separately, purely for the browser rendering, and have no
// Markdown equivalent (nothing to keep in sync).
import React from 'react';
import SdkSvg from '../../elements/SdkSvgs/SdkSvg';
import { SDKS } from '../../../constants/sdks';
import sdkVersions from '../../../data/sdk-versions.json';
import styles from './QuickstartCards.module.css';

type QuickstartItem = {
  href: string;
  title: string;
  description: string;
};

type QuickstartCardsProps = {
  items: QuickstartItem[];
  className?: string;
};

// Quickstart card titles are SDK display names ("Go", ".NET", …) — match
// against SDKS[].label to look up an icon and the latest version, without
// requiring a separate id per item.
const SDK_BY_LABEL = new Map(SDKS.map((sdk) => [sdk.label, sdk]));

export default function QuickstartCards({ items, className }: QuickstartCardsProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      {items.map((item) => {
        const sdk = SDK_BY_LABEL.get(item.title);
        const version = sdk && sdkVersions.versions[sdk.id];
        return (
          <a key={item.href} className={styles.card} href={item.href}>
            <div className={styles.cardHeader}>
              {sdk && (
                <span className={styles.iconWrapper}>
                  <SdkSvg name={sdk.blockName} title={sdk.label} />
                </span>
              )}
              <h3 className={styles.cardTitle}>{item.title}</h3>
              {version && <span className={styles.versionChip}>v{version}</span>}
            </div>
            <p className={styles.cardDesc}>{item.description}</p>
          </a>
        );
      })}
    </div>
  );
} 