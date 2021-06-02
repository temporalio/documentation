import React from "react";

export default function CustomWarning({children}) {
  return (
    <div
      style={{
        backgroundColor: "var(--ifm-color-warning)",
        borderColor: "var(--ifm-color-warning)",
        borderRadius: "var(--ifm-alert-border-radius)",
        borderStyle: "solid",
        borderWidth: "var(--ifm-alert-border-width)",
        padding:
          "var(--ifm-alert-padding-vertical) var(--ifm-alert-padding-horizontal)",
        marginBottom: "1em",
      }}
    >
      <div>
        <h5 style={{textTransform: "uppercase", color: "black"}}>
          <span
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              marginRight: "0.2em",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              style={{fill: "black"}}
            >
              <path
                fillRule="evenodd"
                d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"
              ></path>
            </svg>
          </span>
          caution
        </h5>
      </div>
      <div
        style={{
          color: "black",
          marginBottom: "-1.5rem",
          "--ifm-link-color": "darkblue",
          "--ifm-link-decoration": "underline",
        }}
      >
        {children}
      </div>
    </div>
  );
}
