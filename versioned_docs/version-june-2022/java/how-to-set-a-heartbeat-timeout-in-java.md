---
id: how-to-set-a-heartbeat-timeout-in-java
title: How to set a Heartbeat Timeout in Java
sidebar_label: Heartbeat Timeout
description: To set a Heartbeat Timeout, use `ActivityOptions.newBuilder.setHeartbeatTimeout​`].
tags:
  - Java
  - how-to
  - developer-guide
---

To set a [Heartbeat Timeout](/concepts/what-is-a-heartbeat-timeout), use [`ActivityOptions.newBuilder.setHeartbeatTimeout`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/activity/ActivityOptions.Builder.html).

- Type: `Duration`
- Default: None

You can set Activity Options using an `ActivityStub` within a Workflow implementation, or per-Activity using `WorkflowImplementationOptions` within a Worker.
Note that if you define options per-Activity Type options with `WorkflowImplementationOptions.setActivityOptions()`, setting them again specifically with `ActivityStub` in a Workflow will override this setting.

- With `ActivityStub`

  ```java
  private final GreetingActivities activities =
      Workflow.newActivityStub(
          GreetingActivities.class,
          ActivityOptions.newBuilder()
              // note that either StartToCloseTimeout or ScheduleToCloseTimeout are
              // required when setting Activity options.
              .setStartToCloseTimeout(Duration.ofSeconds(5))
              .setHeartbeatTimeout(Duration.ofSeconds(2))
              .build());
  ```

- With `WorkflowImplementationOptions`

  ```java
  WorkflowImplementationOptions options =
              WorkflowImplementationOptions.newBuilder()
                      .setActivityOptions(
                              ImmutableMap.of(
                                "EmailCustomerGreeting",
                                      ActivityOptions.newBuilder()
                                          // note that either StartToCloseTimeout or ScheduleToCloseTimeout are
                                          // required when setting Activity options.
                                            .setStartToCloseTimeout(Duration.ofSeconds(5))
                                            .setHeartbeatTimeout(Duration.ofSeconds(2))
                                            .build()))
                      .build();
  ```
