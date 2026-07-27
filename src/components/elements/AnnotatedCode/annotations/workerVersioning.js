/** Highlight metadata only — code samples live in the MDX page. */

const D = {
  useVersioning:
    'Enables Worker Versioning for this Worker so Tasks are matched to Deployment Versions.',
  version:
    'Identifies the revision this Worker may execute: a deployment name plus a Build ID.',
  defaultBehavior:
    'Optional. If unset, you must set the Versioning Behavior on each Workflow. Otherwise default to Pinned or Auto-Upgrade.',
  defaultBehaviorTs:
    'Optional. This TypeScript example does not set a default; set Versioning Behavior on each Workflow, or add a default when your SDK supports it on Worker options.',
};

export const go = [
  { label: 'UseVersioning', description: D.useVersioning, lines: [4] },
  { label: 'Version', description: D.version, lines: [5, 6, 7, 8] },
  { label: 'Default Versioning Behavior', description: D.defaultBehavior, lines: [9] },
];

export const java = [
  { label: 'UseVersioning', description: D.useVersioning, lines: [10] },
  { label: 'Version', description: D.version, lines: [9] },
  { label: 'Default Versioning Behavior', description: D.defaultBehavior, lines: [11] },
];

export const python = [
  { label: 'UseVersioning', description: D.useVersioning, lines: [13] },
  { label: 'Version', description: D.version, lines: [10, 11, 12] },
  { label: 'Default Versioning Behavior', description: D.defaultBehavior, lines: [14] },
];

export const typescript = [
  { label: 'UseVersioning', description: D.useVersioning, lines: [5] },
  { label: 'Version', description: D.version, lines: [6] },
  { label: 'Default Versioning Behavior', description: D.defaultBehaviorTs, lines: [] },
];

export const dotnet = [
  { label: 'UseVersioning', description: D.useVersioning, lines: [5] },
  { label: 'Version', description: D.version, lines: [5] },
  { label: 'Default Versioning Behavior', description: D.defaultBehavior, lines: [7] },
];

export const ruby = [
  { label: 'UseVersioning', description: D.useVersioning, lines: [10] },
  { label: 'Version', description: D.version, lines: [6, 7, 8, 9] },
  { label: 'Default Versioning Behavior', description: D.defaultBehavior, lines: [11] },
];
