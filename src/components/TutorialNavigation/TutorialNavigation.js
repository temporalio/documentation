import React from 'react';
import styles from './TutorialNavigation.module.css';

export const BackButton = ({ href, children }) => (
    <a href={href} className={styles.backButton}>
        <svg className={styles.backIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {children}
    </a>
);

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

export const TutorialProgress = ({ currentStep, totalSteps, stepTitle }) => (
    <div className={styles.tutorialProgress}>
        <div className={styles.progressHeader}>
            <span className={styles.stepIndicator}>Part {currentStep} of {totalSteps}</span>
            <span className={styles.stepTitle}>{stepTitle}</span>
        </div>
        <div className={styles.progressBar}>
            <div
                className={styles.progressFill}
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
        </div>
    </div>
);
