import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

const TABS = [
  { label: 'Develop', to: '/develop', match: ['/develop'] },
  { label: 'Cloud', to: '/cloud', match: ['/cloud'] },
  { label: 'Guides', to: '/guides', match: ['/guides'] },
  { label: 'AI agents', to: '/ai', match: ['/ai', '/with-ai'] },
];

const VARIANTS = [
  { id: 'underline', label: 'A. Underline' },
  { id: 'segmented', label: 'B. Segmented' },
];

const SURFACES = [
  { id: 'surfaceFlush', label: '1. Flush' },
  { id: 'surfaceRaised', label: '2. Raised' },
  { id: 'surfaceTint', label: '3. Indigo tint' },
  { id: 'surfaceGradient', label: '4. Gradient wash' },
  { id: 'surfaceInk', label: '5. Ink' },
];

function isActive(pathname, prefixes) {
  const path = pathname.replace(/\/+$/, '') || '/';
  return prefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

// Read after mount so the server markup and first client render agree.
function useChoice(storageKey, options, fallback) {
  const [value, setValue] = useState(fallback);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored && options.some((option) => option.id === stored)) setValue(stored);
    } catch {
      // Blocked storage. Keep the default.
    }
  }, [storageKey, options]);

  const choose = (next) => {
    setValue(next);
    try {
      window.localStorage.setItem(storageKey, next);
    } catch {
      // Not worth surfacing in a POC control.
    }
  };

  return [value, choose];
}

function Picker({ value, options, onChange, label }) {
  return (
    <select className={styles.picker} value={value} onChange={(event) => onChange(event.target.value)} aria-label={label}>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default function SecondaryNav() {
  const { pathname } = useLocation();
  const [variant, chooseVariant] = useChoice('poc-secondary-nav-variant', VARIANTS, 'underline');
  const [surface, chooseSurface] = useChoice('poc-secondary-nav-surface', SURFACES, 'surfaceFlush');

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
      className={`${styles.secondaryNav} ${styles[variant]} ${styles[surface]}`}
      aria-label="Documentation sections"
    >
      <div className={styles.inner}>
        <div className={styles.tabs}>{variant === 'segmented' ? <div className={styles.group}>{tabs}</div> : tabs}</div>

        <div className={styles.pickers}>
          <Picker value={variant} options={VARIANTS} onChange={chooseVariant} label="Secondary nav style" />
          <Picker value={surface} options={SURFACES} onChange={chooseSurface} label="Secondary nav surface" />
        </div>
      </div>
    </nav>
  );
}
