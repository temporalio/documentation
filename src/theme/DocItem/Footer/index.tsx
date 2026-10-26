import React from 'react';
import { useLocation } from '@docusaurus/router';
import Footer from '@theme-original/DocItem/Footer';
import type FooterType from '@theme/DocItem/Footer';
import type { WrapperProps } from '@docusaurus/types';
import PageFeedback from '@site/src/components/PageFeedback/PageFeedback';

type Props = WrapperProps<typeof FooterType>;

// Puts the page feedback widget above the doc footer (tags and the "View this
// page on GitHub" box).
export default function FooterWrapper(props: Props): JSX.Element {
  const { pathname } = useLocation();
  return (
    <>
      {/* Keyed by page, so moving to another page starts with the question again. */}
      <PageFeedback key={pathname} pathname={pathname} />
      <Footer {...props} />
    </>
  );
}
