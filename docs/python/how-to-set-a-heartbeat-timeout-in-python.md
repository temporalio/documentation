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

Use the `start_activity()` function and specify your the Activity option, Heartbeat timeout.
This is the timeout that the Worker will use to Heartbeat the Activity.

```python
def start_activity(
    activity: "your-activity",
    heartbeat_timeout: timedelta(seconds=5)
)
```
