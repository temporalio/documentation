import React from 'react';
import styles from './setup-steps.module.css';
import CodeBlock from '@theme/CodeBlock';

export const SetupStep = ({ children, code }) => {
  return (
    <div className={`${styles.setupStep} ${code ? '' : styles.noCode}`}>
      <div className={styles.content}>
        {children}
      </div>
      {code && (
        <div className={styles.code}>
          {code}
        </div>
      )}
    </div>
  );
};

export const CodeSnippet = ({ language, title, children }) => {
  return (
    <CodeBlock language={language} title={title} showLineNumbers={false}>
      {children}
    </CodeBlock>
  );
};

export const SetupSteps = ({ children }) => {
  return (
    <div className={styles.setupSteps}>
      {children}
    </div>
  );
};