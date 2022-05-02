---
id: what-is-a-query
title: What is a Query?
sidebar_label: Query
description: A Query is a synchronous operation that is used to report the state of a Workflow Execution.
tags:
  - queries
  - explanation
---

A Query is a synchronous operation that is used to report the state of a [Workflow Execution](/docs/concepts/what-is-a-workflow-execution).

- [How to send a Query to a Workflow Execution in Go](/docs/go/how-to-send-a-query-to-a-workflow-execution-in-go)
- [How to handle a Query in a Workflow in Go](/docs/go/how-to-handle-a-query-in-a-workflow-in-go)
- [How to use Queries in Java](/docs/java/queries)
- [How to use Queries in PHP](/docs/php/queries)
- [How to send a Query to a Workflow Execution using tctl](/docs/tctl/workflow/query)

The state of a running Workflow Execution is constantly changing.
Queries are available to expose the internal Workflow Execution state to the external world.

- A Query is a synchronous call from a Temporal Client.
- A Query can carry arguments to specify which data it is requesting, as every Workflow can expose data to multiple types of Queries.
- A Query must never mutate the state of the Workflow Execution.
- If a Query is sent to a completed Workflow Execution, the final value is returned.
- Query handling logic is implemented as code within the Workflow.
  Query handling logic must be **read-only** and cannot change the Workflow Execution state in any way, or contain any blocking code.
  This means that Query handling logic can not spawn Activity Executions.

Queries are strongly consistent and will operate with the last available state.

In many SDKs the Temporal Client exposes a predefined `_stack_trace` Query that returns the stack trace of all the threads owned by that Workflow Execution.
This is a great way to troubleshoot a Workflow Execution in production.

### Stack Trace Query

There is a built-in Query type named `__stack_trace`.
If a Workflow Execution has been stuck at a state for longer than an expected period of time, you can send a Query to return the current call stack. The `__stack_trace` Query name does not require special handling in your Workflow code.
