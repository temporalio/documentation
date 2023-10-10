---
id: how-to-update-a-schedule-in-java
title: How to update a Schedule in Java
sidebar_label: Update Schedule
description: To update a Schedule in Java, use `update()` on the `ScheduleHandle`.
tags:
  - java
  - developer-guide
---

The update action enables you to update an existing Schedule. This command is useful when you need to modify the Schedule's configuration, such as changing the start time, end time, or interval.

Create a function that takes `ScheduleUpdateInput` and returns `ScheduleUpdate`.
To update a Schedule, use a callback to build the update from the description.
The following example updates the Schedule to set a limited number of actions.

```java
ScheduleHandle handle = client.getHandle("schedule-id")
handle.update(
    (ScheduleUpdateInput input) -> {
      Schedule.Builder builder = Schedule.newBuilder(input.getDescription().getSchedule());
      // Make the schedule paused to demonstrate how to unpause a schedule
      builder.setState(
          ScheduleState.newBuilder()
              .setLimitedAction(true)
              .setRemainingActions(10)
              .build());
      return new ScheduleUpdate(builder.build());
    });
```
