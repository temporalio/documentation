import React from 'react';
import Tile from '@site/src/components/elements/Tile';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';
import styles from './CookbookHome.module.css';
import useGlobalData, { usePluginData } from '@docusaurus/useGlobalData';
import clsx from 'clsx';

type CookbookItem = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  permalink: string;
  source?: string;
  priority?: number;
};

type DocMeta = {
  id: string;
  unversionedId?: string;
  title?: string;
  description?: string;
  frontMatter?: {
    title?: string;
    description?: string;
    tags?: any[];
    last_updated?: unknown;
    last_updated_at?: unknown;
  };
  tags?: { label: string }[];
  permalink?: string;
  lastUpdatedAt?: number | string | null;
};

function resolveDocMeta(item: CookbookItem, docsById: Map<string, DocMeta>) {
  return (
    docsById.get(item.id) ??
    docsById.get(`cookbook:${item.id}`) ??
    docsById.get(item.id.replace(/^cookbook:/, '')) ??
    null
  );
}

function DocTile({ item, docsById }: { item: CookbookItem; docsById: Map<string, DocMeta> }) {
  const { id, title: pluginTitle, description: pluginDescription, tags: pluginTags, permalink: pluginPermalink } = item;

  const docMeta = resolveDocMeta(item, docsById);

  const title = docMeta?.title ?? docMeta?.frontMatter?.title ?? pluginTitle;
  const description = docMeta?.description ?? docMeta?.frontMatter?.description ?? pluginDescription;

  if (!title || !description) {
    throw new Error(
      `Cookbook doc "${id}" missing required field(s):` +
        `${!title ? ' title' : ''}` +
        `${!description ? ' description' : ''}`
    );
  }

  const tagsFromMeta = docMeta?.tags?.map((t: any) => t.label);
  const tagsFromFrontMatter = Array.isArray(docMeta?.frontMatter?.tags)
    ? docMeta.frontMatter.tags.map((t: any) => (typeof t === 'string' ? t : t?.label)).filter(Boolean)
    : undefined;
  const resolvedTags = (tagsFromMeta ?? tagsFromFrontMatter ?? pluginTags) as string[];

  const href = docMeta?.permalink ?? pluginPermalink ?? '#';

  return <Tile title={title} description={description} href={href} tags={resolvedTags} headingLevel="h2" />;
}

export default function CookbookHome() {
  const global = useGlobalData();
  console.log('[CookbookHome] plugins:', Object.keys(global?.plugins ?? {})); // should include 'cookbook-index'

  const dataAny = usePluginData('cookbook-index') as any;
  const allDocsData = useAllDocsData();
  const cookbookDocs =
    allDocsData?.cookbook?.versions?.find((version: any) => version?.isLast) ?? allDocsData?.cookbook?.versions?.[0];

  const docsById = React.useMemo(() => {
    const map = new Map<string, DocMeta>();
    const docs: DocMeta[] = cookbookDocs?.docs ?? [];
    docs.forEach((doc) => {
      map.set(doc.id, doc);
      map.set(`cookbook:${doc.id}`, doc);
      if (doc.unversionedId) {
        map.set(doc.unversionedId, doc);
        map.set(`cookbook:${doc.unversionedId}`, doc);
      }
    });
    return map;
  }, [cookbookDocs]);

  const raw = (dataAny?.items ?? []) as (CookbookItem | null | undefined)[];
  raw.forEach((x, i) => {
    if (!x || typeof (x as any).title !== 'string') {
      console.warn('[CookbookHome] invalid item at index', i, x);
    }
  });

  const items: CookbookItem[] = raw.filter(
    (x): x is CookbookItem => !!x && typeof x === 'object' && typeof (x as any).title === 'string'
  );

  if (items.length === 0) {
    throw new Error('CookbookHome: no items found by cookbook-index plugin (check server logs for [cookbook-index]).');
  }

  const normalizeTimestamp = React.useCallback((value: unknown): number | undefined => {
    const normalizeNumber = (input: number): number | undefined => {
      if (!Number.isFinite(input)) {
        return undefined;
      }
      return input < 1e11 ? input * 1000 : input;
    };

    if (typeof value === 'number') {
      return normalizeNumber(value);
    }
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (!trimmed) {
        return undefined;
      }
      const numeric = Number(trimmed);
      if (!Number.isNaN(numeric)) {
        return normalizeNumber(numeric);
      }
      const parsed = Date.parse(trimmed);
      return Number.isNaN(parsed) ? undefined : normalizeNumber(parsed);
    }
    if (value instanceof Date) {
      const time = value.getTime();
      return Number.isNaN(time) ? undefined : normalizeNumber(time);
    }
    return undefined;
  }, []);

  const getLastUpdatedTimestamp = React.useCallback(
    (item: CookbookItem) => {
      const meta = resolveDocMeta(item, docsById);
      const frontMatterTimestampCandidates = [meta?.frontMatter?.last_updated, meta?.frontMatter?.last_updated_at];
      for (const candidate of frontMatterTimestampCandidates) {
        const normalized = normalizeTimestamp(candidate);
        if (typeof normalized === 'number') {
          return normalized;
        }
      }

      const normalizedMeta = normalizeTimestamp(meta?.lastUpdatedAt ?? null);
      if (typeof normalizedMeta === 'number') {
        return normalizedMeta;
      }
      return 0;
    },
    [docsById, normalizeTimestamp]
  );

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const priorityA = typeof a.priority === 'number' && Number.isFinite(a.priority) ? a.priority : null;
      const priorityB = typeof b.priority === 'number' && Number.isFinite(b.priority) ? b.priority : null;

      if (priorityA !== null && priorityB !== null) {
        if (priorityA !== priorityB) {
          return priorityB - priorityA;
        }
      } else if (priorityA !== null) {
        return -1;
      } else if (priorityB !== null) {
        return 1;
      }

      const updatedA = getLastUpdatedTimestamp(a);
      const updatedB = getLastUpdatedTimestamp(b);

      if (updatedA === updatedB) {
        return 0;
      }
      return updatedB - updatedA;
    });
  }, [getLastUpdatedTimestamp, items]);

  return (
    <section className={clsx('cookbook--centered', styles.page)}>
      <div className={styles.inner}>
        <header data-testid="cookbook-hero" className={styles.hero} aria-label="Cookbook overview">
          <h1 className={styles.heroTitle}>AI Cookbook</h1>
          <p className={styles.heroBlurb}>
            Step-by-step solutions that show you how to build reliable, production-ready AI systems with Temporal. Learn
            practical paradigms for prompts, tools, retries, and Workflow design.
          </p>
        </header>
        <div className={styles.grid}>
          {sortedItems.map((it) => (
            <div key={it.id} className={styles.cell}>
              <DocTile item={it} docsById={docsById} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
