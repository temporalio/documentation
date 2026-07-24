import React from 'react';
import OriginalMermaid from '@theme-original/Mermaid';
import MermaidZoomWrapper from '@site/src/components/elements/Images/MermaidZoomWrapper';

// Wrap (not eject) swizzle: leaves `@docusaurus/theme-mermaid`'s own
// render logic untouched, and instead observes the SVG it produces to add
// the same click-to-expand zoom behavior used for raster/vector images.
// See src/components/elements/Images/MermaidZoomWrapper.tsx.
export default function Mermaid(props) {
  return (
    <MermaidZoomWrapper>
      <OriginalMermaid {...props} />
    </MermaidZoomWrapper>
  );
}
