import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { findActiveSdk } from '@site/src/components/SdkNav/activeSdk';
import { StylePickers, useNavStyle } from '@site/src/components/navStyle';
import styles from './styles.module.css';

const TABS = [
  { label: 'Develop', to: '/develop', match: ['/develop'] },
  { label: 'Cloud', to: '/cloud', match: ['/cloud'] },
  { label: 'Guides', to: '/guides', match: ['/guides'] },
  { label: 'AI agents', to: '/ai', match: ['/ai', '/with-ai'] },
];

function isActive(pathname, prefixes) {
  const path = pathname.replace(/\/+$/, '') || '/';
  return prefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

export default function SecondaryNav() {
  const { pathname } = useLocation();
  const navStyle = useNavStyle();

  // Inside an SDK guide the SDK row takes this row's place.
  if (findActiveSdk(pathname)) return null;

  const current = TABS.find((tab) => isActive(pathname, tab.match));

  const tabs = TABS.map((tab) => (
    <Link
      key={tab.to}
      to={tab.to}
      className={tab === current ? `${styles.tab} ${styles.tabActive}` : styles.tab}
      aria-current={tab === current ? 'page' : undefined}
    >
      {tab.label}
    </Link>
  ));

  return (
    <nav
      className={`${styles.secondaryNav} ${styles[navStyle.variant]} ${styles[navStyle.surface]}`}
      aria-label="Documentation sections"
    >
      <div className={styles.inner}>
        <div className={styles.tabs}>
          {navStyle.variant === 'segmented' ? <div className={styles.group}>{tabs}</div> : tabs}
        </div>

        <StylePickers styles={styles} {...navStyle} />
      </div>
    </nav>
  );
}
