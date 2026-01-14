import React from 'react';
import Props from 'prop-types';

import DotnetBlock from './DotnetBlock';
import GoLangBlock from './GoLangBlock';
import JavaBlock from './JavaBlock';
import PhpBlock from './PhpBlock';
import PythonBlock from './PythonBlock';
import RubyBlock from './RubyBlock';
import TypeScriptBlock from './TypeScriptBlock';

const SdkSvg = ({ name }) => {
  switch (name) {
    case 'dotnetBlock':
      return <DotnetBlock />;
    case 'goLangBlock':
      return <GoLangBlock />;
    case 'javaBlock':
      return <JavaBlock />;
    case 'phpBlock':
      return <PhpBlock />;
    case 'pythonBlock':
      return <PythonBlock />;
    case 'rubyBlock':
      return <RubyBlock />;
    case 'typeScriptBlock':
      return <TypeScriptBlock />;
    default:
      return null;
  }
};

SdkSvg.propTypes = {
  name: Props.string.isRequired,
};

export default SdkSvg;
