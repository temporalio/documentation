import React, { useState } from 'react';

const InfoButton = ({ message }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleTooltip = () => setIsActive(!isActive);

  return (
    <div className="absCenter">
      <button
        className={`infoButton ${isActive ? 'infoButton_isActive' : ''}`}
        onClick={toggleTooltip}
        aria-label="More Info"
      >
        <span className="infoButton-btn">
          <span className="infoButton-btn-text">+</span>
        </span>
      </button>

      {isActive && (
        <div className={`infoButton-container ${isActive ? 'infoButton_isActive' : ''}`}>
          <div className="infoButton-container-message">{message}</div>
        </div>
      )}
    </div>
  );
};

export default InfoButton;
