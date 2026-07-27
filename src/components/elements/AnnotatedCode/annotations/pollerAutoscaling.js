/** Highlight metadata only — code samples live in the MDX page. */

const D = {
  workflow: 'Autoscales the number of pollers for Workflow Tasks based on load.',
  activity: 'Autoscales the number of pollers for Activity Tasks based on load.',
  nexus: 'Autoscales the number of pollers for Nexus Tasks based on load.',
};

const three = (workflowLine, activityLine, nexusLine) => [
  { label: 'Workflow Task poller', description: D.workflow, lines: [workflowLine] },
  { label: 'Activity Task poller', description: D.activity, lines: [activityLine] },
  { label: 'Nexus Task poller', description: D.nexus, lines: [nexusLine] },
];

export const go = three(2, 3, 4);
export const java = three(7, 8, 9);
export const python = three(7, 8, 9);
export const typescript = three(7, 8, 9);
export const dotnet = three(5, 6, 7);
export const ruby = three(7, 8, 9);
