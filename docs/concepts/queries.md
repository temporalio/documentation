---
id: queries
title: Queries
sidebar_label: Queries
---

## Synchronous Query

Workflow state is constantly mutated during Workflow execution. To expose this internal state to the external world, Temporal provides a **Synchronous Query** feature.

From the Workflow implementer point of view the Query is exposed as a synchronous callback that is invoked by external entities. Each Workflow can expose multiple Queries.

To execute a Query an external client synchronously calls the Temporal API providing _namespace, workflowId, query name_ and optional _query arguments_.

## Limitations

- Query callbacks must be **read-only**, not mutating the Workflow state in any way.
- The query callback cannot contain any blocking code.

Both limitations rule out the ability to invoke Activities from the query handlers.

## Built In Queries

The Temporal client libraries expose some predefined queries out of the box. Currently the only supported built-in query is `_stack_trace_`. This query returns stacks of all Workflow owned threads. This is a great way to troubleshoot any Workflow in production.

### SDKs

You can learn about how to implement Queries within the context of the language you are writing your application in:

- [Go](/docs/go/queries)
- [Java](/docs/java/queries)
- [PHP](/docs/php/queries)
- [Node.js](/docs/node/queries)
