import React from 'react';
import Props from 'prop-types';

import DotnetBlock from './DotnetBlock';
import GoLangBlock from './GoLangBlock';
import JavaBlock from './JavaBlock';
import PhpBlock from './PhpBlock';
import PythonBlock from './PythonBlock';
import RubyBlock from './RubyBlock';
import RustBlock from './RustBlock';
import TypeScriptBlock from './TypeScriptBlock';

const SdkSvg = ({ name, title }) => {
  switch (name) {
    case 'dotnetBlock':
      return <DotnetBlock title={title} />;
    case 'goLangBlock':
      return <GoLangBlock title={title} />;
    case 'javaBlock':
      return <JavaBlock title={title} />;
    case 'phpBlock':
      return <PhpBlock title={title} />;
    case 'pythonBlock':
      return <PythonBlock title={title} />;
    case 'rubyBlock':
      return <RubyBlock title={title} />;
    case 'rustBlock':
      return <RustBlock title={title} />;
    case 'typeScriptBlock':
      return <TypeScriptBlock title={title} />;
    default:
      return null;
  }
};

SdkSvg.propTypes = {
  name: Props.string.isRequired,
  title: Props.string.isRequired,
};

export default SdkSvg;
