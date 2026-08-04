import { LINES } from './pizza-workflow';

export const HISTORY_REPLAY_COLUMNS = [
  { key: 'commands', title: 'Commands' },
  { key: 'events', title: 'Event History' },
];

const EXECUTION = 'Original execution';
const CRASH = 'Worker crash';
const REPLAY = 'History Replay';
const AFTER = 'Execution resumes';

export const HISTORY_REPLAY_STEPS = [
  {
    number: 1,
    title: 'A Client requests the Workflow Execution',
    phase: EXECUTION,
    kind: 'service',
    lines: [1],
    adds: {
      events: [
        {
          label: 'WorkflowExecutionStarted',
          details: '(customer, pizzas ordered)',
          tone: 'direct',
        },
      ],
    },
    note: 'The walkthrough begins with a request to execute this Workflow Definition with input data about the customer and the pizzas ordered. The Temporal Service records WorkflowExecutionStarted, always the first Event of a Workflow Execution, and that Event holds the input data.',
  },
  {
    number: 2,
    title: 'A Workflow Task is queued',
    phase: EXECUTION,
    kind: 'service',
    lines: [],
    adds: {
      events: [{ label: 'WorkflowTaskScheduled', tone: 'direct' }],
    },
    note: 'The Temporal Service adds a Workflow Task to the Task Queue and records a WorkflowTaskScheduled Event.',
  },
  {
    number: 3,
    title: 'A Worker accepts the Workflow Task',
    phase: EXECUTION,
    kind: 'service',
    lines: [],
    adds: {
      events: [{ label: 'WorkflowTaskStarted', tone: 'indirect' }],
    },
    note: 'The Temporal Service dispatches the Task to a Worker that is polling the Task Queue. The Worker accepts it, and the Temporal Service records a WorkflowTaskStarted Event.',
  },
  {
    number: 4,
    title: 'The Worker runs the Workflow code',
    phase: EXECUTION,
    kind: 'internal',
    lines: LINES.optionsAndPrice,
    note: 'The Worker invokes the Workflow code and runs it one statement at a time. The first few lines set the Start-to-Close Timeout and total the price of the order, and none of them interact with the Temporal Service.',
  },
  {
    number: 5,
    title: 'The Worker completes the Workflow Task',
    phase: EXECUTION,
    kind: 'command',
    lines: LINES.getDistance,
    adds: {
      events: [{ label: 'WorkflowTaskCompleted', tone: 'direct' }],
    },
    note: 'The Worker encounters a request to execute an Activity, so it completes the current Workflow Task. It makes a single gRPC call, RespondWorkflowTaskCompleted, that signals completion of the Workflow Task and carries any Commands with it, so WorkflowTaskCompleted and the Command that follows are technically one call.',
  },
  {
    number: 6,
    title: 'The GetDistance Activity Task is scheduled',
    phase: EXECUTION,
    kind: 'command',
    lines: LINES.getDistance,
    adds: {
      commands: [{ label: 'ScheduleActivityTask', details: '(GetDistance)', tone: 'command' }],
      events: [{ label: 'ActivityTaskScheduled', details: '(GetDistance)', tone: 'direct' }],
    },
    note: 'In response to the ScheduleActivityTask Command, the Temporal Service queues an Activity Task and records an ActivityTaskScheduled Event, a direct result of the Command.',
  },
  {
    number: 7,
    title: 'A Worker starts the Activity Task',
    phase: EXECUTION,
    kind: 'service',
    lines: LINES.getDistance,
    adds: {
      events: [{ label: 'ActivityTaskStarted', tone: 'indirect' }],
    },
    note: 'The Temporal Service dispatches the Activity Task to an available Worker, which starts running the code in the GetDistance Activity. ActivityTaskStarted is an indirect result of the Command, and it is not written to the Event History until the Task closes, because the number of retry attempts is an attribute of that Event.',
  },
  {
    number: 8,
    title: 'The Activity returns a distance of 15',
    phase: EXECUTION,
    kind: 'service',
    lines: LINES.getDistance,
    adds: {
      events: [{ label: 'ActivityTaskCompleted', details: '(distance = 15)', tone: 'indirect' }],
    },
    note: 'When the Activity function returns, the Worker notifies the Temporal Service that the Activity Execution is complete. The Temporal Service records an ActivityTaskCompleted Event, which contains the result of the Activity.',
  },
  {
    number: 9,
    title: 'The result goes back to the Workflow',
    phase: EXECUTION,
    kind: 'service',
    lines: LINES.distanceCheck,
    adds: {
      events: [
        { label: 'WorkflowTaskScheduled', tone: 'direct' },
        { label: 'WorkflowTaskStarted', tone: 'indirect' },
      ],
    },
    note: 'To deliver the result to the Workflow, the Temporal Service creates another Workflow Task that includes it. A Worker dequeues that Task, resumes execution, and evaluates the distance. This order is going to a nearby customer, so execution continues.',
  },
  {
    number: 10,
    title: 'The Worker starts a Timer',
    phase: EXECUTION,
    kind: 'command',
    lines: LINES.sleep,
    adds: {
      commands: [{ label: 'StartTimer', details: '(30 minutes)', tone: 'command' }],
      events: [
        { label: 'WorkflowTaskCompleted', tone: 'direct' },
        { label: 'TimerStarted', details: '(30 minutes)', tone: 'direct' },
      ],
    },
    note: 'The Worker reaches the request to start a Timer, so it completes the current Workflow Task and sends the StartTimer Command with it. The Temporal Service starts the Timer and records TimerStarted. The Workflow does not progress until the Timer fires.',
  },
  {
    number: 11,
    title: 'The Timer fires',
    phase: EXECUTION,
    kind: 'service',
    lines: LINES.sleep,
    adds: {
      events: [
        { label: 'TimerFired', tone: 'indirect' },
        { label: 'WorkflowTaskScheduled', tone: 'direct' },
      ],
    },
    note: 'After 30 minutes elapse, the Timer fires and the Temporal Service records TimerFired. It then queues a new Workflow Task to deliver that Event to the Workflow and drive progress forward.',
  },
  {
    number: 12,
    title: 'The Worker crashes',
    phase: CRASH,
    kind: 'crash',
    lines: LINES.bill,
    adds: {
      events: [{ label: 'WorkflowTaskStarted', tone: 'indirect' }],
    },
    note: 'The Worker polls for the Task, dequeues it, and continues executing the Workflow code — and then crashes right here. How does Temporal recover the state of this Workflow Execution? First, how does the Temporal Service know the Worker crashed?',
  },
  {
    number: 13,
    title: 'The Workflow Task times out',
    phase: CRASH,
    kind: 'crash',
    lines: [],
    adds: {
      events: [{ label: 'WorkflowTaskTimedOut', tone: 'indirect' }],
    },
    note: 'Once a Worker accepts a Task, it is expected to complete it within a predefined duration. That Workflow Task Timeout, 10 seconds by default, is how a crashed Worker is recognized. The Worker failed to complete the Task in time, so the Temporal Service records WorkflowTaskTimedOut.',
  },
  {
    number: 14,
    title: 'A new Workflow Task is scheduled',
    phase: CRASH,
    kind: 'service',
    lines: [],
    adds: {
      events: [
        { label: 'WorkflowTaskScheduled', tone: 'direct' },
        { divider: 'Event History at the time of the crash' },
      ],
    },
    note: 'The Temporal Service schedules a new Workflow Task. The Worker that polls for it might be another Worker in the fleet or a new Worker process created by restarting the one that crashed. Everything above the line is the Event History as it stood when the Worker crashed.',
  },
  {
    number: 15,
    title: 'The Worker requests the Event History',
    phase: REPLAY,
    kind: 'replay',
    lines: [],
    note: 'Either way, the Worker needs the current Event History for this Workflow Execution, so it requests it from the Temporal Service. The Temporal Service provides the History.',
  },
  {
    number: 16,
    title: 'Replay re-executes the code',
    phase: REPLAY,
    kind: 'replay',
    lines: LINES.optionsAndPrice,
    note: 'The Worker begins re-executing the code with the same input, which was stored in the WorkflowExecutionStarted Event. Because the Workflow code is deterministic, the state of every variable encountered so far is identical to what it was before the crash. For example, totalPrice holds the same value.',
  },
  {
    number: 17,
    title: 'The Activity result comes from the History',
    phase: REPLAY,
    kind: 'replay',
    lines: LINES.getDistance,
    adds: {
      commands: [
        {
          label: 'ScheduleActivityTask',
          details: '(GetDistance) — created during Replay, not issued',
          tone: 'command',
          status: 'matched',
        },
      ],
    },
    note: 'When Replay reaches the call to schedule GetDistance, it creates a ScheduleActivityTask Command but does not issue it. Instead, the Worker inspects the Event History and finds ActivityTaskScheduled for this Activity Type, ActivityTaskStarted showing a Worker dequeued the Task, and ActivityTaskCompleted with a result of 15. The Activity already ran, so the Command is not issued.',
  },
  {
    number: 18,
    title: 'Replay assigns the stored result',
    phase: REPLAY,
    kind: 'replay',
    lines: LINES.distanceCheck,
    note: 'The Worker assigns the value stored in the ActivityTaskCompleted Event, 15, to the distance variable. The Activity is not re-executed, so there is no way for it to behave differently during Replay than it did during the original execution. The conditional evaluates to false, just as it did before.',
  },
  {
    number: 19,
    title: 'The Timer is already done',
    phase: REPLAY,
    kind: 'replay',
    lines: LINES.sleep,
    adds: {
      commands: [
        {
          label: 'StartTimer',
          details: '(30 minutes) — created during Replay, not issued',
          tone: 'command',
          status: 'matched',
        },
      ],
    },
    note: 'The Worker reaches the request to start a Timer and creates a StartTimer Command, which again it does not issue. The Event History contains TimerStarted and TimerFired, so the Worker knows the Timer already started and fired during the previous execution.',
  },
  {
    number: 20,
    title: 'State is restored to the point of the crash',
    phase: REPLAY,
    kind: 'replay',
    lines: LINES.bill,
    note: 'The Worker has reached the point where the crash occurred, and replaying the code has completely restored the state of the Workflow Execution. Every variable, including totalPrice, holds the value it held before the crash.',
  },
  {
    number: 21,
    title: 'Execution moves past the crash',
    phase: AFTER,
    kind: 'command',
    lines: LINES.sendBill,
    adds: {
      events: [{ label: 'WorkflowTaskCompleted', tone: 'direct' }],
    },
    note: 'The Worker reaches a statement beyond where the crash occurred, which is evident because the Event History contains no Events for the SendBill Activity. Execution continues as if the crash never happened: the Worker completes the current Workflow Task and includes the Command with it.',
  },
  {
    number: 22,
    title: 'The SendBill Activity runs',
    phase: AFTER,
    kind: 'command',
    lines: LINES.sendBill,
    adds: {
      commands: [{ label: 'ScheduleActivityTask', details: '(SendBill)', tone: 'command' }],
      events: [
        { label: 'ActivityTaskScheduled', details: '(SendBill)', tone: 'direct' },
        { label: 'ActivityTaskStarted', tone: 'indirect' },
        { label: 'ActivityTaskCompleted', tone: 'indirect' },
      ],
    },
    note: 'The Worker issues the Command, the Temporal Service queues the Activity Task, and a Worker dequeues and runs it. When the Activity returns, the Worker notifies the Temporal Service, which records ActivityTaskCompleted with the result from SendBill.',
  },
  {
    number: 23,
    title: 'One more Workflow Task delivers the result',
    phase: AFTER,
    kind: 'service',
    lines: LINES.returnValue,
    adds: {
      events: [
        { label: 'WorkflowTaskScheduled', tone: 'direct' },
        { label: 'WorkflowTaskStarted', tone: 'indirect' },
      ],
    },
    note: 'The Temporal Service has not received a Command saying the Workflow Execution completed or failed, so it schedules another Workflow Task to continue progress. A Worker accepts it and resumes the Workflow code.',
  },
  {
    number: 24,
    title: 'The Workflow Execution completes',
    phase: AFTER,
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
      events: [
        { label: 'WorkflowTaskCompleted', tone: 'direct' },
        { label: 'WorkflowExecutionCompleted', tone: 'direct' },
      ],
    },
    note: 'The Workflow returns, so the Worker completes the current Workflow Task and issues a CompleteWorkflowExecution Command that contains the result. The Temporal Service records WorkflowExecutionCompleted as the final Event. The result is identical to an execution that never crashed.',
  },
];
