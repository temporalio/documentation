// src/components/LanguageLinks.js

import React from "react";

const LanguageLinks = ({ children }) => {
  function parseMarkdownContent() {
    const languages = [];
    const str = children.trim();
    const lines = str.split("- ");
    const newlines = [];
    for (const line of lines) {
      newlines.push(line.trim());
    }
    // Split children by lines
    let count = -1;
    for (const line of newlines) {
      if (line != "" && !isMarkdownLink(line)) {
        count++;
        languages.push({ header: line, links: [] });
      } else if (line != "" && isMarkdownLink(line)) {
        const linkRegex = /^\s*\[([^\]]*)\]\(([^)]+)\)/;
        const linkMatch = line.match(linkRegex);
        languages[count].links.push({ label: linkMatch[1], destination: linkMatch[2] });
      }
    }

    function isMarkdownLink(text) {
      const regex = /\[([^\]]*)\]\(([^)]+)\)/;
      return regex.test(text);
    }
    return languages;
  }

  const languages = parseMarkdownContent();

  return (
    <table class="dev-guide-sdk-links">
      <thead>
        <tr>
          {languages.map((language, index) => (
            <th key={index}>{language.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {languages.map((language, index) => (
            <td key={index}>
              {language.links.map((link, linkIndex) => (
                <div key={linkIndex}>
                  🔗 <a href={link.destination}>{link.label}</a>
                </div>
              ))}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default LanguageLinks;
