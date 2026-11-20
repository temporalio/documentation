// Which look each admonition keyword renders with in src/theme/Admonition. Authors write many keywords;
// readers see four kinds.
//
// Pure and dependency-free so it can be tested with plain Node (admonitionKinds.test.js).

const ADMONITION_KINDS = ['note', 'tip', 'caution', 'warning'];

// Every keyword the docs use, plus Docusaurus's built-in ones, mapped to a kind.
const ADMONITION_KEYWORD_KINDS = {
  note: 'note',
  info: 'note',
  important: 'note',
  secondary: 'note',
  tip: 'tip',
  success: 'tip',
  caution: 'caution',
  warning: 'warning',
  danger: 'warning',
};

// The kind for an admonition keyword. An unknown keyword renders as a Note, and `known` is false so the
// component can warn about it.
function resolveAdmonitionKind(keyword) {
  const kind = ADMONITION_KEYWORD_KINDS[keyword];
  return kind ? { kind, known: true } : { kind: 'note', known: false };
}

module.exports = { ADMONITION_KINDS, ADMONITION_KEYWORD_KINDS, resolveAdmonitionKind };
