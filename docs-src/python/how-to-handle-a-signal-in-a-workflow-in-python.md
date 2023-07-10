---
id: how-to-handle-a-signal-in-a-workflow-in-python
title: How to handle a Signal in Python
sidebar_label: Handle a Signal
description: Set the Signal on the Workflow Handle.
---

Workflows listen for Signals by the Signal's name.

To send a Signal to the Workflow, use the [signal](https://python.temporal.io/temporalio.client.WorkflowHandle.html#signal) method from the [WorkflowHandle](https://python.temporal.io/temporalio.client.WorkflowHandle.html) class.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/signal_your_workflow/signal_dacx.py">View source code</a>

```python

from temporalio.client import Client
# ...
# ...
    await handle.signal(GreetingWorkflow.submit_greeting, "User 1")
```

