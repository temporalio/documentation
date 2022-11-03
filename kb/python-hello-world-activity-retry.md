---
slug: python-hello-world-activity-retry
title: Python Hello World Activity Retry
tags:
  - kb-article
date: 2022-11-02T00:09:00Z
---

The following demonstrates an Activity Retry by failing 4 attempts before a successful completion.

<!-- truncate -->

## Hello Retry application

We are going to build a Hello World application that retries a failed Activity. This application is built off of the [`Hello World` application](/kb/python-hello-world-activity).

This will be a simple application, but offer a great starting point to continue to build on.

The results will look like the following.

```bash
RuntimeError: Intentional failure
Invoking activity, attempt number 4
Result: Hello, World!
```

## Prerequisites

To follow this tutorial, it is recommended to test out the [`Hello World` application](/kb/python-hello-world-activity) in Python first.

### `hello_activity.py` example

The completed `Hello World` application will be used as a starting point for the Activity Retry.

You can use the following template to follow along.

<details>
    <summary>Expand</summary>

```python
# hello_activity.py
import asyncio
import logging
from dataclasses import dataclass
from datetime import timedelta

from temporalio import activity, workflow
from temporalio.client import Client
from temporalio.worker import Worker


@dataclass
class ComposeGreetingInput:
    greeting: str
    name: str


@activity.defn
async def compose_greeting(input: ComposeGreetingInput) -> str:
    activity.logger.info("Running activity with parameter %s" % input)
    return f"{input.greeting}, {input.name}!"


@workflow.defn
class GreetingWorkflow:
    @workflow.run
    async def run(self, name: str) -> str:
        workflow.logger.info("Running workflow with parameter %s" % name)
        return await workflow.execute_activity(
            compose_greeting,
            ComposeGreetingInput("Hello", name),
            start_to_close_timeout=timedelta(seconds=10),
        )


async def main():
    client = await Client.connect("localhost:7233")

    async with Worker(
        client,
        task_queue="hello-activity-task-queue",
        workflows=[GreetingWorkflow],
        activities=[compose_greeting],
    ):

        result = await client.execute_workflow(
            GreetingWorkflow.run,
            "World",
            id="hello-activity-workflow-id",
            task_queue="hello-activity-task-queue",
        )
        print(f"Result: {result}")


if __name__ == "__main__":
    asyncio.run(main())
```

</details>

In our Activity Definition, raise an error if the attempt number is less than 4. If the attempt number is greater than 4, return its results.

```python
@activity.defn
if activity.info().attempt < 4:
        raise RuntimeError("Intentional failure")
    return f"{input.greeting}, {input.name}!"
```

## Execute the application

Execute the application to return its results.

```python
python hello_activity.py
```

## Results

You should see a run time error.

```bash
RuntimeError: Intentional failure
```

Then after a few seconds, the terminal will update with a success message.

```bash
Invoking activity, attempt number 4
Result: Hello, World!
```

Go to [http://127.0.0.1:8233/](http://127.0.0.1:8233/namespaces/default/workflows) to see the results of the Workflow.

Here, you’ll see the Workflow ID as `hello-activity-workflow-id`, the Type as `GreetingWorkflow`, and the start and end time.

Select the Workflow ID to see more information. The **Recent Events** page displays the failed attempts and the successful returned results.

## References

- Try out the [Hello World](kb/python-hello-world-activity) application.
- Learn how to [Query a Workflow](/kb/python-hell-world-query).
- Read about through the [Temporal Dev guide](/application-development/foundations).
- To see the complete example and more information, see Temporal’s [Python Hello Samples](https://github.com/temporalio/samples-python/tree/main/hello).
