import React from 'react';
import styles from './NexusDemo.module.css';

type Props = { onNext: () => void };

const QUICKSTARTS = [
  { lang: 'Go',         url: '/develop/go/nexus/quickstart',         color: 'var(--nd-purple)' },
  { lang: 'TypeScript', url: '/develop/typescript/nexus/quickstart',  color: 'var(--nd-green)'  },
  { lang: '.NET',       url: '/develop/dotnet/nexus/quickstart',      color: 'var(--ifm-color-primary)' },
  { lang: 'Java',       url: '/develop/java/nexus/quickstart',        color: 'var(--nd-amber)'  },
  { lang: 'Python',     url: '/develop/python/nexus/quickstart',      color: 'var(--nd-orange)' },
];

export default function BuildIt({ onNext }: Props) {
  return (
    <div className={styles.section}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: '71%' }} />
      </div>

      <h1>Quickstart</h1>
      <p className={styles.lead}>
        Pick your language and follow the official Nexus quickstart. Each guide walks you through
        building a cross-Namespace Nexus Service from scratch.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {QUICKSTARTS.map(({ lang, url, color }) => (
          <a
            key={lang}
            href={url}
            className={styles.quickstartCard}
            style={{ '--qs-accent': color } as React.CSSProperties}
          >
            <span className={styles.quickstartLang}>{lang}</span>
            <span className={styles.quickstartCta}>Quickstart →</span>
          </a>
        ))}
      </div>

      <div className={styles.nextRow}>
        <button className={styles.btn} onClick={onNext}>
          Next: Test Yourself →
        </button>
      </div>
    </div>
  );
}
