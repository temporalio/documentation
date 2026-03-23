import React from 'react';
import SdkSvg from './SdkSvgs/SdkSvg';

const supportedTech = [
  {
    name: 'goLangBlock',
    link: '/develop/go',
    image: '/img/sdks/svgs/golang-block.svg',
    alt: 'Go lang logo',
    className: 'sdkGoLang',
  },
  {
    name: 'javaBlock',
    link: '/develop/java',
    image: '/img/sdks/svgs/java-block.svg',
    alt: 'Java logo',
    className: 'sdkJava',
  },
  {
    name: 'phpBlock',
    link: '/develop/php',
    image: '/img/sdks/svgs/php-block.svg',
    alt: 'php logo',
    className: 'sdkPhp',
  },
  {
    name: 'pythonBlock',
    link: '/develop/python',
    image: '/img/sdks/svgs/python-block.svg',
    alt: 'Python logo',
    className: 'sdkPython',
  },
  {
    name: 'rubyBlock',
    link: '/develop/ruby',
    alt: 'Ruby logo',
    className: 'sdkRuby',
  },
  {
    name: 'typeScriptBlock',
    link: '/develop/typescript',
    image: '/img/sdks/svgs/typescript-block.svg',
    alt: 'TypeScript logo',
    className: 'sdkTypeScript',
  },
  {
    name: 'dotnetBlock',
    link: '/develop/dotnet',
    alt: '.Net logo',
    className: 'sdkDotNet',
  },
];

const displayTechListItems = () => {
  return supportedTech.map((tech) => {
    return (
      <li className={'sdk-logo'} key={tech.alt}>
        <a href={tech.link}>
          <SdkSvg name={tech.name} className={tech.className} />
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
