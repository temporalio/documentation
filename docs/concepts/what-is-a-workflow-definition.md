---
id: what-is-a-workflow-definition
title: What is a Workflow Definition?
sidebar_label: Workflow Definition
description: A Workflow Definition is the code that defines the constraints of a Workflow Execution.
tags:
  - explanation
---

A Workflow Definition is the code that defines the constraints of a Workflow Execution.

We strongly recommend that you write a Workflow Definition in a language that has a corresponding Temporal SDK.

- [How to develop a Workflow Definition in Go](/docs/go/how-to-develop-a-workflow-definition-in-go)
- [How to develop a Workflow Definition in Java](/docs/java/how-to-develop-a-workflow-definition-java)

**How do I handle a Worker Process failure/restart in my Workflow Definition?**

You do not.
Workflow code is completely oblivious to any Worker failures or downtime.
As soon as the Worker Process or the Temporal Cluster has recovered, the current state of the Workflow Execution is fully restored and the execution is continued.
The only reason a Workflow Execution might fail is due to the Workflow business code throwing an exception, not underlying infrastructure outages.

**Implementation guides:**


---
id: workflow-determinism
title: Workflow Determinism
sidebar_label: Workflow Determinism
description: Why workflows must be deterministic, and how you can ensure they are.
---

# Workflow Definition determinism constraints


Temporal Workflows must be deterministic. Stated using our terminology:

> For a given [Workflow Type](/docs/concepts/what-is-a-workflow-type), its [Workflow Definition](/docs/concepts/what-is-a-workflow-definition)
> (implementation) must produce the same sequence of [Commands](/docs/concepts/what-is-a-command) given the same [History](/docs/concepts/what-is-an-event-history)

Less formally, this means a Workflow must always do the same thing given the same inputs.

This requirement is important and necessary because it is how Temporal is able to ensure the state
of your workflow is not lost if, for example, the [Worker](/docs/concepts/what-is-a-worker) running
your workflow crashes.

As your Workflow is executed, Commands are generated and appended to the History of the Workflow along
with other [Events](/docs/concepts/what-is-an-event). If a Workflow's state needs to be re-created
on a new Worker, the entire History for that [Workflow Execution](/docs/concepts/what-is-a-workflow-execution)
is sent to the worker and replayed from the beginning. If the same sequence of Commands is emitted
by the Worker's implementation of the workflow as exists in the History, that is how Temporal ensures
that the Workflow Definition has recreated the same state that it would've had when executed by whatever
Worker last completed a [Workflow Task](/docs/concepts/what-is-a-workflow-task).

If this Worker's Workflow Definition were to emit a _different_ Command than the one in the History
at any given point during replay, the SDK is faced with an impossible choice. Because the implementation
has just done something different from what exists in History, the rest of that History cannot apply!
Stated differently: The code we are executing is trying to do something different from what it did
when previously executed, and therefore we are in some unknown state which can't be the same state
we should've reached

Encountering this situation causes our SDKs to emit a nondeterminism error.

## Sources of Nondeterminism

There are two reasons your Workflow could be doing something different from what was expected during
replay.

### Code changes

The Workflow implementation for a particular Workflow type can only change in a limited fashion
and remain compatible with existing histories for that type.

Any change to the Workflow code which would cause it to emit commands in a different sequence given
the same input is not a backwards compatible change, and thus cannot be deployed to the same task
queue without potentially breaking outstanding Workflow Executions.

For example, if you have a Workflow which does the following:

```text
1. Start a timer/sleep
2. Start and wait on an activity
3. Complete
```

Which you then change to:

```text
1. Start and wait on an activity
2. Start a timer/sleep
3. Complete
```

If you then deploy a Worker with that new implementation, if there are any incomplete workflows
they may be picked up by the Worker, and they will fail with nondeterminism errors.

The reason to fail in this situation is to ensure that your Workflows reach a consistent state
given the same history. Ensuring the same command sequence is Temporal's best way to do so. We
cannot actually compare state, as that would require snapshotting memory at the end of every Workflow
Task, which is impractical for a number of reasons.

You can in fact make changes to workflow code which will result in different internal state
(different variable values, etc) without necessarily breaking determinism. However, if you were to
change the order or type of commands based on that state, then determinism would again be broken. In
effect, such "internal-only" changes produce no externally-visible difference
([Queries](/docs/concepts/what-is-a-query) aside), and are thus acceptable (though not
recommended without good reason).

Additionally, we make some practical allowances that permit some minor changes.
You may, without breaking determinism:

- Change the duration of a timer
- Change the arguments to:
  - Activity (local or nonlocal)
  - Child workflow
  - Signal to external workflow

Such changes will not take effect if replaying a History which already contains those Commands, but
Workflows who are the first to reach the code emitting them will emit them with the new values.

In order to make changes safely, you can deploy new versions of Workflows to new Task Queues, or
you can use the appropriate versioning API for your chosen language. See help for:

- [TypeScript](/docs/typescript/patching)
- [Java](/docs/java/versioning)
- [Go](/docs/go/versioning)

### Intrinsic

Intrinsic nondeterminism is when a Workflow, without any code change, does different things when
executed with the same input.

An obvious example is branching based on a random number (using a Temporal SDK's randomness
API is fine, since the randomness is deterministic as a function of the workflow's [Run Id](/docs/concepts/what-is-a-run-id)).

A perhaps slightly less obvious example would be branching based on wall-clock time. For example
(pseudocode):

```text
fn my_workflow() {
    if system_clock().is_before("12pm") {
        await workflow.sleep(duration_until("12pm"))
    } else {
        await my_afternoon_activity()
    }
}
```

Here, `system_clock()` is a function returning wall clock time, rather than Workflow-defined time.
If you do this, a Workflow which executed before 12pm will have produced a different sequence of
Commands than that same Workflow replayed at 1pm. Some language SDKs (just TypeScript for now) will
prevent you from even importing/using disallowed APIs. In others, you must use Temporal-provided
alternatives. For example, the right method to use in Java would be `Workflow.currentTimeMillis()`.

Generally speaking, any function which performs side effects should not be called from workflow code.
All operations that do not purely mutate Workflow state should occur through Temporal SDK APIs. This
ensures that your Workflow will always reach the same state with the same history.
