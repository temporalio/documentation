import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import type { Props } from '@theme/DocItem/Content';

import LLMActions from '@site/src/components/LLMActions/LLMActions';
import styles from './styles.module.css';

/**
 * Title can be declared inside md content or defined through
 * front matter heading. Returns the synthetic title if needed.
 */
function useSyntheticTitle(): string | null {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

export default function DocItemContent({ children }: Props): JSX.Element {
  const syntheticTitle = useSyntheticTitle();

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <header className={styles.header}>
          <Heading as="h1">{syntheticTitle}</Heading>
          <LLMActions />
        </header>
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
