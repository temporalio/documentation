import React from 'react';
import styles from './view-source-code-notice.module.css';

export const ViewSourceCodeNotice = ({ href }) => (
  <div className={styles.container}>
    <a href={href} className={styles.link}>
      View the source code
    </a>{' '}
    in the context of the rest of the application code.
  </div>
);
