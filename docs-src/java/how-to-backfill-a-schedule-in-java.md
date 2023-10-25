---
id: how-to-backfill-a-schedule-in-java
title: How to backfill a Schedule in Java
sidebar_label: Backfill Schedule
description: To backfill a Schedule in Java, use backfill() on ScheduleHandle.
tags:
  - java
  - developer-guide
---

The backfill action executes Actions ahead of their specified time range. This command is useful when you need to execute a missed or delayed Action, or when you want to test the Workflow before its scheduled time.

To Backfill a Scheduled Workflow Execution in Java, use the `backfill()` method on the `ScheduleHandle`.

```java
ScheduleHandle handle = client.getHandle("schedule-id")

Instant now = Instant.now();
handle.backfill(
    Arrays.asList(
        new ScheduleBackfill(now.minusMillis(5500), now.minusMillis(2500)),
        new ScheduleBackfill(now.minusMillis(2500), now)));
```
