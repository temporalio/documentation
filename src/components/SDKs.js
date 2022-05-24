import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

export const SDKs = () => {
  return (
    <section className="my-20">
      <h2 className="mb-2 text-3xl md:text-4xl">SDKs</h2>
      <p className="mb-8">
        Find SDK tutorials and API references in the language of your choice.
      </p>
      <div className="grid grid-cols-1 gap-6  md:grid-cols-2 lg:gap-8 mb-8">
        <Link to={useBaseUrl("/typescript/introduction")}>
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
          to={useBaseUrl("/go")}
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
          to={useBaseUrl("/java")}
        >
          <img className="h-16 w-16" src="/img/java.svg" alt="Java logo" />
          <p className="text-lg">Java</p>
        </Link>
        <Link
          to={useBaseUrl("/php/introduction")}
          className=" scale flex flex-col items-center justify-center space-y-3 rounded-lg bg-[color:var(--ifm-card-background-color)] p-6 text-center shadow-lg"
        >
          <img className="h-16 w-16" src="/img/php.svg" alt="PHP logo" />
          <p className="text-lg">PHP</p>
        </Link>
      </div>
      <p className="mb-8">
        SDKs for other languages are in development (in alpha/pre-alpha stage):{" "}
        <Link to="https://github.com/temporalio/sdk-python">Python</Link>,{" "}
        <Link to="https://github.com/temporalio/sdk-dotnet">.NET</Link>,{" "}
        <Link to="https://github.com/temporalio/sdk-core">Rust</Link>, and{" "}
        <Link to="https://github.com/temporalio/sdk-ruby">Ruby</Link>.
      </p>
      <p className="mb-8">
        Third-party SDKs:{" "}
        <Link to="https://github.com/coinbase/temporal-ruby">
          <code>coinbase/temporal-ruby</code>
        </Link>
        .
      </p>
    </section>
  );
};
