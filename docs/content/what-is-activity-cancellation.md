---
id: what-is-activity-cancellation
title: What is Activity Cancellation?
description: Workflows can request to cancel an Activity, and the Activity should then perform cleanup.
tags:
  - explanation
---

A Workflow can request to cancel an Activity.
When an Activity is canceled, or its Workflow execution has completed or failed, the context passed into its function is canceled, which also sets its channel’s closed state to `Done`.
An Activity can use that to perform any necessary cleanup and abort its execution.

Cancellation is only delivered to Activities that record heartbeats:

- The heartbeat request fails with a special error indicating that the Activity was canceled.
  Heartbeats can also fail when the Workflow that invoked it is in a completed state.
- The Activity should perform all necessary cleanup and report when it is done.
- The Workflow can decide if it wants to wait for the Activity cancellation confirmation or proceed without waiting.
