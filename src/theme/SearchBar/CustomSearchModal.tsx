import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  InstantSearch,
  SearchBox,
  Configure,
} from 'react-instantsearch';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { ClearButton } from './ClearButton';
import { LanguageFilter } from './LanguageFilter';
import { SearchResults } from './SearchResults';
import { SearchFooter } from './SearchFooter';
import { SDK_LANGUAGES } from './SDKLanguageFilter';

interface CustomSearchModalProps {
  appId: string;
  apiKey: string;
  indexName: string;
  onClose: () => void;
  selectedLanguages: string[];
  onLanguageChange: (languages: string[]) => void;
}

export function CustomSearchModal({
  appId,
  apiKey,
  indexName,
  onClose,
  selectedLanguages,
  onLanguageChange,
}: CustomSearchModalProps) {
  const searchClient = algoliasearch(appId, apiKey);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [resultCount, setResultCount] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(-1);
  }, [selectedLanguages]);

  // Handle results change - only reset selection when count actually changes
  const handleResultsChange = useCallback((count: number) => {
    setResultCount((prevCount) => {
      // Only reset selection if the result count changed
      if (prevCount !== count) {
        setSelectedIndex(-1);
      }
      return count;
    });
  }, []);

  // Keyboard navigation and focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if the modal is mounted
      if (!modalRef.current) return;

      // Get all hits dynamically
      const hitElements = modalRef.current.querySelectorAll('.custom-search-hit');
      const totalHits = hitElements?.length || 0;

      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        e.stopPropagation();
        if (totalHits > 0) {
          setSelectedIndex((prev) => (prev < totalHits - 1 ? prev + 1 : prev));
        }
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        e.stopPropagation();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        return;
      }

      if (e.key === 'Enter') {
        // Only handle Enter for navigation if a result is selected
        if (selectedIndex >= 0 && hitElements) {
          e.preventDefault();
          e.stopPropagation();
          const selectedHit = hitElements[selectedIndex] as HTMLAnchorElement;
          selectedHit?.click();
        }
        return;
      }

      if (e.key === 'Tab') {
        // Focus trap logic
        const focusableElements = modalRef.current.querySelectorAll(
          'input, button, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          // Shift+Tab - if on first element, go to last
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab - if on last element, go to first
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    // Add event listener in capture phase to intercept before child elements
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [onClose, selectedIndex]);

  // Build facet filters based on selected languages
  // Uses negative filters to exclude unselected languages
  // This shows selected languages + language-agnostic content (no sdk_language attribute)
  const facetFilters = selectedLanguages.length > 0
    ? SDK_LANGUAGES
        .filter(lang => !selectedLanguages.includes(lang.id))
        .map(lang => `sdk_language:-${lang.id}`)
    : undefined;

  return (
    <div className="custom-search-overlay" onClick={onClose} role="presentation">
      <div
        ref={modalRef}
        className="custom-search-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search documentation"
      >
        <InstantSearch searchClient={searchClient} indexName={indexName}>
          <Configure
            hitsPerPage={20}
            facetFilters={facetFilters}
            attributesToRetrieve={[
              'hierarchy',
              'content',
              'anchor',
              'url',
              'url_without_anchor',
              'type',
              'sdk_language',
            ]}
          />
          <div className="custom-search-header">
            <SearchBox
              placeholder="Search documentation..."
              autoFocus
              classNames={{
                root: 'custom-search-box',
                form: 'custom-search-form',
                input: 'custom-search-input',
                submit: 'custom-search-submit',
                reset: 'custom-search-reset',
              }}
            />
            <ClearButton />
            <button
              className="custom-search-close"
              onClick={onClose}
              aria-label="Close search"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
              </svg>
            </button>
          </div>
          <LanguageFilter
            selectedLanguages={selectedLanguages}
            onLanguageChange={onLanguageChange}
          />
          <SearchResults
            onClose={onClose}
            selectedIndex={selectedIndex}
            onResultsChange={handleResultsChange}
          />
          <SearchFooter />
          {/* Screen reader announcements */}
          <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
            {resultCount > 0 ? `${resultCount} results found` : ''}
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}
