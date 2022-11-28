---
slug: python-hello-world-query
title: Python Hello World Query Workflow
tags:
  - kb-article
date: 2022-11-02T00:00:03Z
---

The following article demonstrates how to invoke a Query on a Workflow.

<!-- truncate -->

## Hello Retry application

We are going to build a Hello World application that invokes a Query on a Workflow.
This application is based on the [`Hello World` application](/kb/python-hello-world-activity).

This is a simple application, but it offers a great starting point to build on.

The results will look like the following.

```bash
First greeting result: Hello, World!
Second greeting result: Goodbye, World!
```

## Prerequisites

To follow this tutorial, we recommend that you first test the [Hello World application](/kb/python-hello-world-activity) in Python.

### `hello_query.py` example

The following template is the completed version of the Query Workflow application

<details>
    <summary>Expand</summary>

```python
# hello_query.py
import asyncio

from temporalio import workflow
from temporalio.client import Client
from temporalio.worker import Worker


@workflow.defn
class GreetingWorkflow:
    def __init__(self) -> None:
        self._greeting = "<no greeting>"

    @workflow.run
    async def run(self, name: str) -> None:
        # Set the greeting, wait a couple of seconds, then change it
        self._greeting = f"Hello, {name}!"
        await asyncio.sleep(2)
        self._greeting = f"Goodbye, {name}!"

    @workflow.query
    def greeting(self) -> str:
        return self._greeting


async def main():
    client = await Client.connect("localhost:7233")
    async with Worker(
        client,
        task_queue="hello-query-task-queue",
        workflows=[GreetingWorkflow],
    ):

        handle = await client.start_workflow(
            GreetingWorkflow.run,
            "World",
            id="hello-query-workflow-id",
            task_queue="hello-query-task-queue",
        )

        result = await handle.query(GreetingWorkflow.greeting)
        print(f"First greeting result: {result}")

        await asyncio.sleep(3)
        result = await handle.query(GreetingWorkflow.greeting)
        print(f"Second greeting result: {result}")


if __name__ == "__main__":
    asyncio.run(main())
```

</details>

## Get started

The following sections build on the knowledge from the previous Hello World applications.

## Import statements

To begin, we want to import the Temporal SDK into our Python project with the `asyncio` library.

```python
import asyncio

from temporalio import workflow
from temporalio.client import Client
from temporalio.worker import Worker
```

## Application code

The following section covers the parameters that are sent to the Activity and Workflow.

### Workflow Definition

Use `@workflow.run` to mark the following class as a Workflow Definition.

```python
@workflow.defn
```

Then create an initializer class as `GreetingWorkflow` and set the greeting to `<no greeting>`.

```python
class GreetingWorkflow:`
    def __init__(self) -> None:
        self._greeting = "<no greeting>"
```

Set the Workflow invocation decorator `@workflow.run` and set the greetings.

```python
@workflow.run
async def run(self, name: str) -> None:
    self._greeting = f"Hello, {name}!"
    await asyncio.sleep(2)
    self._greeting = f"Goodbye, {name}!"
```

Inside the Workflow, set a Query that can be invoked on the Workflow.

A Query is marked with a `@workflow.query` decorator.
The `@workflow.query` decorator defines a method as a Query and should return a value.
A Query should never mutate anything in the Workflow.

```python
@workflow.query
def greeting(self) -> str:
    return self._greeting
```

### main()

The following code snippet is similar to what we have used before.
Add it to your application code.

<details>
    <summary>async def main():</summary>

While the Worker is running, use the Client to start the Workflow.

```python
async def main():
    # Start client
    client = await Client.connect("localhost:7233", namespace="default")
    async with Worker(
        client,
        task_queue="hello-query-task-queue",
        workflows=[GreetingWorkflow],
    ):
        handle = await client.start_workflow(
            GreetingWorkflow.run,
            "World",
            id="hello-query-workflow-id",
            task_queue="hello-query-task-queue",
        )
```

:::note

In a production setup, we recommend that you separate the Client process from the Worker.

:::

</details>

### Query the Workflow

Immediately query the Workflow.

```python
result = await handle.query(GreetingWorkflow.greeting)
print(f"First greeting result: {result}")
```

Then, wait a few seconds to query the Workflow again.
The Query works even if the Workflow is completed.

```python
await asyncio.sleep(3)
result = await handle.query(GreetingWorkflow.greeting)
print(f"Second greeting result: {result}")
```

## Execute the application

Execute the application to return its results.

```python
python hello_query.py
```

## Results

You should see two greetings in the terminal

```bash
First greeting result: Hello, Patrick!
Second greeting result: Goodbye, Patrick!
```

Go to [http://127.0.0.1:8233/](http://127.0.0.1:8233/namespaces/default/workflows) to see the results of the Workflow.

Here, you’ll see the Workflow Id as `hello-query-workflow-id`, the Type as `GreetingWorkflow`, and the start and end times.

Select the Workflow Id to see more information.
Click the **Input and Results** section to see the Query that was invoked on the Workflow.

## References

- Try out the [Hello World](kb/python-hello-world-activity) application.
- Learn about [Activity Retires](/kb/python-hello-world-activity-retry)
- Read the [Temporal Dev guide](/application-development/foundations).
- To see the complete example and more information, see Temporal’s [Python Hello Samples](https://github.com/temporalio/samples-python/tree/main/hello).
