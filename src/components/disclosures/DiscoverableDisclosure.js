import React, { useState } from 'react';

const DiscoverableDisclosure = ({ label = "Summary", children }) => {
  return (
    <details
      style={{
        borderRadius: '0.5rem',
        margin: '1rem',
        padding: '16px 24px',
        backgroundColor: '#f7f7f7',
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
          fontFamily: 'Georgia, serif',
          border: '2px solid #B0B0B0',
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
