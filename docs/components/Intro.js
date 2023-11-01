import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { SdkLogos } from "./SdkLogos";

const coreConcepts = [
  {
    path: "/temporal",
    name: "Temporal",
  },
  {
    path: "/workflows",
    name: "Workflows",
  },
  {
    path: "/activities",
    name: "Activities",
  },
  {
    path: "/retry-policies",
    name: "Retry Policies",
  },
  {
    path: "/clusters",
    name: "Clusters",
  },
  {
    path: "/workers",
    name: "Workers",
  },
  {
    path: "/visibility",
    name: "Visibility",
  },
  {
    path: "/namespaces",
    name: "Namespaces",
  },
];

const appDevGuideLinks = [
  {
    path: "/dev-guide/go",
    name: "Go dev guide",
  },
  {
    path: "/dev-guide/java",
    name: "Java dev guide",
  },
  {
    path: "/dev-guide/python",
    name: "Python dev guide",
  },
  {
    path: "/dev-guide/typescript",
    name: "TypeScript dev guide",
  },
  {
    path: "/dev-guide/php",
    name: "PHP dev guide",
  },
  {
    path: "https://pkg.go.dev/go.temporal.io/sdk",
    name: "Go SDK API reference",
  },
  {
    path: "https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/index.html",
    name: "Java SDK API reference",
  },
  {
    path: "https://python.temporal.io",
    name: "Python SDK API reference",
  },
  {
    path: "https://typescript.temporal.io/",
    name: "TypeScript SDK API reference",
  },
]

const clusterGuide = [
  {
    path: "/cluster-deployment-guide/#advanced-visibility",
    name: "Visibility",
  },
  {
    path: "/cluster-deployment-guide/#archival",
    name: "Archival",
  },
  {
    path: "/cluster-deployment-guide/#multi-cluster-replication",
    name: "Multi-Cluster Replication",
  },
];

const cloudInfo = [
  {
    path: "/cloud/introduction",
    name: "Introduction",
  },
  {
    path: "/cloud/get-started",
    name: "Get started",
  },
  {
    path: "/cloud/account-setup",
    name: "Account setup",
  },
  {
    path: "/cloud/saml",
    name: "SAML",
  },
  {
    path: "/cloud/metrics",
    name: "Metrics",
  },
  {
    path: "/cloud/audit-logging",
    name: "Audit Logging",
  },
  {
    path: "/cloud/tcld",
    name: "CLI (tcld)",
  },
  {
    path: "https://temporal.io/change-log/product-area/cloud",
    name: "Release notes",
  },
];

const devTools = [
  {
    path: "/tctl-v1",
    name: "tctl v1.17",
  },
  {
    path: "/cli",
    name: `Temporal CLI`,
  },
  {
    path: "/web-ui",
    name: `Web UI`,
  },
]

const references = [
  {
    path: "/references/events",
    name: "Events",
  },
  {
    path: "/references/commands",
    name: `Commands`,
  },
  {
    path: "/references/sdk-metrics",
    name: "SDK metrics",
  },
  {
    path: "/references/configuration",
    name: `Cluster configuration`,
  },
];

const selfHostedDeploymentGuide = [
  {
    path: "/kb/temporal-platform-limits-sheet",
    name: "Temporal Platform limits sheet",
  },
  {
    path: "/references/commands",
    name: `How to explain Temporal`,
  },
  {
    path: "/troubleshooting/last-connection-error",
    name: 'Troubleshoot the "failed reaching server" error',
  },
  {
    path: "/troubleshooting/deadline-exceeded-error",
    name: `Troubleshoot deadline-exceeded error`,
  },
  {
    path: "/kb/legacy-oss-prod-deploy",
    name: "Legacy OSS Temporal Server self-hosted production deployment guide",
  },
  {
    path: "/kb/how-to-productionize-workflows",
    name: "An opinionated guide to productionizing Workflows",
  },
  {
    path: "/",
    name: "All the ways to run a Temporal Cluster",
  },
  {
    path: "/kb/python-sandbox-environment",
    name: "Python sandbox environment",
  },
  {
    path: "/references/failures",
    name: "Temporal Failures",
  },
  {
    path: "/kb/prometheus-grafana-setup",
    name: "Set up Prometheus and Grafana to view metrics",
  },
  {
    path: "/kb/migrate-visibility-data-from-es6",
    name: "Migrate visibility data from ES6",
  },
  {
    path: "/kb/cadence-to-temporal",
    name: "Cadence to Temporal migration highlights",
  },

];


const displayLinks = (links) => {
  return links.map((link, i) => {
    return (
      <li className="" key={`${link.name} ${i}`}>
        <div className="landing-card-list-item">
          <Link to={useBaseUrl(link.path)} className="hover:underline font-normal">
            {link.name}
          </Link>
        </div>
      </li>
    );
  });
};

function Card({ title, content, links = [] }) {
  return (
    <div className="main-card">
      <h1>{title}</h1>
      <p>{content}</p>
      <ul className="landing-card-list">{displayLinks(links)}</ul>
    </div>
  )
}

function CloudCard({ links }) {
  return (
    <div className="main-card">
      <div class="grid grid-cols-2">
        <div>
          <h1>Temporal Cloud</h1>
          <p>Temporal Cloud tools and how-to guides.</p>
          <ul className="landing-card-list">{displayLinks(links)}</ul>
        </div>
        <div>
          <h1>Get started with Cloud</h1>
          <p>Run Temporal today, without hassle, and with peace of mind.</p>
          <p>
            <button className="cloud-button">Learn more about Temporal Cloud</button>
          </p>
          <p>Existing users can <Link to="https://cloud.temporal.io">log in here
          </Link>
            .</p>
        </div>
      </div>
    </div>
  )
}


function Explained() {
  return (
    <div>
      <p className="main-subhead">Temporal Platform explanation and usage information.</p>
      <div className="">{SdkLogos()}</div>

      <div className="flex gap-6">
        <Card title="Get Started with Temporal" content="New to Temporal? Start your journey here by setting up your development environment, running an existing Temporal app, and then building your first app from scratch using our SDKs." links={coreConcepts} />
        <Card title="Start building your next app" links={appDevGuideLinks} />
      </div>

      <CloudCard links={cloudInfo} />

      <div className="flex gap-6">
        <Card title="Production readiness" content="Temporal Cluster deployment information and how-to guides." links={clusterGuide} />
        <Card title="Dev tools" content="Use Temporal’s CLI or Web UI to manage and monitor your Workflows." links={devTools} />
      </div>

      <div className="my-20">
        <h3 className="core-concepts-title">Introducing our core concepts</h3>
        <h1>Temporal Cluster</h1>
      </div>

      <div className="flex gap-6">
        <Card title="References" links={references} />
        <Card title="Self-hosted deployment guide" links={selfHostedDeploymentGuide} />
      </div>

      <div className="my-20 text-center">
        <h1>Helpful resources</h1>
      </div>

      <div className="my-20 text-center">
        <h1>Join our Community</h1>
      </div>

    </div>
  );
}

export const Intro = () => {
  return (
    <section className="mt-1 mb-14 tailwindcss">
      <div className=" grid grid-cols-1 gap-6 lg:gap-8">
        <Explained />
      </div>
    </section>
  );
};
