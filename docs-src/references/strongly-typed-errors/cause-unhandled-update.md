---
id: cause-unhandled-update
title: Cause Unhandled Update
description: Explanation for Cause Unhandled Update error message.
sidebar_label: Cause Unhandled Update
tags:
  - errors
  - strongly-typed
---

`UnhandledUpdate` occurs when a Workflow Update is received by the Temporal Server while a Workflow Task being processed on a Worker produces a Command that would cause the Workflow to transition to a closed state.

Temporal rejects the Workflow Task completion to guarantee that the Update is eventually handled by Workflow code and rewinds the Workflow so it can handle the pending Update.

This error can happen when the [Workflow](/concepts/what-is-a-workflow) is receiving Updates at a high frequency.
