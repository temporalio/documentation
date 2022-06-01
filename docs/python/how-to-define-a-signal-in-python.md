---
id: how-to-define-a-signal-in-python
title: How to define a Signal in Python
sidebar_label: Define a Signal
description: Define a Signal
tags:
  - developer-guide
  - sdk
  - python
---

To define a Signal, set the Signal decorator `@workflow.signal` on the Signal function inside of your Workflow.

```python
@workflow.signal
 async def complete_with_greeting(self) -> None:
     self._complete.set()
```

The `@workflow.signal` decorator defines a method as a Signal. Signals can be asynchronous or synchronous functions at any hierarchy depth; however, if a method is override, the override must also be decorated.
The method's arguments are also the Signal's arguments.
You can have a name parameter to customize the Signal's name, otherwise it defaults to the unqualified method name.
You can use `dynamic=True`, which means all other unhandled Signals fall through to this.

If `dynamic=True` is present, you:

- cannot have name arguments.
- method parameters must be self.
- a string Signal name.
- and a `*arg vararg `parameter.

Non-dynamic methods can only have positional arguments. Temporal suggests to take a single argument that is an
object or dataclass of fields that can be added to as needed.

Return values are ignored
