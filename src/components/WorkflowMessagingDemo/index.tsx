import React, { useState } from 'react';
import BuildIt from './BuildIt';
import HowItWorks from './HowItWorks';
import MessageTypes from './MessageTypes';
import Overview from './Overview';
import Quiz from './Quiz';
import styles from './WorkflowMessagingDemo.module.css';

type SectionId = 'overview' | 'types' | 'howitworks' | 'buildit' | 'quiz';

const NAV: { id: SectionId; label: string }[] = [
  { id: 'overview',   label: 'What is it?' },
  { id: 'types',      label: 'Message Types' },
  { id: 'howitworks', label: 'How It Works' },
  { id: 'buildit',    label: 'Build It' },
  { id: 'quiz',       label: 'Test Yourself' },
];

export default function WorkflowMessagingDemo() {
  const [active, setActive] = useState<SectionId>('overview');

  function next(current: SectionId) {
    const idx = NAV.findIndex((n) => n.id === current);
    if (idx < NAV.length - 1) setActive(NAV[idx + 1].id);
  }

  return (
    <div className={styles.shell}>
      <nav className={styles.nav} aria-label="Workflow messaging demo sections">
        <span className={styles.navLogo}>Workflow Messaging</span>
        {NAV.map((item) => (
          <button
            key={item.id}
            className={`${styles.navBtn} ${active === item.id ? styles.navBtnActive : ''}`}
            onClick={() => setActive(item.id)}
            aria-current={active === item.id ? 'page' : undefined}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {active === 'overview'   && <Overview    onNext={() => next('overview')} />}
      {active === 'types'      && <MessageTypes onNext={() => next('types')} />}
      {active === 'howitworks' && <HowItWorks  onNext={() => next('howitworks')} />}
      {active === 'buildit'    && <BuildIt      onNext={() => next('buildit')} />}
      {active === 'quiz'       && <Quiz />}
    </div>
  );
}
