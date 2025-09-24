// src/components/CookbookDocItem.tsx
import React from 'react';
import Head from '@docusaurus/Head';
import {DocProvider, useDoc} from '@docusaurus/plugin-content-docs/client';
import DocItemMetadata from '@theme/DocItem/Metadata';
import type {Props as DocItemProps} from '@theme/DocItem';
import {HtmlClassNameProvider} from '@docusaurus/theme-common';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import Link from '@docusaurus/Link';
import {MDXProvider} from '@mdx-js/react';
import clsx from 'clsx';

import styles from './CookbookDocItem.module.css';

type CookbookDocItemProps = DocItemProps & { tags?: string[] };

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true" {...props}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48 0-.24 0-.87 0-1.71-2.78.61-3.37-1.34-3.37-1.34a2.65 2.65 0 0 0-1.12-1.47c-.91-.62.07-.6.07-.6a2.1 2.1 0 0 1 1.53 1 2.13 2.13 0 0 0 2.92.83 2.13 2.13 0 0 1 .64-1.34c-2.22-.25-4.56-1.11-4.56-4.93A3.86 3.86 0 0 1 6.77 8a3.59 3.59 0 0 1 .1-2.64s.84-.27 2.75 1a9.5 9.5 0 0 1 5 0c1.91-1.31 2.75-1 2.75-1a3.59 3.59 0 0 1 .1 2.64 3.86 3.86 0 0 1 1 2.67c0 3.83-2.34 4.67-4.57 4.91a2.39 2.39 0 0 1 .68 1.85c0 1.34 0 2.42 0 2.75 0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

export default function CookbookDocItem({content, tags}: CookbookDocItemProps) {
  // IMPORTANT: don't call useDoc() here.
  return (
    <DocProvider content={content}>
      <InnerCookbookDocItem content={content} tags={tags} />
    </DocProvider>
  );
}

function InnerCookbookDocItem({content, tags}: CookbookDocItemProps) {
  const DocContent = content;

  // Now we're under <DocProvider>, so useDoc() is safe:
  const {metadata, frontMatter, toc, contentTitle} = useDoc();
  const {title, description, id, tags: metaTags = []} = metadata;
  const hasTOC = !frontMatter?.hide_table_of_contents && (toc?.length ?? 0) > 0;
  const shouldRenderSyntheticTitle = !frontMatter?.hide_title && typeof contentTitle === 'undefined';
  const syntheticTitle = shouldRenderSyntheticTitle ? title : undefined;

  const resolvedTags = (tags ?? metaTags.map((t: any) => t.label)) as string[];
  const dataTags = resolvedTags.length ? resolvedTags.join(',') : undefined;
  const githubHref = '';
  const isGithubEnabled = Boolean(githubHref);
  const handleGithubClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isGithubEnabled) {
      event.preventDefault();
    }
  };
  const renderActions = () => (
    <div className={styles.actionsRow}>
      <Link className={clsx(styles.actionLink, styles.actionBack)} to="/cookbook">
        Back to Cookbook
      </Link>
      <a
        className={clsx(styles.actionLink, styles.actionGithub)}
        href={githubHref || undefined}
        aria-disabled={isGithubEnabled ? undefined : 'true'}
        onClick={handleGithubClick}
        tabIndex={isGithubEnabled ? undefined : -1}
      >
        <GithubIcon className={styles.actionIcon} />
        Open in GitHub
      </a>
    </div>
  );

  let actionsInjected = Boolean(syntheticTitle);
  const components = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      if (!actionsInjected) {
        actionsInjected = true;
        return (
          <>
            <h1 {...props} />
            {renderActions()}
          </>
        );
      }
      return <h1 {...props} />;
    },
  };

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
                <h1>{syntheticTitle}</h1>
                {renderActions()}
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
