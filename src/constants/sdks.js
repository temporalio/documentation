import { FaPython, FaJava } from 'react-icons/fa';
import { SiGo, SiTypescript, SiPhp, SiDotnet, SiRuby, SiRust } from 'react-icons/si';

// Canonical, alphabetically-ordered list of Temporal SDKs.
// This is the single source of truth for SDK order across the site
// (SdkTabs, homepage SDK logos, SDK guide links, and the search language filter).
//
// - `id` is the full SDK name, used for `/develop/<id>` guide paths and as the
//   value passed to `<SdkGuideLinks filter={[...]} />` in MDX.
// - `tabKey` is the short code `SdkTabs` displayName values are keyed on
//   (`src/components/elements/Sdk/SdkTabs.js`) — kept as-is so existing tab
//   sync/groupId behavior doesn't change.
// - `blockName` matches the `case` values in `SdkSvg.js`'s icon switch.
// .NET sorts as if it were spelled "NET" (ignoring the leading period), so it
// lands between Java and PHP rather than first.
export const SDKS = [
  { id: 'go', label: 'Go', tabKey: 'go', icon: SiGo, blockName: 'goLangBlock' },
  { id: 'java', label: 'Java', tabKey: 'java', icon: FaJava, blockName: 'javaBlock' },
  { id: 'dotnet', label: '.NET', tabKey: 'dotnet', icon: SiDotnet, blockName: 'dotnetBlock' },
  { id: 'php', label: 'PHP', tabKey: 'php', icon: SiPhp, blockName: 'phpBlock' },
  { id: 'python', label: 'Python', tabKey: 'py', icon: FaPython, blockName: 'pythonBlock' },
  { id: 'ruby', label: 'Ruby', tabKey: 'rb', icon: SiRuby, blockName: 'rubyBlock' },
  { id: 'rust', label: 'Rust', tabKey: 'rs', icon: SiRust, blockName: 'rustBlock' },
  { id: 'typescript', label: 'TypeScript', tabKey: 'ts', icon: SiTypescript, blockName: 'typeScriptBlock' },
];
