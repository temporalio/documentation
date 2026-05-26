import React from 'react';

type PatternCardItem = {
  href: string;
  title: string;
  description: string;
  external?: boolean;
};

type PatternCardsProps = {
  items: PatternCardItem[];
};

export default function PatternCards({ items }: PatternCardsProps) {
  return (
    <div className="pattern-grid">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="pattern-card"
          {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          <div className="pattern-content">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
