import prismIncludeLanguagesOriginal from '@theme-original/prism-include-languages';

export default function prismIncludeLanguages(Prism) {
  prismIncludeLanguagesOriginal(Prism);
  // Snipsync uses the source file extension as the code fence language.
  Prism.languages.rs = Prism.languages.rust;
}
