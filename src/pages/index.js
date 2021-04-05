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
    goto: '/docs/system-tooling-introduction',
  },
];

function Feature({imageUrl, title, description, goto}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--3')}>
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

const levelTwoFeatures = [
  {
    title: <>External resources</>,
    imageUrl: 'img/foreign.svg',
    description: (
      <>
        Check out what the community is saying.
      </>
    ),
    goto: '/docs/external-resources',
  },
  {
    title: <>Case studies</>,
    imageUrl: 'img/case-study.svg',
    description: (
      <>
        Big names use Temporal for important business processes.
      </>
    ),
    goto: '/blog/tags/case-study',
  },
  {
    title: <>Migrating from Cadence?</>,
    imageUrl: 'img/finish.svg',
    description: (
      <>
        Check out the key differences between the systems.
      </>
    ),
    goto: '/docs/cadence-to-temporal',
  },
]

function LevelTwoFeature({imageUrl, title, description, goto}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4')}>
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
        Learn more
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
              to={useBaseUrl('/application-development')}>
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
      <div className={clsx('hero hero--secondary', styles.heroBanner)}>
        <div className="container">
          <div className="row">
            <div className={clsx('col col-4', styles.textFeature)}>
              <h4>Modern problems</h4>
              <p>Have you ever developed an application that needed to respond to multiple asynchronous events, communicate with unreliable external resources, or track the state of something very complex?</p>
              <p>If so, you are likely familiar with the mixture of stateless services, databases, cron jobs, and queuing systems that is the modern approach to building such applications. And you are likely familiar with some of the problems they come with.</p>
              <ol>
                <li>It is difficult to maintain the health of each individual component.</li>
                <li>A large investment that has to be made in infrastructure to visualize the health of the overall system, define timeouts, and orchestrate retries.</li>
                <li>Scaling and maintaining these systems is challenging and costly effort.</li>
              </ol>
            </div>
            <div className={clsx('col col-4')}>
              <div className={clsx(styles.videoContainer)}>
                <ResponsivePlayer url='https://www.youtube.com/watch?v=f-18XztyN6c'/>
              </div>
            </div>
            <div className={clsx('col col-4', styles.textFeature)}>
              <h4>The Temporal solution</h4>
              <p>The Temporal solution is a fault-oblivious stateful programming model that hides or abstracts most of the complexities mentioned above.
              It consists of a programming framework (Temporal SDK) and a backend service (Temporal Server).</p>
              <p> The <a href="/docs/server-introduction"> Temporal Server</a> provides a durable virtual memory that is not linked to any specific process.
              It preserves the full application state (including function stacks with local variables) across all kinds of hosting and software related failures.</p>
              <p>A <a hef="/application-development">Temporal SDK</a> then enables you to write your application code using the full power of the programming language, while the Temporal Server handles the durability, availability, and scalability of the application.</p>
            </div>
          </div>
        </div>
      </div>
      <main>
        {levelTwoFeatures && levelTwoFeatures.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {levelTwoFeatures.map((props, idx) => (
                  <LevelTwoFeature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
