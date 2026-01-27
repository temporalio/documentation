import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {createPortal} from 'react-dom';
import {DocSearchButton, useDocSearchKeyboardEvents} from '@docsearch/react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import {
  isRegexpStringMatch,
  useSearchLinkCreator,
} from '@docusaurus/theme-common';
import {
  useAlgoliaContextualFacetFilters,
  useSearchResultUrlProcessor,
} from '@docusaurus/theme-search-algolia/client';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import translations from '@theme/SearchTranslations';
import type {
  InternalDocSearchHit,
  DocSearchModal as DocSearchModalType,
  DocSearchModalProps,
  StoredDocSearchHit,
  DocSearchTransformClient,
  DocSearchHit,
} from '@docsearch/react';

import type {AutocompleteState} from '@algolia/autocomplete-core';
import type {FacetFilters} from 'algoliasearch/lite';
import AskAIButton from "./AskAIButton";
import {getInitialLanguageFilter} from "./SDKLanguageFilter";
import {CustomSearchModal} from "./CustomSearchModal";

type DocSearchProps = Omit<
  DocSearchModalProps,
  'onClose' | 'initialScrollY'
> & {
  contextualSearch?: string;
  externalUrlRegex?: string;
  searchPagePath: boolean | string;
};

let DocSearchModal: typeof DocSearchModalType | null = null;

function importDocSearchModalIfNeeded() {
  if (DocSearchModal) {
    return Promise.resolve();
  }
  return Promise.all([
    import('@docsearch/react/modal') as Promise<
      typeof import('@docsearch/react')
    >,
    import('@docsearch/react/style'),
    import('./styles.css'),
  ]).then(([{DocSearchModal: Modal}]) => {
    DocSearchModal = Modal;
  });
}

function useNavigator({
  externalUrlRegex,
}: Pick<DocSearchProps, 'externalUrlRegex'>) {
  const history = useHistory();
  const [navigator] = useState<DocSearchModalProps['navigator']>(() => {
    return {
      navigate(params) {
        // Algolia results could contain URL's from other domains which cannot
        // be served through history and should navigate with window.location
        if (isRegexpStringMatch(externalUrlRegex, params.itemUrl)) {
          window.location.href = params.itemUrl;
        } else {
          history.push(params.itemUrl);
        }
      },
    };
  });
  return navigator;
}

function useTransformSearchClient(): DocSearchModalProps['transformSearchClient'] {
  const {
    siteMetadata: {docusaurusVersion},
  } = useDocusaurusContext();
  return useCallback(
    (searchClient: DocSearchTransformClient) => {
      searchClient.addAlgoliaAgent('docusaurus', docusaurusVersion);
      return searchClient;
    },
    [docusaurusVersion],
  );
}

function useTransformItems(props: Pick<DocSearchProps, 'transformItems'>) {
  const processSearchResultUrl = useSearchResultUrlProcessor();
  const [transformItems] = useState<DocSearchModalProps['transformItems']>(
    () => {
      return (items: DocSearchHit[]) =>
        props.transformItems
          ? // Custom transformItems
            props.transformItems(items)
          : // Default transformItems
            items.map((item) => ({
              ...item,
              url: processSearchResultUrl(item.url),
            }));
    },
  );
  return transformItems;
}

function useResultsFooterComponent({
  closeModal,
}: {
  closeModal: () => void;
}): DocSearchProps['resultsFooterComponent'] {
  return useMemo(
    () =>
      ({state}) =>
        <ResultsFooter state={state} onClose={closeModal} />,
    [closeModal],
  );
}

function Hit({
  hit,
  children,
}: {
  hit: InternalDocSearchHit | StoredDocSearchHit;
  children: React.ReactNode;
}) {
  return <Link to={hit.url}>{children}</Link>;
}

type ResultsFooterProps = {
  state: AutocompleteState<InternalDocSearchHit>;
  onClose: () => void;
};

function ResultsFooter({ state, onClose }: ResultsFooterProps) {
  const createSearchLink = useSearchLinkCreator();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <AskAIButton query={state.query} closeDocSearch={onClose} />
      <Link to={createSearchLink(state.query)} onClick={onClose}>
        <Translate
          id="theme.SearchBar.seeAll"
          values={{ count: state.context.nbHits }}
        >
          {"See all {count} results"}
        </Translate>
      </Link>
    </div>
  );
}

function useSearchParameters({
  contextualSearch,
  ...props
}: DocSearchProps): DocSearchProps['searchParameters'] {
  function mergeFacetFilters(f1: FacetFilters, f2: FacetFilters): FacetFilters {
    const normalize = (f: FacetFilters): FacetFilters =>
      typeof f === 'string' ? [f] : f;
    return [...normalize(f1), ...normalize(f2)];
  }

  const contextualSearchFacetFilters =
    useAlgoliaContextualFacetFilters() as FacetFilters;

  const configFacetFilters: FacetFilters =
    props.searchParameters?.facetFilters ?? [];

  const facetFilters: FacetFilters = contextualSearch
    ? // Merge contextual search filters with config filters
      mergeFacetFilters(contextualSearchFacetFilters, configFacetFilters)
    : // ... or use config facetFilters
      configFacetFilters;

  // We let users override default searchParameters if they want to
  return {
    ...props.searchParameters,
    facetFilters,
  };
}


function DocSearch({externalUrlRegex, appId, apiKey, indexName, ...props}: DocSearchProps) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(() => getInitialLanguageFilter());
  const searchButtonRef = useRef<HTMLButtonElement>(null as any);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    searchButtonRef.current?.focus();
  }, []);

  const handleLanguageChange = useCallback((languages: string[]) => {
    setSelectedLanguages(languages);
    try {
      localStorage.setItem('temporal-docs-sdk-language-filter', JSON.stringify(languages));
    } catch (e) {
      console.error('Failed to save language filter:', e);
    }
  }, []);

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen: openModal,
    onClose: closeModal,
    onInput: useCallback((event: KeyboardEvent) => {
      if (event.key === 'f' && (event.metaKey || event.ctrlKey)) {
        return;
      }
      event.preventDefault();
      openModal();
    }, [openModal]),
    searchButtonRef,
  });

  return (
    <>
      <Head>
        {/* This hints the browser that the website will load data from Algolia,
        and allows it to preconnect to the DocSearch cluster. It makes the first
        query faster, especially on mobile. */}
        <link
          rel="preconnect"
          href={`https://${appId}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />
      </Head>

      <DocSearchButton
        onClick={openModal}
        ref={searchButtonRef}
        translations={props.translations?.button ?? translations.button}
      />

      {isOpen &&
        createPortal(
          <CustomSearchModal
            appId={appId}
            apiKey={apiKey}
            indexName={indexName}
            onClose={closeModal}
            selectedLanguages={selectedLanguages}
            onLanguageChange={handleLanguageChange}
          />,
          document.body,
        )}
    </>
  );
}

export default function SearchBar(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return <DocSearch {...(siteConfig.themeConfig.algolia as DocSearchProps)} />;
}
