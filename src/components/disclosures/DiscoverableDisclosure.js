import React, { useState } from 'react';

const DiscoverableDisclosure = ({ label = "Summary", children }) => {
  return (
    <details
      style={{
        borderRadius: '0.5rem',
        margin: '1rem',
        padding: '16px 24px',
        border: '2px solid #ccc',
        transition: '200ms',
      }}
    >
      <summary
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          fontSize: '1.0rem',
          padding: '8px 16px',
          minHeight: '40px',
          lineHeight: '1.5',
        }}
      >
      Dive deeper&nbsp;—&nbsp;<strong>{label}</strong> &nbsp;&nbsp; [Toggle to Open]
      </summary>

      <div
        style={{
          marginTop: '5px',
          padding: '10px',
          borderRadius: '8px',
          transition: 'max-height 0.3s ease-out',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </details>
  );
};

export default DiscoverableDisclosure;
