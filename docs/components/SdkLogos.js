import React from "react";

const supportedTech = [
  {
    link: "/dev-guide/go",
    image: "/img/golang.svg",
    alt: "Go lang logo",
    class: "w-10 h-8",
  },
  {
    link: "/dev-guide/java",
    image: "/img/java.svg",
    alt: "Java logo",
    class: "w-7 h-7",
  },
  {
    link: "/dev-guide/php",
    image: "/img/php.svg",
    alt: "php logo",
    class: "w-10",
  },
  {
    link: "/dev-guide/python",
    image: "/img/python.svg",
    alt: "Python logo",
    class: "w-7 h-7",
  },
  {
    link: "/dev-guide/typescript",
    image: "/img/typescript.svg",
    alt: "TypeScript logo",
    class: "w-7 h-7",
  },
  {
    link: "/dev-guide/typescript",
    image: "/img/javascript.svg",
    alt: "JavaScript logo",
    class: "w-7 h-7",
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
