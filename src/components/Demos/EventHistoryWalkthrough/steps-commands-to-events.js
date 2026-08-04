export const COMMANDS_TO_EVENTS_COLUMNS = [
  { key: 'commands', title: 'Commands' },
  { key: 'events', title: 'Events' },
];

/**
 * "How Workflow Commands map to Events" narrative, shared across SDKs.
 *
 * @param {object} sdk - `pizzaWorkflow` config from languages/<sdk>.js
 */
export function makeCommandsToEventsSteps({ lines }) {
  return [
    {
      number: 1,
      title: 'Commands and the Events they produce',
      lines: [],
      note: 'This walkthrough keeps a running list of the Commands the Worker issues and the Events the Temporal Service records in response. Blue Events are the direct result of a Command. Pink Events are an indirect result.',
    },
    {
      number: 2,
      title: 'The GetDistance Activity is scheduled',
      kind: 'command',
      lines: lines.getDistance,
      adds: {
        commands: [{ label: 'ScheduleActivityTask', details: '(GetDistance)', tone: 'command' }],
        events: [{ label: 'ActivityTaskScheduled', details: '(GetDistance)', tone: 'direct' }],
      },
      note: 'The call to the Activity is the first line of code in the Workflow that causes a Command to be issued. In response, the Temporal Service creates an Activity Task, adds it to the Task Queue, and appends the ActivityTaskScheduled Event to the Event History.',
    },
    {
      number: 3,
      title: 'A Worker polls for the Activity Task',
      kind: 'service',
      lines: lines.getDistance,
      note: 'The Temporal Service dispatches this Activity Task to an available Worker. It responds to the poll request with the Task, and the Worker begins executing the code needed to complete it. Nothing is recorded in the Event History yet.',
    },
    {
      number: 4,
      title: 'The Activity Task closes',
      kind: 'service',
      lines: lines.getDistance,
      adds: {
        events: [{ label: 'ActivityTaskStarted', tone: 'indirect' }],
      },
      note: 'The ActivityTaskStarted Event is not written to the Event History until the Task closes, because the number of retry attempts is an attribute of that Event. It is an indirect result of the Command. The Start-to-Close Timeout sets how long the Activity has to complete.',
    },
    {
      number: 5,
      title: 'The Activity reports its result',
      kind: 'service',
      lines: lines.getDistance,
      adds: {
        events: [{ label: 'ActivityTaskCompleted', details: '(distance = 15)', tone: 'indirect' }],
      },
      note: 'When the Activity Definition returns a result, the Worker sends a message to the Temporal Service to say the Task is complete. This is a notification, not a Command, because it does not ask the Temporal Service to do anything that lets the Workflow Execution progress. The Temporal Service records ActivityTaskCompleted.',
    },
    {
      number: 6,
      title: 'The Worker starts a Timer',
      kind: 'command',
      lines: lines.timer,
      adds: {
        commands: [{ label: 'StartTimer', details: '(30 minutes)', tone: 'command' }],
        events: [{ label: 'TimerStarted', details: '(30 minutes)', tone: 'direct' }],
      },
      note: 'The next statement that results in a Command is the call to start a Timer. The Temporal Service starts a 30-minute Timer and records a TimerStarted Event, a direct result of the StartTimer Command.',
    },
    {
      number: 7,
      title: 'The Timer fires',
      kind: 'service',
      lines: lines.bill,
      adds: {
        events: [{ label: 'TimerFired', tone: 'indirect' }],
      },
      note: 'After 30 minutes elapse, the Timer fires on the Temporal Service, which records a TimerFired Event. The Workflow Execution continues with the next statement, but populating the bill is an internal step that does not interact with the Temporal Service.',
    },
    {
      number: 8,
      title: 'The SendBill Activity is scheduled',
      kind: 'command',
      lines: lines.sendBill,
      adds: {
        commands: [{ label: 'ScheduleActivityTask', details: '(SendBill)', tone: 'command' }],
        events: [{ label: 'ActivityTaskScheduled', details: '(SendBill)', tone: 'direct' }],
      },
      note: 'The Worker reaches the call to the SendBill Activity and issues another ScheduleActivityTask Command. The Temporal Service adds an Activity Task to the Task Queue and records an ActivityTaskScheduled Event.',
    },
    {
      number: 9,
      title: 'A Worker dequeues the Activity Task',
      kind: 'service',
      lines: lines.sendBill,
      adds: {
        events: [{ label: 'ActivityTaskStarted', tone: 'indirect' }],
      },
      note: 'The Temporal Service dispatches this Activity Task to the Worker. The Worker removes the Task from the Task Queue and begins working on it, and the Temporal Service records an ActivityTaskStarted Event to signify that the Task was dequeued.',
    },
    {
      number: 10,
      title: 'The bill is sent',
      kind: 'service',
      lines: lines.sendBill,
      adds: {
        events: [{ label: 'ActivityTaskCompleted', tone: 'indirect' }],
      },
      note: 'When the Activity returns, the Task is complete and the Worker notifies the Temporal Service, which records the ActivityTaskCompleted Event. Execution continues until the Workflow completes. The next walkthrough covers the full Event History, including the Workflow Task Events.',
    },
  ];
}
