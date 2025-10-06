// Minimal shims for Docusaurus virtual modules.
// Purely for the type checker; does not affect build output.
declare module '@theme/*';
declare module '@generated/*';
declare module '@docusaurus/*';
declare module '@site/*';

declare module '@theme/Layout' {
  interface Props {
    readonly title?: string;
    readonly description?: string;
  }
}

// (optional, nice to have)
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module '*.css';
