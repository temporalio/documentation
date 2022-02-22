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
- [How to develop a Workflow Definition in Java](/docs/java/how-to-develop-a-workflow-definition-in-java)

### Deterministic constraints

A very important aspect of developing Workflow Definitions is making sure that the same Commands are emitted in the same order whenever a corresponding Workflow Execution (instance of the Definition) is re-executed.

The execution semantics of a Workflow Execution include the re-execution of a Workflow function.
The use of Workflow APIs in the function generates the Commands.
Commands tell the Cluster what Events to create and add to the Workflow Execution's Event History.
Whenever a Workflow function is executed, the Commands that are emitted are compared with the existing Event History.
If a corresponding Event already exists within the Event History that maps to the generation of that Command in the same sequence, and some specific metadata of that Command matches with some specific metadata of the Event, then that Command is ignored.

For example, using an SDKs "Execute Activity" API generates the [ScheduleActivityTask](/docs/concepts/what-is-a-command#scheduleactivitytask) Command.
When this API is called upon re-execution, that Command is compared with the Event that is in the same location within the sequence.
The Event in the sequence must be an [ActivityTaskScheduled](/docs/concepts/what-is-an-event/#activitytaskscheduled) Event, where the Activity Name and the Task Queue name are the same as what is in the Command.

If a Command is generated that doesn't match what it needs to in the existing Event History, then the Workflow Execution will return a "non-deterministic" error.

The following are the two reasons why a Command might be generated out of sequence or the wrong Command might be generated altogether:

1. Code changes are made to a Workflow Definition that is in use by a running Workflow Execution.
2. There is intrinsic non-deterministic logic (i.e. inline random branching logic).

#### Non-deterministic code changes

The Workflow Definition can change in very limited ways once there is a Workflow Execution depending on it.
To alleviate non-deterministic issues that arise from code changes we recommend using [Workflow Versioning](#what-is-workflow-versioning).

For example, let's say we have a Workflow Definition that defines the following sequence:

1. Start and wait on a Timer/sleep
2. Spawn and wait on an Activity Execution
3. Complete

We start a Worker and spawn a Workflow Execution that uses that Workflow Definition.
The Worker would emit the [StartTimer](/docs/concepts/what-is-a-command/#starttimer) Command and the Workflow Execution would become suspended.

Before the Timer is up, we change the Workflow Definition the following sequence:

1. Spawn and wait on an Activity Execcution
2. Start and wait on a timer/sleep
3. Complete

When the Timer fires, the next Workflow Task will cause the Workflow function to re-execute.
The first Command it sees would be be ScheduleActivityTask, which wouldn't match up to the expected ActivityTaskScheduled Event.

The Workflow Execution would fail, and return the non-determinism error.

There following are examples of some minor changes that would not take effect when re-executing a History which already contain the Events:

- Changing the duration of a Timer.
- Changing the arguments to:
  - Call to spawn an Activity Execution (local or nonlocal).
  - Call to spawn a Child Workflow Execution.
  - Call to Signal an External Workflow Execution.

#### Intrinsic non-deterministic logic

Intrinsic non-determinism is when a Workflow function might emit a different of Commands each on re-execution regardless of whether all the input parameters are the same.

For example, a Workflow Definition can not have inline logic that branches (emits a different Command sequence) based off a wall-clock or a random number.
Here is some representative pseudocode:

```text
fn my_workflow() {
  if system_clock().is_before("12pm") {
    await workflow.sleep(duration_until("12pm"))
  } else {
    await my_afternoon_activity()
  }
}
```

Each SDK offers APIs that enable Workflow Definitions to have logic that gets and uses time, random numbers, and data from unreliable resources.
When those APIs are used, the results are stored as part of the Event History, which means that a re-executed Workflow function will issue the same sequence of Commands, even if there is branching involved.

In other words, all operations that do not purely mutate the Workflow Execution's state should occur via a Temporal SDK API.

### What is Workflow Versioning?

Workflow Versioning is the feature that enables the creation of logical branching inside a Workflow Definition based on a developer specified version identifier.
The feature is intended to be used when a Workflow Definition logic needs to be updated, but there are running Workflow Executions that currently depend on it.

- [How to version Workflow Definitions in Go](/docs/go/versioning)
- [How to version Workflow Definitions in Java](/docs/java/versioning)
- [How to version Workflow Definitions in TypeScript](/docs/typescript/patching)

**How do I handle a Worker Process failure/restart in my Workflow Definition?**

You do not.
Workflow code is completely oblivious to any Worker failures or downtime.
As soon as the Worker Process or the Temporal Cluster has recovered, the current state of the Workflow Execution is fully restored and the execution is continued.
The only reason a Workflow Execution might fail is due to the Workflow business code throwing an exception, not underlying infrastructure outages.
