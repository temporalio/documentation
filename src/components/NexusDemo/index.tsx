import React, { useState } from 'react';
import BuildIt from './BuildIt';
import ComponentsSection from './ComponentsSection';
import HowItWorks from './HowItWorks';
import styles from './NexusDemo.module.css';
import Overview from './Overview';
import Quiz from './Quiz';
import RunIt from './RunIt';

type SectionId = 'overview' | 'components' | 'howitworks' | 'runit' | 'buildit' | 'quiz';

const NAV: { id: SectionId; label: string }[] = [
  { id: 'overview', label: 'What is Nexus?' },
  { id: 'components', label: 'Components' },
  { id: 'howitworks', label: 'How It Works' },
  { id: 'runit', label: 'Run It' },
  { id: 'buildit', label: 'Build It' },
  { id: 'quiz', label: 'Test Yourself' },
];

export default function NexusDemo() {
  const [active, setActive] = useState<SectionId>('overview');

  function next(current: SectionId) {
    const idx = NAV.findIndex((n) => n.id === current);
    if (idx < NAV.length - 1) setActive(NAV[idx + 1].id);
  }

  return (
    <div className={styles.shell}>
      <nav className={styles.nav} aria-label="Nexus demo sections">
        <span className={styles.navLogo}>Temporal Nexus</span>
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
      {active === 'components' && <ComponentsSection onNext={() => next('components')} />}
      {active === 'howitworks' && <HowItWorks onNext={() => next('howitworks')} />}
      {active === 'runit' && <RunIt onNext={() => next('runit')} />}
      {active === 'buildit' && <BuildIt onNext={() => next('buildit')} />}
      {active === 'quiz' && <Quiz />}
    </div>
  );
}
