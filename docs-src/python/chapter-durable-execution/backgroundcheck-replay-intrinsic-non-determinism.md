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

"Intrinsic non-determinism" refers to types of Workflow code that can disrupt the completion of a Workflow by diverging from the expected code path based on the Event History.
For instance, using a random number to decide which Activities to execute is a classic example of intrinsic non-deterministic code.

Luckily, for Python developers, the Python SDK employs a sort of “Sandbox” environment that either wraps many of the typical non-deterministic calls, making them safe to use, or prevents you from running the code in the first place.

Calls that are disallowed will cause a Workflow Task to fail with a "Restricted Workflow Access" error, necessitating code modification for the Workflow to proceed.

Calls such as `random.randint()` are actually caught by the SDK, so that the resulting number persists and doesn’t cause deterministic issues.

However the sandbox is not foolproof and non-deterministic issues can still occur.

Developers are encouraged to use the SDK’s APIs when possible and avoid potentially intrinsically non-deterministic code:

- **Random Number Generation:**
  - Replace `random.randint()` with `workflow.random().randint()`.
- **Time Management:**
  - Use `workflow.now()` instead of `datetime.now()` or `workflow.time()` instead `time.time()` for current time.
  - Leverage the custom `asyncio` event loop in Workflows; use `asyncio.sleep()` as needed.

Read more about “How the Python Sandbox works” for details.

Other common ways to introduce non-deterministic issues into a Workflow:

1. **External System Interaction:**
   - Avoid direct external API calls, file I/O operations, or interactions with other services.
   - Utilize Activities for these operations.
2. **Data Structure Iteration:**
   - Use Python dictionaries as they are deterministically ordered.
3. **Run Id Usage:**
   - Be cautious with storing or evaluating the run Id.
