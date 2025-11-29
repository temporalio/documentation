import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <div className="main">
      <Layout
        className="my-2 mx-auto w-full max-w-screen-lg px-8 shadow-none"
        title={`${siteConfig.title}`}
        description={`${siteConfig.tagline}`}
      >
        <main className="mx-auto max-w-screen-lg p-6 md:p-10"></main>
      </Layout>
    </div>
  );
}
