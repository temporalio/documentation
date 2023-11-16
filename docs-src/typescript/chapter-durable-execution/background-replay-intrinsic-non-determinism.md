---
id: backgroundcheck-replay-intrinsic-non-determinism
title: Intrinsic non-deterministic logic
sidebar_label: intrinsic-non-deterministic-logic
description: This kind of logic prevents the Workflow code from executing to completion because the Workflow can take a different code path than the one expected from the Event History.
tags:
- tests
- replay
- event history
---

Referred to as "intrinsic non-determinism" this kind of "bad" Workflow code can prevent the Workflow code from completing because the Workflow can take a different code path than the one expected from the Event History.

In the Temporal TypeScript SDK, certain practices and patterns must be adapted to ensure deterministic and reliable Workflow Execution:

- **Random Number Generation**:
  - `Math.random()` is overridden by a deterministic version. It uses a pseudo-random number generator seeded with a value specific to the Workflow Execution.
  - For truly random numbers not tied to the Workflow's deterministic nature, use Activities.

- **Interacting with External Systems or State**:
  - Directly accessing or mutating external systems or state, such as making API calls, performing file I/O operations, or communicating with other services, should be avoided within the Workflow.
  - Use Activities for such operations. Activities run outside the Workflow's deterministic context and can safely interact with external systems.

- **Working with System Time**:
  - `Date.now()` is overridden with a deterministic version.
    This version is set to reflect the current system time in milliseconds, as recorded at the first invocation of a Workflow Task.
    It remains constant for the entire duration of that Task and is consistent during any replays of the Workflow.
    This ensures that `Date.now()` always returns the same value within a single Workflow Task execution, providing deterministic behavior essential for reliable workflow management.
  - Use [workflow.sleep()](https://typescript.temporal.io/api/namespaces/workflow/#sleep). This ensures deterministic behavior during Workflow replays.

- **Handling Data Structures with Non-Deterministic Ordering**:
  - Avoid iterating over data structures that do not guarantee order, such as maps with unknown iteration order.
  - A recommended approach is to collect the keys, sort them, and iterate over the sorted keys for deterministic access.
  - Alternatively, use Side Effects or Activities to process such data structures. This moves the non-deterministic operations out of the Workflow's context.

Adhering to these practices ensures that Workflows in the Temporal TypeScript SDK maintain deterministic behavior, crucial for predictable and reliable execution across multiple runs.
