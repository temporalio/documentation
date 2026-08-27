import React, {type ComponentProps, type ReactNode} from 'react';
import {TitleFormatterProvider} from '@docusaurus/theme-common/internal';
import type {Props} from '@theme/ThemeProvider/TitleFormatter';

type FormatterProp = ComponentProps<typeof TitleFormatterProvider>['formatter'];

// Section label inserted between the page title and the site title, keyed by
// content-docs plugin id, e.g. "Tool calling agent | AI Cookbook | Temporal Documentation".
const SECTION_TITLES: Record<string, string> = {
  'ai-cookbook': 'AI Cookbook',
};

// docs/index.mdx (the homepage) sets its frontmatter `title` to this exact
// string. It's the one page that should render with no site-title suffix.
const HOMEPAGE_TITLE = 'Temporal Platform Documentation';

const formatter: FormatterProp = (params) => {
  const trimmedTitle = params.title?.trim();

  if (trimmedTitle === HOMEPAGE_TITLE) {
    return HOMEPAGE_TITLE;
  }

  const sectionTitle = SECTION_TITLES[params.plugin.id];

  if (!sectionTitle || !trimmedTitle || trimmedTitle === sectionTitle) {
    return params.defaultFormatter(params);
  }

  return `${trimmedTitle} ${params.titleDelimiter} ${sectionTitle} ${params.titleDelimiter} ${params.siteTitle}`;
};

export default function ThemeProviderTitleFormatter({
  children,
}: Props): ReactNode {
  return (
    <TitleFormatterProvider formatter={formatter}>
      {children}
    </TitleFormatterProvider>
  );
}
