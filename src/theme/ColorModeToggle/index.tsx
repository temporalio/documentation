import React, { useCallback, type ReactNode } from 'react';
import ColorModeToggle from '@theme-original/ColorModeToggle';
import type ColorModeToggleType from '@theme/ColorModeToggle';
import type { WrapperProps } from '@docusaurus/types';
import { trackEvent } from '@site/src/utils/analytics';

type Props = WrapperProps<typeof ColorModeToggleType>;
type ColorMode = 'light' | 'dark' | null;

// The toggle is an icon-only button, so autocapture records the click but not
// which mode the reader picked. A null mode means "follow the system setting".
export default function ColorModeToggleWrapper(props: Props): ReactNode {
  const { value, onChange } = props;

  const handleChange = useCallback(
    (next: ColorMode) => {
      trackEvent('Docs Theme Changed', { from: value ?? 'system', to: next ?? 'system' });
      onChange(next);
    },
    [value, onChange]
  );

  return <ColorModeToggle {...props} onChange={handleChange} />;
}
