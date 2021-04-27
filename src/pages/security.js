import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export default function Security() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title="Temporal Security"
      permalink="/security"
      description="<head />"
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">Temporal security</h1>
          <p className="hero__subtitle">Our commitment</p>
        </div>
      </header>
      <main>

      </main>
      <div className={clsx('hero hero--secondary', styles.heroBanner)}>
        <div className="container">

        </div>
      </div>
    </Layout>
  );
}
