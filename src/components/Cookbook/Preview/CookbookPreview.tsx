import React from 'react';
import Link from '@docusaurus/Link';
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
  const items = useCookbookItems().slice(0, limit);

  return (
    <div>
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
      </div>
      <p style={{ marginTop: 'var(--ifm-spacing-lg, 24px)' }}>
        <Link className="button button--secondary" to="/ai/cookbook">
          Browse all recipes →
        </Link>
      </p>
    </div>
  );
}
