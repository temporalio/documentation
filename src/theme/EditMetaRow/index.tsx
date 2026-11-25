import React, { type ReactNode } from 'react';
import { useLocation } from '@docusaurus/router';
import EditThisPage from '@theme/EditThisPage';
import type { Props } from '@theme/EditMetaRow';
import PageFeedback from '@site/src/components/PageFeedback/PageFeedback';
import styles from './styles.module.css';

// Ejected from @docusaurus/theme-classic 3.10.2 so the page feedback widget and
// the "View this page on GitHub" link share one row. Differences from upstream:
// - The edit link renders inside PageFeedback's row instead of a half-width
//   column, and the widget is added.
// - No visible last-updated line. The main docs instance computes
//   lastUpdatedAt (showLastUpdateTime) only for metadata: the sitemap and the
//   JSON-LD dateModified in DocItem/StructuredData. See
//   plugins/shared/lastModified.js. The AI Cookbook shows its own date.
// DocItem/Footer renders this row only when a page has an editUrl or
// last-updated data. Every docs page has an editUrl from docusaurus.config.js.
export default function EditMetaRow({ className, editUrl }: Props): ReactNode {
  const { pathname } = useLocation();
  return (
    <div className={className}>
      <div className={styles.noPrint}>
        {/* Keyed by page, so moving to another page starts with the question again. */}
        <PageFeedback key={pathname} pathname={pathname}>
          {editUrl && <EditThisPage editUrl={editUrl} />}
        </PageFeedback>
      </div>
    </div>
  );
}
