---
id: how-to-define-activity-parameters-in-python
title: How to define Activity Parameters in Python
sidebar_label: Activity Parameters
description: Activities can support many custom parameters.
tags:
  - developer-guide
  - python
---

During Activity Eecution, an implicit Activity context is set as a
[context variable](https://docs.python.org/3/library/contextvars.html). The context variable itself is not visible, but
calls in the `temporalio.activity` package make use of it. Specifically:

- `in_activity()` - Whether an activity context is present
- `info()` - Returns the immutable info of the currently running activity
- `heartbeat(*details)` - Record a heartbeat
- `is_cancelled()` - Whether a cancellation has been requested on this activity
- `wait_for_cancelled()` - `async` call to wait for cancellation request
- `wait_for_cancelled_sync(timeout)` - Synchronous blocking call to wait for cancellation request
- `is_worker_shutdown()` - Whether the worker has started graceful shutdown
- `wait_for_worker_shutdown()` - `async` call to wait for start of graceful worker shutdown
- `wait_for_worker_shutdown_sync(timeout)` - Synchronous blocking call to wait for start of graceful worker shutdown
- `raise_complete_async()` - Raise an error that this activity will be completed asynchronously (i.e. after return of
  the activity function in a separate client call)

With the exception of `in_activity()`, if any of the functions are called outside of an activity context, an error
occurs. Synchronous Activities cannot call any of the `async` functions.
