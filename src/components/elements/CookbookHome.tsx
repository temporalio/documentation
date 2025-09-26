import Tile from '@site/src/components/elements/Tile';
import {useDocsData, useDocById} from '@docusaurus/plugin-content-docs/client';
import styles from './CookbookHome.module.css';
import useGlobalData, {usePluginData} from '@docusaurus/useGlobalData';
import clsx from 'clsx';

type CookbookItem = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  permalink: string;
  source?: string;
};

function DocTile({id}: {id: string}) {
  // Try bare id first; fall back to namespaced in case this renders outside the plugin context
  const meta: any = useDocById(id) ?? useDocById(`cookbook:${id}`);

  const title = meta?.title ?? meta?.frontMatter?.title;
  const description = meta?.description ?? meta?.frontMatter?.description;

  if (!title || !description) {
    throw new Error(
      `Cookbook doc "${id}" missing required field(s):` +
        `${!title ? ' title' : ''}` +
        `${!description ? ' description' : ''}`,
    );
  }

  const tags =
    meta?.tags?.map((t: any) => t.label) ??
    (Array.isArray(meta?.frontMatter?.tags)
      ? meta.frontMatter.tags
          .map((t: any) => (typeof t === 'string' ? t : t?.label))
          .filter(Boolean)
      : []);

  return (
    <Tile
      title={title}
      description={description}
      href={meta?.permalink ?? '#'}
      tags={tags as string[]}
    />
  );
}

export default function CookbookHome() {
  const global = useGlobalData();
  console.log('[CookbookHome] plugins:', Object.keys(global?.plugins ?? {})); // should include 'cookbook-index'

  const dataAny = usePluginData('cookbook-index') as any;


  const raw = (dataAny?.items ?? []) as (CookbookItem | null | undefined)[];
  raw.forEach((x, i) => {
  if (!x || typeof (x as any).title !== 'string') {
    console.warn('[CookbookHome] invalid item at index', i, x);
  }
});

  const items: CookbookItem[] = raw
    .filter((x): x is CookbookItem => !!x && typeof x === 'object' && typeof (x as any).title === 'string');


  if (items.length === 0) {
    throw new Error('CookbookHome: no items found by cookbook-index plugin (check server logs for [cookbook-index]).');
  }

   return (
    <section className={clsx('cookbook--centered', styles.page)}>
      <div className={styles.inner}>
        <header className={styles.hero} aria-label="Cookbook overview">
          <p className={styles.eyebrow}>Cookbook</p>
          <h1 className={styles.heroTitle}>Practical AI recipes for Temporal</h1>
          <p className={styles.heroBlurb}>
            Short, copy‑pasteable examples that show how to orchestrate AI tasks with Temporal—
            covering prompts, tools, retries, and production‑ready workflows. Dive in below.
          </p>
        </header>
        <div className={styles.grid}>
          {items.map((it) => (
            <div key={it.id} className={styles.cell}>
              <Tile
                title={it.title}
                description={it.description}
                href={it.permalink}
                tags={it.tags}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
