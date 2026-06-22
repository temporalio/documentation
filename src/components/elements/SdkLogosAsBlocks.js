import React from 'react';
import SdkSvg from './SdkSvgs/SdkSvg';

const supportedTech = [
  {
    name: 'goLangBlock',
    link: '/develop/go',
    image: '/img/sdks/svgs/golang-block.svg',
    alt: 'Go lang',
    className: 'sdkGoLang',
  },
  {
    name: 'javaBlock',
    link: '/develop/java',
    image: '/img/sdks/svgs/java-block.svg',
    alt: 'Java',
    className: 'sdkJava',
  },
  {
    name: 'phpBlock',
    link: '/develop/php',
    image: '/img/sdks/svgs/php-block.svg',
    alt: 'PHP',
    className: 'sdkPhp',
  },
  {
    name: 'pythonBlock',
    link: '/develop/python',
    image: '/img/sdks/svgs/python-block.svg',
    alt: 'Python',
    className: 'sdkPython',
  },
  {
    name: 'rubyBlock',
    link: '/develop/ruby',
    alt: 'Ruby',
    className: 'sdkRuby',
  },
  {
    name: 'typeScriptBlock',
    link: '/develop/typescript',
    image: '/img/sdks/svgs/typescript-block.svg',
    alt: 'TypeScript',
    className: 'sdkTypeScript',
  },
  {
    name: 'dotnetBlock',
    link: '/develop/dotnet',
    alt: '.NET',
    className: 'sdkDotNet',
  },
  {
    name: 'rustBlock',
    link: '/develop/rust',
    alt: 'Rust',
    className: 'sdkRust',
  },
];

const displayTechListItems = () => {
  return supportedTech.map((tech) => {
    return (
      <li className={'sdk-logo'} key={tech.alt}>
        <a href={tech.link}>
          <SdkSvg name={tech.name} className={tech.className} title={tech.alt} />
        </a>
      </li>
    );
  });
};

export const SdkLogosAsBlocks = () => {
  return (
    <div>
      <ul className="sdk-logos-list">{displayTechListItems()}</ul>
    </div>
  );
};
