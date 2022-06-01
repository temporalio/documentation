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
from temporalio import activity


@activity.defn
async def say_hello_activity(name: str) -> str:
    return f"Hello, {name}!"
```

You can register the function as an Activity with a custom name with a decorator argument. For example, `@activity.defn(name="my activity")`.

```python
@activity.defn(name="my-activity")
async def say_hello_activity(name: str) -> str:
    return f"Hello, {name}!"
```

Activities are passed as a mapping with the key as a string activity name and the value as a _callable_. Callables are functions you can call.

**Types of Activities**

There are 3 types of _Activity callables_:

- Asynchronous
- Synchronous multithreaded
- Synchronous multiprocess/other

Functions can contain two types of arguments:

- positional arguments: must be included in the correct order.
- keyword arguments: included with a keyword and equals sign.

Only positional arguments are allowed in Activity callables.

- **Asynchronous Activities**

Asynchronous Activities (recommended) are functions using `async def`. When using asynchronous
Activities there aren't any Worker parameters are needed.

Cancellation for asynchronous activities is done by means of the
[`asyncio.Task.cancel`](https://docs.python.org/3/library/asyncio-task.html#asyncio.Task.cancel) operation. This means that
`asyncio.CancelledError` will be raised (and can be caught, but it is not recommended). An Activity must Heartbeat to
receive cancellation and there are other ways to be notified about cancellation.

(see "Activity Context" and "Heartbeating and Cancellation" later).

- **Synchronous Activities**

Synchronous Activities are functions that do not have `async def`, which can be used with Workers, but the
`activity_executor` worker parameter must be set with a `concurrent.futures.Executor` instance to use for executing the
Activities.

Cancellation for synchronous Activities is done in the background and the Activity must choose to listen for it and
react appropriately. An Activity must Heartbeat to receive cancellation and there are other ways to be notified about
cancellation.

(see "Activity Context" and "Heartbeating and Cancellation" later).

- **Synchronous Multithreaded Activities**

Multithreaded Activities are functions that use `activity_executor` set to an instance of `concurrent.futures.ThreadPoolExecutor`.
Besides `activity_executor`, no other worker parameters are required for
synchronous multithreaded Activities.

- **Synchronous Multiprocess/Other Activities**

Synchronous Activities are functions that do not have `async def` and are used with Workers. The `activity_executor` Worker parameter must be set with `concurrent.futures.Executor` instance to execute the Activities.

If this is _not_ set to an instance of `concurrent.futures.ThreadPoolExecutor` then the synchronous
Activities are considered multiprocess/other activities.

These require special primitives for heartbeating and cancellation. The `shared_state_manager` worker parameter must be
set to an instance of `temporalio.worker.SharedStateManager`. The most common implementation can be created by passing a
`multiprocessing.managers.SyncManager` (i.e. result of `multiprocessing.managers.Manager()`) to
`temporalio.worker.SharedStateManager.create_from_multiprocessing()`.

All of these activity functions must be
_[picklable](https://docs.python.org/3/library/pickle.html#what-can-be-pickled-and-unpickled)_.
