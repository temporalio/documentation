import React from "react";

export default function EditThisPageWrapper() {
  const feedbackStyle = {
    marginTop: "20px",
    padding: "10px 15px",

    borderRadius: "8px",
    borderLeft: "4px solid #007bff", // A blue accent to match the button
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  return (
    <>
      <div style={feedbackStyle}>
        <p style={{ margin: 0, fontWeight: "500" }}>Have feedback on our documentation?</p>
        <a href="https://t.mp/docs-feedback" target="_blank" rel="noopener noreferrer">
          Post in our Community forum.
        </a>
      </div>
    </>
  );
}
