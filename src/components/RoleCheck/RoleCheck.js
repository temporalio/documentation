import React from 'react';
import styles from './RoleCheck.module.css';

/**
 * A ✅ for a role or permission grid that also carries the role name as text.
 *
 * Sighted readers see only the check mark. Screen readers read the role name
 * instead of "check mark", and scrapers that chunk long tables (Kapa, search
 * indexers) keep the role name with the row after the header row is split off.
 *
 * The Markdown pipeline renders it as "✅ <role>" (see scripts/mdx-to-md.mjs).
 */
export default function RoleCheck({ role }) {
  return (
    <span>
      <span aria-hidden="true">✅</span>
      <span className={styles.hidden}> {role}</span>
    </span>
  );
}
