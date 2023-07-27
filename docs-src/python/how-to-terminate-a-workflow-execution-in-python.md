---
id: how-to-terminate-a-workflow-execution-in-python
title: How to terminate a Workflow Execution in Python
sidebar_label: Terminate a Workflow Execution
description: Terminate a Workflow Execution.
---

To terminate a Workflow in Python, use the [terminate()](https://python.temporal.io/temporalio.client.WorkflowHandle.html#terminate) function on the Workflow Handle ID.

```python
your_workflow_id_handle.terminate()
```
