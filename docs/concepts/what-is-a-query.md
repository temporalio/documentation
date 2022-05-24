---
id: what-is-a-query
title: What is a Query?
sidebar_label: Query
description: A Query is a synchronous operation that is used to report the state of a Workflow Execution.
tags:
  - queries
  - explanation
---

A Query is a synchronous operation that is used to get the state of a [Workflow Execution](/concepts/what-is-a-workflow-execution).
The state of a running Workflow Execution is constantly changing.
Queries are available to expose the internal Workflow Execution state to the external world.

- [How to use Queries in Go](/go/how-to-use-queries-in-go)
- [How to use Queries in Java](/java/queries)
- [How to use Queries in PHP](/php/queries)
- [How to send a Query to a Workflow Execution using tctl](/tctl/workflow/query)

Queries are sent from a Temporal Client to a Workflow Execution.
The API call is synchronous.
The Query is identified at both ends by a Query name.
The Workflow must have a Query handler that is developed to handle that Query and provide data that represents the state of the Workflow Execution.

Queries are strongly consistent and are guaranteed to return the most recent state.
This means that the data reflects the state of all confirmed Events that came in before the Query was sent.
An Event is considered confirmed if the call creating the Event returned success.
Events that are created while the Query is outstanding may or may not be reflected in the Workflow state the Query result is based on.

A Query can carry arguments to specify the data it is requesting.
And each Workflow can expose data to multiple types of Queries.

A Query must never mutate the state of the Workflow Execution—that is, Queries are _read-only_ and cannot contain any blocking code.
This means, for example, that Query handling logic cannot schedule Activity Executions.

Sending Queries to completed Workflow Executions is supported, though Query reject conditions can be configured per Query.

#### Stack Trace Query

In many SDKs, the Temporal Client exposes a predefined `__stack_trace` Query that returns the stack trace of all the threads owned by that Workflow Execution.
This is a great way to troubleshoot a Workflow Execution in production.
For example, if a Workflow Execution has been stuck at a state for longer than an expected period of time, you can send a `__stack_trace` Query to return the current call stack.
The `__stack_trace` Query name does not require special handling in your Workflow code.
