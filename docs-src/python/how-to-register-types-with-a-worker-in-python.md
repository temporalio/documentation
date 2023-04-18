---
id: how-to-register-types-with-a-worker-in-python
title: How to register types with a Worker in Python
sidebar_label: Register types with a Worker
description: Register types with a Worker.
---

When a `Worker` is created, it accepts a list of Workflows in the `workflows` parameter, a list of Activities in the `activities` parameter, or both.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/your_app/run_worker_dacx.py">View source code</a>

```python
# . . .
async def main():
    client = await Client.connect("localhost:7233")
    worker = Worker(
        client,
        task_queue="your-task-queue",
        workflows=[YourWorkflow],
        activities=[your_activity],
    )
    await worker.run()


if __name__ == "__main__":
    asyncio.run(main())
```
