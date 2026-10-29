import React, { useMemo } from 'react';
import TOCItems from '@theme-original/TOCItems';
import type TOCItemsType from '@theme/TOCItems';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof TOCItemsType>;

// Reference pages use identifiers such as local_activity_succeed_endtoend_latency
// as headings. No CSS property breaks on underscores, so add the break opportunities
// here. <wbr> is used rather than a zero-width space because it contributes no
// characters when the text is copied.
function addUnderscoreBreaks(html: string): string {
  if (!html.includes('_')) {
    return html;
  }
  return html
    .split(/(<[^>]*>)/)
    .map((part) =>
      part.startsWith('<') ? part : part.replace(/_/g, '<wbr />_'),
    )
    .join('');
}

export default function TOCItemsWrapper(props: Props): JSX.Element {
  const toc = useMemo(
    () =>
      props.toc.map((item) => ({
        ...item,
        value: addUnderscoreBreaks(item.value),
      })),
    [props.toc],
  );

  return <TOCItems {...props} toc={toc} />;
}
