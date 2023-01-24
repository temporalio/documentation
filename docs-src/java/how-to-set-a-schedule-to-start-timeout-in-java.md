---
id: how-to-set-a-schedule-to-start-timeout-in-java
title: How to set a Schedule-To-Start Timeout in Java
sidebar_label: Schedule-To-Start Timeout
description: To set a Schedule-To-Start Timeout, use `ActivityOptions.newBuilder.setScheduleToStartTimeout​`].
tags:
  - Java
  - how-to
  - developer-guide
---

To set a [Schedule-To-Start Timeout](/concepts/what-is-a-schedule-to-start-timeout), use [`ActivityOptions.newBuilder.setScheduleToStartTimeout​`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/activity/ActivityOptions.Builder.html).

- Type: `Duration`
- Default: Unlimited. This timeout is non-retryable.

You can set Activity Options using an `ActivityStub` within a Workflow implementation, or per-Activity using `WorkflowImplementationOptions` within a Worker.
Note that if you define options per-Activity Type options with `WorkflowImplementationOptions.setActivityOptions()`, setting them again specifically with `ActivityStub` in a Workflow will override this setting.

- With `ActivityStub`

  ```java
  GreetingActivities activities = Workflow.newActivityStub(GreetingActivities.class,
                  ActivityOptions.newBuilder()
                          .setScheduleToStartTimeout(Duration.ofSeconds(5))
                          // note that either StartToCloseTimeout or ScheduleToCloseTimeout are
                          // required when setting Activity options.
                          .setScheduletoCloseTimeout(Duration.ofSeconds(20))
                          .build());
  ```

- With `WorkflowImplementationOptions`

  ```java
  WorkflowImplementationOptions options =
             WorkflowImplementationOptions.newBuilder()
                      .setActivityOptions(
                              ImmutableMap.of(
                                "GetCustomerGreeting",
                                ActivityOptions.newBuilder()
                                    .setScheduleToStartTimeout(Duration.ofSeconds(5))
                                    .build()))
                      .build();
  ```
