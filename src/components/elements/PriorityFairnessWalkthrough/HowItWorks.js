import React from 'react';
import Link from '@docusaurus/Link';
import styles from './walkthrough.module.css';

const STEPS = [
  {
    title: 'Priority tier is selected first',
    body: <>Tasks at a higher priority (lower number) are always dispatched before tasks at a lower priority. Every task at priority 1 is dispatched before any task at priority 2, and so on.</>,
  },
  {
    title: 'Fairness distributes dispatches within the tier',
    body: <>Within a priority tier, tasks are dispatched proportionally by <code>fairnessWeight</code> using weighted fair dispatch. This prevents any single <code>fairnessKey</code> from dominating dispatch, even if it has a deep backlog. Fairness governs dispatch order only — it doesn't allocate Worker capacity.</>,
  },
  {
    title: <>Unkeyed tasks form one Fairness group</>,
    body: <>Tasks without a <code>fairnessKey</code> share an implicit empty-string key with a default weight of 1.0. They compete with named keys through weighted dispatch; tasks within that shared group dispatch in arrival order (FIFO).</>,
  },
  {
    title: 'Priority and Fairness are per Task Queue',
    body: <>The rules apply independently per <Link to="/encyclopedia/workers/task-queues">Task Queue</Link>. Workers on the same Task Queue share the same dispatch ordering. Workers on separate Task Queues are unaffected by each other.</>,
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
        determines which tier goes first, and Fairness distributes dispatches among keys within each
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
