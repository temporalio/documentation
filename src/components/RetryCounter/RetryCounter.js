import React from 'react';
import styles from './RetryCounter.module.css';

export const RetryCounter = ({ title, attempt, maxAttempts, nextRetryIn }) => {
    const progress = (attempt / maxAttempts) * 100;

    return (
        <div className={styles.retryCounter}>
            <strong>{title}</strong>
            <div>Attempt {attempt} of {maxAttempts}</div>
            <div className={styles.retryBar}>
                <div
                    className={styles.retryProgress}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            {nextRetryIn && (
                <div className={styles.nextRetry}>Next retry in {nextRetryIn}</div>
            )}
        </div>
    );
};
