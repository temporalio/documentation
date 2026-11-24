import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { LuGithub } from 'react-icons/lu';
import styles from './styles.module.css';

// Swizzled from @docusaurus/theme-classic. Rendered at the start of the page
// feedback row by EditMetaRow.
export default function EditThisPage({ editUrl }) {
  if (!editUrl) {
    return null;
  }

  return (
    <a href={editUrl} className={clsx(ThemeClassNames.common.editThisPage, styles.link)}>
      <LuGithub className={styles.icon} aria-hidden="true" />
      View this page on GitHub
    </a>
  );
}
