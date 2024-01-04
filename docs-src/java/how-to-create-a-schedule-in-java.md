---
id: how-to-create-a-schedule-in-java
title: How to create a Schedule in Java
sidebar_label: Create Schedule
description: To create a Schedule in Java, use createSchedule() on the Client.
tags:
  - java
  - developer-guide
---

The create action enables you to create a new Schedule. When you create a new Schedule, a unique Schedule ID is generated, which you can use to reference the Schedule in other Schedule commands.

To create a Scheduled Workflow Execution in Java, use the `createSchedule()` method on the `ScheduleClient`. Schedules must be initialized with a Schedule ID,

```java
Schedule schedule =
    Schedule.newBuilder()
        .setAction(
            ScheduleActionStartWorkflow.newBuilder()
                .setWorkflowType(HelloSchedules.GreetingWorkflow.class)
                .setArguments("World")
                .setOptions(
                    WorkflowOptions.newBuilder()
                        .setWorkflowId("WorkflowId")
                        .setTaskQueue("TaskQueue")
                        .build())
                .build())
        .setSpec(ScheduleSpec.newBuilder().build())
        .build();

// Create a schedule on the server
ScheduleHandle handle =
    scheduleClient.createSchedule("ScheduleId", schedule, ScheduleOptions.newBuilder().build());
```
