import { FaPython, FaJava } from 'react-icons/fa';
import { SiGo, SiTypescript, SiPhp, SiDotnet, SiRuby, SiRust } from 'react-icons/si';

export const LANGUAGE_TAB_GROUP = 'language';

export const SDK_LANGUAGES = [
  { key: 'go', label: 'Go', icon: SiGo },
  { key: 'java', label: 'Java', icon: FaJava },
  { key: 'py', label: 'Python', icon: FaPython },
  { key: 'ts', label: 'TypeScript', icon: SiTypescript },
  { key: 'php', label: 'PHP', icon: SiPhp },
  { key: 'dotnet', label: '.NET', icon: SiDotnet },
  { key: 'rb', label: 'Ruby', icon: SiRuby },
  { key: 'rs', label: 'Rust', icon: SiRust },
];

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