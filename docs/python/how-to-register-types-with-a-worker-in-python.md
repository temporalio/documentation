---
id: how-to-register-types-with-a-worker-in-python
title: How to register types with a Worker in Python
sidebar_label: Register types with a Worker
description: Register types with a Worker
tags:
  - developer-guide
  - sdk
  - python
---

When a `Worker` is created, it accepts a list of Workflows and/or Activities in the `workflows` and/or `activities` parameters respectively.

```python
worker = Worker(
    client,
    task_queue="your-task-queue",
    workflows=[YourWorkflow1, YourWorkflow2],
    activities=[your_activity_1, your_activity_2],
)
```
