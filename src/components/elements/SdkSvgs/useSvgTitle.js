import { useId } from 'react';

export function useSvgTitle(title) {
  const titleId = useId();

  if (!title) {
    return {
      titleElement: null,
      svgA11yProps: {},
    };
  }

  return {
    titleElement: <title id={titleId}>{title}</title>,
    svgA11yProps: {
      role: 'img',
      'aria-labelledby': titleId,
    },
  };
}
