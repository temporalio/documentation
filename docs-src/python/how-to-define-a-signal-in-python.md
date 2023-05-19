---
id: how-to-define-a-signal-in-python
title: How to define a Signal in Python
sidebar_label: Define a Signal
description: Use the `@workflow.signal` decorator to define a Signal.
---

A Signal has a name and can have arguments.

- The name, also called a Signal type, is a string.
- The arguments must be serializable.
  To define a Signal, set the Signal decorator `@workflow.signal` on the Signal function inside your Workflow.

**Customize name**

Non-dynamic methods can only have positional arguments.
Temporal suggests taking a single argument that is an object or data class of fields that can be added to as needed.

Return values from Signal methods are ignored.

You can have a name parameter to customize the Signal's name, otherwise it defaults to the unqualified method `__name__`.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/signal_your_workflow/wf_signal_dacx.py">View source code</a>

```python
from temporalio import workflow
# ...
# ...
    @workflow.signal
    async def submit_greeting(self, name: str) -> None:
        await self._pending_greetings.put(name)

    @workflow.signal
    def exit(self) -> None:
# ...
    @workflow.signal(name="Custom Signal Name")
    async def custom_signal(self, name: str) -> None:
        await self._pending_greetings.put(name)
```
