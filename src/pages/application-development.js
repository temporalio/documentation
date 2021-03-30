import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Go</>,
    imageUrl: 'img/go-lang.svg',
    description: (
      <>
        Deploy and manage your own instance of the Temporal Server.
      </>
    ),
    goto: '/docs/server-introduction',
  },
  {
    title: <>Java</>,
    imageUrl: 'img/java.svg',
    description: (
      <>
        Let us handle the hard part so you can focus on code.
      </>
    ),
    goto: '/docs/cloud-introduction',
  },
  {
    title: <>PHP</>,
    imageUrl: 'img/php.svg',
    description: (
      <>
        Start building invincible applications in the language of your choice!
      </>
    ),
    goto: '/docs/sdks-introduction',
  },
];

function Feature({imageUrl, title, description, goto}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.buttons}>
        <Link
        className={clsx(
          'button button--outline button--primary button--md',
          styles.getStarted,
        )}
        to={useBaseUrl(goto)}>
        Get Started
        </Link>
      </div>
      <div className={styles.spacer}>
      </div>
    </div>
  );
}

export default function ApplicationDevelopment() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title="Temporal application development"
      permalink="/application-development"
      description="Description will go into a meta tag in <head />">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">Application development</h1>
          <p className="hero__subtitle">Choose your language</p>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
