---
id: how-to-describe-a-schedule-in-java
title: How to describe a Schedule in Java
sidebar_label: Describe Schedule
description: To describe a Schedule in Java, use describe() on ScheduleHandle.
tags:
  - java
  - developer-guide
---

The describe action shows the current Schedule configuration, including information about past, current, and future Workflow Runs. This command is helpful when you want to get a detailed view of the Schedule and its associated Workflow Runs.

To describe a Scheduled Workflow Execution in Java, use the `describe()` method on the `ScheduleHandle`.

```java
ScheduleHandle handle = client.getHandle("schedule-id")
ScheduleDescription description = handle.describe();
```
