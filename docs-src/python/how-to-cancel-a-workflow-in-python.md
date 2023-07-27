---
id: how-to-cancel-a-workflow-in-python
title: How to Cancel a Workflow Execution in Python
sidebar_label: Cancel a Workflow Execution
description: Cancel a Workflow Execution
---

To cancel a Workflow in Python, use the [cancel()](https://python.temporal.io/temporalio.client.WorkflowHandle.html#cancel) function on the Workflow Handle ID.

```python
your_workflow_id_handle.cancel()
```
