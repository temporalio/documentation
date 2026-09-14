import React from 'react';
import clsx from 'clsx';
import GridCard from './GridCard';
import SdkSvg from '../SdkSvgs/SdkSvg';
import { SDK_BLOCK_NAMES, type SDK } from '../SdkSvgs/sdkBlockNames';
import styles from './GridCardList.module.css';

type GridCardListItem = {
  href: string;
  title: string;
  description: string;
  tags?: string[];
  sdk?: SDK;
};

type GridCardListProps = {
  items: GridCardListItem[];
  /** Extra class on the grid container, e.g. for a one-off visual variant. */
  className?: string;
};

/**
 * A small, hand-curated list of GridCards for sections with a manually
 * maintained item list (as opposed to IntegrationsGrid/CookbookPreview, which
 * derive their cards from a data file or hook) — kept visually identical to
 * those grids by rendering the same GridCard.
 */
export default function GridCardList({ items, className }: GridCardListProps) {
  return (
    <div className={clsx(styles.grid, className)}>
      {items.map((item) => (
        <GridCard
          key={item.href}
          title={item.title}
          description={item.description}
          href={item.href}
          tags={item.tags}
          icon={item.sdk ? <SdkSvg name={SDK_BLOCK_NAMES[item.sdk]} /> : undefined}
        />
      ))}
    </div>
  );
}
