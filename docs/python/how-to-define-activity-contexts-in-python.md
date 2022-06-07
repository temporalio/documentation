---
id: how-to-define-activity-contexts-in-python
title: How to define Activity contexts in Python
sidebar_label: Activity contexts
description: Activities can support many contexts.
tags:
  - developer-guide
  - sdk
  - python
---

During Activity Execution, an implicit Activity context is set as a
[context variable](https://docs.python.org/3/library/contextvars.html). The context variable itself is not visible, but
calls in the `temporalio.activity` package make use of it. Specifically:

- `in_activity()` - Whether an Activity context is present
- `info()` - Returns the immutable info of the currently running Activity
- `heartbeat(*details)` - Record a heartbeat
- `is_cancelled()` - Whether a cancellation has been requested on this Activity
- `wait_for_cancelled()` - `async` call to wait for cancellation request
- `wait_for_cancelled_sync(timeout)` - Synchronous blocking call to wait for cancellation request
- `is_worker_shutdown()` - Whether the Worker has started graceful shutdown
- `wait_for_worker_shutdown()` - `async` call to wait for start of graceful Worker shutdown
- `wait_for_worker_shutdown_sync(timeout)` - Synchronous blocking call to wait for start of graceful worker shutdown
- `raise_complete_async()` - Raise an error that this activity will be completed asynchronously (i.e. after return of
  the activity function in a separate client call)

Except for `in_activity()`, if any of the functions are called outside an Activity context, an error
occurs. Synchronous Activities cannot call any of the `async` functions.
