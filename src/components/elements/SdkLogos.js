import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

const supportedTech = [
  {
    link: "/develop/go",
    image: "/img/sdks/svgs/golang.svg",
    alt: "Go lang logo",
    class: "w-10 h-8",
  },
  {
    link: "/develop/java",
    image: "/img/sdks/svgs/java.svg",
    alt: "Java logo",
    class: "w-7 h-7",
  },
  {
    link: "/develop/python",
    image: "/img/sdks/svgs/python.svg",
    alt: "Python logo",
    class: "w-7 h-7",
  },
  {
    link: "/develop/typescript",
    image: "/img/sdks/svgs/typescript.svg",
    alt: "TypeScript logo",
    class: "w-7 h-7",
  },
  {
    link: "/develop/php",
    image: "/img/sdks/svgs/php.svg",
    alt: "php logo",
    class: "w-10",
  },
  {
    link: "/develop/dotnet",
    image: "/img/sdks/svgs/dotnet.svg",
    alt: ".Net logo",
    class: "w-10",
  },
  {
    link: "https://github.com/temporalio/sdk-ruby",
    image: "/img/sdks/svgs/ruby.svg",
    alt: "Ruby logo",
    class: "w-10",
  },
];

const displayTechListItems = (useBaseUrl) => {
  return supportedTech.map((tech) => {
    return (
      <li className="list-logo" key={tech.alt}>
        <a href={tech.link}>
          <img className={`${tech.class} pr-1 transition hover:scale-110 code-logo`} src={useBaseUrl(tech.image)} alt={tech.alt} />
        </a>
      </li>
    );
  });
};

export const SdkLogos = () => {
  return (
    <div className="supported-tech tailwindcss">
      <ul className="landing-card-list-b logos mb-4">{displayTechListItems(useBaseUrl)}</ul>
    </div>
  );
};
