import { numbered } from './numbered';

export const NON_DETERMINISM_COLUMNS = [
  { key: 'commands', title: 'Commands created' },
  { key: 'events', title: 'Relevant History Events' },
];

const FIRST = 'First execution';
const REPLAY = 'History Replay';

/**
 * "Example of a non-deterministic Workflow" narrative, shared across SDKs.
 *
 * @param {object} sdk - `nonDeterminism` config from languages/<sdk>.js
 */
export function makeNonDeterminismSteps({ lines, activities }) {
  return numbered([
    {
      title: `The ${activities.first} Activity runs`,
      phase: FIRST,
      kind: 'command',
      lines: lines.firstActivity,
      adds: {
        commands: [{ label: 'ScheduleActivityTask', details: `(${activities.first})`, tone: 'command' }],
        events: [
          { label: 'ActivityTaskScheduled', details: `(${activities.first})`, tone: 'direct' },
          { label: 'ActivityTaskStarted', tone: 'indirect' },
          { label: 'ActivityTaskCompleted', tone: 'indirect' },
        ],
      },
      note: `As this Workflow executes step by step, the first line that results in a Command is the call to the ${activities.first} Activity. The Activity Execution succeeds, so the Temporal Service logs three Events to the Event History.`,
    },
    {
      title: 'A random number decides the next branch',
      phase: FIRST,
      kind: 'internal',
      lines: lines.conditional,
      note: 'The Worker reaches a conditional statement that evaluates a randomly generated number. The random number generator returns 84 during this execution, so the expression evaluates to true and execution continues with the next line.',
    },
    {
      title: 'The Workflow starts a 4-hour Timer',
      phase: FIRST,
      kind: 'command',
      lines: lines.timer,
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
      title: 'The Worker crashes',
      phase: FIRST,
      kind: 'crash',
      lines: lines.crash,
      note: 'The Worker crashes once it reaches the next line, so another Worker takes over. That Worker uses Replay to restore the current state before continuing execution of the lines that follow.',
    },
    {
      title: 'Replay establishes the expected Commands',
      phase: REPLAY,
      kind: 'replay',
      lines: [],
      note: `The Worker requests the Event History and determines the sequence of Commands needed to restore the current state. Based on the History, it expects to encounter ScheduleActivityTask (${activities.first}) and then StartTimer (4 hours).`,
    },
    {
      title: 'The first Command matches',
      phase: REPLAY,
      kind: 'replay',
      lines: lines.firstActivityCall,
      adds: {
        commands: [
          {
            label: 'ScheduleActivityTask',
            details: `(${activities.first}) — created during Replay`,
            tone: 'command',
            status: 'matched',
          },
        ],
      },
      note: 'As the Worker executes the code during Replay, it reaches the first call to execute an Activity and creates a ScheduleActivityTask Command. It is the right type of Command and it occurs at the right position in the expected sequence, so Replay proceeds.',
    },
    {
      title: 'The random number returns something different',
      phase: REPLAY,
      kind: 'replay',
      lines: lines.conditionalBlock,
      note: 'The Worker reaches the conditional statement again. This time the random number generator returns 14, so the expression evaluates to false and execution skips the call that starts the Timer.',
    },
    {
      title: 'The next Command does not match',
      phase: REPLAY,
      kind: 'crash',
      lines: lines.secondActivity,
      adds: {
        commands: [
          {
            label: 'ScheduleActivityTask',
            details: `(${activities.second}) — created during Replay`,
            tone: 'command',
            status: 'mismatch',
            expected: 'StartTimer (4 hours)',
          },
        ],
      },
      note: `The Worker reaches the request to execute the ${activities.second} Activity and creates another ScheduleActivityTask Command. That is not the Command it expected at this position in the sequence, so the Worker cannot restore the previous state.`,
    },
    {
      title: 'Replay fails with a non-determinism error',
      phase: REPLAY,
      kind: 'crash',
      lines: lines.conditionalBlock,
      note: 'The Workflow produced a different sequence of Commands during Replay than the Event History recorded before the crash, so the Workflow Execution cannot be replayed. The random number generator is the source of the non-determinism.',
    },
  ]);
}
