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

You can develop an Activity Definition by using the [`@activity.defn`](https://python.temporal.io/temporalio.activity.html#defn) decorator.

```python
@activity.defn
async def your_activity(name: str) -> str:
    return f"Hello, {name}!"
```

You can register the function as an Activity with a custom name through a decorator argument. For example, `@activity.defn(name="your-activity")`.

```python
@activity.defn(name="your-activity")
async def your_activity(name: str) -> str:
    return f"Hello, {name}!"
```

**Types of Activities**

The following lists the different types of _Activity callables_:

- [Asynchronous Activities](#asynchronous-activities)
- [Synchronous Activities](#synchronous-activities)

:::note Positional arguments

Only positional arguments are supported by Activities.

:::

##### [Asynchronous Activities](#asynchronous-activities)

Asynchronous Activities (recommended) are functions using `async def`. When using asynchronous Activities there aren't any additional Worker parameters needed.

Cancellation for asynchronous activities is done by means of the
[`asyncio.Task.cancel`](https://docs.python.org/3/library/asyncio-task.html#asyncio.Task.cancel) operation. This means that `asyncio.CancelledError` will be raised (and can be caught, but it is not recommended).

An Activity must Heartbeat to receive cancellation.

##### [Synchronous Activities](#synchronous-activities)

The [`activity_executor`](https://python.temporal.io/temporalio.worker.WorkerConfig.html#activity_executor) Worker parameter must be set with a [`concurrent.futures.Executor`](https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.Executor) instance to use for executing the Activities.

Cancellation for synchronous Activities is done in the background and the Activity must choose to listen for it and react appropriately.

An Activity must Heartbeat to receive cancellation.

- ###### [Synchronous Multithreaded Activities](#synchronous-multithreaded-activities)

Multithreaded Activities are functions that use `activity_executor` set to an instance of [`concurrent.futures.ThreadPoolExecutor`](https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.ThreadPoolExecutor).

Besides `activity_executor`, no other additional Worker parameters are required for synchronous multithreaded Activities.

- ###### [Synchronous Multiprocess/Other Activities](#synchronous-multiprocess)

If `activity_executor` is set to an instance of [`concurrent.futures.Executor`](https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.Executor) that is not `concurrent.futures.ThreadPoolExecutor`, then the synchronous activities are considered multiprocess/other activities.

These require special primitives for heartbeating and cancellation. The `shared_state_manager` Worker parameter must be set to an instance of [`worker.SharedStateManager`](https://python.temporal.io/temporalio.worker.SharedStateManager.html). The most common implementation can be created by passing a [`multiprocessing.managers.SyncManager`](https://docs.python.org/3/library/multiprocessing.html#multiprocessing.managers.SyncManager) (for example, as a result of [`multiprocessing.managers.Manager()`](https://docs.python.org/3/library/multiprocessing.html#multiprocessing.Manager)) to [`worker.SharedStateManager.create_from_multiprocessing()`](https://python.temporal.io/temporalio.worker.SharedStateManager.html#create_from_multiprocessing).
