import React from 'react';
import styles from './MissionStatus.module.css';

export const MissionStatus = ({ items }) => {
    return (
        <div className={styles.missionStatus}>
            {items.map((item) => (
                <div key={item.id} className={styles.statusCard}>
                    <div className={`${styles.statusIcon} ${styles[item.status]}`}>
                        {item.number}
                    </div>
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    );
};
