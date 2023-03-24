---
id: how-to-send-a-signal-from-a-client-in-python
title: How to send a Signal from a Client in Python
sidebar_label: Send a Signal from a Client
description: To send a Signal to a Workflow Execution from Client code, use the signal() method on the Workflow handle.
tags:
  - developer-guide
  - sdk
  - python
---

To send a Signal from the Client, use the [signal()](https://python.temporal.io/temporalio.client.WorkflowHandle.html#signal) function on the Workflow handle.

To get the Workflow handle, you can use any of the following options.

- Use the [get_workflow_handle()](https://python.temporal.io/temporalio.client.Client.html#get_workflow_handle) method.
- Use the [get_workflow_handle_for()](https://python.temporal.io/temporalio.client.Client.html#get_workflow_handle_for) method to get a type-safe Workflow handle by its Workflow Id.
- Use the [start_workflow()](https://python.temporal.io/temporalio.client.Client.html#start_workflow) to start a Workflow and return its handle.

```python
async def your_function():
    client = await Client.connect("localhost:7233")
    handle = client.get_workflow_handle_for(
        "your-workflow-id",
    )
    await handle.signal()
```
