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
- [ToolTipTerm](#tooltipterm-usage)

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

```
components
├── elements
│   ├── Button.js
│   ├── Intro.js
│   ├── RetrySimulator.js
│   ├── SdkLogos.js
│   └── retry-simulator.module.css
├── experimental
│   ├── CenteredImage.js
│   ├── CustomWarning.js
│   ├── DetermineHeader.js
│   ├── InfoButton.js
│   ├── ResponsivePlayer.js
│   ├── RowOfImages.js
│   └── ToolTipText.js
├── formatting
│   ├── NoBreak.js
│   └── Spacer.js
├── images
│   ├── CaptionedImage.js
│   └── CaptionedImage.module.css
├── index.js
└── info
    ├── DiscoverableDisclosure.js
    ├── RelatedRead.js
    ├── RelatedRead.module.css
    ├── RelatedReadList.js
    └── ToolTipTerm.js
```

Components are reusable, self-contained units of code used for our Documentation site.
As shown in this file tree, our components are built using JavaScript and React.
Components often have associated CSS files to manage styling, although this is optional.
While some components include custom styling for layout or presentation, others rely on external styles or omit styling altogether.

## Adding Components to This Repository

When adding a patch with new components, please follow these directions:

- Test your component across multiple platforms, including mobile, desktop, and a variety of browsers, as well as both light mode and dark mode.
- Use ARIA attributes to support accessibility, ensuring the component is usable by all.
- Register your component in the `index.js` file, making it available for global import.
- Ensure your component follows our naming conventions (e.g., PascalCase for React components) and the structure used in this repository.
- Update this documentation file with your component’s details, including usage examples and any configuration options.
  Follow the existing format and style for consistency.
- Include clear and concise examples for usage, and note any potential edge cases or known issues, as well as future development directions.

## Using Components in MDX Source Files

To use a global import that adds all sanctioned components, add this line after the front-matter in your MDX file:

```
import * as Components from '@site/src/components';
```

Components will use the "Components." prefix before their name:

```
<Components.DiscoverableDisclosure>
...Content that is folded away...
</Components.DiscoverableDisclosure>
```

To import a component subset, list them between braces, and use them as just mentioned.

```
import { CaptionedImage, DiscoverableDisclosure } from '@site/src/components';
```

To directly import components, provide the full site path:

```
import CaptionedImage from '@site/src/components/info/CaptionedImage';
```

Directly imported components do _not_ need a prefix in use.
For example:

```
<CaptionedImage src="/path/to/image" alt="accessibility_text">
```

## ToolTipTerm Usage

Role: Provide definitions or background information at the point of use.

Usage:

```
<Components.ToolTipTerm term="your_term_name" />
```

For example:

```
Temporal Cloud strives to maintain a <Components.ToolTipTerm term="P95" /> replication delay of less than 1 minute.
```

The term is used to look up a file in `static/term`, appended by `md`. 
In this example, the file `P95.md`:

```
docs% ls static/terms/P95*
static/terms/P95.md
```

### Using Content from a Different File

For reasons of capitalization, spelling, or different reader set, you may want to vary the content of the tooltip.
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

### Known Limitations

The static Markdown content cannot use links, images, and other advanced elements.

