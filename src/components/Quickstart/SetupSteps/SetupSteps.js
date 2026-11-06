import React from 'react';
import styles from './setup-steps.module.css';
import CodeBlock from '@theme/CodeBlock';

// Depth-first search of a React element tree for the first node that matches.
const findElement = (node, predicate) => {
  let found = null;
  React.Children.forEach(node, (child) => {
    if (found || !React.isValidElement(child)) return;
    if (predicate(child)) {
      found = child;
      return;
    }
    found = findElement(child.props.children, predicate);
  });
  return found;
};

const textContent = (node) => {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textContent).join('');
  if (React.isValidElement(node)) return textContent(node.props.children);
  return '';
};

// Snipsync writes Markdown between its SNIPSTART/SNIPEND markers: a source link
// line followed by a fenced code block. MDX renders that as a paragraph with a
// link and a <pre><code className="language-x"> pair. Pull the code, language,
// and source link back out so they render as a single titled CodeBlock.
const parseSnipsyncChildren = (children) => {
  const code = findElement(children, (el) => /\blanguage-/.test(el.props.className || ''));
  if (!code) return null;
  const link = findElement(children, (el) => typeof el.props.href === 'string');
  return {
    code: textContent(code.props.children).replace(/\n$/, ''),
    language: (code.props.className.match(/\blanguage-(\S+)/) || [])[1],
    sourceHref: link?.props.href,
    sourceLabel: link ? textContent(link.props.children) : undefined,
  };
};

export const CodeSnippet = ({ language, title, children }) => {
  const snippet = typeof children === 'string' ? null : parseSnipsyncChildren(children);
  if (!snippet) {
    return (
      <CodeBlock language={language} title={title} showLineNumbers={false}>
        {children}
      </CodeBlock>
    );
  }
  const label = title || snippet.sourceLabel;
  return (
    <CodeBlock
      language={language || snippet.language}
      title={label && snippet.sourceHref ? <a className={styles.sourceLink} href={snippet.sourceHref}>{label}</a> : label}
      showLineNumbers={false}
    >
      {snippet.code}
    </CodeBlock>
  );
};

export const SetupStep = ({ children, code }) => {
  // Without a `code` prop, <CodeSnippet> children render in the code column.
  // This keeps snippets in Markdown context, where Snipsync output can parse.
  let content = children;
  let codeColumn = code;
  if (!codeColumn) {
    const snippets = [];
    content = React.Children.toArray(children).filter((child) => {
      const isSnippet = React.isValidElement(child) && child.type === CodeSnippet;
      if (isSnippet) snippets.push(child);
      return !isSnippet;
    });
    if (snippets.length) codeColumn = snippets;
  }
  return (
    <div className={`${styles.setupStep} ${codeColumn ? '' : styles.noCode}`}>
      <div className={styles.content}>
        {content}
      </div>
      {codeColumn && (
        <div className={styles.code}>
          {codeColumn}
        </div>
      )}
    </div>
  );
};

export const SetupSteps = ({ children }) => {
  return (
    <div className={styles.setupSteps}>
      {children}
    </div>
  );
};
