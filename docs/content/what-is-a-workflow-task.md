---
id: what-is-a-workflow-task
title: What is a Workflow Task?
description: todo
---

A Workflow Task is a [Task](/docs/content/what-is-a-task) that contains the context needed to make progress with a Workflow Execution.

- Every time a new external event that might affect a [Workflow](#workflow) state is recorded, a Workflow Task that contains the event is added to a [Task Queue](#task-queue) and then picked up by a [Workflow Worker](#worker).
- After the new event is handled, the Workflow Task is completed with a list of [Commands](#command).
- Handling of a Workflow Task is usually very fast and is not related to the duration of operations that the [Workflow](#workflow) invokes.
