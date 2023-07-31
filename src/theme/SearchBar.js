import React, { useEffect, useState } from "react";
import AlgoliaSearchBar from "@docusaurus/theme-search-algolia/SearchBar";
import "./search.css";
import "./algolia-overrides.css";

function SearchIcon({ open }) {
  if (open) {
    return <img className="temporal-ball" src="/img/Temporal_Logo_Animation.gif" width="40px" height="40px" />;
  }
  return (
    <svg width="20" height="20" className="DocSearch-Search-Icon" viewBox="0 0 20 20">
      <path
        d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
        stroke="currentColor"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

function SearchBar({ toggle, isOpen, close }) {
  // FIXME Escape and Cmd-I don't close the iframe
  // Could listen inside iframe and use postMessage, but maybe better to not use iframe?
  useEffect(() => {
    const handler = function (event) {
      if (event.key === "Escape") {
        close();
      }

      // metaKey is Cmd or Windows key
      if (event.key === "i" && (event.ctrlKey || event.metaKey)) {
        toggle();
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []);

  return (
    <button onClick={toggle} type="button" className="DocSearch DocSearch-Button" aria-label="Search">
      <span className="DocSearch-Button-Container">
        <SearchIcon open={isOpen} />
        <span className="DocSearch-Button-Placeholder">
          <span className="hide-small">Ask </span>IQ
        </span>
      </span>
      <span className="DocSearch-Button-Keys">
        <kbd className="DocSearch-Button-Key">⌘</kbd>
        <kbd className="DocSearch-Button-Key">I</kbd>
      </span>
    </button>
  );
}

function Modal({ show, close }) {
  if (show) {
    return (
      <div className="modal-overlay" onClick={close}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <iframe src="https://iq.temporal.io" />
        </div>
      </div>
    );
  }

  return null;
}

export default function Search() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="search-container">
      <AlgoliaSearchBar />
      <SearchBar isOpen={isOpen} toggle={() => setOpen(!isOpen)} close={() => setOpen(false)} />
      <Modal show={isOpen} close={() => setOpen(false)} />
    </div>
  );
}
