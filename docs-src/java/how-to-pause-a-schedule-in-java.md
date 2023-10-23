---
id: how-to-pause-a-schedule-in-java
title: How to pause a Schedule in Java
sidebar_label: Pause Schedule
description: To pause a Schedule in Java, use pause() on ScheduleHandle.
tags:
  - java
  - developer-guide
---

The pause action enables you to pause and unpause a Schedule. When you pause a Schedule, all the future Workflow Runs associated with the Schedule are temporarily stopped. This command is useful when you want to temporarily halt a Workflow due to maintenance or any other reason.

To pause a Scheduled Workflow Execution in Java, use the `pause()` method on the `ScheduleHandle`.
You can pass a `note` to the `pause()` method to provide a reason for pausing the schedule.

```java
ScheduleHandle handle = client.getHandle("schedule-id")
handle.pause("Pausing the schedule for now");
```
