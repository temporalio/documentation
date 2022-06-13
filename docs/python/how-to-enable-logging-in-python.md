---
id: how-to-enable-logging-in-python
title: How to enable an logging in Python
sidebar_label: Enable logging
description: Enable logging
tags:
  - developer-guide
  - sdk
  - python
---

The Temporal Python SDK uses the [Logging](https://docs.python.org/3/library/logging.html) package.

Logging provides a set of convenience functions for simple logging usage including:

- `debug()`
- `info()`
- `warning()`
- `error()`
- `critical()`

The following example sets the logging level to `INFO`.

```python
async def main():
    logging.basicConfig(level=logging.INFO)

    client = await Client.connect("http://localhost:7233")
    async with Worker(
        client,
        task_queue="my-task-queue",
        workflows=[SayHelloWorkflow],
        activities=[say_hello_activity],
    ):
        result = await client.execute_workflow(
            SayHelloWorkflow.run,
            "Temporal",
            id="my-workflow-id",
            task_queue="my-task-queue",
        )
        print(f"Result: {result}")
```

For more information on Logging, see [Logging HOWTO](https://docs.python.org/3/howto/logging.html).
