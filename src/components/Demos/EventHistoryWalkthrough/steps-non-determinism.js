export const NON_DETERMINISM_CODE = `func NonDeterministicWorkflow(ctx workflow.Context) error {

    options := workflow.ActivityOptions{
        StartToCloseTimeout: 45 * time.Minute,
    }
    ctx = workflow.WithActivityOptions(ctx, options)

    // this Activity is always executed
    err := workflow.ExecuteActivity(ctx, ImportSalesData).Get(ctx, nil)
    if err != nil {
        return err
    }

    if rand.Intn(100) >= 50 {
        workflow.Sleep(ctx, 4 * time.Hour)
    }

    workflow.GetLogger(ctx).Info("Preparing to run daily report")
    err = workflow.ExecuteActivity(ctx, RunDailyReport).Get(ctx, nil)
    if err != nil {
        return err
    }

    return nil
}`;

export const NON_DETERMINISM_COLUMNS = [
  { key: 'commands', title: 'Commands created' },
  { key: 'events', title: 'Relevant History Events' },
];

const FIRST = 'First execution';
const REPLAY = 'History Replay';

export const NON_DETERMINISM_STEPS = [
  {
    number: 1,
    title: 'The ImportSalesData Activity runs',
    phase: FIRST,
    kind: 'command',
    lines: [8, 9, 10, 11, 12],
    adds: {
      commands: [{ label: 'ScheduleActivityTask', details: '(ImportSalesData)', tone: 'command' }],
      events: [
        { label: 'ActivityTaskScheduled', details: '(ImportSalesData)', tone: 'direct' },
        { label: 'ActivityTaskStarted', tone: 'indirect' },
        { label: 'ActivityTaskCompleted', tone: 'indirect' },
      ],
    },
    note: 'As this Workflow executes step by step, the first line that results in a Command is the call to the ImportSalesData Activity. The Activity Execution succeeds, so the Temporal Service logs three Events to the Event History.',
  },
  {
    number: 2,
    title: 'A random number decides the next branch',
    phase: FIRST,
    kind: 'internal',
    lines: [14],
    note: 'The Worker reaches a conditional statement that evaluates a randomly generated number. The random number generator returns 84 during this execution, so the expression evaluates to true and execution continues with the next line.',
  },
  {
    number: 3,
    title: 'The Workflow starts a 4-hour Timer',
    phase: FIRST,
    kind: 'command',
    lines: [15],
    adds: {
      commands: [{ label: 'StartTimer', details: '(4 hours)', tone: 'command' }],
      events: [
        { label: 'TimerStarted', details: '(4 hours)', tone: 'direct' },
        { label: 'TimerFired', tone: 'indirect' },
      ],
    },
    note: 'The next line requests a Timer, so the Worker issues a StartTimer Command. The Temporal Service starts the Timer and records TimerStarted, then records TimerFired when the Timer fires.',
  },
  {
    number: 4,
    title: 'The Worker crashes',
    phase: FIRST,
    kind: 'crash',
    lines: [18],
    note: 'The Worker crashes once it reaches the next line, so another Worker takes over. That Worker uses Replay to restore the current state before continuing execution of the lines that follow.',
  },
  {
    number: 5,
    title: 'Replay establishes the expected Commands',
    phase: REPLAY,
    kind: 'replay',
    lines: [],
    note: 'The Worker requests the Event History and determines the sequence of Commands needed to restore the current state. Based on the History, it expects to encounter ScheduleActivityTask (ImportSalesData) and then StartTimer (4 hours).',
  },
  {
    number: 6,
    title: 'The first Command matches',
    phase: REPLAY,
    kind: 'replay',
    lines: [9],
    adds: {
      commands: [
        {
          label: 'ScheduleActivityTask',
          details: '(ImportSalesData) — created during Replay',
          tone: 'command',
          status: 'matched',
        },
      ],
    },
    note: 'As the Worker executes the code during Replay, it reaches the first call to execute an Activity and creates a ScheduleActivityTask Command. It is the right type of Command and it occurs at the right position in the expected sequence, so Replay proceeds.',
  },
  {
    number: 7,
    title: 'The random number returns something different',
    phase: REPLAY,
    kind: 'replay',
    lines: [14, 15, 16],
    note: 'The Worker reaches the conditional statement again. This time the random number generator returns 14, so the expression evaluates to false and execution skips the call that starts the Timer.',
  },
  {
    number: 8,
    title: 'The next Command does not match',
    phase: REPLAY,
    kind: 'crash',
    lines: [18, 19, 20, 21, 22],
    adds: {
      commands: [
        {
          label: 'ScheduleActivityTask',
          details: '(RunDailyReport) — created during Replay',
          tone: 'command',
          status: 'mismatch',
          expected: 'StartTimer (4 hours)',
        },
      ],
    },
    note: 'The Worker reaches the request to execute the RunDailyReport Activity and creates another ScheduleActivityTask Command. That is not the Command it expected at this position in the sequence, so the Worker cannot restore the previous state.',
  },
  {
    number: 9,
    title: 'Replay fails with a non-determinism error',
    phase: REPLAY,
    kind: 'crash',
    lines: [14, 15, 16],
    note: 'The Workflow produced a different sequence of Commands during Replay than the Event History recorded before the crash, so the Workflow Execution cannot be replayed. The random number generator is the source of the non-determinism.',
  },
];
