import React from 'react';
import styles from './runThis.module.css';

/**
 * Wraps one or more code blocks the reader is meant to run, so they read as
 * commands rather than as sample code to study. Give each wrapped block a
 * `title=` as well: the tint is a scanning aid, but the title is what carries
 * the meaning for colourblind readers and in the Markdown output.
 */
export default function RunThis({ children }) {
  return <div className={styles.runThis}>{children}</div>;
}
RunThis.displayName = 'RunThis';
