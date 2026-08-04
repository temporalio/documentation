import { Prism } from 'prism-react-renderer';

/*
 * prism-react-renderer bundles only a subset of Prism languages, and C# isn't
 * one of them. Register it the same way @docusaurus/theme-classic does: expose
 * the bundled Prism instance globally, then load the language component onto it.
 */
if (!Prism.languages.csharp) {
  globalThis.Prism = Prism;
  require('prismjs/components/prism-csharp');
}

export default Prism;
