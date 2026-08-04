import { LINES } from './pizza-workflow';

export const CODE_TO_COMMANDS_COLUMNS = [{ key: 'commands', title: 'Commands issued' }];

export const CODE_TO_COMMANDS_STEPS = [
  {
    number: 1,
    title: 'A basic Workflow Definition',
    lines: [],
    note: 'This Go Workflow Definition takes a pizza order and does the work listed here. Step through it to see which statements the Worker handles on its own and which ones send a Command to the Temporal Service.',
    bullets: [
      'Defines a Start-to-Close Timeout',
      'Calculates the total price of the pizzas',
      'Determines the distance to the customer',
      'Fails if the customer is too far away for delivery',
      'Sleeps for 30 minutes',
      'Populates a struct with billing information',
      'Sends a bill to the customer',
    ],
  },
  {
    number: 2,
    title: 'Internal steps',
    kind: 'internal',
    lines: [...LINES.optionsAndPrice, ...LINES.distanceCheck, ...LINES.bill],
    note: 'These steps are internal to the Workflow. The Worker runs them in your process and never contacts the Temporal Service.',
  },
  {
    number: 3,
    title: 'Steps that reach the Temporal Service',
    kind: 'command',
    lines: [15, 25, 34, 39],
    note: 'These steps do involve the Temporal Service. Requesting an Activity Execution generates a Command to schedule the Activity Task, and returning from the Workflow function tells the Temporal Service that the Workflow Execution is complete.',
  },
  {
    number: 4,
    title: 'Set the timeout and total the price',
    kind: 'internal',
    lines: LINES.optionsAndPrice,
    note: "The walkthrough starts here. Setting the Start-to-Close Timeout and adding up the price of each pizza are internal steps, so they don't require any interaction with the Temporal Service.",
  },
  {
    number: 5,
    title: 'Request the GetDistance Activity',
    kind: 'command',
    lines: LINES.getDistance,
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
    lines: LINES.distanceCheck,
    note: 'The Worker evaluates the distance returned by the Activity. If the customer lived too far away, the Workflow would return an error, which sends a Command asking the Temporal Service to fail the Workflow Execution. This order is going to a nearby customer, so execution continues.',
  },
  {
    number: 7,
    title: 'Start a Timer',
    kind: 'command',
    lines: LINES.sleep,
    adds: {
      commands: [{ label: 'StartTimer', details: '(30 minutes)', tone: 'command' }],
    },
    note: 'The call to sleep is another statement that involves the Temporal Service. The Worker issues a StartTimer Command that includes the duration, and this Workflow Execution pauses for 30 minutes until the Timer fires.',
  },
  {
    number: 8,
    title: 'Populate the bill',
    kind: 'internal',
    lines: LINES.bill,
    note: "The Timer fires and execution resumes. These lines create and populate the data structure that holds the input for the next Activity. The struct relates to an Activity, but building it doesn't involve the Temporal Service.",
  },
  {
    number: 9,
    title: 'Request the SendBill Activity',
    kind: 'command',
    lines: LINES.sendBill,
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
    lines: LINES.returnValue,
    adds: {
      commands: [
        {
          label: 'CompleteWorkflowExecution',
          details: '({ ConfirmationNumber: "TPD-26074139" })',
          tone: 'command',
        },
      ],
    },
    note: 'Returning from the Workflow function also results in a Command. The Worker issues CompleteWorkflowExecution to the Temporal Service, which includes the value returned from the function.',
  },
];
