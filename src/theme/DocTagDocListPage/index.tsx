import React from 'react';
import Head from '@docusaurus/Head';
import DocTagDocListPage from '@theme-original/DocTagDocListPage';
import type DocTagDocListPageType from '@theme/DocTagDocListPage';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof DocTagDocListPageType>;

export default function DocTagDocListPageWrapper(props: Props): JSX.Element {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <DocTagDocListPage {...props} />
    </>
  );
}
