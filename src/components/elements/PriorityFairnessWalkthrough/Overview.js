import React from 'react';
import Link from '@docusaurus/Link';
import styles from './walkthrough.module.css';

const PILLS = [
  { label: 'P1', desc: 'Critical', bg: '#ef4444', fg: '#fff' },
  { label: 'P2', desc: 'High', bg: '#f97316', fg: '#fff' },
  { label: 'P3', desc: 'Normal (default)', bg: '#3b82f6', fg: '#fff' },
  { label: 'P4', desc: 'Low', bg: '#22c55e', fg: '#000' },
  { label: 'P5', desc: 'Batch', bg: '#94a3b8', fg: '#fff' },
];

export default function Overview({ onNext }) {
  return (
    <div className={styles.section}>
      <p className={styles.lead}>
        The core idea of{' '}
        <Link to="/develop/task-queue-priority-fairness">Task Queue Priority and Fairness</Link>{' '}
        is that when tasks from different workloads compete for the same Workers, Priority controls 
        which ones get picked first, and Fairness ensures no single tenant can block others by using 
        all the resources.
      </p>

      <div className={styles.featureGrid}>
        {/* Priority card */}
        <div className={styles.featureCard}>
          <div className={styles.featureCardHeader}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
              <path d="M3 3h18v3.5H3V3zm0 7.25h13v3.5H3v-3.5zm0 7.25h8v3.5H3v-3.5z" fill="url(#ov-prio-grad)" />
              <defs>
                <linearGradient id="ov-prio-grad" x1="21" y1="3" x2="3" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1FF1A5" />
                  <stop offset="1" stopColor="#C3FF62" />
                </linearGradient>
              </defs>
            </svg>
            <strong className={styles.featureCardTitle}>Priority</strong>
          </div>
          <p className={styles.featureCardBody}>
            Tasks carry a priority key from 1 (highest) to 5 (lowest), defaulting to 3.
            Higher-priority tasks are always dispatched before lower-priority ones; within the same
            priority level, tasks are dispatched in arrival order (FIFO).
          </p>
        </div>

        {/* Fairness card */}
        <div className={styles.featureCard}>
          <div className={styles.featureCardHeader}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
              <path
                d="M11 2h2v3.5h-2V2zm0 16.5h2V22h-2v-3.5zM4 7.5h7v9H4v-9zm9 0h7v9h-7v-9zm-2 1.5H4.5V8H11v1zM13 8h6.5v1H13V8z"
                fill="url(#ov-fair-grad)"
              />
              <defs>
                <linearGradient id="ov-fair-grad" x1="21" y1="2" x2="3" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1FF1A5" />
                  <stop offset="1" stopColor="#C3FF62" />
                </linearGradient>
              </defs>
            </svg>
            <strong className={styles.featureCardTitle}>Fairness</strong>
          </div>
          <p className={styles.featureCardBody}>
            Without Fairness, tasks at the same priority dispatch in FIFO order, so a backlog-heavy
            tenant can hog Worker capacity and delay everyone else at that level. Fairness groups
            tasks by a fairness key and dispatches them proportionally by fairness weight. A key with
            weight 2.0 is dispatched twice as often as a key with the default weight of 1.0.
          </p>
        </div>
      </div>

      <p className={styles.useBoth}>
        Use both together when you need SLA ordering across workload types and fair distribution
        across tenants within each tier.
      </p>

      <div className={styles.pillStrip}>
        {PILLS.map(({ label, desc, bg, fg }) => (
          <div key={label} className={styles.pill} style={{ background: bg, color: fg }}>
            {label} · {desc}
          </div>
        ))}
      </div>

      <button className={styles.nextBtn} onClick={onNext}>
        Try It
      </button>
    </div>
  );
}
