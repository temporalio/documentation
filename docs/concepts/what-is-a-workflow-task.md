---
id: what-is-a-workflow-task
title: What is a Workflow Task?
sidebar_label: Workflow Task
description: A Workflow Task is a Task that contains the context needed to make progress with a Workflow Execution.
tags:
  - explanation
---

A Workflow Task is a Task that contains the context needed to make progress with a Workflow Execution.

- Every time a new external event that might affect a Workflow state is recorded, a Workflow Task that contains the event is added to a Task Queue and then picked up by a Workflow Worker.
- After the new event is handled, the Workflow Task is completed with a list of [Commands](/concepts/what-is-a-command).
- Handling of a Workflow Task is usually very fast and is not related to the duration of operations that the Workflow invokes.
