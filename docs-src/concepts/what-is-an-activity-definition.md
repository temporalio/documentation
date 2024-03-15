---
id: what-is-an-activity-definition
title: What is an Activity Definition?
sidebar_label: Activity Definition
description: An Activity Definition is the code that defines the constraints of an Activity Task Execution.
tags:
  - term
  - explanation
---

An Activity Definition is the code that defines the constraints of an [Activity Task Execution](/concepts/what-is-an-activity-task-execution).

- [How to develop an Activity Definition using the Go SDK](/go/generated/how-to-develop-an-activity-definition-in-go)
- [How to develop an Activity Definition using the Java SDK](/java/developing-activities)
- [How to develop an Activity Definition using the PHP SDK](/php/developing-activities)
- [How to develop an Activity Definition using the Python SDK](/python/developing-activities)
- [How to develop an Activity Definition using the TypeScript SDK](/typescript/developing-activities)

The term 'Activity Definition' is used to refer to the full set of primitives in any given language SDK that provides an access point to an Activity Function Definition——the method or function that is invoked for an [Activity Task Execution](/concepts/what-is-an-activity-task-execution).
Therefore, the terms Activity Function and Activity Method refer to the source of an instance of an execution.

Activity Definitions are named and referenced in code by their [Activity Type](/concepts/what-is-an-activity-type).

![Activity Definition](/diagrams/activity-definition.svg)

#### Idempotency

Temporal recommends that Activities be idempotent.

Idempotent means that performing an operation multiple times has the same result as performing it once.
In the context of Temporal, Activities should be designed to be safely executed multiple times without causing unexpected or undesired side effects.

:::info

By design, completed Activities will not re-execute as part of a [Workflow Replay](/workflows#replays). However, Activities won’t record to the [Event History](/retry-policies#event-history) until they return or produce an error. If an Activity fails to report to the server at all, it will be retried. Designing for idempotence, especially if you have a [Global Namespace](/namespaces#global-namespace), will improve reusability and reliability.

:::

An Activity is idempotent if multiple [Activity Task Executions](/concepts/what-is-an-activity-task-execution) do not change the state of the system beyond the first Activity Task Execution.

We recommend using idempotency keys for critical side effects.

The lack of idempotency might affect the correctness of your application but does not affect the Temporal Platform.
In other words, lack of idempotency doesn't lead to a platform error.

In some cases, whether something is idempotent doesn't affect the correctness of an application.
For example, if you have a monotonically incrementing counter, you might not care that retries increment the counter because you don’t care about the actual value, only that the current value is greater than a previous value.

For more information about idempotency in Temporal, see the following post:

[Idempotency and Durable Execution](https://temporal.io/blog/idempotency-and-durable-execution)

#### Constraints

Activity Definitions are executed as normal functions.

In the event of failure, the function begins at its initial state when retried (except when Activity Heartbeats are established).

Therefore, an Activity Definition has no restrictions on the code it contains.

#### Parameters

An Activity Definition can support as many parameters as needed.

All values passed through these parameters are recorded in the [Event History](/concepts/what-is-an-event-history) of the Workflow Execution.
Return values are also captured in the Event History for the calling Workflow Execution.

Activity Definitions must contain the following parameters:

- Context: an optional parameter that provides Activity context within multiple APIs.
- Heartbeat: a notification from the Worker to the Temporal Cluster that the Activity Execution is progressing. Cancelations are allowed only if the Activity Definition permits Heartbeating.
- Timeouts: intervals that control the execution and retrying of Activity Task Executions.

Other parameters, such as [Retry Policies](/concepts/what-is-a-retry-policy) and return values, can be seen in the implementation guides, listed in the next section.
