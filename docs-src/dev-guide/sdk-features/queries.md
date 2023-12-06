---
id: queries
title: Queries
sidebar_label: Queries
description: A Query is a synchronous operation that is used to report the state of a Workflow Execution.
tags:
  - term
  - queries
  - explanation
---

**What is a Query?**

A Query is a synchronous operation used to get the state of a [Workflow Execution](/concepts/what-is-a-workflow-execution).

The state of a running Workflow Execution is constantly changing.
You can use Queries to expose the internal Workflow Execution state to the external world.
Queries are available for running or completed Workflows Executions only if the Worker is up and listening on the Task Queue.

<LanguageLinks>
- Go SDK
- [Feature guide](/go/queries)
- Java SDK
- [Feature guide](/java/queries)
- PHP SDK
- [Feature guide](/php/queries)
- Python SDK
- [Feature guide](/python/queries)
- TypeScript SDK
- [Feature guide](/typescript/queries)
</LanguageLinks>

Temporal Clients initiate Queries to Workflow Executions using a synchronous API call.
Each Query is recognized by a specific Query name at both ends.
To process these Queries and provide data reflecting the current state of the Workflow Execution, the Workflow must implement corresponding Query handlers.

Queries ensure strong consistency, always returning the latest state of the Workflow.
This state mirrors all confirmed Events that occurred before the Query was issued.
An Event is 'confirmed' once its creation call succeeds.
Note that Events occurring during the Query may not always be included in the Query's resulting state.

Queries can include arguments to request specific data.
Workflows can offer various types of data in response to different Queries.

Importantly, Queries must never alter the Workflow Execution's state; they are strictly read-only and should avoid any blocking code.
For instance, Query handlers cannot initiate Activity Executions.

You can still send Queries to completed Workflow Executions, though you can configure specific rejection conditions for each Query.

#### Stack Trace Query

Many Temporal SDKs offer a built-in `__stack_trace` Query.
This Query provides the stack trace of all threads within the Workflow Execution, aiding in troubleshooting production issues.
For instance, if a Workflow Execution is stuck longer than expected, sending a `__stack_trace` Query can reveal the current call stack.
This special Query does not require additional handling in your Workflow code.

Note that Stack Trace Queries are available only for running Workflow Executions.
