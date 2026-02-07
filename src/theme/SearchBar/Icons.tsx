import React from 'react';

export function PageIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="custom-search-hit-icon">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
    </svg>
  );
}

export function AnchorIcon() {
  return (
    <span className="custom-search-hit-icon custom-search-hit-icon--anchor">#</span>
  );
}

export function TreeBranch({ isLast }: { isLast: boolean }) {
  return (
    <svg className="custom-search-hit-tree" viewBox="0 0 24 54" strokeWidth="1.5">
      <g stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        {isLast ? (
          // Bottom branch: vertical line stops at horizontal
          <path d="M8 6v21M20 27H8"></path>
        ) : (
          // Middle branch: vertical line goes all the way through
          <path d="M8 6v42M20 27H8"></path>
        )}
      </g>
    </svg>
  );
}
