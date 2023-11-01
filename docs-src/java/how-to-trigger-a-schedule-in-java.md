---
id: how-to-trigger-a-schedule-in-java
title: How to trigger a Schedule in Java
sidebar_label: Trigger Schedule
description: To trigger a Schedule in Java, use trigger() on ScheduleHandle.
tags:
  - java
  - developer-guide
---

The trigger action triggers an immediate action with a given Schedule. By default, this action is subject to the Overlap Policy of the Schedule. This command is helpful when you want to execute a Workflow outside of its scheduled time.

To trigger a Scheduled Workflow Execution in Java, use the `trigger()` method on the `ScheduleHandle`.

```java
ScheduleHandle handle = client.getHandle("schedule-id")
handle.trigger();
```
