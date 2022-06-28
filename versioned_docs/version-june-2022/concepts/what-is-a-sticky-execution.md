---
id: what-is-a-sticky-execution
title: What is a Sticky Execution?
sidebar_label: Sticky Execution
description: A Sticky Execution is a when a Worker Entity caches the Workflow Execution Event History and creates a dedicated Task Queue to listen on.
tags:
  - explanation
---

A Sticky Execution is when a Worker Entity caches the Workflow Execution Event History and creates a dedicated Task Queue to listen on.

A Sticky Execution occurs after a Worker Entity completes the first Workflow Task in the chain of Workflow Tasks for the Workflow Execution.

The Worker Entity caches the Workflow Execution Event History and begins polling the dedicated Task Queue for Workflow Tasks that contain updates, rather than the entire Event History.

If the Worker Entity does not pick up a Workflow Task from the dedicated Task Queue in an appropriate amount of time, the Cluster will resume Scheduling Workflow Tasks on the original Task Queue.
Another Worker Entity can then resume the Workflow Execution, and can set up its own Sticky Execution for future Workflow Tasks.

- [How to set a `StickyScheduleToStartTimeout` on a Worker Entity in Go](/go/how-to-set-workeroptions-in-go/#stickyscheduletostarttimeout)

Sticky Executions are the default behavior of the Temporal Platform.
