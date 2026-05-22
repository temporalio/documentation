import React, { useState } from 'react';
import styles from './TutorialCodeWalkthrough.module.css';

export function TutorialStep({ children }) {
  return children;
}
TutorialStep.displayName = 'TutorialStep';

export function TutorialCodeWalkthrough({ children }) {
  const steps = React.Children.toArray(children).filter(
    child => child?.type?.displayName === 'TutorialStep'
  );

  const [activeIdx, setActiveIdx] = useState(0);
  const active = steps[activeIdx];

  return (
    <div className={styles.shell}>
      <div className={styles.stepList}>
        {steps.map((step, i) => (
          <button
            key={i}
            className={`${styles.stepBtn} ${i === activeIdx ? styles.stepBtnActive : ''} ${i < activeIdx ? styles.stepBtnDone : ''}`}
            onClick={() => setActiveIdx(i)}
          >
            <span className={styles.stepNum}>{i + 1}</span>
            <span className={styles.stepTitle}>{step.props.title}</span>
          </button>
        ))}
      </div>

      <div className={styles.panel}>
        {active?.props?.description && (
          <p className={styles.description}>{active.props.description}</p>
        )}
        <div className={styles.codeArea}>
          {active?.props?.children}
        </div>
        <div className={styles.nav}>
          <button
            className={styles.navBtn}
            onClick={() => setActiveIdx(i => Math.max(0, i - 1))}
            disabled={activeIdx === 0}
          >
            ← Previous
          </button>
          <span className={styles.navProgress}>
            {activeIdx + 1} / {steps.length}
          </span>
          <button
            className={styles.navBtn}
            onClick={() => setActiveIdx(i => Math.min(steps.length - 1, i + 1))}
            disabled={activeIdx === steps.length - 1}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
