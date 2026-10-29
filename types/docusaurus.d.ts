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

declare module '@theme/Footer/Copyright' {
  interface Props {
    readonly copyright: string;
  }
}

// (optional, nice to have)
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module '*.css';

declare global {
  interface Window {
    amplitude?: {
      getUserId: () => string | undefined;
      setUserId: (userId: string) => void;
      setSessionId: (sessionId: number) => void;
      track: (eventName: string, eventProperties?: Record<string, unknown>) => void;
    };
  }
}

// <temporal-consent-banner> from @temporalio-web/consent-banner (src/theme/Root.tsx,
// src/theme/Footer/Copyright). React 19's automatic JSX runtime resolves
// intrinsic elements from React.JSX, not the legacy global JSX namespace.
// Module augmentation (as opposed to ambient declaration) requires this file
// to be a module itself, hence the empty export.
export {};
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'temporal-consent-banner': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
