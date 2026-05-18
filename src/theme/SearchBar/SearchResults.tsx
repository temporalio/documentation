import React, { useEffect } from 'react';
import { useHits, useSearchBox, useStats } from 'react-instantsearch';
import { GroupedHits } from './GroupedHits';
import AskAIButton from './AskAIButton';

interface SearchResultsProps {
  onClose: () => void;
  selectedIndex: number;
  onResultsChange: (count: number) => void;
}

export function SearchResults({ onClose, selectedIndex, onResultsChange }: SearchResultsProps) {
  const { items } = useHits();
  const { query } = useSearchBox();
  const { nbHits } = useStats();

  // Notify parent when results change
  useEffect(() => {
    onResultsChange(items.length);
  }, [items.length, onResultsChange]);

  const handleSeeAllResults = () => {
    onClose();
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <div className="custom-search-results" role="listbox" aria-label="Search results">
      {query && <GroupedHits selectedIndex={selectedIndex} onNavigate={onClose} />}
      {items.length === 0 && query && (
        <div className="custom-search-no-results">
          No results found for "{query}"
        </div>
      )}
      {query && items.length > 0 && (
        <div id="ai-footer">
          <AskAIButton query={query} closeDocSearch={onClose} />
          <button
            className="custom-search-see-all"
            onClick={handleSeeAllResults}
            type="button"
          >
            See all {nbHits.toLocaleString()} results
          </button>
        </div>
      )}
    </div>
  );
}
