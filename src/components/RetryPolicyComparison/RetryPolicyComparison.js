import React from 'react';
import styles from './RetryPolicyComparison.module.css';

export const RetryPolicyComparison = () => {
    return (
        <div className={styles.comparisonContainer}>
            <div className={styles.errorType}>
                <div className={`${styles.errorBox} ${styles.noRetry}`}>
                    <h4 className={styles.errorTitle}> Don't Retry</h4>
                    <ul className={styles.errorList}>
                        <li><strong>InvalidAccountError</strong> - Wrong account number</li>
                        <li><strong>InsufficientFundsError</strong> - Not enough money</li>
                    </ul>
                    <p className={styles.errorDescription}>
                        These are business logic errors that won't be fixed by retrying.
                    </p>
                </div>
            </div>
            <div className={styles.errorType}>
                <div className={`${styles.errorBox} ${styles.doRetry}`}>
                    <h4 className={styles.errorTitle}> Retry Automatically</h4>
                    <ul className={styles.errorList}>
                        <li><strong>Network timeouts</strong> - Temporary connectivity</li>
                        <li><strong>Service unavailable</strong> - External API down</li>
                        <li><strong>Rate limiting</strong> - Too many requests</li>
                    </ul>
                    <p className={styles.errorDescription}>
                        These are temporary issues that often resolve themselves.
                    </p>
                </div>
            </div>
        </div>
    );
};
