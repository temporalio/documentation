export const CODE_TO_COMMANDS_COLUMNS = [{ key: 'commands', title: 'Commands issued' }];

/**
 * "How Workflow code maps to Commands" narrative. The steps are the same for
 * every SDK; each language config supplies the code sample, the line map, the
 * bullet list, and the notes whose wording is language-specific.
 *
 * @param {object} sdk - `pizzaWorkflow` config from languages/<sdk>.js
 */
export function makeCodeToCommandsSteps({ lines, definitionBullets, notes }) {
  return [
    {
      number: 1,
      title: 'A basic Workflow Definition',
      lines: [],
      note: 'This Workflow Definition takes a pizza order and does the work listed here. Step through it to see which statements the Worker handles on its own and which ones send a Command to the Temporal Service.',
      bullets: definitionBullets,
    },
    {
      number: 2,
      title: 'Internal steps',
      kind: 'internal',
      lines: [...lines.firstInternal, ...lines.distanceCheck, ...lines.bill],
      note: 'These steps are internal to the Workflow. The Worker runs them in your process and never contacts the Temporal Service.',
    },
    {
      number: 3,
      title: 'Steps that reach the Temporal Service',
      kind: 'command',
      lines: lines.commandStatements,
      note: 'These steps do involve the Temporal Service. Requesting an Activity Execution generates a Command to schedule the Activity Task, and returning from the Workflow tells the Temporal Service that the Workflow Execution is complete.',
    },
    {
      number: 4,
      title: 'Total the price of the order',
      kind: 'internal',
      lines: lines.firstInternal,
      note: notes.firstInternal,
    },
    {
      number: 5,
      title: 'Request the GetDistance Activity',
      kind: 'command',
      lines: lines.getDistance,
      adds: {
        commands: [
          {
            label: 'ScheduleActivityTask',
            details: '("pizza-tasks", GetDistance, { Line1: "123 Oak St.", Line2: "", ... })',
            tone: 'command',
          },
        ],
      },
      note: 'The Worker reaches a statement that requires the Temporal Service: a request to execute an Activity. It issues a ScheduleActivityTask Command with the details the Temporal Service needs, such as the Task Queue name, the Activity Type, and the input values. An Activity can take hours or days to complete, and the Worker holds no resources while it waits.',
    },
    {
      number: 6,
      title: 'Evaluate the distance',
      kind: 'internal',
      lines: lines.distanceCheck,
      note: notes.distanceCheck,
    },
    {
      number: 7,
      title: 'Start a Timer',
      kind: 'command',
      lines: lines.timer,
      adds: {
        commands: [{ label: 'StartTimer', details: '(30 minutes)', tone: 'command' }],
      },
      note: notes.timer,
    },
    {
      number: 8,
      title: 'Populate the bill',
      kind: 'internal',
      lines: lines.bill,
      note: notes.bill,
    },
    {
      number: 9,
      title: 'Request the SendBill Activity',
      kind: 'command',
      lines: lines.sendBill,
      adds: {
        commands: [
          {
            label: 'ScheduleActivityTask',
            details: '("pizza-tasks", SendBill, { Amount: 2750, Description: "Pizzas", ... })',
            tone: 'command',
          },
        ],
      },
      note: 'The next statement requests execution of an Activity, so the Worker issues another ScheduleActivityTask Command to the Temporal Service.',
    },
    {
      number: 10,
      title: 'Return from the Workflow',
      kind: 'command',
      lines: lines.returnValue,
      adds: {
        commands: [
          {
            label: 'CompleteWorkflowExecution',
            details: '({ ConfirmationNumber: "TPD-26074139" })',
            tone: 'command',
          },
        ],
      },
      note: notes.returnValue,
    },
  ];
}
