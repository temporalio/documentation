import React from 'react';
import styles from './walkthrough.module.css';

const STEPS = [
  {
    title: 'Priority tier is selected first',
    body: 'Tasks at a higher priority (lower number) are always dispatched before tasks at a lower priority. Every task at priority 1 is dispatched before any task at priority 2, and so on.',
  },
  {
    title: 'Fairness distributes capacity within the tier',
    body: 'Within a priority tier, tasks are dispatched proportionally by fairness weight using a weighted round-robin mechanism. This prevents any single fairness key from hogging Worker capacity, even if it has a deep backlog.',
  },
  {
    title: 'No fairness key means FIFO within the tier',
    body: 'If no fairness key is set, tasks at the same priority level are dispatched in arrival order.',
  },
  {
    title: 'Priority and Fairness are per Task Queue',
    body: 'These rules apply within a Task Queue partition. Workers on separate Task Queues are unaffected by each other.',
  },
];

const WHEN_ROWS = [
  { scenario: 'Payments should never wait behind inventory syncs', use: 'Priority', badge: 'badgePriority' },
  { scenario: 'Premium users should not be blocked by a large free-tier tenant', use: 'Fairness', badge: 'badgeFairness' },
  { scenario: 'SLAs differ across customer tiers and tenants vary in volume', use: 'Both', badge: 'badgeBoth' },
];

export default function HowItWorks({ onNext }) {
  return (
    <div className={styles.section}>
      <p className={styles.lead}>
        When a Worker polls for the next task, Temporal applies two rules in sequence: Priority
        determines which tier goes first, and Fairness distributes capacity among keys within each
        tier.
      </p>

      <div className={styles.stepList}>
        {STEPS.map((step, i) => (
          <div key={i} className={styles.step}>
            <div className={styles.stepNum}>{i + 1}</div>
            <div className={styles.stepContent}>
              <p className={styles.stepTitle}>{step.title}</p>
              <p className={styles.stepBody}>{step.body}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className={styles.sectionHeading}>When to use Priority vs Fairness</h3>
      <table className={styles.whenTable}>
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Use</th>
          </tr>
        </thead>
        <tbody>
          {WHEN_ROWS.map((row, i) => (
            <tr key={i}>
              <td>{row.scenario}</td>
              <td>
                <span className={`${styles.badge} ${styles[row.badge]}`}>{row.use}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className={styles.nextBtn} onClick={onNext}>
        SDK Examples
      </button>
    </div>
  );
}
