import React from 'react';
import type {Props} from '@theme/Root';

// Import your global overrides after everything else
import '@site/src/css/custom.css';

export default function Root({children}: Props) {
  return <>{children}</>;
}
