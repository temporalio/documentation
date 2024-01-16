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

Referred to as "intrinsic non-determinism", this kind of "bad" Workflow code will generally prevent the Workflow code from completing because the Workflow can take a different code path than the one expected from the Event History.

Due to the Temporal TypeScript Sandbox, many common sources of non-determinism will not cause non-deterministic errors, because the Sandbox replaces non-deterministic methods with deterministic methods. However, in case you are working with other SDKs, it is still a good idea to be familiar with what some common sources of non-determinism are. This is because, as mentioned earlier, some other Temporal SDKs, such as Go and Java, do not have the sandbox feature where they can safely use non-deterministic methods and rely on the sandbox to replace non-deterministic code with deterministic versions.

Here are some common sources of non-determinism:

- **Random Number Generation**:

  - Since random numbers, by definition, are non-deterministic, you should
    avoid working with them in your Workflow if using a different SDK.
  - With the TypeScript SDK, `Math.random()` is overridden by a deterministic version. It uses a pseudo-random number generator seeded with a value specific to the Workflow Execution.
  - For truly random numbers not tied to the Workflow's deterministic nature, use Activities.

- **Interacting with External Systems or State**:

  - Directly accessing or mutating external systems or state, such as making API calls, performing file I/O operations, or communicating with other services, should be avoided within the Workflow.
  - With the TypeScript SDK, this is not the case, again due to the sandbox. The Workflow sandbox cannot import code that makes network requests or nondeterministic modules. As a result, use Activities for such operations. Activities run outside the Workflow's deterministic context and can safely interact with external systems.

- **Working with System Time**:

  - `Date.now()` is overridden with a deterministic version.
    This version is set to reflect the current system time in milliseconds, as recorded at the first invocation of a Workflow Task.
    It remains constant for the entire duration of that Task and is consistent during any replays of the Workflow.
    This ensures that `Date.now()` always returns the same value within a single Workflow Task execution, providing deterministic behavior essential for reliable workflow management.
  - Use [sleep()](https://typescript.temporal.io/api/namespaces/workflow/#sleep). This ensures deterministic behavior during Workflow replays.
  - `setTimeout` is also safe due to the TypeScript sandbox.

- **Handling Data Structures with Non-Deterministic Ordering**:
  - You must be careful when iterating over data structures. In some cases,
    such as iterating over the properties of an object using a `for in` loop,
    the order of property enumeration may not be guaranteed, potentially
    leading to inconsistentices in the execution order between different runs.

Adhering to these practices ensures that Workflows in the Temporal TypeScript SDK maintain deterministic behavior, crucial for predictable and reliable execution across multiple runs.
