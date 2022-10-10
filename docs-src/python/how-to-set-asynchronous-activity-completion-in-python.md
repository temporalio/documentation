---
id: how-to-set-asynchronous-activity-completion-in-python
title: How to set an Asynchronous Activity Completion in Python
sidebar_label: Set an Asynchronous Activity Completion
description: Set an Asynchronous Activity Completion
tags:
  - python
  - how-to
---

To mark an Activity as completing asynchoronus, do the following.

```python
# Capture token for later completion
captured_token = activity.info().task_token
activity.raise_complete_async()
```

To update an Activity outside the Activity, given a Client you would do the following.

```python
handle = my_client.get_async_activity_handle(task_token=captured_token)
```

Then, on that handle, you can call a `heartbeat`, `complete`, `fail`, or `report_cancellation` to update the Activity.

```python
await handle.complete(f"{input.getting}")
```
