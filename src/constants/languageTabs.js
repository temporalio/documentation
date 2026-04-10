import { FaJs, FaPython, FaJava } from 'react-icons/fa';
import { SiGo, SiDotnet, SiTypescript, SiRuby, SiPhp } from 'react-icons/si';
export const LANGUAGE_TAB_GROUP = 'language';

export const LANGUAGE_ICONS = {
  go: SiGo,
  java: FaJava,
  py: FaPython,
  ts: SiTypescript,
  php: SiPhp,
  dotnet: SiDotnet,
  rb: SiRuby,
};

export const getLanguageLabel = (lang) => {
  const Icon = LANGUAGE_ICONS[lang];
  return Icon ? <Icon title={lang} /> : lang;
};