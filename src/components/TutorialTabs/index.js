import React, { useState } from 'react';
import styles from './TutorialTabs.module.css';

export function TutorialTab({ children }) {
  return children;
}
TutorialTab.displayName = 'TutorialTab';

export function TutorialTabs({ children }) {
  const tabs = React.Children.toArray(children).filter(
    child => child?.type?.displayName === 'TutorialTab'
  );

  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabBar}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`${styles.tab} ${i === activeIdx ? styles.tabActive : ''} ${i < activeIdx ? styles.tabDone : ''}`}
            onClick={() => setActiveIdx(i)}
          >
            <span className={styles.tabNum}>{i + 1}</span>
            {tab.props.label}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {tabs[activeIdx]?.props?.children}
      </div>
    </div>
  );
}
