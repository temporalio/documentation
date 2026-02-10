import React from 'react';
import Link from '@docusaurus/Link';
import styles from './TemporalProgress.module.css';

export const TemporalProgress = ({ steps }) => {
    return (
        <div className={styles.temporalProgress}>
            {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                    {step.href ? (
                        <Link 
                            to={step.href} 
                            className={`${styles.progressStep} ${styles[step.status]}`}
                        >
                            {step.label}
                        </Link>
                    ) : (
                        <div className={`${styles.progressStep} ${styles[step.status]}`}>
                            {step.label}
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};
