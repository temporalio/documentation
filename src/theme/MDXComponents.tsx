/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LLMActions from '@site/src/components/LLMActions/LLMActions';

function H1WithLLMActions(props: React.ComponentProps<'h1'>): JSX.Element {
  return (
    <>
      <h1 {...props} />
      <LLMActions />
    </>
  );
}

export default {
    ...MDXComponents,
    Tabs,
    TabItem,
    h1: H1WithLLMActions,
};