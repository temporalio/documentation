import { Prism } from 'prism-react-renderer';

/*
 * prism-react-renderer bundles only a subset of Prism languages, and C# and
 * Java aren't among them. Register them the same way @docusaurus/theme-classic
 * does: expose the bundled Prism instance globally, then load the language
 * components onto it.
 */
globalThis.Prism = Prism;

if (!Prism.languages.csharp) {
  require('prismjs/components/prism-csharp');
}

if (!Prism.languages.java) {
  require('prismjs/components/prism-java');
}

export default Prism;
