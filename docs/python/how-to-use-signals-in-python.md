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

Use the `@workflow.signal` decorator to define a method as a Signal.
Temporal queries should never mutate anything in the workflow

```python
@workflow.signal
async def complete_with_greeting(self) -> None:
    self._complete.set()
```

Signals are decorators that take a function and returns a function or a returns a `Signal` object.
