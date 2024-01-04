---
id: how-to-skip-time-skip-manually-in-python
title: How to skip time manually in Python
sidebar_label: Skip time manually
description: To implement time skipping, use the `start_time_skipping()` static method.
tags:
  - python
  - how-to
  - time-skipping
---

To implement time skipping, use the [`start_time_skipping()`](https://python.temporal.io/temporalio.testing.WorkflowEnvironment.html#start_time_skipping) static method.

```python
from temporalio.testing import WorkflowEnvironment

async def test_manual_time_skipping():
    async with await WorkflowEnvironment.start_time_skipping() as env:
        # Your code here
        # You can use the env.sleep(seconds) method to manually advance time
        await env.sleep(3) # This will advance time by 3 seconds
        # Your code here
```
