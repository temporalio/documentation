import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

export const SDKs = () => {
  return (
    <section className="my-20">
      <h2 className="text-3xl md:text-4xl mb-2">SDKs</h2>
      <p className="mb-8">
        Find SDK tutorials and API references in the language of your choice.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6 lg:gap-8">
        <Link to={useBaseUrl("/docs/typescript/introduction")}>
          <div className=" justify-center text-center flex flex-col space-y-3 items-center scale shadow-lg rounded-lg p-6 bg-[color:var(--ifm-card-background-color)]">
            <img
              className="w-16 h-16"
              src="/img/typescript.svg"
              alt="TypeScript logo"
            />
            <p className="text-lg">TypeScript (Beta)</p>
          </div>
        </Link>
        <Link
          className=" justify-center text-center flex flex-col space-y-3 items-center scale shadow-lg rounded-lg p-6 bg-[color:var(--ifm-card-background-color)]"
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
          className=" justify-center text-center flex flex-col space-y-3 items-center scale shadow-lg rounded-lg p-6 bg-[color:var(--ifm-card-background-color)]"
          to={useBaseUrl("/docs/java/run-your-first-app-tutorial")}
        >
          <img className="w-16 h-16" src="/img/java.svg" alt="Java logo" />
          <p className="text-lg">Java</p>
        </Link>
        <Link
          to={useBaseUrl("/docs/php/introduction")}
          className=" justify-center text-center flex flex-col space-y-3 items-center scale shadow-lg rounded-lg p-6 bg-[color:var(--ifm-card-background-color)]"
        >
          <img className="w-16 h-16" src="/img/php.svg" alt="PHP logo" />
          <p className="text-lg">PHP</p>
        </Link>
      </div>
    </section>
  );
};
