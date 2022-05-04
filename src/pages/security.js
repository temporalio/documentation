import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

export default function Security() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title="Temporal Security"
      permalink="/security"
      description="<head />"
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">Temporal security</h1>
          <p className="hero__subtitle">Our commitment</p>
        </div>
      </header>
      <div className={clsx("hero hero--secondary", styles.heroBanner)}>
        <div className="container">
          <div className="row">
            <div className={clsx("col col--5", styles.securityPageHeaders)}>
              <h2>SOC2 Type 2</h2>
            </div>
            <div className={clsx("col col--4", styles.justifyLeft)}>
              <p>
                Temporal Technologies Inc was issued a clean SOC2 Type 2 report
                on July 31, 2021, from{" "}
                <a href="https://www.schneiderdowns.com/">Schneider Downs</a>
              </p>
              <div className={styles.justifyCenter}>
                <img
                  className={styles.soc2Logo}
                  src={useBaseUrl("img/21972-312_SOC_NonCPA_Blk.png")}
                  alt="SOC2 Logo"
                />
              </div>
              <p>To request a copy of the report, contact us.</p>
            </div>
          </div>
          <div className="row">
            <div className={clsx("col col--5", styles.securityPageHeaders)}>
              <h2>Responsible Disclosure</h2>
            </div>
            <div className={clsx("col col--4", styles.justifyLeft)}>
              <p>
                If you have any concerns about security or would like to report
                a security issue, please reach out to our team at{" "}
                <a href="mailto:security@temporal.io">security@temporal.io</a>.
              </p>
              <p>
                We promise not to bring legal action against people who do the
                following:
              </p>
              <ul>
                <li>
                  Share with us the full details of any problem they've found.
                </li>
                <li>
                  Keep the issue private until we've had a reasonable time to
                  address it.
                </li>
                <li>
                  Don't intentionally harm our service or exfiltrate data from
                  it
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
