import React from 'react';
import styles from './walkthrough.module.css';

const STEPS = [
  {
    title: 'Worker polls the Task Queue',
    body: 'When a Worker is ready, it sends a poll request to the Task Queue. Temporal evaluates all waiting tasks and applies Priority and Fairness rules to decide which one to return.',
  },
  {
    title: 'Priority tier is selected first',
    body: 'Temporal finds the lowest priorityKey among all waiting tasks. Every task at priority 1 will be dispatched before any task at priority 2 moves, and so on. Tasks at the same level compete under Fairness rules.',
  },
  {
    title: 'Fairness distributes capacity within the tier',
    body: 'Within a priority tier, Temporal tracks how many tasks each fairnessKey has received relative to its fairnessWeight. The key that is furthest behind its expected share gets the next dispatch. This prevents any single tenant from consuming disproportionate capacity, even if they have a deep backlog.',
  },
  {
    title: 'No fairnessKey means strict FIFO within the tier',
    body: 'If you set priorityKey but omit fairnessKey, tasks at the same priority level are dispatched in arrival order. Fairness only applies when at least one task in the tier carries a fairnessKey.',
  },
  {
    title: 'Priority and Fairness are per Task Queue',
    body: 'The rules apply independently per Task Queue. Workers on the same Task Queue share the same dispatch ordering. Workers on separate Task Queues are unaffected by each other.',
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
        determines which tier goes first, and Fairness distributes capacity among tenants within
        each tier.
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
