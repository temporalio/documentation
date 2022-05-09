import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

export function All() {
  return (
    <div className="flex flex-col rounded-lg bg-[color:var(--ifm-card-background-color)] p-5 shadow landing-card">
      <div className="flex items-center space-x-4">
        <a className="flex items-center" href="/cloud">
        <h2 className="mb-4 text-xl font-semibold">Temporal Cloud</h2>
        <svg
          width="13"
          className="mb-4 h-10 w-10 rounded-lg bg-[color:var(--ifm-background-color)] p-2 text-[color:var(--ifm-color)] icon"
          height="14"
          viewBox="0 0 491.52 491.52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M484.14,226.886L306.46,49.202c-5.072-5.072-11.832-7.856-19.04-7.856c-7.216,0-13.972,2.788-19.044,7.856l-16.132,16.136,c-5.068,5.064-7.86,11.828-7.86,19.04c0,7.208,2.792,14.2,7.86,19.264L355.9,207.526H26.58C11.732,207.526,0,219.15,0,234.002,v22.812c0,14.852,11.732,27.648,26.58,27.648h330.496L252.248,388.926c-5.068,5.072-7.86,11.652-7.86,18.864,c0,7.204,2.792,13.88,7.86,18.948l16.132,16.084c5.072,5.072,11.828,7.836,19.044,7.836c7.208,0,13.968-2.8,19.04-7.872,l177.68-177.68c5.084-5.088,7.88-11.88,7.86-19.1C492.02,238.762,489.228,231.966,484.14,226.886z"
            fill="currentColor"
          />
        </svg>
        </a>
      </div>
      <ul className="landing-card-list">
        <li className="">
          <Link
            to={useBaseUrl("/")}
            className="hover:underline"
          >
            <a className="font-normal">Self serve free tier</a>
          </Link>
        </li>
        <li className="">
          |
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/")}
            className="hover:underline"
          >
            <a className="font-normal">User onboarding guide</a>
          </Link>
        </li>
        <li className="">
          |
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/")}
            className="hover:underline"
          >
            <a className="font-normal">tcloud</a>
          </Link>
        </li>
      </ul>
      <div className="flex items-center space-x-4 landing-card-section">
        <a className="flex items-center" href="concepts-guide">
        <h2 className="mb-4 text-xl font-semibold">Temporal concepts</h2>
        <svg
          width="13"
          className="mb-4 h-10 w-10 rounded-lg bg-[color:var(--ifm-background-color)] p-2 text-[color:var(--ifm-color)] icon"
          height="14"
          viewBox="0 0 491.52 491.52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M484.14,226.886L306.46,49.202c-5.072-5.072-11.832-7.856-19.04-7.856c-7.216,0-13.972,2.788-19.044,7.856l-16.132,16.136,c-5.068,5.064-7.86,11.828-7.86,19.04c0,7.208,2.792,14.2,7.86,19.264L355.9,207.526H26.58C11.732,207.526,0,219.15,0,234.002,v22.812c0,14.852,11.732,27.648,26.58,27.648h330.496L252.248,388.926c-5.068,5.072-7.86,11.652-7.86,18.864,c0,7.204,2.792,13.88,7.86,18.948l16.132,16.084c5.072,5.072,11.828,7.836,19.044,7.836c7.208,0,13.968-2.8,19.04-7.872,l177.68-177.68c5.084-5.088,7.88-11.88,7.86-19.1C492.02,238.762,489.228,231.966,484.14,226.886z"
            fill="currentColor"
          />
        </svg>
        </a>
      </div>
      <ul className="landing-card-list">
        <li className="">
          <Link
            to={useBaseUrl("/concepts-guide/#workflows")}
            className="hover:underline"
          >
            <a className="font-normal">Workflows</a>
          </Link>
        </li>
        <li className="">
          |
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/concepts-guide/#activities")}
            className="hover:underline"
          >
            <a className="font-normal">Activities</a>
          </Link>
        </li>
        <li className="">
          |
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/concepts-guide/#signals")}
            className="hover:underline"
          >
            <a className="font-normal">Signals</a>
          </Link>
        </li>
        <li className="">
          |
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/concepts-guide/#queries")}
            className="hover:underline"
          >
            <a className="font-normal">Queries</a>
          </Link>
        </li>
        <li className="">
          |
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/concepts-guide/#visibility")}
            className="hover:underline"
          >
            <a className="font-normal">Visibility</a>
          </Link>
        </li>
      </ul>
      <div className="flex items-center space-x-4 landing-card-section">
        <a className="flex items-center" href="application-development-guide">
        <h2 className="mb-4 text-xl font-semibold">
        Application development guide
        <span className="new-guide">
        (New!)
        </span>
        </h2>
        <svg
          width="13"
          className="mb-4 h-10 w-10 rounded-lg bg-[color:var(--ifm-background-color)] p-2 text-[color:var(--ifm-color)] icon"
          height="14"
          viewBox="0 0 491.52 491.52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M484.14,226.886L306.46,49.202c-5.072-5.072-11.832-7.856-19.04-7.856c-7.216,0-13.972,2.788-19.044,7.856l-16.132,16.136,c-5.068,5.064-7.86,11.828-7.86,19.04c0,7.208,2.792,14.2,7.86,19.264L355.9,207.526H26.58C11.732,207.526,0,219.15,0,234.002,v22.812c0,14.852,11.732,27.648,26.58,27.648h330.496L252.248,388.926c-5.068,5.072-7.86,11.652-7.86,18.864,c0,7.204,2.792,13.88,7.86,18.948l16.132,16.084c5.072,5.072,11.828,7.836,19.044,7.836c7.208,0,13.968-2.8,19.04-7.872,l177.68-177.68c5.084-5.088,7.88-11.88,7.86-19.1C492.02,238.762,489.228,231.966,484.14,226.886z"
            fill="currentColor"
          />
        </svg>

        </a>
      </div>
      <div className="flex items-center space-x-4">
        <img
          className="mb-4 h-10 w-10 transition hover:scale-110 code-logo"
          src="/img/golang.svg"
          alt="Go lang logo"
        />
        <img
          className="mb-4 h-8 w-8 transition hover:scale-110 code-logo"
          src="/img/java.svg"
          alt="Java logo"
        />
        <img
          className="mb-4 h-10 w-10 transition hover:scale-110 code-logo"
          src="/img/php.svg"
          alt="PHP logo"
        />
        <img
          className="mb-4 h-7 w-7 transition hover:scale-110 code-logo"
          src="/img/typescript.svg"
          alt="TypeScript logo"
        />
      </div>
      <ul className="landing-card-list">
        <li className="">
          <Link
            to={useBaseUrl("/application-development-guide/#foundations")}
            className="hover:underline"
          >
            <a className="font-normal">MVP Temporal Application</a>
          </Link>
        </li>
        <li className="">
          |
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/application-development-guide/#features")}
            className="hover:underline"
          >
            <a className="font-normal">Features</a>
          </Link>
        </li>
        <li className="">
          |
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/application-development-guide/#observability")}
            className="hover:underline"
          >
            <a className="font-normal">Observability</a>
          </Link>
        </li>
        <li className="">
          |
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/application-development-guide/#testing")}
            className="hover:underline"
          >
            <a className="font-normal">Testing</a>
          </Link>
        </li>
      </ul>
      <ul className="landing-card-list">
        <li className="">
          <h4 className="mb-4 text-xl font-semibold">
          Legacy SDK how-tos
          </h4>
        </li>
        <li className="">
        |
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/go")}
            className="hover:underline"
          >
            <a className="font-normal">Go</a>
          </Link>
        </li>
        <li className="">
          |
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/java")}
            className="hover:underline"
          >
            <a className="font-normal">Java</a>
          </Link>
        </li>
        <li className="">
          |
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/php/introduction")}
            className="hover:underline"
          >
            <a className="font-normal">PHP</a>
          </Link>
        </li>
        <li className="">
          |
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/typescript/introduction")}
            className="hover:underline"
          >
            <a className="font-normal">TypeScript</a>
          </Link>
        </li>
      </ul>
      <div className="flex items-center space-x-4">
        <a className="flex items-center" href="/operation/how-to-tune-workers">
        <h4 className="mb-4 text-xl font-semibold">
        Worker performance tuning guide
        </h4>
        <svg
          width="13"
          className="mb-4 h-8 w-8 rounded-lg bg-[color:var(--ifm-background-color)] p-2 text-[color:var(--ifm-color)] icon"
          height="12"
          viewBox="0 0 491.52 491.52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M484.14,226.886L306.46,49.202c-5.072-5.072-11.832-7.856-19.04-7.856c-7.216,0-13.972,2.788-19.044,7.856l-16.132,16.136,c-5.068,5.064-7.86,11.828-7.86,19.04c0,7.208,2.792,14.2,7.86,19.264L355.9,207.526H26.58C11.732,207.526,0,219.15,0,234.002,v22.812c0,14.852,11.732,27.648,26.58,27.648h330.496L252.248,388.926c-5.068,5.072-7.86,11.652-7.86,18.864,c0,7.204,2.792,13.88,7.86,18.948l16.132,16.084c5.072,5.072,11.828,7.836,19.044,7.836c7.208,0,13.968-2.8,19.04-7.872,l177.68-177.68c5.084-5.088,7.88-11.88,7.86-19.1C492.02,238.762,489.228,231.966,484.14,226.886z"
            fill="currentColor"
          />
        </svg>
        </a>
      </div>
      <div className="flex items-center space-x-4 landing-card-section">
        <a className="flex items-center" href="/">
        <h2 className="mb-4 text-xl font-semibold">Cluster deployment guide</h2>
        <svg
          width="13"
          className="mb-4 h-10 w-10 rounded-lg bg-[color:var(--ifm-background-color)] p-2 text-[color:var(--ifm-color)] icon"
          height="14"
          viewBox="0 0 491.52 491.52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M484.14,226.886L306.46,49.202c-5.072-5.072-11.832-7.856-19.04-7.856c-7.216,0-13.972,2.788-19.044,7.856l-16.132,16.136,c-5.068,5.064-7.86,11.828-7.86,19.04c0,7.208,2.792,14.2,7.86,19.264L355.9,207.526H26.58C11.732,207.526,0,219.15,0,234.002,v22.812c0,14.852,11.732,27.648,26.58,27.648h330.496L252.248,388.926c-5.068,5.072-7.86,11.652-7.86,18.864,c0,7.204,2.792,13.88,7.86,18.948l16.132,16.084c5.072,5.072,11.828,7.836,19.044,7.836c7.208,0,13.968-2.8,19.04-7.872,l177.68-177.68c5.084-5.088,7.88-11.88,7.86-19.1C492.02,238.762,489.228,231.966,484.14,226.886z"
            fill="currentColor"
          />
        </svg>
        </a>
      </div>
      <ul className="landing-card-list">
        <li className="">
          <Link
            to={useBaseUrl("/")}
            className="hover:underline"
          >
            <a className="font-normal">Persistence</a>
          </Link>
        </li>
        <li className="">
          |
        </li>
        <li className="">
          <Link
            to={useBaseUrl(
              "/docs/clusters/how-to-integrate-elasticsearch-into-a-temporal-cluster"
            )}
            className="hover:underline"
          >
            <a className="font-normal">
              Elasticsearch
            </a>
          </Link>
        </li>
        <li className="">
          |
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/server/archive-data")}
            className="hover:underline"
          >
            <a className="font-normal">Archival</a>
          </Link>
        </li>
        <li className="">
          |
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/docs/server/versions-and-dependencies")}
            className="hover:underline"
          >
            <a className="font-normal">Upgrades</a>
          </Link>
        </li>

      </ul>

      <div className="flex items-center space-x-4 landing-card-section">
        <h2 className="mb-4 text-xl font-semibold">Devtools</h2>
        <svg
          className="mb-4 h-10 w-10 rounded-lg transition hover:scale-110 code-logo"
          fill="currentColor"
          viewBox="0 0 22 22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
            clipRule="evenodd"
          />
        </svg>
        <svg
          className="mb-4 h-10 w-10 transition hover:scale-110 code-logo"
          fill="currentColor"
          viewBox="0 0 22 22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <ul className="landing-card-list">
        <li className="">
          <Link
            to={useBaseUrl("/tctl")}
            className="hover:underline"
          >
            <a className="font-normal">tctl</a>
          </Link>
        </li>
        <li className="">
          |
        </li>
        <li className="">
          <Link
            to={useBaseUrl(
              "/web-ui"
            )}
            className="hover:underline"
          >
            <a className="font-normal">
              Web UI
            </a>
          </Link>
        </li>
      </ul>
      <div className="flex items-center space-x-4">
        <a className="flex items-center" href="/learning-paths">
        <h2 className="mb-4 text-xl font-semibold">Tutorials</h2>
        <svg
          width="13"
          className="mb-4 h-10 w-10 rounded-lg bg-[color:var(--ifm-background-color)] p-2 text-[color:var(--ifm-color)] icon "
          height="14"
          viewBox="0 0 511.973 511.973"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m502.332 177.307c-1.414-.614-35.889-15.549-240-104-4.06-1.76-8.66-1.76-12.72 0l-240 104c-12.878 5.569-12.754 23.849 0 29.36 46.624 20.201 122.845 53.234 240 104 4.036 1.75 8.636 1.771 12.72 0 11.125-4.821 162.711-70.509 169.64-73.51v170.381c0 8.618 6.626 16.031 15.235 16.431 9.188.428 16.765-6.888 16.765-15.982v-176.633c0-2.514-1.862-4.637-4.356-4.958-30.031-3.87-171.66-22.15-205.694-26.539-9.844-1.23-15.978-11.198-13.39-20.07 2.03-7.493 9.144-12.266 16.35-11.77.718.042 228.73 29.466 228.567 29.445 4.26.548 7.762 3.276 9.444 6.975 1.176 2.586 4.17 3.771 6.742 2.565 4.305-2.018 8.039-4.674 9.737-10.685 2.186-7.789-1.764-15.864-9.04-19.01z"
            fill="currentColor"
          />
          <path
            d="m236.882 340.027-133.922-58.032c-3.302-1.431-6.988.99-6.988 4.588v57.404c0 53.83 70.28 96 160 96s160-42.17 160-96v-57.404c0-3.598-3.686-6.018-6.988-4.588l-133.932 58.032c-12.16 5.286-25.998 5.282-38.17 0z"
            fill="currentColor"
          />
        </svg>
        </a>
      </div>
      <ul className="landing-card-list">
        <li className="">
          <Link
            to={useBaseUrl("/docs/learning-paths/run-your-first-app")}
            className="hover:underline"
          >
            <a className="font-normal">Run your first app</a>
          </Link>
        </li>
        <li className="">
          |
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/docs/learning-paths/hello-world")}
            className="hover:underline"
          >
            <a className="font-normal">"Hello World!" from scratch</a>
          </Link>
        </li>
        <li className="">
          |
        </li>
        <li className="">
          <Link
            to={useBaseUrl("/docs/learning-paths/background-checks")}
            className="hover:underline"
          >
            <a className="font-normal">Background Check project</a>
          </Link>
        </li>
      </ul>


    </div>

  );
}



export const Intro = () => {
  return (
    <section className="mt-1 mb-14 tailwindcss">
      <p className="max-w-2xl text-xl">
        Learn about Temporal, the open source platform for orchestrating highly
        reliable, mission-critical applications at scale.
      </p>

      <div className="my-10 grid grid-cols-1 gap-6 lg:gap-8">
        <All />
      </div>
    </section>
  );
};
