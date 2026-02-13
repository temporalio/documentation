import React from 'react';
import Tile from '@site/src/components/elements/Tile';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';
import { useHistory, useLocation } from '@docusaurus/router';
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
  last_updated?: unknown;
  last_updated_at?: unknown;
  last_updated_label?: string;
  formatted_last_updated?: string;
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
    last_updated_label?: string;
    formatted_last_updated?: string;
  };
  tags?: { label: string }[];
  permalink?: string;
  lastUpdatedAt?: number | string | null;
  formattedLastUpdatedAt?: string;
};

const PAGE_SIZE = 9;

function normalizeCookbookId(id: string | undefined): string {
  return (id ?? '').replace(/^cookbook:/, '').trim();
}

function resolveDocMeta(item: CookbookItem, docsById: Map<string, DocMeta>) {
  return (
    docsById.get(item.id) ??
    docsById.get(`cookbook:${item.id}`) ??
    docsById.get(item.id.replace(/^cookbook:/, '')) ??
    null
  );
}

function normalizeTimestamp(value: unknown): number | undefined {
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
}

function formatTimestamp(value: number): string | undefined {
  if (!Number.isFinite(value)) {
    return undefined;
  }
  try {
    const formatter = new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    return formatter.format(new Date(value));
  } catch {
    return new Date(value).toLocaleDateString();
  }
}

function getFirstNonEmptyLabel(candidates: Array<unknown>): string | undefined {
  for (const candidate of candidates) {
    if (typeof candidate === 'string') {
      const trimmed = candidate.trim();
      if (trimmed.length > 0) {
        return trimmed;
      }
    }
  }
  return undefined;
}

function getLastUpdatedLabel(item: CookbookItem, docMeta: DocMeta | null): string | undefined {
  const label = getFirstNonEmptyLabel([
    docMeta?.frontMatter?.last_updated_label,
    docMeta?.frontMatter?.formatted_last_updated,
    docMeta?.formattedLastUpdatedAt,
    item.last_updated_label,
    item.formatted_last_updated,
  ]);

  if (label) {
    return label;
  }

  const timestampCandidates = [
    docMeta?.frontMatter?.last_updated,
    docMeta?.frontMatter?.last_updated_at,
    docMeta?.lastUpdatedAt,
    item.last_updated,
    item.last_updated_at,
  ];

  for (const candidate of timestampCandidates) {
    const normalized = normalizeTimestamp(candidate);
    if (typeof normalized === 'number') {
      const formatted = formatTimestamp(normalized);
      if (formatted) {
        return formatted;
      }
    }
  }

  return undefined;
}

function getLastUpdatedTimestamp(item: CookbookItem, docsById: Map<string, DocMeta>): number {
  const meta = resolveDocMeta(item, docsById);
  const candidates = [
    meta?.frontMatter?.last_updated,
    meta?.frontMatter?.last_updated_at,
    meta?.lastUpdatedAt,
    item.last_updated,
    item.last_updated_at,
  ];

  for (const candidate of candidates) {
    const normalized = normalizeTimestamp(candidate);
    if (typeof normalized === 'number') {
      return normalized;
    }
  }

  return 0;
}

function sortCookbookItems(items: CookbookItem[], docsById: Map<string, DocMeta>): CookbookItem[] {
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

    const updatedA = getLastUpdatedTimestamp(a, docsById);
    const updatedB = getLastUpdatedTimestamp(b, docsById);

    if (updatedA === updatedB) {
      return 0;
    }
    return updatedB - updatedA;
  });
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
  const lastUpdatedLabel = getLastUpdatedLabel(item, docMeta);

  return (
    <Tile
      title={title}
      description={description}
      href={href}
      tags={resolvedTags}
      headingLevel="h2"
      lastUpdatedLabel={lastUpdatedLabel}
    />
  );
}

export default function CookbookHome() {
  const global = useGlobalData();
  console.log('[CookbookHome] plugins:', Object.keys(global?.plugins ?? {})); // should include 'cookbook-index'

  const dataAny = usePluginData('cookbook-index') as any;
  const allDocsData = useAllDocsData();
  const location = useLocation();
  const history = useHistory();
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
    (x): x is CookbookItem =>
      !!x && typeof x === 'object' && typeof (x as any).title === 'string' && typeof (x as any).id === 'string'
  );

  if (items.length === 0) {
    throw new Error('CookbookHome: no items found by cookbook-index plugin (check server logs for [cookbook-index]).');
  }

  const sortedItems = React.useMemo(() => sortCookbookItems(items, docsById), [docsById, items]);

  const pageCount = Math.max(1, Math.ceil(sortedItems.length / PAGE_SIZE));
  const rawPage = Number(new URLSearchParams(location.search).get('page') ?? '1');
  const currentPage = Number.isFinite(rawPage) && rawPage > 0 ? Math.min(Math.floor(rawPage), pageCount) : 1;

  const visibleItems = React.useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedItems.slice(start, start + PAGE_SIZE);
  }, [currentPage, sortedItems]);

  const goToPage = React.useCallback(
    (page: number) => {
      const target = Math.max(1, Math.min(pageCount, page));
      if (target === currentPage) {
        return;
      }

      const params = new URLSearchParams(location.search);
      if (target <= 1) {
        params.delete('page');
      } else {
        params.set('page', String(target));
      }

      const search = params.toString();
      history.push({
        pathname: location.pathname,
        search: search.length > 0 ? `?${search}` : '',
      });
    },
    [currentPage, history, location.pathname, location.search, pageCount]
  );

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
          {visibleItems.map((it) => (
            <div key={`${normalizeCookbookId(it.id)}-${it.permalink}`} className={styles.cell}>
              <DocTile item={it} docsById={docsById} />
            </div>
          ))}
        </div>
        {pageCount > 1 && (
          <nav className={styles.pagination} aria-label="Cookbook pagination">
            {currentPage > 1 ? (
              <button
                type="button"
                className={styles.paginationButton}
                aria-label="Previous page"
                onClick={() => goToPage(currentPage - 1)}
              >
                ‹
              </button>
            ) : null}
            <span className={styles.paginationInfo}>
              Page {currentPage} of {pageCount}
            </span>
            {currentPage < pageCount ? (
              <button
                type="button"
                className={styles.paginationButton}
                aria-label="Next page"
                onClick={() => goToPage(currentPage + 1)}
              >
                ›
              </button>
            ) : null}
          </nav>
        )}
      </div>
    </section>
  );
}
