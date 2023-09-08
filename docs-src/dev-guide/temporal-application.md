---
id: temporal-application
title: What is a Temporal Application?
sidebar_label: Temporal Application
description: A Temporal Application is a set of Workflow Executions.
tags:
  - explanation
  - temporal application
---

A Temporal Application comprises a set of [Temporal Workflow Executions](/concepts/what-is-a-workflow-execution).
Developers create Temporal Applications, or Workflows, by using an [official Temporal SDK](/dev-guide/official-sdks).

Each Temporal Workflow Execution exclusively accesses its local state, runs concurrently with all other Workflow Executions, and communicates with other Workflow Executions and the environment via message passing.

A Temporal Application can incorporate millions to billions of Workflow Executions. Workflow Executions are lightweight components, consuming few compute resources.
If a Workflow Execution suspends, such as when in a waiting state, it consumes no compute resources.

A Temporal Workflow Execution is both resumable and recoverable, and it can react to external events.

- Resumable: The ability of a process to resume execution after suspending on an _awaitable_.
- Recoverable: The ability of a process to resume execution after suspending due to a _failure_.
- Reactive: The ability of a process to respond to external events.

Hence, a Temporal Workflow Execution executes a [Temporal Workflow Definition](/concepts/what-is-a-workflow-definition), also known as a Temporal Workflow Function or your application code, exactly once and to completion, regardless of whether your code runs for seconds or years and in the presence of arbitrary load and failures.
