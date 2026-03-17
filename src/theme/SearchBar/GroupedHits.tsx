import React from 'react';
import { useHits } from 'react-instantsearch';
import { Hit } from './Hit';

interface GroupedHitsProps {
  selectedIndex: number;
  onNavigate: () => void;
}

export function GroupedHits({ selectedIndex, onNavigate }: GroupedHitsProps) {
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

                // If there's no page hit but there are anchors, treat the first anchor as the "page"
                const hasPageHit = !!page;
                const firstAnchorAsPage = !hasPageHit && anchors.length > 0 ? anchors[0] : null;
                const remainingAnchors = firstAnchorAsPage ? anchors.slice(1) : anchors;

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
                    {/* If no page hit, render first anchor as page-level item */}
                    {firstAnchorAsPage && (
                      <Hit
                        key={firstAnchorAsPage.objectID}
                        hit={firstAnchorAsPage}
                        isSelected={hitIndex++ === selectedIndex}
                        onNavigate={onNavigate}
                        isAnchor={false}
                      />
                    )}
                    {/* Render remaining anchor hits as tree children */}
                    {remainingAnchors.map((anchor: any, anchorIndex: number) => (
                      <Hit
                        key={anchor.objectID}
                        hit={anchor}
                        isSelected={hitIndex++ === selectedIndex}
                        onNavigate={onNavigate}
                        isAnchor={true}
                        isLastAnchor={anchorIndex === remainingAnchors.length - 1}
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
