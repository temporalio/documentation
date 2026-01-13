import React from 'react';

const supportedTech = [
  {
    link: '/develop/go',
    image: '/img/sdks/svgs/golang-block.svg',
    alt: 'Go lang logo',
  },
  {
    link: '/develop/java',
    image: '/img/sdks/svgs/java-block.svg',
    alt: 'Java logo',
  },
  {
    link: '/develop/python',
    image: '/img/sdks/svgs/python-block.svg',
    alt: 'Python logo',
  },
  {
    link: '/develop/typescript',
    image: '/img/sdks/svgs/typescript-block.svg',
    alt: 'TypeScript logo',
  },
  {
    link: '/develop/php',
    image: '/img/sdks/svgs/php-block.svg',
    alt: 'php logo',
  },
  {
    link: '/develop/dotnet',
    image: '/img/sdks/svgs/dotnet-block.svg',
    alt: '.Net logo',
  },
  {
    link: '/develop/ruby',
    image: '/img/sdks/svgs/ruby-block.svg',
    alt: 'Ruby logo',
  },
];

const displayTechListItems = () => {
  return supportedTech.map((tech) => {
    return (
      <li className="sdk-logo" key={tech.alt}>
        <a href={tech.link}>
          <img src={tech.image} alt={tech.alt} />
        </a>
      </li>
    );
  });
};

export const SdkLogosAsBlocks = () => {
  return (
    <div className="supported-tech">
      <ul className="sdk-logos-list">{displayTechListItems()}</ul>
    </div>
  );
};
