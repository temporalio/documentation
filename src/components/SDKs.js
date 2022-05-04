import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";

export const SDKs = () => {
  return (
    <section className="my-20">
      <h2 className="mb-2 text-3xl md:text-4xl">SDKs</h2>
      <p className="mb-8">
        Find SDK tutorials and API references in the language of your choice.
      </p>
      <div className="grid grid-cols-1 gap-6  md:grid-cols-2 lg:gap-8">
        <Link to={useBaseUrl("/docs/typescript/introduction")}>
          <div className=" scale flex flex-col items-center justify-center space-y-3 rounded-lg bg-[color:var(--ifm-card-background-color)] p-6 text-center shadow-lg">
            <img
              className="h-16 w-16"
              src="/img/typescript.svg"
              alt="TypeScript logo"
            />
            <p className="text-lg">TypeScript (Beta)</p>
          </div>
        </Link>
        <Link
          className=" scale flex flex-col items-center justify-center space-y-3 rounded-lg bg-[color:var(--ifm-card-background-color)] p-6 text-center shadow-lg"
          to={useBaseUrl("/docs/go")}
        >
          <img
            className="h-16 w-16"
            src="/img/go-lang.svg"
            alt="Go lang logo"
          />
          <p className="text-lg">Go</p>
        </Link>
        <Link
          className=" scale flex flex-col items-center justify-center space-y-3 rounded-lg bg-[color:var(--ifm-card-background-color)] p-6 text-center shadow-lg"
          to={useBaseUrl("/docs/java")}
        >
          <img className="h-16 w-16" src="/img/java.svg" alt="Java logo" />
          <p className="text-lg">Java</p>
        </Link>
        <Link
          to={useBaseUrl("/docs/php/introduction")}
          className=" scale flex flex-col items-center justify-center space-y-3 rounded-lg bg-[color:var(--ifm-card-background-color)] p-6 text-center shadow-lg"
        >
          <img className="h-16 w-16" src="/img/php.svg" alt="PHP logo" />
          <p className="text-lg">PHP</p>
        </Link>
      </div>
    </section>
  );
};
