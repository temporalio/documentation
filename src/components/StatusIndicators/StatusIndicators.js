import React from 'react';
import styles from './StatusIndicators.module.css';

export const StatusIndicators = ({ items }) => {
    return (
        <div className={styles.statusIndicators}>
            {items.map((item) => (
                <div key={item.id} className={styles.statusRow}>
                    <div className={`${styles.statusDot} ${styles[item.status]}`}></div>
                    <span><strong>{item.label}:</strong> {item.value}</span>
                </div>
            ))}
        </div>
    );
};
