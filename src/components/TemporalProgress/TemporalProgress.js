import React from 'react';
import styles from './TemporalProgress.module.css';

export const TemporalProgress = ({ steps }) => {
    return (
        <div className={styles.temporalProgress}>
            {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                    <div className={`${styles.progressStep} ${styles[step.status]}`}>
                        {step.label}
                    </div>
                    {index < steps.length - 1 && (
                        <div className={styles.progressConnector}></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};
