import React from 'react';

const supportedTech = [
  {
    link: '/develop/go',
    image: '/img/sdks/svgs/golang.svg',
    alt: 'Go lang',
    class: 'w-10 h-8',
  },
  {
    link: '/develop/java',
    image: '/img/sdks/svgs/java.svg',
    alt: 'Java',
    class: 'w-7 h-7',
  },
  {
    link: '/develop/python',
    image: '/img/sdks/svgs/python.svg',
    alt: 'Python',
    class: 'w-7 h-7',
  },
  {
    link: '/develop/typescript',
    image: '/img/sdks/svgs/typescript.svg',
    alt: 'TypeScript',
    class: 'w-7 h-7',
  },
  {
    link: '/develop/php',
    image: '/img/sdks/svgs/php.svg',
    alt: 'PHP',
    class: 'w-10',
  },
  {
    link: '/develop/dotnet',
    image: '/img/sdks/svgs/dotnet.svg',
    alt: '.NET',
    class: 'w-10',
  },
  {
    link: '/develop/ruby',
    image: '/img/sdks/svgs/ruby.svg',
    alt: 'Ruby',
    class: 'w-10',
  },
  {
    link: '/develop/rust',
    image: '/img/sdks/svgs/rust.svg',
    alt: 'Rust',
    class: 'w-10',
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
