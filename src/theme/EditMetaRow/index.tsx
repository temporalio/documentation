import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import { useLocation } from '@docusaurus/router';
import EditThisPage from '@theme/EditThisPage';
import LastUpdated from '@theme/LastUpdated';
import type { Props } from '@theme/EditMetaRow';
import PageFeedback from '@site/src/components/PageFeedback/PageFeedback';
import styles from './styles.module.css';

// Ejected from @docusaurus/theme-classic 3.10.2 so the page feedback widget and
// the "View this page on GitHub" link share one row. Differences from upstream:
// - The edit link renders inside PageFeedback's row instead of a half-width
//   column, and the widget is added.
// - The last-updated line moves under that row. The main docs instance sets
//   showLastUpdateTime and showLastUpdateAuthor to false, so it doesn't show.
// DocItem/Footer renders this row only when a page has an editUrl or
// last-updated data. Every docs page has an editUrl from docusaurus.config.js.
export default function EditMetaRow({ className, editUrl, lastUpdatedAt, lastUpdatedBy }: Props): ReactNode {
  const { pathname } = useLocation();
  return (
    <div className={className}>
      <div className={styles.noPrint}>
        {/* Keyed by page, so moving to another page starts with the question again. */}
        <PageFeedback key={pathname} pathname={pathname}>
          {editUrl && <EditThisPage editUrl={editUrl} />}
        </PageFeedback>
      </div>
      {(lastUpdatedAt || lastUpdatedBy) && (
        <div className={clsx('margin-top--sm', styles.lastUpdated)}>
          <LastUpdated lastUpdatedAt={lastUpdatedAt} lastUpdatedBy={lastUpdatedBy} />
        </div>
      )}
    </div>
  );
}
