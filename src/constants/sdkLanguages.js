import { FaPython, FaJava } from 'react-icons/fa';
import { SiGo, SiTypescript, SiPhp, SiDotnet, SiRuby } from 'react-icons/si';

export const LANGUAGE_TAB_GROUP = 'language';

export const SDK_LANGUAGES = [
  { key: 'go', label: 'Go', icon: SiGo },
  { key: 'java', label: 'Java', icon: FaJava },
  { key: 'py', label: 'Python', icon: FaPython },
  { key: 'ts', label: 'TypeScript', icon: SiTypescript },
  { key: 'php', label: 'PHP', icon: SiPhp },
  { key: 'dotnet', label: '.NET', icon: SiDotnet },
  { key: 'rb', label: 'Ruby', icon: SiRuby },
];
