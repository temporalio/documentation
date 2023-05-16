---
id: unhandled-command
title: Unhandled Command
description: Explanation for unhandled command failure, and steps to fix it.
sidebar_label: Unhandled Command
tags:
  - error
---

This error indicates new available [Events](/references/events) since the last [Workflow Task](/concepts/what-is-a-workflow-task) started.
The Workflow Task was failed because the [Workflow](/concepts/what-is-a-workflow) attempted to close itself without handling the new Events.

`UnhandledCommand` can happen when the Workflow is receiving a high number of [Signals](/concepts/what-is-a-signal).
If the Workflow doesn't have enough time to handle these Signals, a RetryWorkflow Task is scheduled to handle these new Events.

To prevent this error, drain the Signal Channel with the ReceiveAsync function.

If you continue to see this error, check your logs for failing Workflow Tasks.
The Workflow may have been picked up by a different [Worker](/concepts/what-is-a-worker).
