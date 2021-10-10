import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  Community,
  TemporalCloud,
  Intro,
  Resources,
  Newsletter,
} from "../components";

export default function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <div className="main">
      <Layout
        className="max-w-screen-lg w-full px-8 my-2 mx-auto shadow-none"
        title={`${siteConfig.title}`}
        description={`${siteConfig.tagline}`}
      >
        <main className="max-w-screen-lg p-6 md:p-10 mx-auto">
          <Intro />
          <Resources />
          <Community />
          <Newsletter />
          <TemporalCloud />
        </main>
      </Layout>
    </div>
  );
}
