import React from 'react';
import { useHits } from 'react-instantsearch';
import { Hit } from './Hit';
import { SDK_LANGUAGES } from './SDKLanguageFilter';

interface GroupedHitsProps {
  selectedIndex: number;
  onNavigate: () => void;
}

export function GroupedHits({ selectedIndex, onNavigate }: GroupedHitsProps) {
  const { items, sendEvent } = useHits();
  const titleCounts = items.reduce((counts: Map<string, number>, hit: any) => {
    const title = hit.hierarchy?.[hit.type] || hit.hierarchy?.lvl1;
    if (title) {
      counts.set(title, (counts.get(title) || 0) + 1);
    }
    return counts;
  }, new Map<string, number>());

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

        const pageGroups = Object.entries(hitsByPage).map(([pageUrl, { page, anchors }]: [string, any]) => ({
          pageUrl,
          page,
          anchors,
          sdkLanguage: page?.sdk_language || anchors[0]?.sdk_language,
        }));
        const languageGroups = pageGroups.reduce((groups: Map<string | null, any[]>, pageGroup) => {
          const language = pageGroup.sdkLanguage || null;
          groups.set(language, [...(groups.get(language) || []), pageGroup]);
          return groups;
        }, new Map<string | null, any[]>());
        const languageLabel = (language: string) => SDK_LANGUAGES.find((sdk) => sdk.id === language)?.label || language;

        return (
          <div key={category} className="custom-search-section">
            <div className="custom-search-section-header">{category}</div>
            <div className="custom-search-section-hits">
              {[null, ...[...languageGroups.keys()].filter(Boolean)].map((language) => {
                const pages = languageGroups.get(language) || [];

                if (pages.length === 0) {
                  return null;
                }

                return (
                  <React.Fragment key={language || 'general'}>
                    {pages.map(({ pageUrl, page, anchors }: any) => {
                      const pageTitle = page?.hierarchy?.lvl1 || anchors[0]?.hierarchy?.lvl1 || 'Untitled';

                      // If there's no page hit but there are anchors, treat the first anchor as the "page"
                      const hasPageHit = !!page;
                      const firstAnchorAsPage = !hasPageHit && anchors.length > 0 ? anchors[0] : null;
                      const remainingAnchors = firstAnchorAsPage ? anchors.slice(1) : anchors;

                      return (
                        <div key={pageUrl} className="custom-search-page-group">
                          {page && (
                            <Hit
                              key={page.objectID}
                              hit={page}
                              isSelected={hitIndex++ === selectedIndex}
                              onNavigate={onNavigate}
                              isAnchor={false}
                              languageLabel={language ? languageLabel(language) : undefined}
                              showSinglePath={
                                (titleCounts.get(page.hierarchy?.[page.type] || page.hierarchy?.lvl1) || 0) > 1
                              }
                              sendEvent={sendEvent}
                            />
                          )}
                          {firstAnchorAsPage && (
                            <Hit
                              key={firstAnchorAsPage.objectID}
                              hit={firstAnchorAsPage}
                              isSelected={hitIndex++ === selectedIndex}
                              onNavigate={onNavigate}
                              isAnchor={false}
                              languageLabel={language ? languageLabel(language) : undefined}
                              showSinglePath={
                                (titleCounts.get(
                                  firstAnchorAsPage.hierarchy?.[firstAnchorAsPage.type] ||
                                    firstAnchorAsPage.hierarchy?.lvl1
                                ) || 0) > 1
                              }
                              sendEvent={sendEvent}
                            />
                          )}
                          {remainingAnchors.map((anchor: any, anchorIndex: number) => (
                            <Hit
                              key={anchor.objectID}
                              hit={anchor}
                              isSelected={hitIndex++ === selectedIndex}
                              onNavigate={onNavigate}
                              isAnchor={true}
                              isLastAnchor={anchorIndex === remainingAnchors.length - 1}
                              parentTitle={pageTitle}
                              languageLabel={language ? languageLabel(language) : undefined}
                              showSinglePath={
                                (titleCounts.get(anchor.hierarchy?.[anchor.type] || anchor.hierarchy?.lvl1) || 0) > 1
                              }
                              sendEvent={sendEvent}
                            />
                          ))}
                        </div>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
