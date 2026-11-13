import React, { createContext, useContext } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { sdkFromSourcePath, sdkOnlyIncludes, resolveSdkTerm, parseSdkList } from '@site/src/utils/sdkContent';

/**
 * SDK-conditional content for shared partials (docs/develop/_shared/).
 *
 * A partial imported into docs/develop/go/... renders for Go, the same partial
 * imported into docs/develop/python/... renders for Python:
 *
 *   This state is typically set to <SdkTerm name="null" /> for the original caller.
 *
 *   <SdkOnly sdks="go java">
 *
 *   A paragraph only the Go and Java pages show.
 *
 *   </SdkOnly>
 *
 * The current SDK comes from the page's source folder (docs/develop/<id>/),
 * from an enclosing <SdkScope sdk="...">, or from an <SdkTabs> slot. Using
 * these components anywhere else throws, which fails the build, so a partial
 * can't silently render the wrong SDK's text on a cross-language page.
 *
 * The rules live in src/utils/sdkContent.js, shared with the LLM Markdown
 * pipeline (scripts/mdx-to-md.mjs), so each SDK's .md gets the same text.
 */

const SdkContext = createContext({ sdk: undefined, inSdkOnly: false });

function useDocSdk() {
  // useDoc() throws outside a docs page (e.g. a standalone src/pages page).
  try {
    return sdkFromSourcePath(useDoc().metadata.source);
  } catch {
    return null;
  }
}

/** The SDK id the surrounding content renders for, or null. */
export function useCurrentSdk() {
  const { sdk } = useContext(SdkContext);
  const docSdk = useDocSdk();
  return sdk !== undefined ? sdk : docSdk;
}

/** Renders its children for `sdk`, e.g. to reuse a partial on a cross-language page. */
export function SdkScope({ sdk, children }) {
  const [id] = parseSdkList(sdk);
  const { inSdkOnly } = useContext(SdkContext);
  return <SdkContext.Provider value={{ sdk: id, inSdkOnly }}>{children}</SdkContext.Provider>;
}

/** Shows its children only for the listed SDKs (`sdks`), or for every SDK except them (`not`). */
export function SdkOnly({ sdks, not, children }) {
  const { inSdkOnly } = useContext(SdkContext);
  const sdk = useCurrentSdk();
  if (inSdkOnly) throw new Error('<SdkOnly> cannot be nested inside another <SdkOnly>');
  if (!sdkOnlyIncludes({ sdks, not }, sdk)) return null;
  return <SdkContext.Provider value={{ sdk, inSdkOnly: true }}>{children}</SdkContext.Provider>;
}

/** The current SDK's value for a term in SDK_TERMS (src/constants/sdkData.js). */
export function SdkTerm({ name }) {
  const { text, code } = resolveSdkTerm(name, useCurrentSdk());
  return code ? <code>{text}</code> : <>{text}</>;
}
