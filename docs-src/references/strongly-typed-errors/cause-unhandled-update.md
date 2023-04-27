---
id: cause-unhandled-update
title: Cause Unhandled Update
description: Explanation for Cause Unhandled Update error message, and how to fix it.
sidebar_label: Cause Unhandled Update
tags:
  - errors
  - strongly-typed
---

`UnhandledUpdate` occurs when the [Workflow Execution](/concepts/what-is-a-workflow-execution) attempts to close itself before handling pending updates.

This error can happen when the [Workflow](/concepts/what-is-a-workflow) is receiving a high number of [Signals](/application-development/features/#signals).
Drain the Signal Channel with the `ReceiveAsync` function to prevent or resolve this error.

If this error persists, the Workflow may be on a different [Worker](/concepts/what-is-a-worker) than the one with the pending updates.
Check your logs for failing [Workflow Tasks](/tasks/#workflow-task).
