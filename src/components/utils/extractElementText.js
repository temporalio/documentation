import React from 'react';

/**
 * Pull plain text out of MDX/Docusaurus code-fence children (a React element
 * tree), trimming the single leading/trailing newline MDX's compiled fence
 * output carries. Shared by any component that takes a Markdown code fence as
 * `children` and needs its raw text (e.g. AnnotatedCode, EventHistoryWalkthrough).
 */
export function extractElementText(node) {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractElementText).join('');
  if (React.isValidElement(node)) return extractElementText(node.props.children);
  return '';
}

/** extractElementText(node), with the fence's leading/trailing newline trimmed. */
export function extractFenceText(node) {
  return extractElementText(node).replace(/^\n/, '').replace(/\n$/, '');
}
