---
id: how-to-send-an-update-from-a-client-in-python
title: How to send an Update from a Temporal Client
sidebar_label: Send Update from Client
description: Use the execute_update method from the WorkflowHandle class to send an Update to a Workflow Execution.
tags:
- python sdk
- code sample
- workflow
- update
---

To send a Workflow Update from a Temporal Client, call the [execute_update](https://python.temporal.io/temporalio.client.WorkflowHandle.html#execute_update) method on the [WorkflowHandle](https://python.temporal.io/temporalio.client.WorkflowHandle.html) class.

```python
# ...
    update_result = await handle.execute_update(
        HelloWorldWorkflow.update_workflow_status
    )
    print(f"Update Result: {update_result}")
```
