---
id: how-to-cancel-a-workflow-in-python
title: How to cancel a Workflow Execution in Python
sidebar_label: Cancel a Workflow Execution
description: Cancel a Workflow Execution
---

To cancel a Workflow in Python, use the [cancel()](https://python.temporal.io/temporalio.client.WorkflowHandle.html#cancel) function on the Workflow Handle ID.

```python
await client.get_workflow_handle("your_workflow_id").cancel()
```
