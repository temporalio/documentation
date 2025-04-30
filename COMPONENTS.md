# Temporal Documentation Site Components

This document provides detailed information about the components used across the Temporal documentation site.

The site is built with [Docusaurus](https://docusaurus.io), a static site generator.
Static site generation offers fast load times by pre-building content and serving it as static files.
This reduces server load and increases security by eliminating dynamic server-side processes or databases.

Our components are reusable building blocks, typically created with [React](https://react.dev).
They enhance our content with elements that can be used across multiple pages.
These components are flexible and configurable at the point of use.
By simplifying complex customizations into easy-to-use components, we make our documentation easier to read, maintain, and update.

Our components handle tasks like displaying content, managing layouts, and handling images.
This guide shows you how to import, use, and customize these components in your work.
Whether you’re using core components or experimenting with new ones, this guide helps you make the most of them.

- [Finding Components](#finding-components)
- [Adding Components to This Repository](#adding-components-to-this-repository)
- [Using Components in MDX Source Files](#using-components-in-mdx-source-files)
- [Using CaptionedImage](#using-captionedimage)
- [Using DiscoverableDisclosure](#using-discoverabledisclosure)
- [Using DocsTable](#using-docstable)
- [Using PhotoCarousel](#using-photocarousel)
- [Using RelatedRead](#using-relatedread)
- [Using ToolTipTerm](#using-tooltipterm)
- [Using ZoomingImage](#using-zoomingimage)

## Finding Components

Our components are located in the `src/components` folder at the root of this repository.

- **`index.js`**: Provides a single entry point for importing all components into your documentation files.
- **`elements`**: These are pre-built on-screen elements, usually used in a single place or sometimes not at all.
  They were carried over from earlier versions of the site.
- **`formatting`**: These components are used for text layout, often within tables.
  They help with formatting the content for better readability.
- **`images`**: Contains components for presenting images on-screen, helping to manage how images are displayed across the site.
- **`info`**: This folder includes components for presenting additional content, often used to enhance the user experience with supplementary information.
- **`experimental`**: This folder contains components that are not currently used on the site.
  These are either for testing or were previously part of ongoing development.

Components are reusable, self-contained units of code used for our Documentation site.
As shown in this file tree, our components are built using JavaScript and React.
Components often have associated CSS files to manage styling, although this is optional.
While some components include custom styling for layout or presentation, others rely on external styles or omit styling altogether.

## Adding Components to This Repository

When adding a patch with new components, please follow these directions:

- **Test your component across multiple platforms** including mobile, desktop, and a variety of browsers, as well as both light mode and dark mode.
- **Use ARIA attributes to support accessibility**, ensuring the component is usable by all.
- **Register your component in the `index.js` file**, making it available for global import.
- **Ensure your component follows our naming conventions** (for example, PascalCase for React components) and the structure used in this repository.
- **Use appropriate 'src/components' folder hierarchies** and document hierarchy changes in this document.
- **Update this documentation file with your component’s details**, including usage examples and any configuration options.
  Follow the existing format and style for consistency.
- **Include clear and concise usage examples**, and note any potential edge cases or known issues, as well as future development directions.

### Testing your Component

- **Light and Dark Mode**: Make sure all elements of your components works properly in both light and dark modes.
- **Browser Geometries and Edge Cases**: Make sure your components resize appropriately with ***Web browsers***, and render correctly on ***mobile*** (both phone and tablet). Provide alternate presentations if needed for smaller real estate. On Desktop, make your browser window both tall and short, wide and narrow. 
- **Cross-browser support**: Test on Chrome and Safari as a minimum. "React aims for cross-browser compatibility, but subtle differences can arise due to how browsers implement web standards or handle specific features. While React itself abstracts away many of these inconsistencies, some areas may require attention."
- **Accessibility checks**: Test accessibility using a screen reader.
- **Crowdsource**: Use Vercel deployments to bug-bash your component.

Reach out for help if issues arise that compromise component functionality. We may be able to help you work out a solution.

## Using Components in MDX Source Files

### Importing components

You must import components before use. For example:

```
import { CaptionedImage } from '@site/src/components';
```

or

```
import { RelatedReadContainer, RelatedReadItem } from '@site/src/components';
```

As a rule, place your import statement at the top of your MDX file below the front matter.
Not all MDX files in this repository follow this rule, especially older documents.

**Note**:
All sanctioned components are enumerated in 'src/components/index.js'. 
You shouldn't use any other import paths for Temporal components.

### Adding components to MDX files 

Once imported, you can use components in angle brackets, making sure to set any properties ("props") in their use.
For example:

```
<RelatedReadItem
    path="/cloud/metrics/prometheus-grafana"
    text="How to set up Grafana with Temporal Cloud observability"
    archetype="feature-guide"
/>
```

### Global Imports

Because this repository uses `index.js` to vend its components, you can import all components as once:

```
import * as Components from '@site/src/components';
```

Components imported this way use the "Components." prefix before their name:

```
<Components.DiscoverableDisclosure>
...Content that is folded away...
</Components.DiscoverableDisclosure>
```

## Using CaptionedImage

CaptionedImage replaces older image inserts methods, and complies with light and dark mode and accessibility.
It is meant for images that use captions.
You can still use standard image inserts (`![AX text](/path/to/image)`) as needed.

Usage:

```
<CaptionedImage
    src="/path/to/your/image"
    title="your caption"
/>
```

Images are normally stored in the '/static' folder in `img` or `diagrams`.

### Zooming images

When images are complex and may not render in a readable fashion on normal monitors, you can enable a minimal form of zooming by setting the `zoom` prop to true:

```
<CaptionedImage
    src="/path/to/your/image"
    title="your caption"
    zoom="true"
/>
```

One click will zoom out, another will zoom back.
Most rendering will allow readers to pull the image around to view all parts of the image. 
On non-mobile systems, cursors will change to interactive elements when hovered above zoomable items to indicate interaction.

## Using DiscoverableDisclosure

Role: Provide a more discoverable `<Details>` section.

Unlike Details, it does not require a separate `<Summary>`.

Usage:

```
<DiscoverableDisclosure label = "your_summary_text">
...your content...
</DiscoverableDisclosure>
```

An additional `prompt` prop enables you to specify the leading text.
Normally it defaults to `prompt = "Dive deeper — "`.

## Using DocsTable

In certain rare instances, standard Markdown tables won't work for our needs.
They may contain information that is complex enough that in-line table format becomes unmaintainable and cumbersome.
DocsTable addresses this, breaking the material down into individual cells that use standard Markdown formatting that is not supported in Markdown tables.
For example, you can use bullet points instead of HTML lists, and code fencing instead of `<tt>` tagging.

Usage:

```
<DocsTable Columns = {["", "Column 1", "Column 2"]} >

Row Title

<NewDocsCell />

Column 1 Markdown content

<NewDocsCell />

Column 2 Markdown content

</DocsTable>
```

Some notes:

- `<NewDocsCell />` separates cell content.
  It only appears _between_ cells.
  You do not need it at the start or end of your cell contents.
- For empty cells, add a blank line and a `<NewDocsCell />`.
- At this time, keep `<NewDocsCell />` on its own line with space above and below it.
  `yarn format` will mess up your tables otherwise. 
  This requirement may be addressed in a future update.

## Using RelatedRead

Role: Create a list of related items, with summaries and archetypes

Usage:

```
<RelatedReadContainer>
  <RelatedReadItem path="/cloud/metrics/prometheus-grafana"
    text="How to set up Grafana with Temporal Cloud observability"
    archetype="feature-guide" />
  <RelatedReadItem path="/production-deployment/cloud/worker-health"
    text="How to monitor Worker Health with Temporal Cloud Metrics"
    archetype="feature-guide" />
  <RelatedReadItem path="/production-deployment/cloud/service-health"
    text="How to monitor Service Health with Temporal Cloud Metrics"
    archetype="feature-guide" />
</RelatedReadContainer>
```

Archetypes:
- encyclopedia
- feature-guide
- feature-summary

## Using PhotoCarousel

Role: Provide annotated walk-through using an image carousel presentation with text.

How to import:

```
import { PhotoCarousel } from '@site/src/components';
```

or 

```
import PhotoCarousel from "@site/src/components/elements/PhotoCarousel";
```

Usage:

```
<PhotoCarousel
images={[
"/link/to/image-1",
"/link/to/image-2",
...
]}
captions={[
"caption-1",
"caption-2",
...
]}
/>
```

- If links are stored on-site, place images in static in an appropriately themed folder.
- If links are stored off-site, use a fully specified URL
- Please ensure the caption count and order matches that of the images
- You may pass an optional `isDarkMode` Boolean prop

## Using ToolTipTerm

Role: Provide definitions or background information at the point of use.

Usage:

```
<ToolTipTerm term="your_term_name" />
```

For example:

```
Temporal Cloud strives to maintain a <Components.ToolTipTerm term="P95" /> replication delay of less than 1 minute.
```

### Defining terms

Terms are stored in `static/term`.
Use standard Markdown, with files named with '.md'.
You may use links, images, and other standard elements in the definition.
This helps when you want to define a term and provide a link to further coverage. 

For example:

```
docs% ls static/terms/P95*
static/terms/P95.md
docs% cat static/terms/P95.md 
P95 refers to the 95th percentile of a data set.
It identifies values that are greater than or equal to 95% of that set.
docs% 
```

### Specifying content with a path

For reasons of capitalization, spelling, or multiple reader sets (experts vs beginners, for example), you may want to vary the content of the tooltip.
Use the `src` prop to select a different md file.
For example:

```
<Components.ToolTipTerm term="fail over" src="failover" />
``` 

### Manually Overriding Content

Use the `tooltip` prop to add non-reusable content specific to one tooltip term.

```
<Components.ToolTipTerm term="your term" tooltip="any custom content you want to add" />
```

## Using ZoomingImage

Role: Provide image "asides" embedded into instructions where a standard image would normally interfere.

A ZoomingImage is presented at a very small size, with the understanding that it is too small to view.
An optional component, the image uses a magnifying glass and text prompt for discovery.
See the instructions for [Prometheus Grafana](http://docs.temporal.io/cloud/metrics/prometheus-grafana#grafana-data-sources-configuration) for an example.

Reserve ZoomingImages for situations where the image itself is an obstacle to communicating steps or other content.
It provides opt-in supplementary information.

Usage:

```
<ZoomingImage src="/path/to/image" alt="Alt text" />
```

Images are normally stored in the '/static' folder in `img` or `diagrams`.
