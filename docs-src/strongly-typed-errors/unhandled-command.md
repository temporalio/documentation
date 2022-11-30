---
id: cause-unhandled-command
title: Cause Unhandled Command
description: Explanation for unhandled command failure, and steps to fix it.
sidebar_label: Unhandled Command
tags:
  - error
---

This error indicates new available Events since the last Workflow Task started.
A RetryWorkflow Task has been scheduled to handle these new Events.

`UnhandledCommand` usually happens when the Workflow is receiving a high number of Signals.
If the Workflow doesn't have enough time to handle these Signals, the Workflow Task will fail and try to call the previous Event again.

To prevent this error, drain the Signal Channel with the ReceiveAsync function.
