import React from 'react';
import type {Props} from '@theme/DocCategoryGeneratedIndexPage';
import CookbookHome from '@site/src/components/elements/CookbookHome';
import Original from '@theme-original/DocCategoryGeneratedIndexPage';

export default function CookbookCategoryIndex(props: Props) {
  const {categoryGeneratedIndex} = props;
  const isRoot = categoryGeneratedIndex.permalink.replace(/\/+$/, '').endsWith('/ai-cookbook');

  // Root /ai-cookbook uses your custom React page (no MDX, no DocCardList)
  if (isRoot) return <CookbookHome />;

  // Everything else (including /docs) stays default
  return <Original {...props} />;
}