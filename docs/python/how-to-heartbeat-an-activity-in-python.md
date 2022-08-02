---
id: how-to-heartbeat-an-activity-in-python
title: How to heartbeat an Activity in Python
sidebar_label: Heartbeat an Activity
description: Heartbeat an Activity
tags:
  - developer-guide
  - sdk
  - python
---

To Heartbeat an Activity Execution in Python, use the [`heartbeat()`](https://python.temporal.io/temporalio.activity.html#heartbeat) API.

```python
@activity.defn
async def your_activity_definition() -> str:
    activity.heartbeat("heartbeat details!")
```

In addition to obtaining cancellation information, Heartbeats also support detail data that persists on the server for retrieval during Activity retry.
If an Activity calls `heartbeat(123, 456)` and then fails and is retried, `heartbeat_details` returns an iterable containing `123` and `456` on the next Run.
