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

Use the [`start_activity()`](https://python.temporal.io/temporalio.workflow.html#start_activity) function and the Heartbeat timeout.
This is the timeout that the Worker will use to Heartbeat the Activity. `heartbeat_timeout` determines how frequently an Activity must invoke Heartbeats while running before it is considered timed out.

At least one of `start_to_close_timeout` or `schedule_to_close_timeout` must be provided.

```python
def start_activity(
    activity: "your-activity",
    schedule_to_close_timeout=timedelta(seconds=5),
    heartbeat_timeout: timedelta(seconds=5)
)
```
