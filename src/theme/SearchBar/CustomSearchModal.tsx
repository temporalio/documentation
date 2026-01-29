import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  InstantSearch,
  SearchBox,
  Configure,
  Snippet,
  Highlight,
  useSearchBox,
  useHits,
} from 'react-instantsearch';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { useHistory } from '@docusaurus/router';
import AskAIButton from './AskAIButton';
import { SDK_LANGUAGES } from './SDKLanguageFilter';

function ClearButton() {
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

interface CustomSearchModalProps {
  appId: string;
  apiKey: string;
  indexName: string;
  onClose: () => void;
  selectedLanguages: string[];
  onLanguageChange: (languages: string[]) => void;
}

// Icon components for hit types
function PageIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="custom-search-hit-icon">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
    </svg>
  );
}

function AnchorIcon() {
  return (
    <span className="custom-search-hit-icon custom-search-hit-icon--anchor">#</span>
  );
}

function TreeBranch({ isLast }: { isLast: boolean }) {
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

function Hit({ hit, isSelected, onNavigate, isAnchor, isLastAnchor, parentTitle }: {
  hit: any;
  isSelected: boolean;
  onNavigate: () => void;
  isAnchor?: boolean;
  isLastAnchor?: boolean;
  parentTitle?: string;
}) {
  const history = useHistory();
  const hitRef = useRef<HTMLAnchorElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const fullUrl = hit.url || hit.objectID;
    // Extract pathname from full URL to avoid appending the whole URL
    try {
      const url = new URL(fullUrl, window.location.origin);
      history.push(url.pathname + url.hash);
    } catch {
      history.push(fullUrl);
    }
    onNavigate();
  };

  // Scroll into view when selected
  useEffect(() => {
    if (isSelected && hitRef.current) {
      hitRef.current.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [isSelected]);

  const hitClassName = [
    'custom-search-hit',
    isSelected ? 'custom-search-hit--selected' : '',
    isAnchor ? 'custom-search-hit--anchor' : 'custom-search-hit--page',
  ].filter(Boolean).join(' ');

  return (
    <a
      ref={hitRef}
      href={hit.url || hit.objectID}
      onClick={handleClick}
      className={hitClassName}
      tabIndex={-1}
      role="option"
      aria-selected={isSelected}
    >
      {isAnchor ? (
        <div className="custom-search-hit-icon-wrapper">
          <TreeBranch isLast={isLastAnchor ?? true} />
          <AnchorIcon />
        </div>
      ) : (
        <div className="custom-search-hit-icon-wrapper">
          <PageIcon />
        </div>
      )}
      <div className="custom-search-hit-content">
        <div className="custom-search-hit-title">
          <Highlight attribute={isAnchor ? 'hierarchy.lvl2' : 'hierarchy.lvl1'} hit={hit} />
        </div>
        {isAnchor && parentTitle && (
          <div className="custom-search-hit-path">
            {parentTitle}
          </div>
        )}
        {!isAnchor && hit.content && (
          <div className="custom-search-hit-text">
            <Snippet attribute="content" hit={hit} />
          </div>
        )}
      </div>
    </a>
  );
}

function LanguageFilter({ selectedLanguages, onLanguageChange }: {
  selectedLanguages: string[];
  onLanguageChange: (languages: string[]) => void;
}) {
  const toggleLanguage = (langId: string) => {
    const newSelection = selectedLanguages.includes(langId)
      ? selectedLanguages.filter((id) => id !== langId)
      : [...selectedLanguages, langId];
    onLanguageChange(newSelection);
  };

  const clearAll = () => {
    onLanguageChange([]);
  };

  // Get labels for selected languages
  const selectedLabels = selectedLanguages
    .map(id => SDK_LANGUAGES.find(lang => lang.id === id)?.label)
    .filter(Boolean)
    .join(', ');

  return (
    <div className="custom-search-language-filter">
      <div className="custom-search-language-filter-header">
        <span className="custom-search-language-filter-title">Filter by SDK</span>
        {selectedLanguages.length > 0 && (
          <button
            className="custom-search-language-filter-clear"
            onClick={clearAll}
            type="button"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="custom-search-language-filter-options">
        {SDK_LANGUAGES.map((lang) => (
          <label key={lang.id} className="custom-search-language-filter-option">
            <input
              type="checkbox"
              checked={selectedLanguages.includes(lang.id)}
              onChange={() => toggleLanguage(lang.id)}
            />
            <span>{lang.label}</span>
          </label>
        ))}
      </div>
      {selectedLanguages.length > 0 && (
        <div className="custom-search-language-filter-note">
          Showing {selectedLabels} and language-agnostic content
        </div>
      )}
    </div>
  );
}

function GroupedHits({ selectedIndex, onNavigate }: { selectedIndex: number; onNavigate: () => void }) {
  const { items } = useHits();

  // Group hits by their top-level category (hierarchy.lvl0)
  const groupedByCategory = items.reduce((acc: any, hit: any) => {
    const category = hit.hierarchy?.lvl0 || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(hit);
    return acc;
  }, {});

  const categories = Object.keys(groupedByCategory);

  if (categories.length === 0) {
    return null;
  }

  let hitIndex = 0;

  return (
    <>
      {categories.map((category) => {
        // Within each category, group by page (url_without_anchor)
        const hitsByPage = groupedByCategory[category].reduce((acc: any, hit: any) => {
          const pageUrl = hit.url_without_anchor || hit.url;
          if (!acc[pageUrl]) {
            acc[pageUrl] = { page: null, anchors: [] };
          }
          // Determine if this is a page-level hit or an anchor hit
          const isAnchorHit = hit.anchor && hit.url !== hit.url_without_anchor;
          if (isAnchorHit) {
            acc[pageUrl].anchors.push(hit);
          } else {
            acc[pageUrl].page = hit;
          }
          return acc;
        }, {});

        const pageUrls = Object.keys(hitsByPage);

        return (
          <div key={category} className="custom-search-section">
            <div className="custom-search-section-header">
              {category}
            </div>
            <div className="custom-search-section-hits">
              {pageUrls.map((pageUrl) => {
                const { page, anchors } = hitsByPage[pageUrl];
                const pageTitle = page?.hierarchy?.lvl1 || anchors[0]?.hierarchy?.lvl1 || 'Untitled';

                return (
                  <div key={pageUrl} className="custom-search-page-group">
                    {/* Render page hit if it exists */}
                    {page && (
                      <Hit
                        key={page.objectID}
                        hit={page}
                        isSelected={hitIndex++ === selectedIndex}
                        onNavigate={onNavigate}
                        isAnchor={false}
                      />
                    )}
                    {/* Render anchor hits */}
                    {anchors.map((anchor: any, anchorIndex: number) => (
                      <Hit
                        key={anchor.objectID}
                        hit={anchor}
                        isSelected={hitIndex++ === selectedIndex}
                        onNavigate={onNavigate}
                        isAnchor={true}
                        isLastAnchor={anchorIndex === anchors.length - 1}
                        parentTitle={pageTitle}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}

function SearchResults({ onClose, selectedIndex, onResultsChange }: {
  onClose: () => void;
  selectedIndex: number;
  onResultsChange: (count: number) => void;
}) {
  const { items } = useHits();
  const { query } = useSearchBox();

  // Notify parent when results change
  useEffect(() => {
    onResultsChange(items.length);
  }, [items.length, onResultsChange]);

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
        </div>
      )}
    </div>
  );
}

function SearchFooter() {
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
