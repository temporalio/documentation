---
id: how-to-set-timers-in-python
title: How to set Timers in Python
sidebar_label: Python
tags:
  - timers
  - sleep
---

To set a timer in Python, set the [`asyncio.sleep()`](https://docs.python.org/3/library/asyncio-task.html#sleeping) function and pass how many seconds you want to wait before continuing.

```python
await asyncio.sleep(5)
```
