---
id: cause-unhandled-update
title: Cause Unhandled Update
description: Explanation for Cause Unhandled Update error message.
sidebar_label: Cause Unhandled Update
tags:
  - errors
  - strongly-typed
---

`UnhandledUpdate` occurs when a Workflow Update is received by the server while a Workflow Task is being processed on a Worker producing a command that would cause the Workflow to transition to a closed state.

Temporal rejects the Workflow Task completion in order to guarantee that Updates are eventually seen by Workflow code and will rewind the Workflow so it can handle the pending Update.

This error can happen when the [Workflow](/concepts/what-is-a-workflow) is receiving Updates at a high frequency.
