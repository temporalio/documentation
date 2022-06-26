---
id: what-is-a-workflow-definition
title: What is a Workflow Definition?
sidebar_label: Workflow Definition
description: A Workflow Definition is the code that defines the constraints of a Workflow Execution.
tags:
  - explanation
---

A Workflow Definition is the code that defines the constraints of a Workflow Execution.

- [How to develop a Workflow Definition](/application-development-guide/#develop-workflows)

A Workflow Definition is often also referred to as a Workflow Function.
In Temporal's documentation, a Workflow Definition refers to the source for the instance of a Workflow Execution, while a Workflow Function refers to the source for the instance of a Workflow Function Execution.

A Workflow Execution effectively executes once to completion, while a Workflow Function Execution occurs many times during the life of a Workflow Execution.

We strongly recommend that you write a Workflow Definition in a language that has a corresponding Temporal SDK.

### Deterministic constraints

A critical aspect of developing Workflow Definitions is ensuring they exhibit certain deterministic traits – that is, making sure that the same Commands are emitted in the same sequence, whenever a corresponding Workflow Function Execution (instance of the Function Definition) is re-executed.

The execution semantics of a Workflow Execution include the re-execution of a Workflow Function.
The use of Workflow APIs in the function is what generates [Commands](/concepts/what-is-a-command).
Commands tell the Cluster which Events to create and add to the Workflow Execution's Event History.
When a Workflow Function executes, the Commands that are emitted are compared with the existing Event History.
If a corresponding Event already exists within the Event History that maps to the generation of that Command in the same sequence, and some specific metadata of that Command matches with some specific metadata of the Event, then the Function Execution progresses.

For example, using an SDK's "Execute Activity" API generates the [ScheduleActivityTask](/references/commands/#scheduleactivitytask) Command.
When this API is called upon re-execution, that Command is compared with the Event that is in the same location within the sequence.
The Event in the sequence must be an [ActivityTaskScheduled](/references/events/#activitytaskscheduled) Event, where the Activity Name and the Task Queue name are the same as what is in the Command.

If a generated Command doesn't match what it needs to in the existing Event History, then the Workflow Execution returns a _non-deterministic_ error.

The following are the two reasons why a Command might be generated out of sequence or the wrong Command might be generated altogether:

1. Code changes are made to a Workflow Definition that is in use by a running Workflow Execution.
2. There is intrinsic non-deterministic logic (such as inline random branching).

### Code changes can cause non-deterministic behavior

The Workflow Definition can change in very limited ways once there is a Workflow Execution depending on it.
To alleviate non-deterministic issues that arise from code changes, we recommend using [Workflow Versioning](#workflow-versioning).

For example, let's say we have a Workflow Definition that defines the following sequence:

1. Start and wait on a Timer/sleep
2. Spawn and wait on an Activity Execution
3. Complete

We start a Worker and spawn a Workflow Execution that uses that Workflow Definition.
The Worker would emit the [StartTimer](/references/commands/#starttimer) Command and the Workflow Execution would become suspended.

Before the Timer is up, we change the Workflow Definition to the following sequence:

1. Spawn and wait on an Activity Execution
2. Start and wait on a Timer/sleep
3. Complete

When the Timer fires, the next Workflow Task will cause the Workflow Function to re-execute.
The first Command the Worker sees would be be ScheduleActivityTask Command, which wouldn't match up to the expected [TimerStarted](/references/events/#timerstarted) Event.

The Workflow Execution would fail, and return a non-deterministic error.

The following are examples of minor changes that would not result in non-determinism errors when re-executing a History which already contain the Events:

- Changing the duration of a Timer.
- Changing the arguments to:
  - The Activity Options in a call to spawn an Activity Execution (local or nonlocal).
  - The Child Workflow Options in a call to spawn a Child Workflow Execution.
  - Call to Signal an External Workflow Execution.

### Intrinsic non-deterministic logic

Intrinsic non-determinism is when a Workflow Function Execution might emit a different sequence of Commands on re-execution, regardless of whether all the input parameters are the same.

For example, a Workflow Definition can not have inline logic that branches (emits a different Command sequence) based off a local time setting or a random number.
In the representative pseudocode below, the `local_clock()` function returns the local time, rather than Temporal-defined time:

```text
fn my_workflow() {
  if local_clock().is_before("12pm") {
    await workflow.sleep(duration_until("12pm"))
  } else {
    await my_afternoon_activity()
  }
}
```

Each Temporal SDK offers APIs that enable Workflow Definitions to have logic that gets and uses time, random numbers, and data from unreliable resources.
When those APIs are used, the results are stored as part of the Event History, which means that a re-executed Workflow Function will issue the same sequence of Commands, even if there is branching involved.

In other words, all operations that do not purely mutate the Workflow Execution's state should occur through a Temporal SDK API.

### Workflow Versioning

The Workflow Versioning feature enables the creation of logical branching inside a Workflow Definition based on a developer specified version identifier.
This feature is useful for Workflow Definition logic needs to be updated, but there are running Workflow Executions that currently depends on it.
It is important to note that a practical way to handle different versions of Workflow Definitions, without using the versioning API, is to run the different versions on separate Task Queues.

- [How to version Workflow Definitions in Go](/go/versioning)
- [How to version Workflow Definitions in Java](/java/versioning)
- [How to version Workflow Definitions in TypeScript](/typescript/patching)

### Handling unreliable Worker Processes

You do not handle Worker Process failure or restarts in a Workflow Definition.

Workflow Function Executions are completely oblivious to the Worker Process in terms of failures or downtime.
The Temporal Platform ensures that the state of a Workflow Execution is recovered and progress resumes if there is an outage of either Worker Processes or the Temporal Cluster itself.
The only reason a Workflow Execution might fail is due to the code throwing an error or exception, not because of underlying infrastructure outages.
