To add a Signal to a Workflow, call `defineSignal()` with a name, and then attach a listener with `setHandler()`.

- Handlers for take arguments, which can be used inside `setHandler()` logic.
- Signal handlers can mutate state, Signal handlers cannot return valeus.

#### Declare your Signal as constancts outside the Workflow Definition.

```typescript
import * as wf from '@temporalio/workflow';

export const unblockSignal = wf.defineSignal('unblock');
  let isBlocked = true;
  wf.setHandler(unblockSignal, () => void (isBlocked = false));
  console.log('Blocked');
  try {
    await wf.condition(() => !isBlocked);
    console.log('Unblocked');
  } catch (err) {
    if (err instanceof wf.CancelledFailure) {
      console.log('Cancelled');
    }
    throw err;
  }
}
```

This code defines a Signal as _unblock_ and declares the variable as _isBlocked_ as true. Then the code tries to execute the condition and print _Unblocked_ to the conosle if it becomes unblocked. Finally, the code catches any errors, and if the error is `CacelledFailure`, then it prints `Cacnelled` to the console.

This helps provide type safety, since you can export the type signature of the signal or query to be called on the clientside.

##### Declare your Signals dynamically

For more flexible usecases, you may want a dynamic Signal, sucha as a generated ID. You may handle it in two ways:

- avoid making it dynamic by collapsing all signals in one handler and move the ID to the payload.
- actually make the signal name dynamic by inlining the signal definition per handler.

```typescript
import * as wf from '@temporalio/workflow';

wf.setHandler(`genericSignal`, (payload) => {
  switch (payload.taskId) {
    case taskAId:
      // do task A things
      break;
    case taskBId:
      // do task B things
      break;
    default:
      throw new Error('Unexpected task.');
  }
});

// "inline definition" solution
wf.setHandler(wf.defineSignal(`task-${taskAId}`), (payload) => {
  /* do task A things */
});
wf.setHandler(wf.defineSignal(`task-${taskBId}`), (payload) => {
  /* do task B things */
});

// utility "inline definition" helper
const inlineSignal = (signalName, handler) =>
  wf.setHandler(wf.defineSignal(signalName), handler);
inlineSignal(`task-${taskBId}`, (payload) => {
  /* do task B things */
});
```

:::note

The semantic of `defineSignal()` and `defineQuery()` is intentional, in that they return Signal/Query Definitions, not unique instances of Signals and Queries themselves.
Signals and Queries are only instantiated in `setHandler()` and are specific to a particular Workflow Execution.

These distinctions may seem minor, but they model how Temporal works under the hood, because Signals and Queries are messages identified by _just strings_ and don't have meaning independent of the Workflow having a listener to handle them.

We named it `setHandler` instead of `subscribe` because Signals and Queries can only have one handler at a time, whereas `subscribe` could imply an observable with multiple consumers, and is a higher level construct.
:::

#### Start a Signal from the Client

Sending Signals requires a Workflow handle from a Temporal Client.

- You send a Signal with `handle.signal(signal, ...args)`. A Signal has no return value by definition.
- You can refer to a Signal by string name, which is useful for dynamic reference, but you will lose type inference

The following code is from inside the Client code.

```typescript
import { increment, count } from './workflow';

// init client code omitted - see Client docs
const handle = client.getHandle(workflowId);

// these three are equivalent
await handle.signal(increment, 1);
await handle.signal<[number]>('increment', 1);
await client.getHandle(workflowId).signal(increment, 1);
```
