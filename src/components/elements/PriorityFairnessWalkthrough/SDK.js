import React from 'react';
import Link from '@docusaurus/Link';
import styles from './walkthrough.module.css';

const FEATURE_LINKS = [
  { name: 'How to use Priority', link: '/develop/task-queue-priority-fairness#how-to-use-priority' },
  { name: 'How to use Fairness', link: '/develop/task-queue-priority-fairness#how-to-use-fairness' },
];

export default function SDK() {
  return (
    <div className={styles.section}>
      <p className={styles.lead}>
        Set a priority key, fairness key, or both when starting Workflows or
        scheduling Activities. Priority and Fairness are enabled by default - no configuration
        required for Temporal Cloud or self-hosted clusters running Temporal 1.26+.
      </p>

      <div className={styles.sdkGrid}>
        {FEATURE_LINKS.map((feature) => (
          <div key={feature.name} className={styles.sdkCard}>
            <h4 className={styles.sdkCardTitle}>{feature.name}</h4>
            <Link to={feature.link} className={styles.sdkCardLink}>
              View examples →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
