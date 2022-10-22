---
id: how-to-set-asynchronous-activity-completion-in-python
title: How to set an Asynchronous Activity Completion in Python
sidebar_label: Set an Asynchronous Activity Completion
description: To set the completion status of an asynchronous Activity, get the handle of the Activity and call the appropriate method of `get_async_activity_handle()`.
tags:
  - python
  - how-to
---

To mark an Activity as completing asynchoronus, do the following inside the Activity.

```python
# Capture token for later completion
captured_token = activity.info().task_token
activity.raise_complete_async()
```

To update an Activity outside the Activity, use the [get_async_activity_handle()](https://python.temporal.io/temporalio.client.Client.html#get_async_activity_handle) method to get the handle of the Activity.

```python
handle = my_client.get_async_activity_handle(task_token=captured_token)
```

Then, on that handle, you can call the results of the Activity, `heartbeat`, `complete`, `fail`, or `report_cancellation` method to update the Activity.

```python
await handle.complete("Completion value.")
```
