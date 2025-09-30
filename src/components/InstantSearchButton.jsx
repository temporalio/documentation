import React from "react";
import {
  useInstantSearch,
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  PoweredBy,
} from "react-instantsearch";

function AskAIButton() {
  // Get the current search query from Algolia
  const { uiState } = useInstantSearch();
  const { query } = uiState["temporal"];

  // Handle button click by opening Kapa with the query
  const handleClick = () => {
    window.Kapa.open({ query, submit: true });
  };

  // Only show the button when there's an active query
  return query ? (
    <button className="ask-ai-button" onClick={handleClick}>
      <span className="ask-ai-text">Ask AI about "{query}"</span>
    </button>
  ) : null;
}