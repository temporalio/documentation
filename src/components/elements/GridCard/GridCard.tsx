import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './GridCard.module.css';

function isExternal(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://');
}

// A link to temporal.io itself (e.g. the Code Exchange) still opens in a new
// tab like any other external href, but doesn't get the external-link icon —
// it isn't "leaving Temporal" the way a partner's docs site is.
function isOffTemporalDomain(href: string): boolean {
  try {
    const { hostname } = new URL(href);
    return hostname !== 'temporal.io' && !hostname.endsWith('.temporal.io');
  } catch {
    return true;
  }
}

function ExternalLinkIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={styles.externalIcon}
    >
      <path
        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type GridCardProps = {
  title: string;
  description: string;
  href: string;
  tags?: string[];
  /** Rendered top-right of the header, e.g. an SDK logo. */
  icon?: React.ReactNode;
  analyticsId?: string;
};

/**
 * The card look shared by IntegrationsGrid and CookbookPreview — kept as one
 * component so the two stay visually identical instead of drifting apart.
 */
export default function GridCard({ title, description, href, tags = [], icon, analyticsId }: GridCardProps) {
  const external = isExternal(href);
  const showExternalIcon = external && isOffTemporalDomain(href);
  return (
    <Link
      to={href}
      className={clsx('grid-card', styles.card)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(analyticsId ? { 'data-analytics-id': analyticsId, 'data-analytics-action': 'click' } : {})}
    >
      <div className={styles.cardHeader}>
        <h3 className={styles.cardName}>
          {title}
          {showExternalIcon && <ExternalLinkIcon />}
        </h3>
        {icon && <div className={styles.icons}>{icon}</div>}
      </div>
      <p className={styles.cardDescription}>{description}</p>
      {tags.length > 0 && (
        <div className={styles.cardMeta}>
          {tags.map((tag) => (
            <span key={tag} className={styles.badge}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
