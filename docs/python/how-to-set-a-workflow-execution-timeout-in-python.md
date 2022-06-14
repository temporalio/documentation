---
id: how-to-set-a-workflow-execution-timeout-in-python
title: How to set a Workflow Execution timeout in Python
sidebar_label: Set a Workflow Execution timeout
description: Set a Workflow Execution timeout
tags:
  - developer-guide
  - sdk
  - python
---

When setting [`client.start_workflow`](https://python.temporal.io/temporalio.client.client#start_workflow) or [`client.execute_workflow`](https://python.temporal.io/temporalio.client.client#execute_workflow) you can provide `run_timeout` as a parameter to set the total Workflow Execution timeout, including Retries and Continue-As-New.

```python
handle = await client.start_workflow(
    "your workflow name",
    id="your-workflow-id",
    task_queue="your-task-queue",
    execution_timeout=timedelta(seconds=10),
)
```
