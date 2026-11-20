import { FaPython, FaJava } from 'react-icons/fa';
import { SiGo, SiTypescript, SiPhp, SiDotnet, SiRuby, SiRust } from 'react-icons/si';
import { SDK_DATA } from './sdkData.js';

// Canonical list of Temporal SDKs, used across the site (SdkTabs, homepage
// SDK logos, SDK guide links, and the search language filter).
//
// The ids, labels, order, and links live in ./sdkData.js, which has no icon
// imports so plain Node scripts (the LLM Markdown pipeline, bin/ checks) can
// share it. This module only adds each SDK's react-icons component. See
// sdkData.js for what each field means.
const ICONS = {
  go: SiGo,
  java: FaJava,
  dotnet: SiDotnet,
  php: SiPhp,
  python: FaPython,
  ruby: SiRuby,
  rust: SiRust,
  typescript: SiTypescript,
};

export const SDKS = SDK_DATA.map((sdk) => ({ ...sdk, icon: ICONS[sdk.id] }));
