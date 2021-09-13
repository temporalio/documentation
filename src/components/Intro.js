import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

export const Intro = () => {
  return (
    <section className="my-12 grid gap-8 md:gap-6 grid-cols-1 md:grid-cols-2">
      <div>
        <h2 className="text-3xl md:text-4xl mb-2">Core concepts</h2>
        <p className="mb-4 max-w-xs">
          Review some of Temporal's core concepts and building blocks.
        </p>
        <Link
          className="flex hover:opacity-90"
          to={useBaseUrl("/docs/concepts/introduction")}
        >
          <span>Learn more</span>
          <svg
            className="ml-2 -mr-0.5 h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
              clipRule="evenodd"
              aria-hidden="true"
            />
          </svg>
        </Link>
      </div>
      <div>
        <h2 className="text-3xl md:text-4xl mb-2">Server Management</h2>
        <p className="mb-4 max-w-xs">
          Learn how to deploy and manage your own instance of the Temporal
          Server.
        </p>
        <Link
          className="flex hover:opacity-90"
          to={useBaseUrl("/docs/concepts/introduction")}
        >
          <span>Learn more</span>
          <svg
            className="ml-2 -mr-0.5 h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
              clipRule="evenodd"
              aria-hidden="true"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};
