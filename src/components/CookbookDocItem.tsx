import React from 'react';
import Head from '@docusaurus/Head';
import { DocProvider, useAllDocsData, useDoc } from '@docusaurus/plugin-content-docs/client';
import DocItemMetadata from '@theme/DocItem/Metadata';
import type { Props as DocItemProps } from '@theme/DocItem';
import { HtmlClassNameProvider } from '@docusaurus/theme-common';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import Link from '@docusaurus/Link';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '@theme/MDXComponents';
import clsx from 'clsx';
import { usePluginData } from '@docusaurus/useGlobalData';

import styles from './CookbookDocItem.module.css';

type CookbookDocItemProps = DocItemProps & { tags?: string[] };

type CookbookIndexItem = {
  id: string;
  title?: string;
  description?: string;
  tags?: string[];
  permalink?: string;
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
  permalink?: string;
  frontMatter?: {
    title?: string;
    last_updated?: unknown;
    last_updated_at?: unknown;
  };
  lastUpdatedAt?: number | string | null;
};

function normalizeCookbookId(id: string | undefined): string {
  return (id ?? '').replace(/^cookbook:/, '').trim();
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

function resolveDocMeta(item: CookbookIndexItem, docsById: Map<string, DocMeta>) {
  return (
    docsById.get(item.id) ??
    docsById.get(`cookbook:${item.id}`) ??
    docsById.get(item.id.replace(/^cookbook:/, '')) ??
    null
  );
}

function getCookbookItemTimestamp(item: CookbookIndexItem, docsById: Map<string, DocMeta>): number {
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

function sortCookbookItems(items: CookbookIndexItem[], docsById: Map<string, DocMeta>): CookbookIndexItem[] {
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

    const updatedA = getCookbookItemTimestamp(a, docsById);
    const updatedB = getCookbookItemTimestamp(b, docsById);

    if (updatedA === updatedB) {
      return 0;
    }
    return updatedB - updatedA;
  });
}

function BackArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" role="img" aria-hidden="true" {...props}>
      <path d="M6.28 3.22a.75.75 0 0 1 0 1.06L4.06 6.5H13a.75.75 0 0 1 0 1.5H4.06l2.22 2.22a.75.75 0 0 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z" />
    </svg>
  );
}

function ForwardArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" role="img" aria-hidden="true" {...props}>
      <path d="M9.72 3.22a.75.75 0 0 0 0 1.06l2.22 2.22H3a.75.75 0 0 0 0 1.5h8.94l-2.22 2.22a.75.75 0 1 0 1.06 1.06l3.5-3.5a.75.75 0 0 0 0-1.06l-3.5-3.5a.75.75 0 0 0-1.06 0Z" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true" {...props}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48 0-.24 0-.87 0-1.71-2.78.61-3.37-1.34-3.37-1.34a2.65 2.65 0 0 0-1.12-1.47c-.91-.62.07-.6.07-.6a2.1 2.1 0 0 1 1.53 1 2.13 2.13 0 0 0 2.92.83 2.13 2.13 0 0 1 .64-1.34c-2.22-.25-4.56-1.11-4.56-4.93A3.86 3.86 0 0 1 6.77 8a3.59 3.59 0 0 1 .1-2.64s.84-.27 2.75 1a9.5 9.5 0 0 1 5 0c1.91-1.31 2.75-1 2.75-1a3.59 3.59 0 0 1 .1 2.64 3.86 3.86 0 0 1 1 2.67c0 3.83-2.34 4.67-4.57 4.91a2.39 2.39 0 0 1 .68 1.85c0 1.34 0 2.42 0 2.75 0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

export default function CookbookDocItem({ content, tags }: CookbookDocItemProps) {
  // IMPORTANT: don't call useDoc() here.
  return (
    <DocProvider content={content}>
      <InnerCookbookDocItem content={content} tags={tags} />
    </DocProvider>
  );
}

function InnerCookbookDocItem({ content, tags }: CookbookDocItemProps) {
  const DocContent = content;

  // Now we're under <DocProvider>, so useDoc() is safe:
  const { metadata, frontMatter, toc, contentTitle } = useDoc();
  const {
    title,
    description,
    id,
    unversionedId,
    tags: metaTags = [],
    formattedLastUpdatedAt,
    lastUpdatedAt,
  } = metadata as typeof metadata & {
    unversionedId?: string;
    formattedLastUpdatedAt?: string;
    lastUpdatedAt?: number | string | null;
  };
  const indexData = usePluginData('cookbook-index') as { items?: CookbookIndexItem[] } | undefined;
  const allDocsData = useAllDocsData();
  const cookbookDocs =
    allDocsData?.cookbook?.versions?.find((version: any) => version?.isLast) ?? allDocsData?.cookbook?.versions?.[0];
  const hasTOC = !frontMatter?.hide_table_of_contents && (toc?.length ?? 0) > 0;
  const shouldRenderSyntheticTitle = !frontMatter?.hide_title && typeof contentTitle === 'undefined';
  const syntheticTitle = shouldRenderSyntheticTitle ? title : undefined;

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

  const cookbookItems = React.useMemo(() => {
    const items = indexData?.items;
    if (!Array.isArray(items)) {
      return [];
    }
    return items.filter(
      (item): item is CookbookIndexItem => !!item && typeof item.id === 'string' && item.id.trim().length > 0
    );
  }, [indexData]);

  const sortedCookbookItems = React.useMemo(
    () => sortCookbookItems(cookbookItems, docsById),
    [cookbookItems, docsById]
  );

  const resolvedTags = (tags ?? metaTags.map((t: any) => t.label)) as string[];
  const dataTags = resolvedTags.length ? resolvedTags.join(',') : undefined;
  const cookbookFrontMatter = frontMatter as
    | {
        source?: string;
        last_updated?: unknown;
        last_updated_at?: unknown;
        last_updated_label?: string;
        formatted_last_updated?: string;
      }
    | undefined;

  const frontMatterLastUpdatedLabel = React.useMemo(() => {
    const formattedCandidates = [
      cookbookFrontMatter?.last_updated_label,
      cookbookFrontMatter?.formatted_last_updated,
    ].map((value) => (typeof value === 'string' ? value.trim() : ''));
    const formatted = formattedCandidates.find((candidate) => candidate.length > 0);
    if (formatted) {
      return formatted;
    }

    const rawCandidates = [cookbookFrontMatter?.last_updated, cookbookFrontMatter?.last_updated_at];
    for (const raw of rawCandidates) {
      const normalized = normalizeTimestamp(raw);
      if (typeof normalized === 'number') {
        const formattedTimestamp = formatTimestamp(normalized);
        if (formattedTimestamp) {
          return formattedTimestamp;
        }
      }
      if (typeof raw === 'string') {
        const trimmed = raw.trim();
        if (trimmed.length > 0) {
          return trimmed;
        }
      }
    }

    return undefined;
  }, [cookbookFrontMatter]);
  const pluginSource = React.useMemo(() => {
    const items = indexData?.items;
    if (!Array.isArray(items)) {
      return undefined;
    }
    const match = items.find((item) => {
      if (!item) {
        return false;
      }
      return item.id === id || (!!unversionedId && item.id === unversionedId);
    });
    return match?.source?.trim();
  }, [id, indexData, unversionedId]);
  const frontMatterSource = cookbookFrontMatter?.source?.trim();
  const githubHref = pluginSource || frontMatterSource || '';
  const isGithubEnabled = Boolean(githubHref);
  const handleGithubClick = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isGithubEnabled) {
        event.preventDefault();
      }
    },
    [isGithubEnabled]
  );
  const lastUpdatedLabel = React.useMemo(() => {
    if (frontMatterLastUpdatedLabel) {
      return frontMatterLastUpdatedLabel;
    }
    if (formattedLastUpdatedAt) {
      return formattedLastUpdatedAt;
    }

    const normalizedTimestamp = normalizeTimestamp(lastUpdatedAt);
    if (typeof normalizedTimestamp !== 'number') {
      return undefined;
    }

    return formatTimestamp(normalizedTimestamp);
  }, [frontMatterLastUpdatedLabel, formattedLastUpdatedAt, lastUpdatedAt]);

  const paginationTargets = React.useMemo(() => {
    if (sortedCookbookItems.length === 0) {
      return { previous: null, next: null };
    }

    const currentIds = new Set(
      [id, unversionedId, `cookbook:${id}`, unversionedId ? `cookbook:${unversionedId}` : undefined]
        .map((value) => normalizeCookbookId(value))
        .filter(Boolean)
    );

    const currentIndex = sortedCookbookItems.findIndex((item) => currentIds.has(normalizeCookbookId(item.id)));

    if (currentIndex < 0) {
      return { previous: null, next: null };
    }

    const resolveNavTarget = (item: CookbookIndexItem | undefined) => {
      if (!item) {
        return null;
      }

      const docMeta = resolveDocMeta(item, docsById);
      const href = docMeta?.permalink ?? item.permalink;
      if (!href) {
        return null;
      }

      const navTitle = docMeta?.title ?? docMeta?.frontMatter?.title ?? item.title ?? normalizeCookbookId(item.id);
      return {
        href,
        title: navTitle,
      };
    };

    return {
      previous: resolveNavTarget(sortedCookbookItems[currentIndex - 1]),
      next: resolveNavTarget(sortedCookbookItems[currentIndex + 1]),
    };
  }, [docsById, id, sortedCookbookItems, unversionedId]);

  const renderLastUpdated = React.useCallback(() => {
    if (!lastUpdatedLabel) {
      return null;
    }
    return <p className={styles.lastUpdated}>Updated {lastUpdatedLabel}</p>;
  }, [lastUpdatedLabel]);

  const renderActions = React.useCallback(
    () => (
      <div className={styles.actionsRow}>
        <Link className={styles.actionLink} to="/ai-cookbook">
          <BackArrowIcon className={styles.actionIcon} />
          Back to Cookbook
        </Link>
        <a
          className={clsx(styles.actionLink, styles.actionGithub)}
          href={githubHref || undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={isGithubEnabled ? undefined : 'true'}
          onClick={handleGithubClick}
          tabIndex={isGithubEnabled ? undefined : -1}
        >
          <GithubIcon className={styles.actionIcon} />
          Open in GitHub
        </a>
      </div>
    ),
    [githubHref, handleGithubClick, isGithubEnabled]
  );

  const renderRecipePagination = React.useCallback(() => {
    if (!paginationTargets.previous && !paginationTargets.next) {
      return null;
    }

    return (
      <nav className={styles.recipePagination} aria-label="Recipe navigation">
        {paginationTargets.previous ? (
          <Link className={styles.recipeNavLink} to={paginationTargets.previous.href}>
            <BackArrowIcon className={styles.actionIcon} />
            <span>
              <span className={styles.recipeNavLabel}>Previous</span>
              <span className={styles.recipeNavTitle}>{paginationTargets.previous.title}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {paginationTargets.next ? (
          <Link className={clsx(styles.recipeNavLink, styles.recipeNavLinkNext)} to={paginationTargets.next.href}>
            <span>
              <span className={styles.recipeNavLabel}>Next</span>
              <span className={styles.recipeNavTitle}>{paginationTargets.next.title}</span>
            </span>
            <ForwardArrowIcon className={styles.actionIcon} />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    );
  }, [paginationTargets.next, paginationTargets.previous]);

  const components = React.useMemo(() => {
    const DefaultH1 =
      (MDXComponents?.h1 as React.ComponentType<React.HTMLAttributes<HTMLHeadingElement>>) ??
      ((props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 {...props} />);

    let actionsInjected = Boolean(syntheticTitle);
    return {
      ...MDXComponents,
      h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
        if (!actionsInjected) {
          actionsInjected = true;
          return (
            <>
              {renderActions()}
              <DefaultH1 {...props} />
              {renderLastUpdated()}
            </>
          );
        }
        return <DefaultH1 {...props} />;
      },
    } as typeof MDXComponents;
  }, [renderActions, renderLastUpdated, syntheticTitle]);

  return (
    <HtmlClassNameProvider className="cookbook--centered">
      <DocItemMetadata />

      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <main className={styles.main}>
        <div className={styles.wrapper} data-has-toc={hasTOC ? 'true' : undefined}>
          <article className={styles.article} data-tags={dataTags} data-doc-id={id}>
            {syntheticTitle && (
              <header className={styles.syntheticHeader}>
                {renderActions()}
                <h1>{syntheticTitle}</h1>
                {renderLastUpdated()}
              </header>
            )}
            {hasTOC && (
              <div className={styles.tocMobile}>
                <DocItemTOCMobile />
              </div>
            )}
            <MDXProvider components={components}>
              <DocContent />
            </MDXProvider>
            {renderRecipePagination()}
          </article>
          {hasTOC && (
            <aside className={styles.toc} aria-label="Table of contents">
              <DocItemTOCDesktop />
            </aside>
          )}
        </div>
      </main>
    </HtmlClassNameProvider>
  );
}
