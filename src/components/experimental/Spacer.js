import React from 'react';
import PropTypes from 'prop-types';

// Spacer component that creates a series of &nbsp; based on the width prop
const Spacer = ({ width }) => {
  // Create an array with "width" number of non-breaking spaces
  const spaces = Array.from({ length: width }).map((_, index) => (
    <span key={index}>&nbsp;</span>
  ));

  return <>{spaces}</>;
};

// Prop validation
Spacer.propTypes = {
  width: PropTypes.number.isRequired,
};

export default Spacer;

// import Spacer from '@site/src/components/Spacer';
// <Spacer width={8} />
