---
id: what-is-a-query
title: What is a Query?
description: A Query is a synchronous operation that is used to report the state of a Workflow Execution.
---

A Query is a synchronous operation that is used to report the state of a [Workflow Execution](/docs/content/what-is-a-workflow-execution).

The state of a running Workflow Execution is constantly changing.
Queries are available to expose the internal Workflow Execution state to the external world.

- A Query is a synchronous call from a Temporal Client.
- A Query can carry arguments to specify which data it is requesting, as every Workflow can expose data to multiple types of Queries.
- A Query must never mutate the state of the Workflow Execution.
- If a Query is sent to a completed Workflow Execution, the final value is returned.
- Query handling logic is implemented as code within the Workflow.
Query handling logic must be **read-only** and cannot change the Workflow Execution state in any way, or contain any blocking code.
This means that Query handling logic can not spawn Activity Executions.

In many SDKs the Temporal Client exposes a predefined `_stack_track_` Query that returns the stack trace of all the threads owned by that Workflow Execution.
This is a great way to troubleshoot a Workflow Execution in production.

- [How to use Queries in Go](/docs/go/queries)
- [How to use Queries in Java](/docs/java/queries)
- [How to use Queries in PHP](/docs/php/queries)
