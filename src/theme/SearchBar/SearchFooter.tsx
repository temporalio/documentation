import React from 'react';

export function SearchFooter() {
  return (
    <div className="custom-search-footer">
      <div className="custom-search-footer-shortcut">
        <span className="custom-search-footer-key">↑</span>
        <span className="custom-search-footer-key">↓</span>
        <span className="custom-search-footer-label">Navigate</span>
      </div>
      <div className="custom-search-footer-shortcut">
        <span className="custom-search-footer-key">↵</span>
        <span className="custom-search-footer-label">Select</span>
      </div>
      <div className="custom-search-footer-shortcut">
        <span className="custom-search-footer-key">ESC</span>
        <span className="custom-search-footer-label">Close</span>
      </div>
    </div>
  );
}
