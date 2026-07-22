import React from "react";

export default function EditThisPageWrapper({ editUrl }) {
  if (!editUrl) {
    return null;
  }

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
    <div style={feedbackStyle}>
      <p style={{ margin: 0, fontWeight: "500" }}>Help us make Temporal better. <a href={editUrl}>View this page</a> on GitHub.</p>
    </div>
  );
}
