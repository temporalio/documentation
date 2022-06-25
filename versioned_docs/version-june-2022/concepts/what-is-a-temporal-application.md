---
id: what-is-a-temporal-application
title: What is a Temporal Application
sidebar_label: Temporal Application
description: A Temporal Application is a set of Workflow Executions.
tags:
  - explanation
---

A Temporal Application is a set of [Temporal Workflow Executions](/concepts/what-is-a-workflow-execution).
Each Temporal Workflow Execution has exclusive access to its local state, executes concurrently to all other Workflow Executions, and communicates with other Workflow Executions and the environment via message passing.

A Temporal Application can consist of millions to billions of Workflow Executions.
Workflow Executions are lightweight components.
A Workflow Execution consumes few compute resources; in fact, if a Workflow Execution is suspended, such as when it is in a waiting state, the Workflow Execution consumes no compute resources at all.

**Reentrant Process**

A Temporal Workflow Execution is a Reentrant Process. A Reentrant Process is resumable, recoverable, and reactive.

- Resumable: Ability of a process to continue execution after execution was suspended on an _awaitable_.
- Recoverable: Ability of a process to continue execution after execution was suspended on a _failure_.
- Reactive: Ability of a process to react to external events.

Therefore, a Temporal Workflow Execution executes a [Temporal Workflow Definition](/concepts/what-is-a-workflow-definition), also called a Temporal Workflow Function, your application code, exactly once and to completion—whether your code executes for seconds or years, in the presence of arbitrary load and arbitrary failures.
