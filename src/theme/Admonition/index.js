import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import Translate from "@docusaurus/Translate";
import styles from "./styles.module.css";
function NoteIcon() {
  return (
    <svg viewBox="0 0 14 16">
      <path
        fillRule="evenodd"
        d="M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"
      />
    </svg>
  );
}
function TipIcon() {
  return (
    <svg viewBox="0 0 12 16">
      <path
        fillRule="evenodd"
        d="M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"
      />
    </svg>
  );
}
function DangerIcon() {
  return (
    <svg viewBox="0 0 12 16">
      <path
        fillRule="evenodd"
        d="M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"
      />
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg x="0px" y="0px" viewBox="0 0 193.826 193.826">
      <path
        fill="currentColor"
        d="M191.495,55.511L137.449,1.465c-1.951-1.953-5.119-1.953-7.07,0l-0.229,0.229c-3.314,3.313-5.14,7.72-5.14,12.406
	c0,3.019,0.767,5.916,2.192,8.485l-56.55,48.533c-4.328-3.868-9.852-5.985-15.703-5.985c-6.305,0-12.232,2.455-16.689,6.913
	l-0.339,0.339c-1.953,1.952-1.953,5.118,0,7.07l32.378,32.378l-31.534,31.533c-0.631,0.649-15.557,16.03-25.37,28.27
	c-9.345,11.653-11.193,13.788-11.289,13.898c-1.735,1.976-1.639,4.956,0.218,6.822c0.973,0.977,2.256,1.471,3.543,1.471
	c1.173,0,2.349-0.41,3.295-1.237c0.083-0.072,2.169-1.885,13.898-11.289c12.238-9.813,27.619-24.74,28.318-25.421l31.483-31.483
	l30.644,30.644c0.976,0.977,2.256,1.465,3.535,1.465s2.56-0.488,3.535-1.465l0.339-0.339c4.458-4.457,6.913-10.385,6.913-16.689
	c0-5.851-2.118-11.375-5.985-15.703l48.533-56.55c2.569,1.425,5.466,2.192,8.485,2.192c4.687,0,9.093-1.825,12.406-5.14l0.229-0.229
	C193.448,60.629,193.448,57.463,191.495,55.511z"
      ></path>
    </svg>
  );
}
function CautionIcon() {
  return (
    <svg viewBox="0 0 16 16">
      <path
        fillRule="evenodd"
        d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"
      />
    </svg>
  );
}

function CompetencyIcon() {
  return (
    <svg viewBox="0 0 512 512" width="512" height="512">
      <g>
        <path
          fill="currentColor"
          d="M136,235.514v121.831h240V235.514c-36.782-18.34-78.281-28.037-120-28.037S172.797,217.174,136,235.514z"
        ></path>
        <path
          fill="currentColor"
          d="M481,209.253l31-16.908L256,58.444L0,192.345l106,55.906V216.94c8.441-3.214,65.231-39.463,150-39.463   c85.95,0,140.914,36.017,150,39.478v31.296l45-23.399V338.8l-31,66.504l46,48.252l46-48.252L481,338.8V209.253z"
        ></path>
      </g>
    </svg>
  );
}

function CopyCodeIcon() {
  return (
    <svg width="94.504px" height="94.504px" viewBox="0 0 94.504 94.504">
      <g>
        <path
          fill="currentColor"
          d="M93.918,45.833L69.799,21.714c-0.75-0.75-2.077-0.75-2.827,0l-5.229,5.229c-0.781,0.781-0.781,2.047,0,2.828
			l17.477,17.475L61.744,64.724c-0.781,0.781-0.781,2.047,0,2.828l5.229,5.229c0.375,0.375,0.884,0.587,1.414,0.587
			c0.529,0,1.039-0.212,1.414-0.587l24.117-24.118C94.699,47.881,94.699,46.614,93.918,45.833z"
        ></path>
        <path
          fill="currentColor"
          d="M32.759,64.724L15.285,47.248l17.477-17.475c0.375-0.375,0.586-0.883,0.586-1.414c0-0.53-0.21-1.039-0.586-1.414
			l-5.229-5.229c-0.375-0.375-0.884-0.586-1.414-0.586c-0.53,0-1.039,0.211-1.414,0.586L0.585,45.833
			c-0.781,0.781-0.781,2.047,0,2.829L24.704,72.78c0.375,0.375,0.884,0.587,1.414,0.587c0.53,0,1.039-0.212,1.414-0.587l5.229-5.229
			C33.542,66.771,33.542,65.505,32.759,64.724z"
        ></path>
        <path
          fill="currentColor"
          d="M60.967,13.6c-0.254-0.466-0.682-0.812-1.19-0.962l-4.239-1.251c-1.058-0.314-2.172,0.293-2.484,1.352L33.375,79.382
			c-0.15,0.509-0.092,1.056,0.161,1.521c0.253,0.467,0.682,0.812,1.19,0.963l4.239,1.251c0.189,0.056,0.38,0.083,0.567,0.083
			c0.863,0,1.66-0.564,1.917-1.435l19.679-66.644C61.278,14.612,61.221,14.065,60.967,13.6z"
        ></path>
      </g>
    </svg>
  );
}
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
const AdmonitionConfigs = {
  note: {
    infimaClassName: "secondary",
    iconComponent: NoteIcon,
    label: (
      <Translate id="theme.admonition.note" description="The default label used for the Note admonition (:::note)">
        note
      </Translate>
    ),
  },
  tip: {
    infimaClassName: "success",
    iconComponent: TipIcon,
    label: (
      <Translate id="theme.admonition.tip" description="The default label used for the Tip admonition (:::tip)">
        tip
      </Translate>
    ),
  },
  danger: {
    infimaClassName: "danger",
    iconComponent: DangerIcon,
    label: (
      <Translate
        id="theme.admonition.danger"
        description="The default label used for the Danger admonition (:::danger)"
      >
        danger
      </Translate>
    ),
  },
  info: {
    infimaClassName: "info",
    iconComponent: InfoIcon,
    label: (
      <Translate id="theme.admonition.info" description="The default label used for the Info admonition (:::info)">
        info
      </Translate>
    ),
  },
  caution: {
    infimaClassName: "warning",
    iconComponent: CautionIcon,
    label: (
      <Translate
        id="theme.admonition.caution"
        description="The default label used for the Caution admonition (:::caution)"
      >
        caution
      </Translate>
    ),
  },
  competency: {
    infimaClassName: "competency",
    iconComponent: CompetencyIcon,
    label: (
      <Translate
        id="theme.admonition.competency"
        description="The default label used for the Competency admonition (:::competency)"
      >
        core competency
      </Translate>
    ),
  },
  copycode: {
    infimaClassName: "copycode",
    iconComponent: CopyCodeIcon,
    label: (
      <Translate
        id="theme.admonition.copycode"
        description="The default label used for the CopyCode admonition (:::copycode)"
      >
        copy code
      </Translate>
    ),
  },
};
// Legacy aliases, undocumented but kept for retro-compatibility
const aliases = {
  secondary: "note",
  important: "info",
  success: "tip",
  warning: "danger",
};
function getAdmonitionConfig(unsafeType) {
  const type = aliases[unsafeType] ?? unsafeType;
  const config = AdmonitionConfigs[type];
  if (config) {
    return config;
  }
  console.warn(`No admonition config found for admonition type "${type}". Using Info as fallback.`);
  return AdmonitionConfigs.info;
}
// Workaround because it's difficult in MDX v1 to provide a MDX title as props
// See https://github.com/facebook/docusaurus/pull/7152#issuecomment-1145779682
function extractMDXAdmonitionTitle(children) {
  const items = React.Children.toArray(children);
  const mdxAdmonitionTitle = items.find(
    (item) => React.isValidElement(item) && item.props?.mdxType === "mdxAdmonitionTitle"
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
  const typeConfig = getAdmonitionConfig(type);
  const titleLabel = title ?? typeConfig.label;
  const { iconComponent: IconComponent } = typeConfig;
  const icon = iconProp ?? <IconComponent />;
  return (
    <div
      className={clsx(
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType(props.type),
        "alert",
        `alert--${typeConfig.infimaClassName}`,
        styles.admonition
      )}
    >
      <div className={styles.admonitionHeading}>
        <span className={styles.admonitionIcon}>{icon}</span>
        {titleLabel}
      </div>
      <div className={styles.admonitionContent}>{children}</div>
    </div>
  );
}
