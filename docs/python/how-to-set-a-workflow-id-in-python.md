---
id: how-to-set-a-workflow-id-in-python
title: How to set a Workflow Id in Python
sidebar_label: Set a Workflow Id
description: Set a Workflow Id
tags:
  - developer-guide
  - sdk
  - python
---

To set a Workflow Id in Python, specify the `id` argument when executing a Workflow.

```python
result = await client.execute_workflow(
    SayHello.run, "my name", id="my-workflow-id", task_queue="my-task-queue"
)
```
