import React, { useState } from 'react';

const ExpandableDefinition = ({ term, definition }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDefinition = () => setIsOpen(!isOpen);

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      {/* Term and button within the same span */}
      <span
        style={{
          marginRight: '1px', // Small space between term and button
          fontWeight: '500',
          fontSize: '1rem',
          color: 'var(--primary-text-color)', // Text color for the term
        }}
      >
        {term}
      </span>

      <button
        onClick={toggleDefinition}
        aria-expanded={isOpen}
        aria-label={`Toggle definition for ${term}`}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--button-color)', // Blue for interactable button
          cursor: 'pointer',
          fontSize: '1.2rem',
          padding: '0',
          margin: '0',
          verticalAlign: 'middle', // Keep the button aligned with the term
          display: 'inline-block',
          transition: 'transform 0.3s ease-in-out',
          transform: isOpen ? 'rotate(45deg)' : 'none',
        }}
      >
        ⊕ {/* Circled plus */}
      </button>

      {/* Inline definition */}
      {isOpen && (
        <span
          style={{
            display: 'inline-block',
            marginTop: '5px',
            marginLeft: '10px',
            fontStyle: 'italic',
            fontSize: '0.95rem',
            padding: '10px',
            border: '2px solid var(--border-color)', // Border color that adapts
            borderRadius: '8px',
            backgroundColor: 'var(--background-color)', // Background color adapts
            color: 'var(--text-color)', // Text color adapts
            transition: 'max-height 0.3s ease-out, padding 0.3s ease-out',
            maxHeight: isOpen ? '500px' : '0', // Smooth collapse/expand
            overflow: 'hidden',
          }}
        >
          {definition}
        </span>
      )}
    </span>
  );
};

export default ExpandableDefinition;
