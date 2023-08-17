---
id: how-to-cancel-a-workflow-in-python
title: How to cancel a Workflow Execution in Python
sidebar_label: Cancel a Workflow Execution
description: To cancel a Workflow Execution in Python, use cancel() on the Workflow handle.
---

To cancel a Workflow Execution in Python, use the [cancel()](https://python.temporal.io/temporalio.client.WorkflowHandle.html#cancel) function on the Workflow handle.

```python
await client.get_workflow_handle("your_workflow_id").cancel()
```
