import React from 'react';
import PriorityFairnessSimulator from '../PriorityFairnessSimulator';
import styles from './walkthrough.module.css';

export default function TryIt({ onNext }) {
  return (
    <div className={styles.section} style={{ maxWidth: '100%', padding: '32px 0 64px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px 24px' }}>
        <p className={styles.lead} style={{ marginBottom: '0.5rem' }}>
          Load a preset or build your own queue. Use <strong>Step</strong> to dispatch one task at a
          time and watch which task gets picked next, or <strong>Dispatch All</strong> to see the
          full order at once.
        </p>
      </div>
      <PriorityFairnessSimulator />
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <button className={styles.nextBtn} onClick={onNext}>
          How It Works
        </button>
      </div>
    </div>
  );
}
