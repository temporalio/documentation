import React, { useState, useRef, useEffect } from 'react';

const DiscoverableDisclosure = ({ label = "Summary", children, prompt = "Dive deeper — " }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const summaryRef = useRef(null);

  const [maxHeight, setMaxHeight] = useState('0px');

  const toggleOpen = () => {
    setIsOpen((prev) => {
      const newState = !prev;

      if (newState) {
        setMaxHeight('500px');
      } else {
        setMaxHeight('0px');
      }
      return newState;
    });
  };

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    }

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
        ref={summaryRef}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          fontSize: '1.0rem',
          padding: '8px 16px',
          minHeight: '40px',
          lineHeight: '1.5',
          transition: 'color 200ms ease',
        }}
        onClick={toggleOpen}
        onMouseEnter={(e) => (e.target.style.color = '#007BFF')}
        onMouseLeave={(e) => (e.target.style.color = '')}
      >
        {prompt}
        <strong>{label}</strong>
        <span style={{ marginLeft: '8px', fontSize: '1.2rem' }}>
          {isOpen ? '[-]' : '[+]'}
        </span>
      </summary>

      <div
        ref={contentRef}
        style={{
          maxHeight,
          marginTop: '5px',
          padding: isOpen ? '10px' : '0',
          borderRadius: '8px',
          transition: 'max-height 0.3s ease, padding 0.3s ease',
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
