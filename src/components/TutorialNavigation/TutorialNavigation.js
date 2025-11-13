import React from 'react';
import styles from './TutorialNavigation.module.css';

export const NextButton = ({ href, children, description }) => (
    <a href={href} className={styles.nextButton}>
        <div className={styles.nextContent}>
            <div className={styles.nextTitle}>{children}</div>
            {description && <div className={styles.nextDescription}>{description}</div>}
        </div>
        <svg className={styles.nextIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    </a>
);
