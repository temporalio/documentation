import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import { ResponsivePlayer } from '../components'

const features = [
  {
    title: <>Server management</>,
    imageUrl: 'img/server.png',
    description: (
      <>
        Deploy and manage your own instance of the Temporal Server.
      </>
    ),
    goto: '/docs/server-introduction',
  },
  {
    title: <>Temporal Cloud</>,
    imageUrl: 'img/cloud.png',
    description: (
      <>
        Let us handle the hard part so you can focus on code.
      </>
    ),
    goto: '/docs/cloud-introduction',
  },
  {
    title: <>Application development</>,
    imageUrl: 'img/layers.png',
    description: (
      <>
        Start building invincible applications in the language of your choice!
      </>
    ),
    goto: '/application-development',
  },
  {
    title: <>System tools</>,
    imageUrl: 'img/settings.png',
    description: (
      <>
        Use our tooling to visualize and manage different aspects of your system.
      </>
    ),
    goto: '/docs/sdks-introduction',
  },
];

function Feature({imageUrl, title, description, goto}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--3', styles.feature)}>
      <h3>{title}</h3>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
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

export default function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description={`${siteConfig.tagline}`}>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
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
      <div className="container">
        <ResponsivePlayer url='https://www.youtube.com/watch?v=f-18XztyN6c'/>
      </div>
    </Layout>
  );
}
