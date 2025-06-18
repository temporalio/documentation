import React from "react";

const supportedTech = [
  {
    link: "/develop/go",
    image: "/img/sdks/svgs/sdk-box-logos/go.svg",
    alt: "Go lang logo",
    class: "w-10 h-8",
  },
  {
    link: "/develop/java",
    image: "/img/sdks/svgs/sdk-box-logos/java.svg",
    alt: "Java logo",
    class: "w-7 h-7",
  },
  {
    link: "/develop/python",
    image: "/img/sdks/svgs/sdk-box-logos/python.svg",
    alt: "Python logo",
    class: "w-7 h-7",
  },
  {
    link: "/develop/typescript",
    image: "/img/sdks/svgs/sdk-box-logos/typescript.svg",
    alt: "TypeScript logo",
    class: "w-7 h-7",
  },
  {
    link: "/develop/php",
    image: "/img/sdks/svgs/sdk-box-logos/php.svg",
    alt: "php logo",
    class: "w-10",
  },
  {
    link: "/develop/dotnet",
    image: "/img/sdks/svgs/sdk-box-logos/dotnet.svg",
    alt: ".Net logo",
    class: "w-10",
  },
  {
    link: "https://github.com/temporalio/sdk-ruby",
    image: "/img/sdks/svgs/sdk-box-logos/ruby.png",
    alt: "Ruby logo",
    class: "w-10",
  },
];

const displayTechListItems = () => {
  return supportedTech.map((tech) => {
    return (
      <li className="list-logo" key={tech.alt}>
        <a href={tech.link}>
          <img className={`${tech.class} pr-1 transition hover:scale-110 code-logo`} src={tech.image} alt={tech.alt} />
        </a>
      </li>
    );
  });
};

export const SdkLogos = () => {
  return (
    <div className="supported-tech tailwindcss">
      <ul className="landing-card-list-b logos mb-4">{displayTechListItems()}</ul>
    </div>
  );
};
