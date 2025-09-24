// src/components/CookbookDocItem.tsx
import React from 'react';
import Head from '@docusaurus/Head';
import {DocProvider, useDoc} from '@docusaurus/plugin-content-docs/client';
import DocItemMetadata from '@theme/DocItem/Metadata';
import type {Props as DocItemProps} from '@theme/DocItem';
import {HtmlClassNameProvider} from '@docusaurus/theme-common';

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
  const {metadata} = useDoc();
  const {title, description, id, tags: metaTags = []} = metadata;

  const resolvedTags = (tags ?? metaTags.map((t: any) => t.label)) as string[];
  const dataTags = resolvedTags.length ? resolvedTags.join(',') : undefined;

  return (
    <HtmlClassNameProvider className="cookbook--centered">
      <DocItemMetadata />

      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
      </Head>

      <main className="cookbook--main">
        <article className="cookbook--article" data-tags={dataTags} data-doc-id={id}>
          <DocContent />
        </article>
      </main>
    </HtmlClassNameProvider>
  );
}
