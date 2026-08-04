import React from 'react';
import Head from '@docusaurus/Head';
import DocTagsListPage from '@theme-original/DocTagsListPage';
import type DocTagsListPageType from '@theme/DocTagsListPage';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof DocTagsListPageType>;

export default function DocTagsListPageWrapper(props: Props): JSX.Element {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <DocTagsListPage {...props} />
    </>
  );
}
