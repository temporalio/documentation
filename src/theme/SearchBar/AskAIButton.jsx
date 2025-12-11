function AskAIButton({ query, closeDocSearch }) {
  // Handle button click by opening Kapa with the query
  const handleClick = () => {
    closeDocSearch();
    window.Kapa.open({ query, submit: true });
  };

  // Only show the button when there's an active query
  return query ? (
    <button className="ask-ai-button" onClick={handleClick}>
      <span className="ask-ai-text">Ask AI about "{query}"</span>
    </button>
  ) : null;
}

export default AskAIButton;