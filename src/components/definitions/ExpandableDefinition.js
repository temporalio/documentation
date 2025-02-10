import React, { useState } from 'react';

const ExpandableDefinition = ({ label = "Definition", definition }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDefinition = () => setIsOpen(!isOpen);

  return (
    <span>
      <button
        onClick={toggleDefinition}
        style={{
          background: 'none',
          border: 'none',
          color: '#007acc',
          cursor: 'pointer',
          fontSize: '0.9rem',
          margin: '-5px',
          verticalAlign: 'super',
          transition: 'transform 0.3s ease-in-out',
          transform: isOpen ? 'rotate(45deg)' : 'none',
          // textDecoration: 'underline',
        }}
      >
        ⊕ {/* Circled plus */}
      </button>
      {isOpen && (
        <span
          style={{
            display: 'block',
            marginTop: '5px',
            fontStyle: 'italic',
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '80%',
            // color: '#4F4F4F',
            fontFamily: 'Georgia, serif',
            padding: '10px',
            border: '2px solid #B0B0B0',
            borderRadius: '8px',
            // backgroundColor: '#f9f9f9',
            transition: 'max-height 0.3s ease-out',
            maxHeight: isOpen ? '500px' : '0',
            overflow: 'hidden',
          }}
        >
          <span style={{ fontWeight: 'bold', /*color: '#333'*/ }}>
            {label}: {/* Dynamically change the label */}
          </span>
          {definition}
        </span>
      )}
    </span>
  );
};

export default ExpandableDefinition;
