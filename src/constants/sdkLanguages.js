import { SDKS } from './sdks';

export const LANGUAGE_TAB_GROUP = 'language';

export const SDK_LANGUAGES = SDKS.map(({ tabKey, label, icon }) => ({
  key: tabKey,
  label,
  icon,
}));

export const LANGUAGE_SVGS = {
  Go: "/img/sdks/svgs/golang.svg",
  Java: "/img/sdks/svgs/java.svg",
  PHP: "/img/sdks/svgs/php.svg",
  Python: "/img/sdks/svgs/python.svg",
  TypeScript: "/img/sdks/svgs/typescript.svg",
  ".NET": "/img/sdks/svgs/dotnet.svg",
  Ruby: "/img/sdks/svgs/ruby.svg",
  Rust: "/img/sdks/svgs/rust.svg",
  "Temporal CLI": "/img/assets/terminal.svg",
};