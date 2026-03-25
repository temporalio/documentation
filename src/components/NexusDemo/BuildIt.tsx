import CodeBlock from '@theme/CodeBlock';
import React, { useState } from 'react';
import styles from './NexusDemo.module.css';
import { buildSteps } from './buildSteps';

type Props = { onNext: () => void };

export default function BuildIt({ onNext }: Props) {
  const [idx, setIdx] = useState(0);
  const step = buildSteps[idx];

  function go(next: number) {
    setIdx(Math.max(0, Math.min(buildSteps.length - 1, next)));
  }

  return (
    <div className={styles.section}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: '71%' }} />
      </div>

      <h1>Build It Step by Step</h1>
      <p className={styles.lead}>
        Real code from{' '}
        <a
          href="https://github.com/temporalio/samples-dotnet/tree/main/src/NexusSimple"
          target="_blank"
          rel="noopener noreferrer"
        >
          samples-dotnet/NexusSimple
        </a>
        . Walk through building a cross-namespace Nexus service from scratch.
      </p>

      <div className={styles.buildLayout}>
        {/* Step list sidebar */}
        <nav className={styles.buildStepList} aria-label="Build steps">
          {buildSteps.map((s, i) => (
            <button
              key={i}
              className={`${styles.buildStepBtn} ${i === idx ? styles.buildStepBtnActive : ''}`}
              onClick={() => setIdx(i)}
              aria-current={i === idx ? 'step' : undefined}
            >
              <div className={styles.buildStepNum}>{s.num}</div>
              <div className={styles.buildStepTitle}>{s.title}</div>
            </button>
          ))}
        </nav>

        {/* Code panel */}
        <div className={styles.buildPanel}>
          <div className={styles.buildFileHeader}>{step.file}</div>
          <CodeBlock language={step.language}>{step.code}</CodeBlock>
          <div className={styles.buildNote}>{step.note}</div>
          <div className={styles.buildNav}>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={() => go(idx - 1)}
              disabled={idx === 0}
            >
              ← Prev
            </button>
            <button
              className={styles.btn}
              onClick={() => go(idx + 1)}
              disabled={idx === buildSteps.length - 1}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      <div className={styles.nextRow}>
        <button className={styles.btn} onClick={onNext}>
          Next: Test Yourself →
        </button>
      </div>
    </div>
  );
}
