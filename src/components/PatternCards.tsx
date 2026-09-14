import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

type PatternCardItem = {
  href: string;
  title: string;
  description: string;
  external?: boolean;
  icon?: string;
};

type PatternCardsProps = {
  items: PatternCardItem[];
  /** Extra class on the grid container, e.g. for a one-off visual variant. */
  className?: string;
};

const ICON_BASE = '/img/design-patterns/icons/';

function CardIcon({ icon, title }: { icon: string; title: string }) {
  const src = useBaseUrl(icon.startsWith('/') ? icon : `${ICON_BASE}${icon}`);
  return <img src={src} alt={title} />;
}

export default function PatternCards({ items, className }: PatternCardsProps) {
  return (
    <div className={className ? `pattern-grid ${className}` : 'pattern-grid'}>
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className="pattern-card"
          {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          <div className="pattern-content">
            {item.icon ? (
              <div className="pattern-card-header">
                <CardIcon icon={item.icon} title={item.title} />
                <h3>{item.title}</h3>
              </div>
            ) : (
              <h3>{item.title}</h3>
            )}
            <p>{item.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
