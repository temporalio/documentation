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
- [Using IntegrationsGrid](#using-integrationsgrid)
- [Using CaptionedImage](#using-captionedimage)
- [Using DiscoverableDisclosure](#using-discoverabledisclosure)
- [Using DocsTable](#using-docstable)
- [Using PhotoCarousel](#using-photocarousel)
- [Using RelatedRead](#using-relatedread)
- [Using ToolTipTerm](#using-tooltipterm)
- [Using ZoomingImage](#using-zoomingimage)
- [Using SdkGuideLinks](#using-sdkguidelinks)
- [Using ReleaseNoteHeader](#using-release-note-header)

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

## Using IntegrationsGrid

Role: Display a searchable, filterable grid of Temporal integrations with partner tools and services.

The component renders a search bar, two rows of filter pills (SDK and Tag), and a card grid.
Each card shows the integration name, a short description, tag badges, and an SDK icon when applicable.
Cards that link to external sites display an external link indicator and open in a new tab.

How to import:

```
import IntegrationsGrid from '@site/src/components/IntegrationsGrid';
```

Usage:

```
<IntegrationsGrid />
```

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultSdks` | `SDK[]` | `[]` | Pre-selects SDK filters on load. Used on per-SDK integrations pages. |

For example, the Python SDK integrations page pre-filters to Python:

```
<IntegrationsGrid defaultSdks={["Python"]} />
```

Valid SDK values are `"Go"`, `"Java"`, `"Python"`, `"TypeScript"`, and `"Ruby"`.

### Filter behavior

The component has three filter dimensions that work together:

- **Search**: Free-text search across integration names, descriptions, and tags.
- **SDK pills**: Filter by language SDK. Selecting "Language-agnostic" shows integrations that have no SDK (such as Temporal Cloud metrics integrations). Multiple SDK pills can be active at once (OR logic).
- **Tag pills**: Filter by category tag. Multiple tag pills can be active at once (OR logic).

When filters from different dimensions are active, they combine with AND logic.
For example, selecting the "Python" SDK pill and the "Observability" tag pill shows only Python observability integrations.

### Where the component is used

- `/integrations` (top-level page, no default filters)
- `/develop/java/integrations` (pre-filtered to Java)
- `/develop/python/integrations` (pre-filtered to Python)
- `/develop/ruby/integrations` (pre-filtered to Ruby)
- `/develop/typescript/integrations` (pre-filtered to TypeScript)

### Adding a new integration

Integration data lives in `src/components/IntegrationsGrid/integrations-data.ts`.
Add a new entry to the `integrations` array with the following shape:

```ts
{
  name: "Partner Name",
  description: "One sentence describing what this integration does with Temporal.",
  tags: ["Agent framework"],
  sdk: "Python",
  href: "/develop/python/integrations/partner-name",
}
```

**Fields:**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes | Display name of the integration. |
| `description` | `string` | Yes | One-sentence summary shown on the card. |
| `tags` | `string[]` | Yes | One or more category tags. Existing tags: `Agent framework`, `Agent observability`, `Framework`, `Governance`, `Observability`, `Temporal Cloud`. New tags appear in the filter row automatically. |
| `sdk` | `SDK` | No | The language SDK this integration targets. Omit for language-agnostic integrations (such as Temporal Cloud metrics exporters). |
| `href` | `string` | Yes | Link target. Use a relative path for internal docs (e.g. `/develop/python/integrations/braintrust`). Use a full URL for external partner docs (e.g. `https://docs.partner.com/temporal`). External links automatically get an external icon and open in a new tab. |

**Multi-SDK integrations:** If an integration supports multiple SDKs with different guide pages, add a separate entry for each SDK. Both entries can share the same `name`. For example, Braintrust has one entry for Python and one for TypeScript, each with a different `href`.

**Language-agnostic integrations:** Omit the `sdk` field. These integrations appear when the "Language-agnostic" SDK filter is selected and do not display a language icon on the card.

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

### Dark mode images

To provide a separate image for dark mode, use the `srcDark` prop:

```
<CaptionedImage
    src="/diagrams/my-diagram.svg"
    srcDark="/diagrams/my-diagram-dark.svg"
    title="My diagram"
    alt="Description of the diagram"
/>
```

When `srcDark` is provided, both images are rendered in the DOM and the browser loads both upfront. CSS toggles visibility based on the active theme, so switching between light and dark mode is instant with no loading delay. When `srcDark` is omitted, the component renders a single image as usual.

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
  <RelatedReadItem path="/cloud/worker-health"
    text="How to monitor Worker Health with Temporal Cloud Metrics"
    archetype="feature-guide" />
  <RelatedReadItem path="/cloud/service-health"
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

### Skipping captioning

To skip slide captioning, pass the string `"NA"` instead of a normal description.

```
<PhotoCarousel
images={[
"/link/to/image-1",
"/link/to/image-2",
...
]}
captions={[
"NA",
"caption-2",
...
]}
/>
```

Photo 1 will not have a caption but photo 2 will have a caption.
This ensures photo 2 won't be matched with caption 1. 

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

## Using SdkGuideLinks

Role: Render a vertical list of SDK guide links, each with a colored block icon and label, linking readers to the relevant SDK-specific page.

How to import:

```
import { SdkGuideLinks } from '@site/src/components';
```

### Standard usage

Pass a `path` prop and the component generates links for all eight SDKs automatically.
The path is appended to `/develop/<sdk>/`, so you only need the portion after the SDK segment.

```
<SdkGuideLinks path="client/temporal-client" />
```

This produces links to `/develop/go/client/temporal-client`, `/develop/java/client/temporal-client`, and so on for all supported SDKs.

### Filtering to specific SDKs

Use the `filter` prop to show only a subset of SDKs.
Pass an array of SDK identifiers.

```
<SdkGuideLinks path="client/temporal-client" filter={['go', 'java', 'python']} />
```

Valid SDK identifiers: `go`, `java`, `dotnet`, `php`, `python`, `ruby`, `rust`, `typescript`.

### Custom links

When SDK guide pages do not follow the standard `/develop/<sdk>/<path>` pattern, pass explicit links with the `links` prop.
The `path` and `filter` props are ignored when `links` is provided.

```
<SdkGuideLinks links={[
  { name: 'goLangBlock',     href: '/develop/go/custom/path',         label: 'Go' },
  { name: 'pythonBlock',     href: '/develop/python/custom/path',     label: 'Python' },
  { name: 'typeScriptBlock', href: '/develop/typescript/custom/path', label: 'TypeScript' },
]} />
```

Valid `name` values for the block icons: `goLangBlock`, `javaBlock`, `dotnetBlock`, `phpBlock`, `pythonBlock`, `rubyBlock`, `rustBlock`, `typeScriptBlock`.

### Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `path` | `string` | Yes, unless `links` is provided | Path segment appended to `/develop/<sdk>/` for each SDK link. |
| `filter` | `string[]` | No | Limits generated links to the specified SDK identifiers. Only applies when using `path`. |
| `links` | `object[]` | Yes, unless `path` is provided | Explicit list of links. Each item requires `name`, `href`, and `label`. Overrides `path` and `filter`. |

### Where the component is used

- `/temporal-client` — links to the Temporal Client feature guide for each SDK

## Using ReleaseNoteHeader

Role: To provide a consistent component for adding, updating, and removing release stages on different features.

Usage:

In `/src/constants`, update the [`featureReleaseTypes.js`](./src/constants/featureReleaseTypes.js) file to include the release stage for the feature you want.

Example: `serverlessWorkers: "prerelease"`

Then on the pages you want it to show, add this to the top of the content, right below the frontmatter. The `featureName` prop is how you share the release stages you add to `featureReleaseTypes.js` across pages.

```js
import { ReleaseNoteHeader } from '@site/src/components';

<ReleaseNoteHeader
  featureName="nexus"
/>
```

Or you can choose one of these variations.

Use the `type` prop to set a specific type if the release stage is only for one page.
```js
<ReleaseNoteHeader
  type="publicPreview"
/>
```

Add `children` for more detailed messaging.
```js
<ReleaseNoteHeader featureName="serverlessWorkers">
  To request access during Pre-release, create a [support ticket](/cloud/support#support-ticket) or contact your account team.
  APIs are experimental and may be subject to backwards-incompatible changes.
  [Sign up for updates](https://temporal.io/pages/serverless-workers-updates) to be notified when Serverless Workers reach Public Preview.
</ReleaseNoteHeader>
```

Show the supported languages by using the `languages` prop.
```js
<ReleaseNoteHeader
  type="prerelease"
  languages={["Go", "TypeScript", "Java", ".NET", "Python"]}
/>
```

Use the `href` prop to make the `children` content a link.
```js
<ReleaseNoteHeader
  featureName="serverlessWorkers"
  href="https://temporal.io/pages/serverless-workers-updates"
>
  Sign up for updates to be notified when Serverless Workers reach Public Preview.
</ReleaseNoteHeader>
```