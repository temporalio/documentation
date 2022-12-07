---
id: unhandled-command
title: Unhandled Command
description: Explanation for unhandled command failure, and steps to fix it.
sidebar_label: Unhandled Command
tags:
  - error
---

This error indicates new available Events since the last Workflow Task started.
A RetryWorkflow Task has been scheduled to handle these new Events.

`UnhandledCommand` can happen when the Workflow is receiving a high number of Signals.
If the Workflow doesn't have enough time to handle these Signals, the Workflow Task will fail and try to call the previous Event again.

To prevent this error, drain the Signal Channel with the ReceiveAsync function.

If you continue to see this error, check your logs for failing Workflow Tasks.
The Workflow may have been picked up by a different Worker.

<!--TODO: get this checked. -->
