// Plain data for the Temporal SDKs, with no icon or React imports, so the same
// list is shared by the browser bundle (src/constants/sdks.js adds the icons),
// Node build plugins, bin/ scripts, and the LLM Markdown pipeline
// (scripts/mdx-to-md.mjs and its component handlers).
//
// Order is the canonical SDK order across the site: alphabetical, with .NET
// sorted as if it were spelled "NET", so it lands between Java and PHP.
//
// - `id` is the full SDK name, used for `/develop/<id>` guide paths, the
//   `docs/develop/<id>/` folder, and `<SdkOnly sdks="...">` values.
// - `tabKey` is the short code `SdkTabs` slots are keyed on (their
//   `displayName` in src/components/elements/Sdk/SdkTabs.js).
// - `tabSlot` is the slot component name, as in `<SdkTabs.DotNet>`.
// - `blockName` matches the `case` values in `SdkSvg.js`'s icon switch.
// - `apiReferenceHref` points at each SDK's generated API reference site.

const SDK_DATA = [
  { id: 'go', label: 'Go', tabKey: 'go', tabSlot: 'Go', blockName: 'goLangBlock', apiReferenceHref: 'http://t.mp/go-api' },
  { id: 'java', label: 'Java', tabKey: 'java', tabSlot: 'Java', blockName: 'javaBlock', apiReferenceHref: 'http://t.mp/java-api' },
  { id: 'dotnet', label: '.NET', tabKey: 'dotnet', tabSlot: 'DotNet', blockName: 'dotnetBlock', apiReferenceHref: 'https://dotnet.temporal.io/' },
  { id: 'php', label: 'PHP', tabKey: 'php', tabSlot: 'PHP', blockName: 'phpBlock', apiReferenceHref: 'https://php.temporal.io/namespaces/temporal.html' },
  { id: 'python', label: 'Python', tabKey: 'py', tabSlot: 'Python', blockName: 'pythonBlock', apiReferenceHref: 'https://python.temporal.io' },
  { id: 'ruby', label: 'Ruby', tabKey: 'rb', tabSlot: 'Ruby', blockName: 'rubyBlock', apiReferenceHref: 'https://ruby.temporal.io/' },
  { id: 'rust', label: 'Rust', tabKey: 'rs', tabSlot: 'Rust', blockName: 'rustBlock', apiReferenceHref: 'https://docs.rs/temporalio-sdk/latest/temporalio_sdk/' },
  { id: 'typescript', label: 'TypeScript', tabKey: 'ts', tabSlot: 'TypeScript', blockName: 'typeScriptBlock', apiReferenceHref: 'https://typescript.temporal.io' },
];

// Per-SDK words that shared prose needs, written in a partial as
// <SdkTerm name="null" />. Every term must give a value for every SDK id
// (src/utils/sdkContent.test.js checks this). `code: true` renders the value
// as inline code. `label` and `sdkName` are derived from SDK_DATA and don't
// appear here; see resolveSdkTerm in src/utils/sdkContent.js.
const SDK_TERMS = {
  // The value an optional argument holds when the caller leaves it unset.
  null: {
    code: true,
    values: { go: 'nil', java: 'null', dotnet: 'null', php: 'null', python: 'None', ruby: 'nil', rust: 'None', typescript: 'undefined' },
  },
  true: {
    code: true,
    values: { go: 'true', java: 'true', dotnet: 'true', php: 'true', python: 'True', ruby: 'true', rust: 'true', typescript: 'true' },
  },
  false: {
    code: true,
    values: { go: 'false', java: 'false', dotnet: 'false', php: 'false', python: 'False', ruby: 'false', rust: 'false', typescript: 'false' },
  },
  fileExtension: {
    code: true,
    values: { go: '.go', java: '.java', dotnet: '.cs', php: '.php', python: '.py', ruby: '.rb', rust: '.rs', typescript: '.ts' },
  },
};

module.exports = { SDK_DATA, SDK_TERMS };
