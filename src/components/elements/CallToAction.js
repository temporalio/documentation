import React from 'react';
import styles from './call-to-action.module.css';

export const CallToAction = ({ href, children, buttonText, description, openInNewTab }) => {
  return (
    <a href={href} className={styles.cta} target={openInNewTab ? "_blank" : undefined} rel={openInNewTab ? "noopener noreferrer" : undefined}>
      <div className={styles.content}>
        {children || (
          <>
            {buttonText && <h3>{buttonText}</h3>}
            {description && <p>{description}</p>}
          </>
        )}
      </div>
      <div className={styles.arrow}>→</div>
    </a>
  );
};