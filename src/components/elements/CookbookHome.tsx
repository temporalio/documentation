import React from 'react';
import Tile from '@site/src/components/elements/Tile';
import {useDocsData, useDocById} from '@docusaurus/plugin-content-docs/client';
import styles from './CookbookHome.module.css';

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
  const {versions} = useDocsData('cookbook');
  const docsList: any[] = Object.values((versions?.[0]?.docs ?? {}) as Record<string, unknown>);
  const ids = docsList
    .map((doc: any) => doc?.id)
    .filter((id: string | undefined): id is string => Boolean(id) && id !== 'cookbook');

  if (ids.length === 0) {
    throw new Error('CookbookHome: found 0 docs in the cookbook plugin (besides index).');
  }

  return (
    <section className={styles.page}>
      <div className={styles.inner}>
        {/* Hero header */}
        <header className={styles.hero} aria-label="Cookbook overview">
          <p className={styles.eyebrow}>Cookbook</p>
          <h1 className={styles.heroTitle}>Practical AI recipes for Temporal</h1>
          <p className={styles.heroBlurb}>
            Short, copy‑pasteable examples that show how to orchestrate AI tasks with Temporal—
            covering prompts, tools, retries, and production‑ready workflows. Dive in below.
          </p>
        </header>

        {/* 3-up grid */}
        <div className={styles.grid}>
          {ids.map((id) => (
            <div key={id} className={styles.cell}>
              <DocTile id={id} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
