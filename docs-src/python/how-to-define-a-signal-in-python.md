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

To define a Signal, set the Signal decorator [`@workflow.signal`](https://python.temporal.io/temporalio.workflow.html#signal) on the Signal function inside your Workflow.

```python
@workflow.signal
def your_signal(self, value: str) -> None:
    self._signal = value
```

The [`@workflow.signal`](https://python.temporal.io/temporalio.workflow.html#signal) decorator defines a method as a Signal. Signals can be asynchronous or synchronous methods and can be inherited; however, if a method is overridden, the override must also be decorated.

**Dynamic Signals**

You can use `@workflow.signal(dynamic=True)`, which means all other unhandled Signals fall through to this.

Your method parameters must be `self`, a string Signal name, and a `*args` variable argument parameter.

```python
@workflow.signal(dynamic=True)
def signal_dynamic(self, name: str, *args: Any) -> None:
    self._last_event = f"signal_dynamic {name}: {args[0]}"
```

**Customize name**

Non-dynamic methods can only have positional arguments. Temporal suggests taking a single argument that is an
object or data class of fields that can be added to as needed.

Return values from Signal methods are ignored.

You can have a name parameter to customize the Signal's name, otherwise it defaults to the unqualified method `__name__`.

The following example sets a custom Signal name.

```python
@workflow.signal(name="Custom-Name")
def signal(self, arg: str) -> None:
    self._last_event = f"signal: {arg}"
```

:::note

You can either set the `name` or the `dynamic` parameter in a Signal's decorator, but not both.

:::
