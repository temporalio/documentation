import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {Community, SDKs, TemporalCloud, Intro, Related} from "../components";

export default function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <div className="main">
      <Layout
        className="max-w-screen-lg w-full px-8 my-2 mx-auto shadow-none"
        title={`${siteConfig.title}`}
        description={`${siteConfig.tagline}`}
      >
        <main className="max-w-screen-lg p-6 md:p-10 mx-auto">
          <header className="my-10">
            <h1 className="text-4xl md:text-5xl tracking-wide mb-4">
              {siteConfig.title}
            </h1>
            <p className="text-xl max-w-2xl">
              Temporal is the open source runtime for orchestrating highly
              reliable, mission-critical applications at any scale.
            </p>
          </header>

          <Intro />
          <SDKs />
          <Related />
          <Community />
          <TemporalCloud />
        </main>
      </Layout>
    </div>
  );
}
