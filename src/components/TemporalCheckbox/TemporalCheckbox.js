import React from 'react';
import styles from './TemporalCheckbox.module.css';
import { CheckIcon } from '../icons';

export const TemporalCheckbox = ({ id, children, defaultChecked = false }) => {
    return (
        <div className={styles.temporalCheckbox}>
            <input
                type="checkbox"
                id={id}
                defaultChecked={defaultChecked}
            />
            <div className={styles.checkboxIcon}>
                <CheckIcon size={14} color="white" />
            </div>
            <label htmlFor={id}>{children}</label>
        </div>
    );
};
