---
id: how-to-use-signals-in-python
title: How to use Signals in Python
sidebar_label: Use Signals
description: Use Signals
tags:
  - developer-guide
  - sdk
  - python
---

Use the [`@workflow.signal`](https://python.temporal.io/temporalio.workflow.html#signal) decorator to define a method as a Signal.

```python
@workflow.signal
async def complete_with_greeting(self) -> None:
    self._complete.set()
```

The following example demonstrates how to set a custom Signal name in the Signal decorator.

```python
@workflow.signal(name="Custom Name")
def signal_custom(self, arg: str) -> None:
    self._last_event = f"signal_custom: {arg}"
```
