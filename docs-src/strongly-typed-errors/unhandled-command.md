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

WorkflowTaskFailed with “UnhandledCommand” cause is benign

<!-- "if an event (like signal, activity completion, child workflow completion) is received while workflow task that decides to close workflow (or calls continue as new) is executing then the workflow task result is ignored (by returning “Unhandled Command”) and the task is retried to give the workflow chance to process the new event. It works like a transactional memory that is rolled back to the state before the signal was received." And"Any event that was added to the history while the workflow task that decided to close workflow was running." > cases for unhandled command. -->
