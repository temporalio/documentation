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

The Temporal Python SDK uses the [logging](https://docs.python.org/3/library/logging.html) module.

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
        task_queue="your-task-queue",
        workflows=[SayHelloWorkflow],
        activities=[say_hello_activity],
    ):
        result = await client.execute_workflow(
            "your-workflow-name",
            "some arg",
            id="your-workflow-id",
            task_queue="your-task-queue",
        )
        print(f"Result: {result}")
```

You should use the `workflow.logger` to log a message inside a workflow. The following logs a message from the Workflow.

```python
@workflow.run
async def run(self, name: str) -> str:
    self._greeting_info.name = name
    while True:
        self._current_greeting = await workflow.execute_activity(
            create_greeting_activity,
            self._greeting_info,
            start_to_close_timeout=timedelta(seconds=5),
        )
        workflow.logger.debug("Greeting set to %s", self._current_greeting)
```

For more information on Logging, see [Logging HOWTO](https://docs.python.org/3/howto/logging.html).
