---
id: what-is-a-workflow-execution
title: What is a Workflow Execution?
sidebar_label: Workflow Execution
description: A Workflow Execution is a Reentrant Process; that is, a resumable, recoverable, and reactive process.
tags:
  - explanation
---

A Workflow Execution is a Reentrant Process; that is, a resumable, recoverable, and reactive process:

- Resumable: Ability of a process to continue execution after execution was suspended on an await-able.
- Recoverable: Ability of a process to continue execution after execution was suspended on a failure.
- Reactive: Ability of a process to react to external events.

A Workflow Execution has exclusive access to its local state, executes concurrently to all other Workflow Executions, and can communicate with other Workflow Executions using Signals.

A Workflow Execution is either Running or Closed.
When a Workflow Execution is Running, it is either actively progressing or suspended, awaiting on something.

![Workflow Execution Running status](/static/diagrams/workflow-execution-running-status.svg)

A Closed status means that the Workflow Execution has finished progressing, and has either Completed successfully, Continued As New, Failed, Timed Out, been Canceled, or Terminated.

![Workflow Execution statuses](/static/diagrams/workflow-execution-statuses.svg)

A Workflow Execution is uniquely identified by its [Namespace](/docs/concepts/what-is-a-namespace), [Workflow Id](/docs/concepts/what-is-a-workflow-id), and [Run Id](/docs/concepts/what-is-a-run-id).

The Workflow Id can be used to create a 1:1 mapping between a Workflow Execution and some other resource, such as a customer Id, order Id, or host Id.

**Is there a limit to how long Workflows can run?**

It's sometimes necessary to limit the amount of time that a specific Workflow can run.
Though, unlike [Activities](/docs/concepts/what-is-an-activity), Workflow timeouts are available primarily to protect the system from "runaway" Workflows that may end up consuming too many resources, and not intended to be used as a part of the business logic.
There are a few important things to consider with Workflow timeout settings:

1. When a Workflow times out, it is terminated without any notifications available to another application.
2. You should always account for possible outages, such that if your Workers go down for an hour, all of your Workflows won't time out.
   Start with infinite timeouts.
3. The SDKs come equipped with timers and sleep APIs that can be used directly inside of Workflows to handle business logic related timeouts.

Workflows intended to run indefinitely should be written with some care.
Temporal stores the complete event history for the entire lifecycle of a Workflow Execution.
There is a maximum limit of 50,000 events that is enforced by the Server, and you should try to avoid getting close to this limit; The Temporal Server puts out a warning at every 10,000 events.

The idiomatic way to handle indefinitely running Workflows is to use the "Continue-as-new" feature, which is available in all SDKs.
For example, a reasonable cutoff point might be once a day for high volume Workflows.

The "Continue-as-new" feature completes the current Workflow execution and automatically starts a new execution with the same Workflow Id, but different run Id, passing it the appropriate parameters for it to continue.
This keeps the event history within limits, but continues the logic execution.

**How can I load test Workflow Executions?**

The [Temporal stress testing blog post](https://docs.temporal.io/blog/temporal-deep-dive-stress-testing) covers many scenarios under which we test Workflow Executions.

**Implementation guides:**

- [How to spawn a Workflow Execution in Go](/docs/go/how-to-spawn-a-workflow-execution-in-go)
