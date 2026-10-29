import * as React from 'react';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';
import useGlobalData, { usePluginData } from '@docusaurus/useGlobalData';
import { type SDK } from '../elements/SdkSvgs/sdkBlockNames';

// Recipes tag their language lowercase (e.g. `python`, `typescript`) rather
// than carrying a structured `sdk` field — this is the only place that
// distinction is inferred, so IntegrationsGrid/GuidesGrid-style SDK icons can
// show up on Cookbook cards too.
const TAG_TO_SDK: Record<string, SDK> = {
  go: 'Go',
  java: 'Java',
  python: 'Python',
  ruby: 'Ruby',
  typescript: 'TypeScript',
};

type CookbookIndexItem = {
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

export type ResolvedCookbookItem = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  sdk?: SDK;
};

function resolveDocMeta(item: CookbookIndexItem, docsById: Map<string, DocMeta>) {
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

function getLastUpdatedTimestamp(item: CookbookIndexItem, docsById: Map<string, DocMeta>): number {
  const meta = resolveDocMeta(item, docsById);
  const frontMatterTimestampCandidates = [meta?.frontMatter?.last_updated, meta?.frontMatter?.last_updated_at];
  for (const candidate of frontMatterTimestampCandidates) {
    const normalized = normalizeTimestamp(candidate);
    if (typeof normalized === 'number') {
      return normalized;
    }
  }

  const normalizedMeta = normalizeTimestamp(meta?.lastUpdatedAt ?? null);
  return typeof normalizedMeta === 'number' ? normalizedMeta : 0;
}

/**
 * Every AI Cookbook recipe, resolved (title/description/tags/href) and sorted
 * the same way CookbookHome renders them: by `priority` (front matter, higher
 * first), falling back to most-recently-updated. Shared by CookbookHome (the
 * full grid) and CookbookPreview (a top-N strip) so both stay in sync without
 * duplicating the doc-metadata resolution and sort logic.
 */
export function useCookbookItems(): ResolvedCookbookItem[] {
  const global = useGlobalData();

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

  const raw = (dataAny?.items ?? []) as (CookbookIndexItem | null | undefined)[];
  raw.forEach((x, i) => {
    if (!x || typeof (x as any).title !== 'string') {
      console.warn('[useCookbookItems] invalid item at index', i, x);
    }
  });

  const items: CookbookIndexItem[] = raw.filter(
    (x): x is CookbookIndexItem => !!x && typeof x === 'object' && typeof (x as any).title === 'string'
  );

  if (items.length === 0) {
    throw new Error('useCookbookItems: no items found by cookbook-index plugin (check server logs for [cookbook-index]).');
  }

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

      const updatedA = getLastUpdatedTimestamp(a, docsById);
      const updatedB = getLastUpdatedTimestamp(b, docsById);
      return updatedB - updatedA;
    });
  }, [items, docsById]);

  return React.useMemo(
    () =>
      sortedItems.map((item) => {
        const docMeta = resolveDocMeta(item, docsById);

        const title = docMeta?.title ?? docMeta?.frontMatter?.title ?? item.title;
        const description = docMeta?.description ?? docMeta?.frontMatter?.description ?? item.description;

        if (!title || !description) {
          throw new Error(
            `useCookbookItems: cookbook doc "${item.id}" missing required field(s):` +
              `${!title ? ' title' : ''}` +
              `${!description ? ' description' : ''}`
          );
        }

        const tagsFromMeta = docMeta?.tags?.map((t: any) => t.label);
        const tagsFromFrontMatter = Array.isArray(docMeta?.frontMatter?.tags)
          ? docMeta.frontMatter.tags.map((t: any) => (typeof t === 'string' ? t : t?.label)).filter(Boolean)
          : undefined;
        const allTags = (tagsFromMeta ?? tagsFromFrontMatter ?? item.tags) as string[];

        // Pull the language out as an icon (matching IntegrationsGrid/
        // GuidesGrid) instead of also leaving it as a redundant badge.
        const sdk = allTags.map((t) => TAG_TO_SDK[t.toLowerCase()]).find(Boolean);
        const tags = sdk ? allTags.filter((t) => TAG_TO_SDK[t.toLowerCase()] !== sdk) : allTags;

        const href = docMeta?.permalink ?? item.permalink ?? '#';

        return { id: item.id, title, description, tags, href, sdk };
      }),
    [sortedItems, docsById]
  );
}
