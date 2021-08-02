---
id: queries
title: Queries
sidebar_label: Queries
---

## Synchronous Query

Workflow code is stateful with the Temporal framework preserving it over various software and hardware failures. The state is constantly mutated during Workflow execution. To expose this internal state to the external world Temporal provides a synchronous query feature. From the Workflow implementer's point of view, they define a synchronous callback—the _query handler_—that is invoked by external entities. Multiple such callbacks can be provided per Workflow type, exposing different information to different external systems.

To execute a query an external client calls a synchronous Temporal API providing _namespace, workflowId, query name_ and optional _query arguments_.

Query handlers must be read-only: they cannot mutate the Workflow state in any way. The other limitation is that the handler may not contain blocking code. Both of these limitations rule out ability to invoke Activities from query handlers.

## Stack Trace Query

The Temporal client libraries expose some predefined queries out of the box. Currently, the only supported built-in query is _stack_trace_, which returns stacks of all Workflow-owned threads. This is a great way to troubleshoot any Workflow in production.
