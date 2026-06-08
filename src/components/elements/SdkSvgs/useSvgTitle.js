import { useId } from 'react';

export function useSvgTitle(title) {
  const titleId = useId();

  if (!title) {
    return { titleId: undefined, titleElement: null };
  }

  return {
    titleId,
    titleElement: <title id={titleId}>{title}</title>,
  };
}
