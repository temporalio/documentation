---
id: how-to-set-a-heartbeat-timeout-in-python
title: How to set a heartbeat timeout in Python
sidebar_label: Set a heartbeat timeout
description: Set a heartbeat timeout
tags:
  - developer-guide
  - sdk
  - python
---

[`heartbeat_timeout`](https://python.temporal.io/temporalio.worker.startactivityinput#heartbeat_timeout) is a class variable for the [`start_activity()`](https://python.temporal.io/temporalio.workflow.html#start_activity) function used to set the maximum time between Activity Heartbeats.

```python
def start_activity(
    activity: "your-activity",
    schedule_to_close_timeout=timedelta(seconds=5),
    heartbeat_timeout=timedelta(seconds=5)
)
```
