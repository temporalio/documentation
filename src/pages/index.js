import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
// import {ResponsivePlayer} from "../components";

const features = [
  {
    title: <>Server management</>,
    imageUrl: "img/server.png",
    description: (
      <>Deploy and manage your own instance of the Temporal Server.</>
    ),
    goto: "/docs/server/introduction",
  },
  {
    title: <>Application development</>,
    imageUrl: "img/layers.png",
    description: (
      <>Find SDK tutorials and API references in the language of your choice.</>
    ),
    goto: "/application-development",
  },
  {
    title: <>System tools</>,
    imageUrl: "img/settings.png",
    description: <>Visualize and debug using the Temporal Web UI and CLI.</>,
    goto: "/docs/system-tools/introduction",
  },
];

function Feature({imageUrl, title, description, goto}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4", styles.featuresMarginBottom)}>
      <h3>{title}</h3>
      <Link to={useBaseUrl(goto)}>
        {imgUrl && (
          <div className="text--center">
            <img className={styles.featureImage} src={imgUrl} alt={title} />
          </div>
        )}
      </Link>
      <p>{description}</p>
      <div className={styles.buttons}>
        <Link
          className={clsx(
            "button button--outline button--primary button--md",
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

function SelectTutorial() {
  const [clicked, setClicked] = React.useState(false);
  return (
    <div>
      <div>
        <div className={styles.buttons}>
          <button
            onClick={() => setClicked(!clicked)}
            className={clsx(
              "button button--outline button--secondary button--lg",
              styles.getStarted
            )}
          >
            Run my first app! →
          </button>
        </div>
        {clicked && (
          <div>
            <a href="/docs/go/run-your-first-app-tutorial">
              <img
                aria-label="go SDK"
                className={styles.sdkTakeMeToTutorialLogo}
                src={useBaseUrl("img/go-lang.svg")}
                alt="logo"
              />
            </a>
            <a href="/docs/java-run-your-first-app">
              <img
                aria-label="java SDK"
                className={styles.sdkTakeMeToTutorialLogo}
                src={useBaseUrl("img/java.svg")}
                alt="logo"
              />
            </a>
            <a href="/docs/php/introduction">
              <img
                aria-label="php SDK"
                className={styles.sdkTakeMeToTutorialLogo}
                src={useBaseUrl("img/php.svg")}
                alt="logo"
              />
            </a>
            <a href="/docs/node/hello-world">
              <img
                aria-label="node SDK"
                className={styles.sdkTakeMeToTutorialLogo}
                src={useBaseUrl("img/nodejs.svg")}
                alt="logo"
              />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function TemporalCloud() {
  return (
    <div className={styles.formFeature}>
      <h2 id="cloud">☁️ Temporal Cloud</h2>
      <p>
        Temporal Cloud is a fully managed cloud offering of the open-source
        Server. What are we offering?
      </p>
      <p>
        <ul>
          <li>
            <strong>Updates</strong>: Automatic updates with latest releases.
          </li>
          <li>
            <strong>Experience</strong>: Our team has years of experience
            operating the technology in production environments.
          </li>
          <li>
            <strong>Scale</strong>: Our design partners are multibillion dollar
            publicly listed companies.
          </li>
          <li>
            <strong>Dependencies</strong>: No more managing dependencies like
            Elasticsearch, Cassandra or MySQL.
          </li>
          <li>
            <strong>Prioritization</strong>: Dedicated channels for support and
            product feedback.
          </li>
        </ul>
      </p>
      <p>
        Temporal Cloud is working with early design partners today. Sign up to
        the waitlist and receive updates!
      </p>

      <Link
        className={clsx(
          "button button--outline button--primary button--md",
          styles.getStarted
        )}
        to={
          "https://us17.list-manage.com/survey?u=2334a0f23e55fd1840613755d&id=f1895b6f4a"
        }
      >
        Book your place
      </Link>
    </div>
  );
}

export default function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout title={`${siteConfig.title}`} description={`${siteConfig.tagline}`}>
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <SelectTutorial />
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
      <div
        className={clsx("hero hero--secondary container", styles.heroSecondRow)}
      >
        <div className="container">
          <h2>🍎 Core concepts</h2>
          <p>Review some of Temporal's core concepts and building blocks.</p>
          <ul>
            <li>
              <Link to={useBaseUrl("/docs/concepts/introduction")}>
                {" "}
                Introduction{" "}
              </Link>
            </li>
            <li>
              <Link to={useBaseUrl("/docs/concepts/workflows")}>
                {" "}
                Workflows{" "}
              </Link>
            </li>
            <li>
              <Link to={useBaseUrl("/docs/concepts/activities")}>
                {" "}
                Activities{" "}
              </Link>
            </li>
            <li>
              <Link to={useBaseUrl("/docs/concepts/workers")}> Workers </Link>
            </li>
            <li>
              More:{" "}
              <Link to={useBaseUrl("/docs/concepts/task-queues")}>
                {" "}
                Task Queues
              </Link>
              , <Link to={useBaseUrl("/docs/concepts/signals")}>
                {" "}
                Signals
              </Link>,{" "}
              <Link to={useBaseUrl("/docs/concepts/queries")}>Queries </Link>
            </li>
          </ul>
        </div>
        <div className="container">
          <h2>🔥 Additional Resources</h2>
          <p>
            Everything else to help you learn Temporal and pitch it internally.
          </p>
          <ul>
            <li>
              <Link to={useBaseUrl("/docs/external-resources")}>
                {" "}
                External Resources{" "}
              </Link>{" "}
              - Why Temporal, Tutorials, How It Works
            </li>
            <li>
              <Link to={useBaseUrl("/blog/tags/case-study")}>
                {" "}
                Case Studies{" "}
              </Link>{" "}
              - Big names use Temporal for big things!
            </li>
            <li>
              <Link to={useBaseUrl("/docs/cadence-to-temporal")}>
                {" "}
                Migrate from Cadence{" "}
              </Link>{" "}
              - There are key differences, but it's easy!
            </li>
          </ul>
        </div>
      </div>
      <div className="container">
        <TemporalCloud />
      </div>
    </Layout>
  );
}
