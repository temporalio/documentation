import React from 'react';
  import styles from './setup-steps.module.css';
  import CodeBlock from '@theme/CodeBlock';

  export const SetupStep = ({ children, code }) => {
    return (
      <div className={styles.setupStep}>
        <div className={styles.content}>
          {children}
        </div>
        <div className={styles.code}>
          {code}
        </div>
      </div>
    );
  };

  export const CodeSnippet = ({ language, children }) => {
    return (
      <CodeBlock language={language} showLineNumbers={false}>
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