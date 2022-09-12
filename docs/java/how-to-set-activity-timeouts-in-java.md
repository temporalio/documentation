---
id: how-to-set-activity-timeouts-in-java
title: How to set Activity Timeouts in Java
sidebar_label: Activity Timeouts
description: Activity Timeouts
tags:
  - Java
  - how-to
  - developer-guide
---

Set your Activity Timeout from the [`ActivityOptions.Builder`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/activity/ActivityOptions.Builder.html) class.

Available timeouts are:

- ScheduleToCloseTimeout()
- ScheduleToStartTimeout()
- StartToCloseTimeout()

You can set Activity Options using an `ActivityStub` within a Workflow implementation, or per-Activity using `WorkflowImplementationOptions` within a Worker.

The following uses `ActivityStub`.

```java
GreetingActivities activities = Workflow.newActivityStub(GreetingActivities.class,
                ActivityOptions.newBuilder()
                        .setScheduleToCloseTimeout(Duration.ofSeconds(5))
                        // .setStartToCloseTimeout(Duration.ofSeconds(2)
                        // .setScheduletoCloseTimeout(Duration.ofSeconds(20))
                        .build());
```

The following uses `WorkflowImplementationOptions`.

```java
WorkflowImplementationOptions options =
            WorkflowImplementationOptions.newBuilder()
                    .setActivityOptions(
                            ImmutableMap.of(
                                    "GetCustomerGreeting",
                                    // Set Activity Execution timeout
                                    ActivityOptions.newBuilder()
                                        .setScheduleToCloseTimeout(Duration.ofSeconds(5))
                                        // .setStartToCloseTimeout(Duration.ofSeconds(2))
                                        // .setScheduleToStartTimeout(Duration.ofSeconds(5))
                                        .build()))
                    .build();
```

:::note

If you define options per-Activity Type options with `WorkflowImplementationOptions.setActivityOptions()`, setting them again specifically with `ActivityStub` in a Workflow will override this setting.

:::
