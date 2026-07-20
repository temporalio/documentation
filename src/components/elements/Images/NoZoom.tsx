import React, { createContext, useContext } from 'react';

/**
 * Context flag that tells {@link ZoomableImage} to render as a plain image,
 * i.e. without the click-to-expand affordance. Defaults to `false` (zoom on),
 * so images are only opted out when they sit inside a `<NoZoom>` wrapper.
 */
export const NoZoomContext = createContext(false);

export const useNoZoom = (): boolean => useContext(NoZoomContext);

/**
 * Opt a subtree of images out of the automatic click-to-expand behavior.
 *
 * Wrap one or more Markdown images to keep them from becoming zoomable even
 * when they are downscaled (e.g. decorative banners):
 *
 * ```mdx
 * <NoZoom>
 *
 * ![.NET](/img/assets/banner-dotnet-temporal.png)
 *
 * </NoZoom>
 * ```
 */
export default function NoZoom({ children }: { children: React.ReactNode }): JSX.Element {
  return <NoZoomContext.Provider value={true}>{children}</NoZoomContext.Provider>;
}
