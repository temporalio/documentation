---
id: why-add-the-replay-test
title: Why add a Replay test?
description: The Replay test checks whether the current Workflow code (Workflow Definition) is compatible with earlier Workflow Execution's Event Histories.
sidebar_label: why-replay-test
tags:
  - go sdk
  - developer-guide-doc-type
  - event history
  - determinism
---

The Replay test is important because it verifies whether the current Workflow code (Workflow Definition) remains compatible with the Event Histories of earlier Workflow Executions.

A failed Replay test typically indicates that the Workflow code exhibits non-deterministic behavior.
In other words, for a specific input, the Workflow code can follow different code paths during each execution, resulting in distinct sequences of Events.
The Temporal Platform's ability to ensure durable execution depends on the SDK's capability to re-execute code and return to the most recent state of the Workflow Function execution.

The Replay test executes the same steps as the SDK and verifies compatibility.

Workflow code becomes non-deterministic primarily through two main avenues.

1. **Code changes:** When you change your Workflow code and deploy those changes while there are still active Workflow Executions relying on older code versions.

2. **Intrinsic non-deterministic logic:** This occurs when Workflow state or branching logic within the Workflow gets determined by factors beyond the SDK's control."
