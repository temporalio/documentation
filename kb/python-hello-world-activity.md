---
slug: python-hello-world-activity
title: Python Hello World Activity
tags:
  - kb-article
date: 2022-11-02T00:10:00Z
---

Welcome to a Hello World tutorial on Temporal with the Python SDK.

<!-- truncate -->

This is the first of a few Hello World tutorials with Python that focus on Temporal specific concepts.

- [Activity Retry](/kb/python-hello-world-activity-retry)
- [Query](/kb/python-hello-world-query)

By the end of this page, you should be able to connect to a Client and execute an Activity from a Workflow.

## Hello World application

We are going to build a Hello World application. This application should show `Hello World` in the terminal. We will also want to connect to a Temporal Client.

This will be a simple application, but offer a great starting point to continue to build on.

The results will look like the following.

```bash
Result: Hello, World!
```

### `hello_activity.py` example

The completed application code looks like the following.

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

### Get the code

To get started, you’ll need the Client, Temporalite, and the Python SDK.

### Temporalite

You’ll first want to start by downloading Temporalite. This is a lightweight client and not recommend for production, check out the Temporal Cloud docs to learn about running production grade applications.

```bash
git clone https://github.com/temporalio/temporalite.git
cd temporalite
go build ./cmd/temporalite
# start the Client
./temporalite start --namespace default
```

**Results**: Go to [http://127.0.0.1:8233/](http://127.0.0.1:8233/) to see the Temporal Web UI. Your Workflows will populate here as they run.

### Python SDK

Run `pip` to install the Temporal Python SDK.

```bash
python -m pip install temporalio
```

Results: You’ve successfully installed the Temporal Python SDK.

Now we will execute an Activity from a Workflow.

## Get started

The following sections get you started writing application code with Temporal by using the right import statements, writing Activity and Workflow Definitions, and invoking the Client.

## Import statements

The following section covers import statements for this particular application.

### Imports Temporal statements

To begin, we will want to import our Temporal SDK into our Python project.

```bash
from temporalio import activity, workflow
from temporalio.client import Client
from temporalio.worker import Worker
```

These import statements tell the application which libraries we are using.

The first line, contains an import for `activity` and `workflow`.
An Activity Definition is the code that defines the constraints of an [Activity Task Execution](/concepts/what-is-an-activity-task-execution), whereas A Workflow Definition is the code that defines the constraints of a Workflow Execution.

The next line contains an import for a `Client`.

A Temporal Client provides a set of APIs to communicate with a [Temporal Cluster](/clusters).
The last line of the import statement is for a `Worker`.

A Worker Program is the static code that defines the constraints of the Worker Process, developed using the APIs of a Temporal SDK.

A Worker Process is responsible for polling a [Task Queue](/concepts/what-is-a-task-queue), dequeueing a Task, executing your code in response to a Task, and responding to the Temporal Cluster with the results.

### Import Python’s standard libraries

Add the rest of our application’s import statements.

```python
import asyncio
import logging
from dataclasses import dataclass
from datetime import timedelta
```

The `asyncio` library is used to make asynchronous calls, which is important to most applications.

The `logging` library is used to log data.

The `dataclass` and `datetime` libraries are used in this application.

## Application code

The following section covers the parameters that will be sent to the Activity and Workflow.

### Data classes

While we could use multiple parameters in the Activity, Temporal strongly encourages using a single data class instead, which can have fields added to it in a backwards-compatible way.

```python
@dataclass
class ComposeGreetingInput:
    greeting: str
    name: str
```

## Temporal application code

The following sections describe aspects of application using Temporal specific features.

## Activity Definition

We mark Activity Definitions with a decorator. The following Activity logs and preforms a string concatenation.

```python
@activity.defn
async def compose_greeting(input: ComposeGreetingInput) -> str:
    activity.logger.info("Running activity with parameter %s" % input)
    return f"{input.greeting}, {input.name}!"
```

## Workflow Definition

Workflow Definition are classes and are marked with a decorator, `@workflow.defn`. The Workflow must be defined on the class given to the Worker and the Workflow Type, or Workflow name, can be customized with a `name` parameter inside the decorator.

The method invoked for the Workflow is decorated with `@workflow.run`. Exactly one method name must have this decorator and must be defined on an `async def` method. The method’s arguments are the Workflow’s arguments, which in this example takes: the Activity name, an object or data class, and a Start to Close Timeout.

```python
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
```

## Invoke the Client

### Start Client

Clients don’t have explicit close statements. The Client pass two arguments in this example, a target host and a namespace. Since we are running this locally, we use `[localhost:7233](http://localhost:7233)` which is the location that Temporalite is running on.

```python
async def main():
    client = await Client.connect("localhost:7233", namespace="default")
```

## Invoke the Worker

### Start the Worker

The Worker Program defines the `client`, `task_queue`, `workflows`, and `activities`.

A Worker Entity listens and polls on a single Task Queue. A Worker Entity contains both a Workflow Worker and an Activity Worker so that it may make progress of either a Workflow Execution or an Activity Execution.

```python
async with Worker(
        client,
        task_queue="hello-activity-task-queue",
        workflows=[GreetingWorkflow],
        activities=[compose_greeting],
    ):
```

## Invoke the Workflow

Now use the Client to run the Workflow and return its results in a `print()` function.

```python
result = await client.execute_workflow(
    GreetingWorkflow.run,
    "World",
    id="hello-activity-workflow-id",
    task_queue="hello-activity-task-queue",
)
        print(f"Result: {result}")
```

:::note

In a production set up, it is recommended to separate the Client process from the Worker.

:::

## Execute the application

Execute the application to return its results.

```python
python hello_activity.py
```

## Results

You have successfully returned the results of the Workflow, by connecting to a Client and executing an Activity from a Workflow.

```python
Result: Hello, World!
```

Go to [http://127.0.0.1:8233/](http://127.0.0.1:8233/) to see the results of the Workflow.

Here, you’ll see the Workflow ID as `hello-activity-workflow-id`, the Type as `GreetingWorkflow`, and the start and end time.

Select the Workflow ID to see more information, such as the Run ID and State Transitions.

## References

- Try out the [Hello World Activity Retry](kb/python-hello-world-activity-retry) or [Hello World Query](kb/python-hello-world-query) applications.
- Read about through the [Temporal Dev guide](/application-development/foundations).
- To see the complete example and more information, see Temporal’s [Python Hello Samples](https://github.com/temporalio/samples-python/tree/main/hello).
