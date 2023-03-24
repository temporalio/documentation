---
id: how-to-develop-a-worker-program-in-python
title: How to develop a Worker Program in Python
sidebar_label: Worker Program
description: Create a new instance of a Worker.
---

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/dacx-poc/your_app/run_worker_dacx.py">View source code</a>

```py
worker = Worker(
    client,
    task_queue="my-task-queue",
    workflows=[YourWorkflow],
    activities=[your_activity],
)
await worker.run()
```
