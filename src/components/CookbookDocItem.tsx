// src/components/CookbookDocItem.tsx
import React from 'react';
import Head from '@docusaurus/Head';
import {DocProvider, useDoc} from '@docusaurus/plugin-content-docs/client';
import DocItemMetadata from '@theme/DocItem/Metadata';
import type {Props as DocItemProps} from '@theme/DocItem';
import {HtmlClassNameProvider} from '@docusaurus/theme-common';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';

import styles from './CookbookDocItem.module.css';

type CookbookDocItemProps = DocItemProps & { tags?: string[] };

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
  const {metadata, frontMatter, toc} = useDoc();
  const {title, description, id, tags: metaTags = []} = metadata;
  const hasTOC = !frontMatter?.hide_table_of_contents && (toc?.length ?? 0) > 0;

  const resolvedTags = (tags ?? metaTags.map((t: any) => t.label)) as string[];
  const dataTags = resolvedTags.length ? resolvedTags.join(',') : undefined;

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
            {hasTOC && (
              <div className={styles.tocMobile}>
                <DocItemTOCMobile />
              </div>
            )}
            <DocContent />
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
