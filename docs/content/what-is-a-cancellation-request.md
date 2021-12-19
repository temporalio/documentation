---
id: what-is-a-cancellation-request
title: What is a Cancellation Request?
description: TODO
tags:
  - explanation
---

A Workflow can request to cancel an Activity.
When an Activity is cancelled, or its Workflow execution has completed or failed, the context passed into its function is cancelled, which also sets its channel’s closed state to `Done`.
An Activity can use that to perform any necessary cleanup and abort its execution.

Cancellation is only delivered to Activities that record heartbeats:

- The heartbeat request fails with a special error indicating that the Activity was cancelled.
  Heartbeats can also fail when the Workflow that invoked it is in a completed state.
- The Activity should perform all necessary cleanup and report when it is done.
- The Workflow can decide if it wants to wait for the Activity cancellation confirmation or proceed without waiting.
