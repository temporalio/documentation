---
id: how-to-set-a-heartbeat-timeout-in-python
title: How to set a Heartbeat Timeout in Python
sidebar_label: Set a Heartbeat Timeout
description: Set a Heartbeat Timeout
tags:
  - developer-guide
  - sdk
  - python
---

[`heartbeat_timeout`](https://python.temporal.io/temporalio.worker.StartActivityInput.html#heartbeat_timeout) is a class variable for the [`start_activity()`](https://python.temporal.io/temporalio.workflow.html#start_activity) function used to set the maximum time between Activity Heartbeats.

```python
workflow.start_activity(
    activity="your-activity",
    schedule_to_close_timeout=timedelta(seconds=5),
    heartbeat_timeout=timedelta(seconds=1),
)
```

`execute_activity()` is a shortcut for [`start_activity()`](https://python.temporal.io/temporalio.workflow.html#start_activity) that waits on its result.

To get just the handle to wait and cancel separately, use `start_activity()`. `execute_activity()` should be used in most cases unless advanced task capabilities are needed.

```python
workflow.execute_activity(
    activity="your-activity",
    name,
    schedule_to_close_timeout=timedelta(seconds=5),
    heartbeat_timeout=timedelta(seconds=1),
)
```
