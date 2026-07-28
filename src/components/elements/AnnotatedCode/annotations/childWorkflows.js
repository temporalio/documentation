/** Highlight metadata only — code samples live in the MDX page. */

const D = {
  parentClosePolicy:
    'Controls what happens to the Child Workflow when the parent closes. ABANDON lets the child keep running after the parent completes.',
  workflowId:
    'Gives the Child Workflow a stable identity for tracking, querying, and deduplication in the UI.',
  asyncStart:
    'Starts the Child Workflow without waiting for it to finish. The parent continues after the child has started.',
};

const three = (parentCloseLines, workflowIdLines, asyncStartLines) => [
  { label: 'Parent Close Policy', description: D.parentClosePolicy, lines: parentCloseLines },
  { label: 'Workflow Id', description: D.workflowId, lines: workflowIdLines },
  { label: 'Async start', description: D.asyncStart, lines: asyncStartLines },
];

export const python = three([14], [13], [10, 11, 12, 13, 14, 15]);
export const go = three([3], [14], [7]);
export const java = three([6], [5], [11]);
export const typescript = three([7], [10], [5, 6, 7, 8]);
