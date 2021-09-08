---
id: what-is-a-command
title: What is an Command?
description: todo
---

Any action requested by the [Workflow](#workflow) durable function.

- Scheduling an [Activity](#activity), canceling a child [Workflow](#workflow), or starting a timer are all examples of Commands.
- A [Workflow Task](#workflow-task) contains an optional list of Commands.
- A [Worker](#worker) executing a [Workflow](#workflow) generates a list of Commands as a result of a [Workflow Task](#workflow-task). This list is sent to the Temporal service as part of the [Workflow Task](#workflow-task) completion request.
- Every Command is recorded in the [Event History](#event-history) as an [Event](#event). For example, the `StartTimer` command is recorded as a corresponding `TimerStarted` event.
