import React from 'react';
import { useSearchBox } from 'react-instantsearch';

export function ClearButton() {
  const { query, refine } = useSearchBox();

  if (!query) return null;

  return (
    <button
      className="custom-search-clear"
      onClick={() => refine('')}
      type="button"
    >
      Clear the query
    </button>
  );
}
