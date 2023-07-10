---
id: how-to-set-timers-in-python
title: How to set Timers in Python
sidebar_label: Timers
description: To set a Timer in Python, call the asyncio.sleep() function and pass the duration in seconds you want to wait before continuing.
---

To set a Timer in Python, call the [`asyncio.sleep()`](https://docs.python.org/3/library/asyncio-task.html#sleeping) function and pass the duration in seconds you want to wait before continuing.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/continue_as_new/your_workflows_dacx.py">View source code</a>

```python
# ...
        await asyncio.sleep(10)
```
