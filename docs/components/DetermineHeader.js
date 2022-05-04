import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";

export default function DetermineHeader({hLevel, hText}) {
  switch (hLevel) {
    case "##":
      return <h2>{hText}</h2>;
      break;
    case "###":
      return <h3>{hText}</h3>;
      break;
    case "####":
      return <h4>{hText}</h4>;
      break;
    case "#####":
      return <h4>{hText}</h4>;
      break;
    default:
      return null;
  }
}
