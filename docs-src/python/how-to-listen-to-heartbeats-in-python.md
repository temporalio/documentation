---
id: how-to-listen-to-heartbeats-in-python
title: How to heartbeat an Activity in a test in Python
sidebar_label: Heartbeat an Activity in a test
description: To listen to a Heartbeat in a test, use the on_heartbeat property.
tags:
  - developer-guide
  - sdk
  - python
  - testing
---

To test a Heartbeat in an Activity, you can use the `on_heartbeat()` property of the `ActivityEnvironment` class. This property allows you to set a custom function that will be called every time the `activity.heartbeat()` function is called within the Activity.

```python
@activity.defn
async def activity_with_heartbeats(param: str):
    activity.heartbeat(f"param: {param}")
    activity.heartbeat("second heartbeat")

env = ActivityEnvironment()
heartbeats = []
# Set the `on_heartbeat` property to a callback function that will be called for each heartbeat sent by the activity.
env.on_heartbeat = lambda *args: heartbeats.append(args[0])
# Use the run method to start the activity, passing in the function that contains the heartbeats and any necessary parameters.
await env.run(activity_with_heartbeats, "test")
# Verify that the expected heartbeats are received by the callback function.
assert heartbeats == ["param: test", "second heartbeat"]
```
