import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { SDKS } from '@site/src/constants/sdks';
import { StylePickers, useNavStyle } from '@site/src/components/navStyle';
import styles from '@site/src/components/SecondaryNav/styles.module.css';
import { DEVELOP_SECTION, findActiveSdk } from './activeSdk';
import sdkStyles from './styles.module.css';

export default function SdkNav() {
  const activeSdk = findActiveSdk(useLocation().pathname);
  const navStyle = useNavStyle();

  if (!activeSdk) return null;

  const tabs = SDKS.map(({ id, label, icon: Icon }) => {
    const active = id === activeSdk.id;
    return (
      <Link
        key={id}
        to={`${DEVELOP_SECTION}/${id}`}
        className={active ? `${styles.tab} ${styles.tabActive}` : styles.tab}
        aria-current={active ? 'page' : undefined}
      >
        <Icon className={sdkStyles.icon} aria-hidden="true" />
        {label}
      </Link>
    );
  });

  return (
    <nav
      className={`${styles.secondaryNav} ${styles[navStyle.variant]} ${styles[navStyle.surface]}`}
      aria-label="Temporal SDKs"
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
