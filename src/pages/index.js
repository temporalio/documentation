import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import { ResponsivePlayer } from '../components';

const features = [
  {
    title: <>Server management</>,
    imageUrl: 'img/server.png',
    description: (
      <>Deploy and manage your own instance of the Temporal Server.</>
    ),
    goto: '/docs/server/introduction',
  },
  {
    title: <>Application development</>,
    imageUrl: 'img/layers.png',
    description: (
      <>Use SDK tutorials and references in the language of your choice.</>
    ),
    goto: '/application-development',
  },
  {
    title: <>System tools</>,
    imageUrl: 'img/settings.png',
    description: <>Visualize and debug using the Temporal Web UI and CLI.</>,
    goto: '/docs/system-tools/introduction',
  },
];

function Feature({ imageUrl, title, description, goto }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.featuresMarginBottom)}>
      <h3>{title}</h3>
      <Link to={useBaseUrl(goto)}>
        {imgUrl && (
          <div className='text--center'>
            <img className={styles.featureImage} src={imgUrl} alt={title} />
          </div>
        )}
      </Link>
      <p>{description}</p>
      <div className={styles.buttons}>
        <Link
          className={clsx(
            'button button--outline button--primary button--md',
            styles.getStarted
          )}
          to={useBaseUrl(goto)}
        >
          Get Started
        </Link>
      </div>
      <div className={styles.spacer}></div>
    </div>
  );
}

const levelTwoFeatures = [
  {
    title: <>External resources</>,
    description: <>Check out what the community is saying.</>,
    goto: '/docs/external-resources',
  },
  {
    title: <>Case studies</>,
    description: <>Big names use Temporal for important business processes.</>,
    goto: '/blog/tags/case-study',
  },
  {
    title: <>Migrating from Cadence?</>,
    description: <>There are key differences between the systems.</>,
    goto: '/docs/cadence-to-temporal',
  },
];

function LevelTwoFeature({ title, description, goto }) {
  return (
    <div className={clsx('col col--4', styles.featuresMarginBottom)}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.buttons}>
        <Link
          className={clsx(
            'button button--outline button--primary button--md',
            styles.getStarted
          )}
          to={useBaseUrl(goto)}
        >
          Learn more
        </Link>
      </div>
      <div className={styles.spacer}></div>
    </div>
  );
}

function SelectTutorial() {
  const [clicked, setClicked] = React.useState(false);
  return (
    <div className='flex flex-col sm:flex-row justify-between mb-8 sm:mb-8 items-center'>
      {clicked ? (
        <div className='inline-flex md:-mt-8'>
          <a className='mr-8' href='/docs/go/run-your-first-app-tutorial'>
            <img
              aria-label='go SDK'
              className={styles.sdkTakeMeToTutorialLogo}
              src={useBaseUrl('img/logo-go.png')}
              alt='logo'
            />
          </a>
          <a className='' href='/docs/java-run-your-first-app'>
            <img
              aria-label='java SDK'
              className={styles.sdkTakeMeToTutorialLogo}
              src={useBaseUrl('img/logo-java.png')}
              alt='logo'
            />
          </a>
        </div>
      ) : (
        <button
          className={clsx(
            'button button--outline button--secondary button--lg',
            styles.getStarted
          )}
          onClick={() => setClicked(true)}
        >
          Run my first app! →
        </button>
      )}
    </div>
  );
}

function TemporalCloud() {
  return (
    <div className={styles.formFeature}>
      <h2>☁️ Temporal Cloud</h2>
      <p>
        Temporal Cloud is a fully managed cloud offering from the company behind
        Temporal's open source. We offer:
        <ul>
          <li>
            <strong>Updates</strong>: Automatic updates with latest releases.
          </li>
          <li>
            <strong>Experience</strong>: Have run this technology in production
            since our origins at Uber.
          </li>
          <li>
            <strong>Scale</strong>: Our design partners are
            multi-tens-of-billion valuation publicly listed companies.
          </li>
          <li>
            <strong>Dependencies</strong>: No more managing dependencies like
            Elasticsearch, Cassandra or MySQL.
          </li>
          <li>
            <strong>Prioritization</strong>: Dedicated channels for support and
            product feedback.
          </li>
          <li>
            <strong>Future improvements</strong>: to be discussed as needed
          </li>
        </ul>
      </p>
      <p>
        Temporal Cloud is working with early design partners today. Sign up to
        the waitlist and to receive updates!
      </p>
      <form
        action='https://temporal.us17.list-manage.com/subscribe/post?u=2334a0f23e55fd1840613755d&amp;id=bbbbd4709f'
        method='post'
        id='mc-embedded-subscribe-form'
        name='mc-embedded-subscribe-form'
        target='_blank'
        noValidate='novalidate'
        className='validate'
      >
        <div id='mc_embed_signup_scroll' className='signup_controls'>
          <div className='email_wrap'>
            <label htmlFor='mce-EMAIL' className='sr-only'>
              Email:
            </label>
            <input
              className='signUpInput'
              type='email'
              name='EMAIL'
              id='mce-EMAIL'
              placeholder='Your email'
              required='required'
            />
          </div>
          <span className='cta_text' style={{ display: 'none' }}>
            You are in the waitlist!
          </span>
          <input
            type='submit'
            name='waitlist'
            id='mc-embedded-waitlist'
            className={clsx(
              'button button--outline button-secondary button--md',
              styles.cloudWaitlistSubmit
            )}
          />
        </div>
      </form>
    </div>
  );
}

export default function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout title={`${siteConfig.title}`} description={`${siteConfig.tagline}`}>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className='container'>
          <h1 className='hero__title'>{siteConfig.title}</h1>
          <p className='hero__subtitle'>{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <SelectTutorial />
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className='container'>
              <div className='row'>
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <div
        className={clsx('hero hero--secondary container', styles.heroSecondRow)}
      >
        <div className='container'>
          <h2>🍎 Core concepts</h2>
          <p>Review some of Temporal's core concepts and building blocks.</p>
          <ul>
            <li>
              <Link to={useBaseUrl('/docs/concepts/introduction')}>
                {' '}
                Introduction{' '}
              </Link>
            </li>
            <li>
              <Link to={useBaseUrl('/docs/concepts/workflows')}>
                {' '}
                Workflows{' '}
              </Link>
            </li>
            <li>
              <Link to={useBaseUrl('/docs/concepts/activities')}>
                {' '}
                Activities{' '}
              </Link>
            </li>
            <li>
              <Link to={useBaseUrl('/docs/concepts/workers')}> Workers </Link>
            </li>
            <li>
              More:{' '}
              <Link to={useBaseUrl('/docs/concepts/task-queues')}>
                {' '}
                Task Queues
              </Link>
              , <Link to={useBaseUrl('/docs/concepts/signals')}>
                {' '}
                Signals
              </Link>,{' '}
              <Link to={useBaseUrl('/docs/concepts/queries')}>Queries </Link>
            </li>
          </ul>
        </div>
        <div className='container'>
          <h2>🔥 Additional Resources</h2>
          <p>
            Everything else to help you learn Temporal and pitch it internally.
          </p>
          <ul>
            <li>
              <Link to={useBaseUrl('/docs/external-resources')}>
                {' '}
                External Resources{' '}
              </Link>{' '}
              - Why Temporal, Tutorials, How It Works
            </li>
            <li>
              <Link to={useBaseUrl('/blog/tags/case-study')}>
                {' '}
                Case Studies{' '}
              </Link>{' '}
              - Big names use Temporal for big things!
            </li>
            <li>
              <Link to={useBaseUrl('/docs/cadence-to-temporal')}>
                {' '}
                Migrate from Cadence{' '}
              </Link>{' '}
              - There are key differences, but it's easy!
            </li>
          </ul>
        </div>
      </div>
      <div className='container'>
        <TemporalCloud />
      </div>
    </Layout>
  );
}
