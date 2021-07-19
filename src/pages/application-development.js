import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: <>Go</>,
    imageUrl: "img/go-lang.svg",
    goto: "/docs/go/introduction",
  },
  {
    title: <>Java</>,
    imageUrl: "img/java.svg",
    goto: "/docs/java/introduction",
  },
  {
    title: <>PHP</>,
    imageUrl: "img/php.svg",
    goto: "/docs/php/introduction",
  },
  {
    title: <>Node (alpha)</>,
    imageUrl: "img/nodejs.svg",
    goto: "/docs/node/introduction",
  },
];

function Feature({imageUrl, title, goto}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className="col col--3 margin-bottom--lg">
      <h3>{title}</h3>
      <Link to={goto}>
        {imgUrl && (
          <div className={clsx("text--center", styles.featureImageContainer)}>
            <img className={styles.featureImage} src={imgUrl} alt={title} />
          </div>
        )}
      </Link>
      <div className={styles.buttons}>
        <Link
          className={clsx(
            "button button--outline button--primary button--md",
            styles.getStarted
          )}
          to={goto}
        >
          Get Started
        </Link>
      </div>
      <div className={styles.spacer}></div>
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
      description="Description will go into a meta tag in <head />"
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">Application development</h1>
          <p className="hero__subtitle">Choose your language SDK!</p>
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
        <div className={styles.buttons}>
          <Link
            className={styles.viewCompleteLibraryLink}
            to={"/docs/samples-library"}
          >
            View the complete library of samples
          </Link>
        </div>
      </div>
      <div className={clsx("hero hero--secondary", styles.heroBanner)}>
        <div className="container">
          <h2 className="hero__title">Other SDKs</h2>
          <p className="hero__subtitle">
            Looking for SDKs in other languages? There are plans to support many
            others.
          </p>
          <div className="row">
            <div className={clsx("col col-4", styles.textFeature)}>
              <h3>In the works, not yet endorsed</h3>
              <ul className={clsx(styles.unOrderedList)}>
                <li>
                  <img
                    className={clsx(styles.listImage)}
                    src={useBaseUrl("img/python.svg")}
                    alt="Python"
                  />
                  <a href="https://github.com/firdaus/temporal-python-sdk">
                    Python SDK by firdaus
                  </a>
                </li>
                <li>Reach out via the #python-sdk Slack channel</li>
                <li>
                  <img
                    className={clsx(styles.listImage)}
                    src={useBaseUrl("img/ruby.svg")}
                    alt="Ruby"
                  />
                  <a href="https://github.com/coinbase/temporal-ruby">
                    Ruby SDK by Coinbase
                  </a>
                </li>
                <li>Reach out via the #ruby-sdk Slack channel</li>
                <li>{/* spacer li */}</li>
                <li>
                  Temporal is working on a{" "}
                  <a href="https://github.com/temporalio/sdk-core">
                    Rust based Core SDK
                  </a>{" "}
                  that will be used by other SDKs in future.
                </li>
              </ul>
            </div>
            <div className={clsx("col col-4", styles.textFeature)}>
              <h3>How to learn more</h3>
              <p>
                If you are interested in using an "unofficial" SDK, we recommend
                that you reach out to any of us at Temporal.
              </p>
              <ul>
                <li>
                  <a href="https://join.slack.com/t/temporalio/shared_invite/zt-kfgfjuye-L8gCQVRhPykA2td8pk7eTQ">
                    Slack
                  </a>
                </li>
                <li>
                  <a href="https://community.temporal.io/">Community forums</a>
                </li>
              </ul>
              <p>
                We are very excited by the community's enthusiasm and strongly
                believe in collaborating on open source projects. Our goal is to
                make sure there is maintenance leadership in place to care for
                the developer experience over the long term.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
