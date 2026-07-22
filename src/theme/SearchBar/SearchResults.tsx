import React, { useEffect } from 'react';
import { useSearchBox, useStats } from 'react-instantsearch';
import { GroupedHits } from './GroupedHits';
import AskAIButton from './AskAIButton';
import { trackNoResults } from './trackSearchEvent';

interface SearchResultsProps {
  onClose: () => void;
  selectedIndex: number;
  onResultsChange: (count: number) => void;
}

export function SearchResults({ onClose, selectedIndex, onResultsChange }: SearchResultsProps) {
  // Read counts from useStats rather than useHits: useHits registers its own
  // insights-aware widget, and with `insights: true` on the tree that means
  // an extra automatic "Hits Viewed" event on top of GroupedHits' own. This
  // component only needs the count, not the hits themselves.
  const { query } = useSearchBox();
  const { nbHits } = useStats();

  // Notify parent when results change
  useEffect(() => {
    onResultsChange(nbHits);
  }, [nbHits, onResultsChange]);

  useEffect(() => {
    if (query && nbHits === 0) {
      trackNoResults(query);
    }
  }, [query, nbHits]);

  const handleSeeAllResults = () => {
    onClose();
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <div className="custom-search-results" role="listbox" aria-label="Search results">
      {query && <GroupedHits selectedIndex={selectedIndex} onNavigate={onClose} />}
      {nbHits === 0 && query && (
        <div className="custom-search-no-results">
          No results found for "{query}"
        </div>
      )}
      {query && nbHits > 0 && (
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
