import React, { useState, useRef, useEffect } from 'react';

const ToolTipText = ({ term, tooltip }) => {
  const [isOpen, setIsOpen] = useState(false); // Tooltip is closed by default
  const [isClosingByButton, setIsClosingByButton] = useState(false); // Track if it's closing by button
  const tooltipRef = useRef(null);
  const termRef = useRef(null);

  // Open the tooltip with animation after 0.1s pause
  const openTooltip = () => {
    setTimeout(() => {
      setIsOpen(true); // Open the tooltip after the delay
    }, 100); // 0.1s pause before opening
  };

  // Close the tooltip instantly (no animation) when clicked outside or on term
  const closeTooltipInstantly = () => {
    setIsOpen(false); // Instantly close the tooltip
    setIsClosingByButton(false); // Reset the closing button flag
  };

  // Close the tooltip with animation when "Done" is clicked
  const closeTooltipWithAnimation = () => {
    setIsClosingByButton(true); // Mark as closing by button
    setIsOpen(false); // Trigger animation by changing state
  };

  // Add event listener to close the tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        termRef.current &&
        !termRef.current.contains(event.target)
      ) {
        closeTooltipInstantly(); // Close instantly when clicking outside
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside); // Clean up the listener on component unmount
    };
  }, []);

  return (
    <span style={{ display: 'inline-block' }}>
      {/* Term with blue color and underlined */}
      <span
        ref={termRef}
        onClick={openTooltip}
        onFocus={openTooltip}
        aria-describedby="tooltip"
        tabIndex="0" // Make the term focusable
        role="button" // Define the term as a button for screen readers
        style={{
          cursor: 'help',
          color: '#007acc',
          textDecoration: 'underline',
          fontFamily: 'Arial, sans-serif',
          fontSize: '1rem',
        }}
      >
        {term}
      </span>

      {/* Tooltip Message */}
      {isOpen && (
        <div
          ref={tooltipRef}
          className="toolTipTextOpen" // Class to mark it as open
          role="tooltip"
          id="tooltip"
          aria-live="assertive"
          aria-atomic="true"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#3E474F',
            padding: '16px',
            borderRadius: '8px',
            color: '#EDEFF0',
            fontSize: '1rem',
            textAlign: 'center',
            width: '80%',
            maxWidth: '300px',
            opacity: isOpen ? 1 : 0,
            transition: isClosingByButton
              ? 'opacity 0.3s ease-out, transform 0.3s ease-out' // Animated transition for closing
              : 'none', // No animation for closing instantly
            zIndex: 100,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h4
            style={{
              fontSize: '1.2rem',
              color: '#EDEFF0',
              margin: 0,
              marginBottom: '8px',
            }}
          >
            {term}
          </h4>
          <p style={{ fontSize: '1rem', margin: 0 }}>{tooltip}</p>

          <button
            onClick={closeTooltipWithAnimation}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#EDEFF0',
              cursor: 'pointer',
              fontSize: '1rem',
              marginTop: '10px',
              fontWeight: 'bold',
              textDecoration: 'underline',
            }}
            aria-label="Close tooltip"
          >
            Done
          </button>
        </div>
      )}
    </span>
  );
};

export default ToolTipText;
