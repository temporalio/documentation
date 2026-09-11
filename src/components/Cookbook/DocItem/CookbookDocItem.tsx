import React from 'react';
import { DocProvider, useDoc } from '@docusaurus/plugin-content-docs/client';
import DocItemMetadata from '@theme/DocItem/Metadata';
import type { Props as DocItemProps } from '@theme/DocItem';
import { HtmlClassNameProvider, ThemeClassNames } from '@docusaurus/theme-common';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import HomeBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Home';
import Link from '@docusaurus/Link';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '@theme/MDXComponents';
import clsx from 'clsx';
import { usePluginData } from '@docusaurus/useGlobalData';
import DocItemStructuredData from '@site/src/theme/DocItem/StructuredData';
import LLMActions from '@site/src/components/LLMActions/LLMActions';
import MarkdownAlternateLink from '@site/src/components/LLMActions/MarkdownAlternateLink';
import AgentDirective from '@site/src/components/LLMActions/AgentDirective';

import styles from './CookbookDocItem.module.css';

type CookbookDocItemProps = DocItemProps & { tags?: string[] };

type CookbookIndexItem = {
  id: string;
  source?: string;
};

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
  const hasTOC = !frontMatter?.hide_table_of_contents && (toc?.length ?? 0) > 0;
  const shouldRenderSyntheticTitle = !frontMatter?.hide_title && typeof contentTitle === 'undefined';
  const syntheticTitle = shouldRenderSyntheticTitle ? title : undefined;
  // The landing page (ai-cookbook/index.mdx) renders a wide card grid
  // (CookbookHome), not prose — the default article column is capped at
  // ~720px for recipe readability, which would squeeze that grid down to 1-2
  // columns. CookbookHome manages its own max-width (1440px) internally, so
  // just remove this component's cap for that one page instead. Keyed off
  // `id` (not `metadata.permalink`, which is inconsistently trailing-slashed
  // between SSR and hydration) — 'index' is the same id resolveUrlPath and
  // cookbook-index's own readItems() already use to single out this doc.
  const isLandingPage = id === 'index';

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
  const normalizeTimestamp = React.useCallback((value: unknown): number | undefined => {
    const normalizeNumber = (input: number): number | undefined => {
      if (!Number.isFinite(input)) {
        return undefined;
      }
      // Treat smaller values (e.g. seconds) as seconds since epoch.
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
  const formatTimestamp = React.useCallback((value: number): string | undefined => {
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
  }, []);
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
  }, [cookbookFrontMatter, formatTimestamp, normalizeTimestamp]);
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
  }, [formatTimestamp, frontMatterLastUpdatedLabel, formattedLastUpdatedAt, lastUpdatedAt, normalizeTimestamp]);
  const renderLastUpdated = React.useCallback(() => {
    if (!lastUpdatedLabel) {
      return null;
    }
    return <p className={styles.lastUpdated}>Last updated {lastUpdatedLabel}</p>;
  }, [lastUpdatedLabel]);
  const renderBreadcrumbs = React.useCallback(
    () => (
      <nav
        className={clsx(ThemeClassNames.docs.docBreadcrumbs, styles.breadcrumbsContainer)}
        aria-label="Breadcrumbs"
      >
        <ul className="breadcrumbs">
          <HomeBreadcrumbItem />
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to="/ai/cookbook">
              <span>AI Cookbook</span>
            </Link>
          </li>
          <li className="breadcrumbs__item breadcrumbs__item--active">
            <span className="breadcrumbs__link">{title}</span>
          </li>
        </ul>
      </nav>
    ),
    [title]
  );
  const renderGithubSection = React.useCallback(() => {
    if (!githubHref) {
      return null;
    }
    return (
      <div className={styles.githubSection}>
        <a className={styles.actionLink} href={githubHref} target="_blank" rel="noopener noreferrer">
          <GithubIcon className={styles.actionIcon} />
          View this recipe&apos;s code on GitHub
        </a>
      </div>
    );
  }, [githubHref]);

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
              {renderBreadcrumbs()}
              <DefaultH1 {...props} />
              <LLMActions />
              {renderLastUpdated()}
              {renderGithubSection()}
            </>
          );
        }
        return <DefaultH1 {...props} />;
      },
    } as typeof MDXComponents;
  }, [renderBreadcrumbs, renderGithubSection, renderLastUpdated, syntheticTitle]);

  return (
    <HtmlClassNameProvider className="cookbook--centered">
      <DocItemMetadata />
      <DocItemStructuredData />
      <MarkdownAlternateLink />

      <main className={styles.main}>
        <div className={styles.wrapper} data-has-toc={hasTOC ? 'true' : undefined} data-landing={isLandingPage ? 'true' : undefined}>
          <article className={styles.article} data-tags={dataTags} data-doc-id={id} data-landing={isLandingPage ? 'true' : undefined}>
            <AgentDirective />
            {syntheticTitle && (
              <header className={styles.syntheticHeader}>
                {renderBreadcrumbs()}
                <h1>{syntheticTitle}</h1>
                <LLMActions />
                {renderLastUpdated()}
                {renderGithubSection()}
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
