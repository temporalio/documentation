import React, { useState } from 'react';
import styles from './CodeComparison.module.css';

export const CodeComparison = ({ brokenLabel = "BROKEN CODE", fixedLabel = "FIXED CODE" }) => {
  const [activeTab, setActiveTab] = useState('fixed');
  
  return (
    <div className={styles.codeComparison}>
      <button 
        className={`${styles.codeToggle} ${activeTab === 'broken' ? styles.active : ''}`}
        onClick={() => setActiveTab('broken')}
      >
        {brokenLabel}
      </button>
      <button 
        className={`${styles.codeToggle} ${activeTab === 'fixed' ? styles.active : ''}`}
        onClick={() => setActiveTab('fixed')}
      >
        {fixedLabel}
      </button>
    </div>
  );
};
