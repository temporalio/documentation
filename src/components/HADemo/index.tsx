import React, { useState } from 'react';
import EnableIt from './EnableIt';
import FailoverSection from './FailoverSection';
import HowItWorks from './HowItWorks';
import styles from './HADemo.module.css';
import Overview from './Overview';
import Quiz from './Quiz';
import ReplicationTypes from './ReplicationTypes';

type SectionId = 'overview' | 'replication' | 'howitworks' | 'failover' | 'enableit' | 'quiz';

const NAV: { id: SectionId; label: string }[] = [
  { id: 'overview', label: 'What is HA?' },
  { id: 'replication', label: 'Replication Types' },
  { id: 'howitworks', label: 'How It Works' },
  { id: 'failover', label: 'Failover' },
  { id: 'enableit', label: 'Enable It' },
  { id: 'quiz', label: 'Test Yourself' },
];

export default function HADemo() {
  const [active, setActive] = useState<SectionId>('overview');

  function next(current: SectionId) {
    const idx = NAV.findIndex((n) => n.id === current);
    if (idx < NAV.length - 1) setActive(NAV[idx + 1].id);
  }

  return (
    <div className={styles.shell}>
      <nav className={styles.nav} aria-label="High Availability demo sections">
        <span className={styles.navLogo}>Temporal HA</span>
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

      {active === 'overview' && <Overview onNext={() => next('overview')} />}
      {active === 'replication' && <ReplicationTypes onNext={() => next('replication')} />}
      {active === 'howitworks' && <HowItWorks onNext={() => next('howitworks')} />}
      {active === 'failover' && <FailoverSection onNext={() => next('failover')} />}
      {active === 'enableit' && <EnableIt onNext={() => next('enableit')} />}
      {active === 'quiz' && <Quiz />}
    </div>
  );
}
