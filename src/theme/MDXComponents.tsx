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
import ZoomableImage from '@site/src/components/elements/Images/ZoomableImage';
import NoZoom from '@site/src/components/elements/Images/NoZoom';
import { isExternalHref } from '@site/src/utils/links';
import styles from '@site/src/theme/DocItem/Content/styles.module.css';

function H1WithLLMActions(props: React.ComponentProps<'h1'>): JSX.Element {
  return (
    <header className={styles.header}>
      <h1 {...props} />
      <LLMActions />
    </header>
  );
}

// The default <a> (@theme/MDXComponents/A) opens every absolute URL in a new
// tab, including links to other temporal.io properties. Cancel target/rel for
// the temporal.io family so prose links behave like they do on temporal.io,
// while keeping everything else (footnote anchor styling, etc.) unchanged.
const DefaultA = MDXComponents.a;
function A(props: React.ComponentProps<typeof DefaultA> & { href?: string }): JSX.Element {
  return isExternalHref(props.href) ? (
    <DefaultA {...props} />
  ) : (
    <DefaultA {...props} target={undefined} rel={undefined} />
  );
}

export default {
    ...MDXComponents,
    Tabs,
    TabItem,
    NoZoom,
    h1: H1WithLLMActions,
    img: ZoomableImage,
    a: A,
};