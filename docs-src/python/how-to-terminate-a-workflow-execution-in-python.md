---
id: how-to-terminate-a-workflow-execution-in-python
title: How to terminate a Workflow Execution in Python
sidebar_label: Terminate a Workflow Execution
description: To terminate a Workflow Execution in Python, use terminate() on the Workflow handle.
---

To terminate a Workflow Execution in Python, use the [terminate()](https://python.temporal.io/temporalio.client.WorkflowHandle.html#terminate) function on the Workflow handle.

```python
await client.get_workflow_handle("your_workflow_id").terminate()
```
