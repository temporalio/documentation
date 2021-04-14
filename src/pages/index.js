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
        Get started deploying and manage your own instance of the Temporal Server.
      </>
    ),
    goto: '/docs/server-introduction',
  },
  {
    title: <>Application development</>,
    imageUrl: 'img/layers.png',
    description: (
      <>
        Get started building applications using SDK tutorials and references in the language of your choice!
      </>
    ),
    goto: '/application-development',
  },
  {
    title: <>System tools</>,
    imageUrl: 'img/settings.png',
    description: (
      <>
        Use the Temporal Web UI and <code>tctl</code> to visualize, debug, and manage different aspects of your system.
      </>
    ),
    goto: '/docs/system-tooling-introduction',
  },
];

function Feature({imageUrl, title, description, goto}) {
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
    description: (
      <>
        Check out what the community is saying.
      </>
    ),
    goto: '/docs/external-resources',
  },
  {
    title: <>Case studies</>,
    description: (
      <>
        Big names use Temporal for important business processes.
      </>
    ),
    goto: '/blog/tags/case-study',
  },
  {
    title: <>Migrating from Cadence?</>,
    description: (
      <>
        Check out the key differences between the systems.
      </>
    ),
    goto: '/docs/cadence-to-temporal',
  },
]

function LevelTwoFeature({title, description, goto}) {
  return (
    <div className={clsx('col col--4')}>
      <h3>{title}</h3>
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

function SelectTutorial() {
  const [clicked, setClicked] = React.useState(false);
  return (
    <div className="flex flex-col sm:flex-row justify-between mb-8 sm:mb-8 items-center">
      {clicked ? (
        <div className="inline-flex md:-mt-8">
          <a className="mr-8" href="/docs/go-run-your-first-app">
            <img
              aria-label="go SDK"
              className={styles.sdkTakeMeToTutorialLogo}
              src={useBaseUrl("img/logo-go.png")}
              alt="logo"
            />
          </a>
          <a className="" href="/docs/java-run-your-first-app">
            <img
              aria-label="java SDK"
              className={styles.sdkTakeMeToTutorialLogo}
              src={useBaseUrl("img/logo-java.png")}
              alt="logo"
            />
          </a>
        </div>
      ) : (
        <button
          className={clsx('button button--outline button--secondary button--lg',
          styles.getStarted,
          )}
          onClick={() => setClicked(true)} >
          Run my first app! →
        </button>
      )}
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
            <SelectTutorial />
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
          <h2>Core concepts</h2>
          <div className="text--center">
            <img className={styles.featureImage} src={useBaseUrl("img/concept-map.svg")} alt="concepts" />
          </div>
          <p>Get started by reviewing some of Temporal's core concepts and building blocks.</p>
          <div className={styles.buttons}>
            <Link
            className={clsx(
              'button button--outline button--primary button--md',
              styles.getStarted,
            )}
            to={useBaseUrl("/docs/concept-overview")}>
            Learn more
            </Link>
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
      <div className="container">
        <div className={styles.formFeature}>
          <h2 className="text-3xl font-bold mb-4">Temporal Cloud</h2>
          <p className="w-56 lg:w-700 mb-8">
            Temporal Cloud is coming soon. Sign up to the waitlist and to receive updates.
          </p>
          <form
            action="https://temporal.us17.list-manage.com/subscribe/post?u=2334a0f23e55fd1840613755d&amp;id=bbbbd4709f"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            target="_blank"
            noValidate="novalidate"
            className="validate">
            <div id="mc_embed_signup_scroll" className="signup_controls">
              <div className="email_wrap">
                <label htmlFor="mce-EMAIL" className="sr-only">
                  Email:
                </label>
                <input
                  className="signUpInput"
                  type="email"
                  name="EMAIL"
                  id="mce-EMAIL"
                  placeholder="Your email"
                  required="required"
                />
              </div>
              <span className="cta_text" style={{ display: 'none' }}>
                You are in the waitlist!
              </span>
              <input
                type="submit"
                name="waitlist"
                id="mc-embedded-waitlist"
                className={clsx("button button--outline button-secondary button--md", styles.cloudWaitlistSubmit)}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
