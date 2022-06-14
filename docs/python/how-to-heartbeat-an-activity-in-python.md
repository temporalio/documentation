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

In order for an Activity to be notified of cancellation requests, you must invoke [`temporalio.activity.heartbeat()`](https://python.temporal.io/temporalio.activity.html#heartbeat).

In addition to obtaining cancellation information, Heartbeats also support detail data that is persisted on the server
for retrieval during Activity Retry. If an activity calls `temporalio.activity.heartbeat(123, 456)` and then fails and
is retried, `temporalio.activity.info().heartbeat_details` will return an iterable containing `123` and `456` on the
next run.

```python
async def heartbeat(self, *details: Any) -> None:
    await self._client._impl.heartbeat_async_activity(
        HeartbeatAsyncActivityInput(id_or_token=self._id_or_token, details=details),
    )
```
