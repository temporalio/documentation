import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import Translate from '@docusaurus/Translate';
import { resolveAdmonitionKind } from './types';
import styles from './styles.module.css';

// Stroke icons drawn on a 24-unit grid. They take the label's color through currentColor.
function Icon({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

function NoteIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.5v.01" />
    </Icon>
  );
}

function TipIcon() {
  return (
    <Icon>
      <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.2 1.1 2V16h5v-.2c0-.8.4-1.5 1.1-2A6 6 0 0 0 12 3z" />
    </Icon>
  );
}

function CautionIcon() {
  return (
    <Icon>
      <path d="M10.3 3.9 2.4 17.5a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4M12 17v.01" />
    </Icon>
  );
}

function WarningIcon() {
  return (
    <Icon>
      <path d="M7.9 2.5h8.2l5.4 5.4v8.2l-5.4 5.4H7.9l-5.4-5.4V7.9z" />
      <path d="M12 8v4.5M12 16v.01" />
    </Icon>
  );
}

const KIND_CONFIGS = {
  note: {
    iconComponent: NoteIcon,
    label: (
      <Translate id="theme.admonition.note" description="The default label used for the Note admonition (:::note)">
        Note
      </Translate>
    ),
  },
  tip: {
    iconComponent: TipIcon,
    label: (
      <Translate id="theme.admonition.tip" description="The default label used for the Tip admonition (:::tip)">
        Tip
      </Translate>
    ),
  },
  caution: {
    iconComponent: CautionIcon,
    label: (
      <Translate
        id="theme.admonition.caution"
        description="The default label used for the Caution admonition (:::caution)"
      >
        Caution
      </Translate>
    ),
  },
  warning: {
    iconComponent: WarningIcon,
    label: (
      <Translate
        id="theme.admonition.warning"
        description="The default label used for the Warning admonition (:::warning)"
      >
        Warning
      </Translate>
    ),
  },
};

// Workaround because it's difficult in MDX v1 to provide a MDX title as props
// See https://github.com/facebook/docusaurus/pull/7152#issuecomment-1145779682
function extractMDXAdmonitionTitle(children) {
  const items = React.Children.toArray(children);
  const mdxAdmonitionTitle = items.find(
    (item) => React.isValidElement(item) && item.props?.mdxType === 'mdxAdmonitionTitle'
  );
  const rest = <>{items.filter((item) => item !== mdxAdmonitionTitle)}</>;
  return {
    mdxAdmonitionTitle,
    rest,
  };
}

function processAdmonitionProps(props) {
  const { mdxAdmonitionTitle, rest } = extractMDXAdmonitionTitle(props.children);
  return {
    ...props,
    title: props.title ?? mdxAdmonitionTitle,
    children: rest,
  };
}

export default function Admonition(props) {
  const { children, type, title, icon: iconProp } = processAdmonitionProps(props);
  const { kind, known } = resolveAdmonitionKind(type);
  if (!known) {
    console.warn(`No admonition config found for admonition type "${type}". Using Note as fallback.`);
  }
  const { iconComponent: IconComponent, label } = KIND_CONFIGS[kind];
  const icon = iconProp ?? <IconComponent />;
  return (
    <div
      className={clsx(
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType(type),
        styles.admonition,
        styles[kind]
      )}
    >
      <div className={styles.admonitionHeading}>
        <span className={styles.admonitionIcon}>{icon}</span>
        {title ?? label}
      </div>
      <div className={styles.admonitionContent}>{children}</div>
    </div>
  );
}
