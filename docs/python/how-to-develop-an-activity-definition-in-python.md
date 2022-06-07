---
id: how-to-develop-an-activity-definition-in-python
title: How to develop an Activity Definition in Python
sidebar_label: Develop an Activity Definition
description: Develop an Activity Definition
tags:
  - developer-guide
  - sdk
  - python
---

You can develop an Activity Definition by using the `@activity.defn` decorator.

```python
@activity.defn
async def say_hello_activity(name: str) -> str:
    return f"Hello, {name}!"
```

You can register the function as an Activity with a custom name with a decorator argument. For example, `@activity.defn(name="your-activity")`.

```python
@activity.defn(name="your-activity")
async def say_hello_activity(name: str) -> str:
    return f"Hello, {name}!"
```

Activities are passed as a mapping with the key as a string activity name and the value as a _callable_. Callables are functions you can call.

**Types of Activities**

There are 3 types of _Activity callables_:

- Asynchronous Activities
- Synchronous Activities
- Synchronous Multithreaded Activities

Normal function code can contain two types of arguments:

- positional arguments: must be included in the correct order.
- keyword arguments: included with a keyword and equals sign.

However, Activity callables only allow for positional arguments.

- **Asynchronous Activities**

Asynchronous Activities (recommended) are functions using `async def`. When using asynchronous
Activities there aren't any additional Worker parameters needed.

Cancellation for asynchronous activities is done by means of the
[`asyncio.Task.cancel`](https://docs.python.org/3/library/asyncio-task.html#asyncio.Task.cancel) operation. This means that
`asyncio.CancelledError` will be raised (and can be caught, but it is not recommended). An Activity must Heartbeat to
receive cancellation and there are other ways to be notified about cancellation.

<!-- Leaves reader hanging. If there are other ways, why don't we tell them where they can learn about them? Same below where you repeat this statement. -->

- **Synchronous Activities**

The [`activity_executor`](https://python.temporal.io/temporalio.worker.workerconfig#activity_exector) worker parameter must be set with a `concurrent.futures.Executor` instance to use for executing the
Activities.

Cancellation for synchronous Activities is done in the background and the Activity must choose to listen for it and
react appropriately. An Activity must Heartbeat to receive cancellation and there are other ways to be notified about
cancellation.

- **Synchronous Multithreaded Activities**

Multithreaded Activities are functions that use `activity_executor`set to an instance of `concurrent.futures.ThreadPoolExecutor`.
Besides `activity_executor`, no other additional Worker parameters are required for synchronous multithreaded Activities.

All of these activity functions must be
_[picklable](https://docs.python.org/3/library/pickle.html#what-can-be-pickled-and-unpickled)_.
