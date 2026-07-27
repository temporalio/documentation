/** Highlight metadata only — code samples live in the MDX page. */

const D = {
  priorityKey:
    'Priority key in the range [1, 5]. Lower values run first. If unset, Tasks default to priority 3.',
  fairnessKey:
    'Groups Tasks into a virtual queue (for example by tenant or workload type) so no single group monopolizes the Task Queue.',
  fairnessWeight:
    'Relative dispatch weight for this fairness key. Default is 1.0. Higher weights get a larger share of dispatches.',
};

const three = (priorityLines, fairnessKeyLines, fairnessWeightLines) => [
  { label: 'Priority key', description: D.priorityKey, lines: priorityLines },
  { label: 'Fairness key', description: D.fairnessKey, lines: fairnessKeyLines },
  { label: 'Fairness weight', description: D.fairnessWeight, lines: fairnessWeightLines },
];

export const go = three([5], [6], [7]);
export const java = three([4], [5], [6]);
export const python = three([7], [8], [9]);
export const ruby = three([6], [7], [8]);
export const typescript = three([4], [5], [6]);
export const dotnet = three([8], [9], [10]);
