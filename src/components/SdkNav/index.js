import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { SDKS } from '@site/src/constants/sdks';
import { DEVELOP_SECTION, findActiveSdk } from './activeSdk';
import styles from './styles.module.css';

export default function SdkNav() {
  const activeSdk = findActiveSdk(useLocation().pathname);

  if (!activeSdk) return null;

  return (
    <nav className={styles.sdkNav} aria-label="Temporal SDKs">
      <div className={styles.inner}>
        <div className={styles.group}>
          {SDKS.map(({ id, label, icon: Icon }) => {
            const active = id === activeSdk.id;
            return (
              <Link
                key={id}
                to={`${DEVELOP_SECTION}/${id}`}
                className={active ? `${styles.sdk} ${styles.sdkActive}` : styles.sdk}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className={styles.icon} aria-hidden="true" />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
