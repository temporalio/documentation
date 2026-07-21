import React from 'react';
import Layout from '@theme-original/DocItem/Layout';
import type LayoutType from '@theme/DocItem/Layout';
import type { WrapperProps } from '@docusaurus/types';
import DocItemStructuredData from '../StructuredData';
import DocItemTaxonomyMeta from '../TaxonomyMeta';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): JSX.Element {
  return (
    <>
      <DocItemStructuredData />
      <DocItemTaxonomyMeta />
      <Layout {...props} />
    </>
  );
}
