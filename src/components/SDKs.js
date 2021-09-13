import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export const SDKs = () => {
  return (
    <section className="my-20">
      <h2 className="text-3xl md:text-4xl mb-2">SDKs</h2>
      <p className="mb-8">
        Find SDK tutorials and API references in the language of your choice.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <Link to={useBaseUrl("/docs/concepts/introduction")}>
          <div className="flex flex-col space-y-3 items-center scale shadow-lg rounded-lg p-6 bg-[color:var(--ifm-card-background-color)]">
            <img
              className="w-16 h-16"
              src="/img/nodejs.svg"
              alt="Node js logo"
            />
            <p className="text-lg">Node.js (alpha)</p>
          </div>
        </Link>
        <Link
          className="flex flex-col space-y-3 items-center scale shadow-lg rounded-lg p-6 bg-[color:var(--ifm-card-background-color)]"
          to={useBaseUrl("/docs/go/run-your-first-app-tutorial")}
        >
          <img
            className="w-16 h-16"
            src="/img/go-lang.svg"
            alt="Go lang logo"
          />
          <p className="text-lg">Go</p>
        </Link>
        <Link
          className="flex flex-col space-y-3 items-center scale shadow-lg rounded-lg p-6 bg-[color:var(--ifm-card-background-color)]"
          to={useBaseUrl("/docs/java/run-your-first-app-tutorial")}
        >
          <img className="w-16 h-16" src="/img/java.svg" alt="Java logo" />
          <p className="text-lg">Java</p>
        </Link>
        <Link
          to={useBaseUrl("/docs/php/introduction")}
          className="flex flex-col space-y-3 items-center scale shadow-lg rounded-lg p-6 bg-[color:var(--ifm-card-background-color)]"
        >
          <img className="w-16 h-16" src="/img/php.svg" alt="PHP logo" />
          <p className="text-lg">PHP</p>
        </Link>
        <a
          href="https://github.com/coinbase/temporal-ruby"
          className="scale flex flex-col space-y-3 items-center shadow-lg rounded-lg p-6 bg-[color:var(--ifm-card-background-color)]"
        >
          <img className="w-16 h-16" src="/img/ruby.svg" alt="Ruby logo" />
          <div className=" flex items-center space-x-1">
            <p className="text-lg">Ruby</p>
            <Tippy
              theme="tooltip"
              arrow={true}
              content="Unofficial SDK, reach out via the #ruby-sdk Slack channel"
            >
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Tippy>
          </div>
        </a>
        <a
          href="https://github.com/firdaus/temporal-python-sdk"
          className="scale flex flex-col space-y-3 items-center shadow-lg rounded-lg p-6 bg-[color:var(--ifm-card-background-color)]"
        >
          <img className="w-16 h-16" src="/img/python.svg" alt="Python logo" />
          <div className="flex items-center space-x-1">
            <p className="tex-lg">Python</p>
            <Tippy
              theme="tooltip"
              arrow={true}
              content="Unofficial SDK, reach out via the #python-sdk Slack channel"
            >
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Tippy>
          </div>
        </a>
      </div>
    </section>
  );
};
