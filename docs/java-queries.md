---
id: java-queries
title: Queries in Java
sidebar_label: Queries
---

## Synchronous Query

Workflow code is stateful with the Temporal framework preserving it over various software and hardware failures. The state is constantly mutated during Workflow execution. To expose this internal state to the external world Temporal provides a synchronous query feature. From the Workflow implementer point of view the query is exposed as a synchronous callback that is invoked by external entities. Multiple such callbacks can be provided per Workflow type exposing different information to different external systems.

To execute a query an external client calls a synchronous Temporal API providing _namespace, workflowId, query name_ and optional _query arguments_.

Query callbacks must be read-only not mutating the Workflow state in any way. The other limitation is that the query callback cannot contain any blocking code. Both above limitations rule out ability to invoke Activities from the query handlers.

Temporal team is currently working on implementing _update_ feature that would be similar to query in the way it is invoked, but would support Workflow state mutation and local Activity invocations.

## Stack Trace Query

The Temporal client libraries expose some predefined queries out of the box. Currently the only supported built-in query is _stack_trace_. This query returns stacks of all Workflow owned threads. This is a great way to troubleshoot any Workflow in production.
