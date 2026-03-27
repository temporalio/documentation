import React, { useState } from 'react';
import HowItWorks from './HowItWorks';
import Overview from './Overview';
import SDK from './SDK';
import TryIt from './TryIt';
import styles from './walkthrough.module.css';

const NAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'tryit', label: 'Try It' },
  { id: 'howitworks', label: 'How It Works' },
  { id: 'sdk', label: 'SDK Examples' },
];

export default function PriorityFairnessWalkthrough() {
  const [active, setActive] = useState('overview');

  function next(current) {
    const idx = NAV.findIndex((n) => n.id === current);
    if (idx < NAV.length - 1) setActive(NAV[idx + 1].id);
  }

  return (
    <div className={styles.shell}>
      <nav className={styles.nav} aria-label="Priority and Fairness walkthrough sections">
        <span className={styles.navLogo}>Priority &amp; Fairness</span>
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
      {active === 'tryit' && <TryIt onNext={() => next('tryit')} />}
      {active === 'howitworks' && <HowItWorks onNext={() => next('howitworks')} />}
      {active === 'sdk' && <SDK />}
    </div>
  );
}
