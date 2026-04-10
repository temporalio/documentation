import React from 'react';
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

export default function QuickstartCards({ items, className }: QuickstartCardsProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      {items.map((item) => (
        <a key={item.href} className={styles.card} href={item.href}>
          <h3 className={styles.cardTitle}>{item.title}</h3>
          <p className={styles.cardDesc}>{item.description}</p>
        </a>
      ))}
    </div>
  );
} 