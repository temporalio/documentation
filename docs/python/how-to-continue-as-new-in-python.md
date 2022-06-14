---
id: how-to-continue-as-new-in-python
title: How to Continue-As-New in Python
sidebar_label: Continue-As-New function
description: Continue-As-New function
tags:
  - developer-guide
  - sdk
  - python
---

[`continue_as_new()`](https://python.temporal.io/temporalio.workflow.html#continue_as_new) is an async function to stop the Workflow immediately and continue the Workflow as new.

```python
async def continue_as_new(client: Client, worker: ExternalWorker):
    handle = await client.start_workflow(
        "your-workflow",
        id="your-workflow-id",
        task_queue="your-task-queue",
    )
```
