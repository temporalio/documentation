import React from 'react';
import styles from './CookbookHome.module.css';
import clsx from 'clsx';
import GridCard from '../../elements/GridCard/GridCard';
import SdkSvg from '../../elements/SdkSvgs/SdkSvg';
import { SDK_BLOCK_NAMES } from '../../elements/SdkSvgs/sdkBlockNames';
import { useCookbookItems } from '../useCookbookItems';
import { AI_COOKBOOK_BLURB } from '@site/src/constants/aiCookbookBlurb';

export default function CookbookHome() {
  const items = useCookbookItems();

  return (
    <section className={clsx('cookbook--centered', styles.page)}>
      <div className={styles.inner}>
        <header data-testid="cookbook-hero" className={styles.hero} aria-label="Cookbook overview">
          <h1 className={styles.heroTitle}>AI Cookbook</h1>
          <p className={styles.heroBlurb}>{AI_COOKBOOK_BLURB}</p>
        </header>
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
      </div>
    </section>
  );
}
