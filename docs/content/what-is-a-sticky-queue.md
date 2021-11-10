---
id: what-is-a-sticky-queue
title: What is a Sticky Queue?
description: A Sticky Queue is a Task Queue that has just one Worker Entity listening to it.
tags:
  - explanation
---

A Sticky Queue is a Task Queue that has just one Worker Entity listening to it.

A Sticky Queue is created by a Worker Entity after completing the first Workflow Task in the chain of Workflow Tasks for the Workflow Execution.

The Worker will have cached the Workflow Execution Event History and begin polling the Sticky Queue for Workflow Tasks that contain incremental updates, rather than the entire Event History.

If the Worker Entity does not pick up a Workflow Task from a Stick Queue in an appropriate amount of time, the Cluster will resume Scheduling Workflow Tasks on the original Task Queue.
Another Worker Entity can then resume the Workflow Execution, and can set up its own Sticky Queue for future Workflow Tasks.

- [How to set a `StickyScheduleToStartTimeout` on a Worker Entity in Go](/docs/go/how-to-set-workeroptions-in-go/#stickyscheduletostarttimeout)

Workers creating Sticky Queues is the default behavior of the Temporal Platform as it facilitates fast performance.
