const ExpandableDefinition = ({ label = "Definition", definition }) => {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
      <button
        onClick={toggleDefinition}
        style={{
          background: 'none',
          border: 'none',
          color: '#007acc',
          cursor: 'pointer',
          fontSize: '0.9rem',
          margin: '0 5px',
          verticalAlign: 'middle',
          transition: 'transform 0.3s ease-in-out',
          transform: isOpen ? 'rotate(45deg)' : 'none',
          display: 'inline', // Keep the button inline with the text
        }}
      >
        ⊕ {/* Circled plus */}
      </button>
      {isOpen && (
        <span
          style={{
            display: 'inline',  // Keep the definition inline as well
            fontStyle: 'italic',
            fontFamily: 'Georgia, serif',
            marginLeft: '5px',
            maxWidth: '80%',
            padding: '5px',
            border: '2px solid #B0B0B0',
            borderRadius: '8px',
            transition: 'max-height 0.3s ease-out',
            overflow: 'hidden',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>
            {label}: {/* Dynamically change the label */}
          </span>
          {definition}
        </span>
      )}
    </span>
  );
};
