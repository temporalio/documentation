---
id: how-to-list-a-schedule-in-java
title: How to describe a Schedule in Java
sidebar_label: Describe Schedule
description: To list all Schedules in Java, use `ScheduleClient.List()`.
tags:
  - java
  - developer-guide
---

The list action lists all the available Schedules. This command is useful when you want to view a list of all the Schedules and their respective Schedule IDs.

To list all schedules, use the `listSchedules()` asynchronous method on the `ScheduleClient`.
If a schedule is added or deleted, it may not be available in the list immediately.

```java
Stream<ScheduleListDescription> scheduleStream = client.listSchedules();
```
