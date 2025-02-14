import React, { useState, useRef, useEffect } from 'react';

const DiscoverableDisclosure = ({ label = "Summary", children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const summaryRef = useRef(null);

  // Set initial max-height value for transition
  const [maxHeight, setMaxHeight] = useState('0px');

  const toggleOpen = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      // Update max-height for smooth collapsing
      if (newState) {
        setMaxHeight('500px'); // Arbitrary max height for smooth expansion
      } else {
        setMaxHeight('0px'); // Collapse with animation
      }
      return newState;
    });
  };

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`); // Dynamically adjust max-height based on content height
    }

    // Scroll back into view after the collapse
    if (!isOpen && summaryRef.current) {
      summaryRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isOpen]);

  return (
    <div
      style={{
        borderRadius: '0.5rem',
        margin: '1rem',
        padding: '16px 24px',
        border: '2px solid #ccc',
        transition: '200ms',
      }}
    >
      <summary
        ref={summaryRef} // Attach the ref to the summary element
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          fontSize: '1.0rem',
          padding: '8px 16px',
          minHeight: '40px',
          lineHeight: '1.5',
          transition: 'color 200ms ease', // Smooth transition for hover color
        }}
        onClick={toggleOpen}
        onMouseEnter={(e) => (e.target.style.color = '#007BFF')}
        onMouseLeave={(e) => (e.target.style.color = '')}
      >
        Dive deeper&nbsp;—&nbsp;<strong>{label}</strong>
        <span style={{ marginLeft: '8px', fontSize: '1.2rem' }}>
          {isOpen ? '[-]' : '[+]'}
        </span>
      </summary>

      <div
        ref={contentRef}
        style={{
          maxHeight, // Apply dynamic maxHeight
          marginTop: '5px',
          padding: isOpen ? '10px' : '0', // Only add padding when open
          borderRadius: '8px',
          transition: 'max-height 0.3s ease, padding 0.3s ease', // Smooth transition for collapse only
          overflow: 'hidden',
        }}
      >
        {children}
      </div>

      {isOpen && (
        <div
          style={{
            marginTop: '10px',
            textAlign: 'center',
            fontSize: '1.0rem',
            cursor: 'pointer',
            color: '#007BFF',
            fontWeight: 'bold',
          }}
          onClick={toggleOpen}
        >
          <span style={{ marginRight: '8px' }}>↩️</span>
          Close back up
        </div>
      )}
    </div>
  );
};

export default DiscoverableDisclosure;
