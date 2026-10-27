import React from 'react';
import GridCard from '../../elements/GridCard/GridCard';
import SdkSvg from '../../elements/SdkSvgs/SdkSvg';
import { SDK_BLOCK_NAMES } from '../../elements/SdkSvgs/sdkBlockNames';
import { useCookbookItems } from '../useCookbookItems';
import styles from './CookbookPreview.module.css';

type CookbookPreviewProps = {
  /** Number of recipes to show, taken in the same priority/recency order as the full Cookbook. */
  limit?: number;
};

export default function CookbookPreview({ limit = 4 }: CookbookPreviewProps) {
  const allItems = useCookbookItems();
  const items = allItems.slice(0, limit);
  const remaining = allItems.length - items.length;

  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <GridCard
          key={item.id}
          title={item.title}
          description={item.description}
          href={item.href}
          tags={item.tags}
          icon={item.sdk ? <SdkSvg name={SDK_BLOCK_NAMES[item.sdk]} /> : undefined}
        />
      ))}
      {remaining > 0 && (
        <GridCard
          title={`Browse the full AI Cookbook for +${remaining} more recipe${remaining === 1 ? '' : 's'}`}
          description=""
          href="/ai/cookbook"
        />
      )}
    </div>
  );
}
