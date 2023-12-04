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

The following are some common operations to be aware of inside a Workflow Definition:

1. **Random Number Generation:**
   - Replace `randint()` with `workflow.random()`.
2. **External System Interaction:**
   - Avoid direct external API calls, file I/O operations, or interactions with other services.
   - Utilize Activities for these operations.
3. **Time Management:**
   - Use `workflow.now()` instead of `time.now()` for current time.
   - Leverage the custom `asyncio` event loop in Workflows; use `asyncio.sleep()` as needed.
4. **Data Structure Iteration:**
   - For data structures with unknown ordering (like maps):
     - Avoid using `range` for iteration as it randomizes order.
     - Sort map keys before iterating for deterministic results.
     - Alternatively, use a Side Effect or an Activity for processing.
5. **Run Id Usage:**
   - Be cautious with storing or evaluating the run Id.

By default, Workflows are run in a [sandbox to help avoid non-deterministic code](/python/python-sandbox-environment).
If a call that is known to be non-deterministic is performed, an exception will be thrown in the Workflow which will "fail the Task" which means the Workflow will not progress until fixed.

For example, if you try to produce a non-deterministic error by using a random number to sleep inside the Workflow, you'll receive the following **Restricted Workflow Access Error**:

```command
temporalio.worker.workflow_sandbox._restrictions.RestrictedWorkflowAccessError:
```

The sandbox is not foolproof and non-determinism can still occur. You are encouraged to define Workflows in files without side effects. This practice ensures a higher level of Workflow consistency and predictability.
