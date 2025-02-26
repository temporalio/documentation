import React from 'react';
import PropTypes from 'prop-types';

// NoBreak component that ensures text inside it doesn't break across lines
const NoBreak = ({ children }) => {
  return (
    <span style={{ whiteSpace: 'nowrap' }}>
      {children}
    </span>
  );
};

// Prop validation
NoBreak.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NoBreak;

// import NoBreak from '@site/src/components/NoBreak';
// <NoBreak>Some text that should stay together and not break across lines.</NoBreak>
