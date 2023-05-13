---
id: what-is-a-state-transition
title: What is a State Transition?
sidebar_label: State Transition
description: A State Transition is a unit of progress by a Workflow Execution.
tags:
  - term
  - explanation
---

A State Transition is a unit of progress made by a [Workflow Execution](/concepts/what-is-a-workflow-execution).
Each State Transition is recorded in a persistence store.

Some operations, such as [Activity Heartbeats](/concepts/what-is-an-activity-heartbeat), require only one State Transition.
Most operations require multiple State Transitions.
For example, a simple Workflow with two [Activity Tasks](/concepts/what-is-an-activity-task) (and no retries) might need as few as 11 State Transitions.
