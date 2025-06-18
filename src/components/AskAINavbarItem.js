import React from 'react';

export default function AskAINavbarItem() {
  const handleAskAI = () => {
    if (typeof window !== 'undefined') {
      // Try global Kapa functions
      if (window.kapa && typeof window.kapa.open === 'function') {
        window.kapa.open();
        return;
      }
      
      if (window.Kapa && typeof window.Kapa.open === 'function') {
        window.Kapa.open();
        return;
      }
      
      // Try to trigger the existing widget button
      const kapaButton = document.querySelector('#kapa-widget-container button');
      if (kapaButton) {
        kapaButton.click();
        return;
      }
      
      // Look for any Kapa-related buttons
      const kapaElements = document.querySelectorAll('[class*="kapa"], [id*="kapa"]');
      for (const element of kapaElements) {
        if (element.tagName === 'BUTTON' || element.querySelector('button')) {
          const button = element.tagName === 'BUTTON' ? element : element.querySelector('button');
          button.click();
          return;
        }
      }
      
      // Try to find any fixed-position button (likely the widget)
      const allButtons = document.querySelectorAll('button');
      for (const button of allButtons) {
        const style = window.getComputedStyle(button);
        if (style.position === 'fixed' && 
            button.offsetParent !== null && 
            !button.classList.contains('ask-ai-navbar-button')) {
          button.click();
          return;
        }
      }
    }
  };

  return (
    <button
      className="ask-ai-navbar-button"
      onClick={handleAskAI}
      aria-label="Ask AI"
      title="Ask AI"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
          fill="currentColor"
        />
        <path
          d="M19 15L19.5 17L21.5 17.5L19.5 18L19 20L18.5 18L16.5 17.5L18.5 17L19 15Z"
          fill="currentColor"
        />
        <path
          d="M5 6L5.5 7.5L7 8L5.5 8.5L5 10L4.5 8.5L3 8L4.5 7.5L5 6Z"
          fill="currentColor"
        />
      </svg>
      <span className="ask-ai-text">Ask AI</span>
    </button>
  );
} 