---
id: non-deterministic-branching-logic
title: Non-deterministic branching logic
description: History Replay, sometimes also called Workflow Replay, is the mechanism that Temporal uses to reconstruct the state of a Workflow Execution. Temporal provides Durable Execution via this Replay Functionality.
sidebar_label: Durability through Replays
tags:
  - typescript sdk
  - developer-guide-doc-type
  - event history
  - replay
  - durable execution
---

Also referred to as "intrinsic non-determinism", writing bad branching logic in Workflow code prevents the Workflow code from executing to completion because the Workflow can have a different code path than the one expected from the Event History.

### Common sources of non-determinism

- Using Random numbers
- Accessing / Mutating External Systems or State (do this in Activities, not Workflows)
- Relying on System Time (use [Date.now()](https://typescript.temporal.io/api/interfaces/workflow.UnsafeWorkflowInfo#now) instead)
- Iterating over Data Structures with Unknown Ordering
- Storing or Evaluating the [Run ID](https://docs.temporal.io/workflows#run-id)

### Wrapped Language Primitives

In the Temporal TypeScript SDK, certain standard functions are replaced by deterministic versions to ensure the predictability and repeatability of Workflows. This includes functions like `Math.random()`, `Date`, and `setTimeout()`.

- **Deterministic `Math.random()`**: This function is overridden by a pseudo-random number generator, seeded with a value that is deterministic in relation to the Workflow Execution. This ensures the same sequence of "random" numbers is generated each time the Workflow is executed.

- **Deterministic `Date.now`**: Instead of the standard JavaScript `Date.now()`, which returns the current timestamp, Temporal provides a deterministic version. This function returns the historical start time of the current Workflow task, ensuring consistency across Workflow replays.

- **Deterministic `setTimeout`**: The traditional `setTimeout()` function is replaced with a custom implementation in Temporal. This version behaves similarly to the standard function but leverages `sleep()` internally. This allows for predictable and controllable behavior within the Workflow context, aligning with Temporal's deterministic execution model.

Using these deterministic versions of standard JavaScript functions ensures that Temporal Workflows remain consistent and repeatable across different executions, which is crucial for reliable workflow management.
