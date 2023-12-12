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
   - Replace `random.randint()` with `workflow.random().randint()`.
2. **External System Interaction:**
   - Avoid direct external API calls, file I/O operations, or interactions with other services.
   - Utilize Activities for these operations.
3. **Time Management:**
   -Use `workflow.now()` instead of `datetime.now()` or `workflow.time()` instead `time.time()` for current time.
   - Leverage the custom `asyncio` event loop in Workflows; use `asyncio.sleep()` as needed.
4. **Data Structure Iteration:**
   - Use Python dictionaries as they are deterministically ordered.
5. **Run Id Usage:**
   - Be cautious with storing or evaluating the run Id.

By default, Workflows are run in a [sandbox to help avoid non-deterministic code](/python/python-sandbox-environment).
If a call that is known to be non-deterministic is performed, an exception will be thrown in the Workflow which will "fail the Task" which means the Workflow will not progress until fixed.

For example, if you try to produce a non-deterministic error by using a random number inside the Workflow, you'll receive a **Restricted Workflow Access Error**.

The sandbox is not foolproof and non-determinism can still occur. You are encouraged to define Workflows in files without side effects. This practice ensures a higher level of Workflow consistency and predictability.
