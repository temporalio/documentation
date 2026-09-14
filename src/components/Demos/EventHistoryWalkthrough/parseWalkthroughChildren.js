import React from 'react';
import { extractFenceText } from '../../utils/extractElementText';
import { parseLineRanges } from './lineRanges';
import WalkthroughStep from './WalkthroughStep';
import WalkthroughCommand from './WalkthroughCommand';
import WalkthroughEvent from './WalkthroughEvent';

/**
 * Finds the Prism language for a code fence's compiled element tree: MDX
 * compiles a fence's language into a `language-xxx` className on the inner
 * `<code>`; some CodeBlock wrappers instead normalize it to a `language` prop.
 * Falls back to null rather than throwing — a build-time parse failure here
 * would fail the whole page, not just this demo.
 */
function extractFenceLanguage(node) {
  if (node == null || typeof node === 'boolean' || typeof node === 'string' || typeof node === 'number') {
    return null;
  }
  if (Array.isArray(node)) {
    for (const child of node) {
      const found = extractFenceLanguage(child);
      if (found) return found;
    }
    return null;
  }
  if (React.isValidElement(node)) {
    const className = node.props?.className;
    if (typeof className === 'string') {
      const match = className.match(/language-(\w+)/);
      if (match) return match[1];
    }
    if (typeof node.props?.language === 'string') return node.props.language;
    return extractFenceLanguage(node.props?.children);
  }
  return null;
}

/** Splits a <WalkthroughStep>'s children into its ledger entries and its prose body. */
function parseStepEntries(children) {
  const commands = [];
  const events = [];
  const body = [];
  for (const child of React.Children.toArray(children)) {
    if (React.isValidElement(child) && child.type === WalkthroughCommand) {
      commands.push({ ...child.props });
    } else if (React.isValidElement(child) && child.type === WalkthroughEvent) {
      events.push({ ...child.props });
    } else {
      body.push(child);
    }
  }
  return { commands, events, body };
}

/**
 * Reads a `*Demo` component's authored children — a Markdown code fence
 * followed by one `<WalkthroughStep>` per step — into the `{code, language,
 * steps}` shape `WorkflowWalkthrough` renders.
 */
export function parseWalkthroughChildren(children) {
  const elements = React.Children.toArray(children).filter(React.isValidElement);

  const codeElement = elements.find((el) => el.type !== WalkthroughStep);
  const code = codeElement ? extractFenceText(codeElement) : '';
  const language = (codeElement && extractFenceLanguage(codeElement)) || 'text';

  const steps = elements
    .filter((el) => el.type === WalkthroughStep)
    .map((el, index) => {
      const { commands, events, body } = parseStepEntries(el.props.children);
      return {
        number: index + 1,
        title: el.props.title,
        kind: el.props.kind,
        phase: el.props.phase,
        lines: parseLineRanges(el.props.lines),
        adds: { commands, events },
        body,
      };
    });

  return { code, language, steps };
}
