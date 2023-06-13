---
id: how-to-set-timers-in-python
title: How to set Timers in Python
sidebar_label: Python
description: To set a Timer in Python, set the `asyncio.sleep()` function.
tags:
  - timers
  - sleep
---

To set a Timer in Python, call the [`asyncio.sleep()`](https://docs.python.org/3/library/asyncio-task.html#sleeping) function and pass the duration in seconds you want to wait before continuing.

```python
await asyncio.sleep(5)
```
