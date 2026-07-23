import React from 'react';
import SdkSvg from '../SdkSvgs/SdkSvg';
import { SDKS } from '../../../constants/sdks';

const supportedTech = SDKS.map(({ id, label, blockName }) => ({
  name: blockName,
  link: `/develop/${id}`,
  alt: label,
}));

const displayTechListItems = () => {
  return supportedTech.map((tech) => {
    return (
      <li className={'sdk-logo'} key={tech.alt}>
        <a href={tech.link}>
          <SdkSvg name={tech.name} title={tech.alt} />
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
