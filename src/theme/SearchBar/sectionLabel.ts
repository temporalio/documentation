import { titleWithSection } from '@site/src/utils/sectionTitle';
import { SDK_LANGUAGES } from './SDKLanguageFilter';

// The label for a search hit's SDK language, e.g. "Java" for `sdk_language: java`.
export function getLanguageLabel(hit: any): string | undefined {
  return SDK_LANGUAGES.find((sdk) => sdk.id === hit.sdk_language)?.label;
}

/**
 * The section label to show after a result title, such as "Java SDK", or
 * undefined when none applies.
 *
 * Prefers the `section_title` record attribute, which the crawler copies from
 * the page's <meta name="docsearch:section_title">. Until a page has been
 * recrawled with that attribute, falls back to the SDK language label.
 */
export function getSectionLabel(resultTitle: string, hit: any, languageLabel?: string): string | undefined {
  const sectionTitle = typeof hit.section_title === 'string' ? hit.section_title.trim() : '';
  if (sectionTitle) {
    return titleWithSection(resultTitle, sectionTitle) === resultTitle ? undefined : sectionTitle;
  }
  if (languageLabel && !resultTitle.toLowerCase().includes(languageLabel.toLowerCase())) {
    return `${languageLabel} SDK`;
  }
  return undefined;
}
