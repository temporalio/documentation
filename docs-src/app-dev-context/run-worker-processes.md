---
id: run-worker-processes
title: How to run Worker Processes
description: The Worker Process is where Workflow Functions and Activity Functions are executed.
sidebar_label: Run Worker Processes
tags:
  - guide-context
---

The [Worker Process](/concepts/what-is-a-worker-process) is where Workflow Functions and Activity Functions are executed.

- Each [Worker Entity](/concepts/what-is-a-worker-entity) in the Worker Process must register the exact Workflow Types and Activity Types it may execute.
- Each Worker Entity must also associate itself with exactly one [Task Queue](/concepts/what-is-a-task-queue).
- Each Worker Entity polling the same Task Queue must be registered with the same Workflow Types and Activity Types.

A [Worker Entity](/concepts/what-is-a-worker-entity) is the component within a Worker Process that listens to a specific Task Queue.

Although multiple Worker Entities can be in a single Worker Process, a single Worker Entity Worker Process may be perfectly sufficient.
For more information, see the [Worker tuning guide](/application-development/worker-performance).

A Worker Entity contains both a Workflow Worker and an Activity Worker so that it can make progress for either a Workflow Execution or an Activity Execution.
