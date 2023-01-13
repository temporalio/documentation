---
id: how-to-set-a-start-to-close-timeout-in-java
title: How to set a Start-To-Close Timeout in Java
sidebar_label: Start-To-Close Timeout
description: To set a Start-To-Close Timeout, use `ActivityOptions.newBuilder.setStartToCloseTimeout​`].
tags:
  - Java
  - how-to
  - developer-guide
---

To set a [Start-To-Close Timeout](/concepts/what-is-a-start-to-close-timeout), use [`ActivityOptions.newBuilder.setStartToCloseTimeout​`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/activity/ActivityOptions.Builder.html).

This or `ScheduleToClose` must be set.

- Type: `Duration`
- Default: Defaults to [`ScheduleToCloseTimeout`](#scheduletoclosetimeout) value

You can set Activity Options using an `ActivityStub` within a Workflow implementation, or per-Activity using `WorkflowImplementationOptions` within a Worker.
Note that if you define options per-Activity Type options with `WorkflowImplementationOptions.setActivityOptions()`, setting them again specifically with `ActivityStub` in a Workflow will override this setting.

- With `ActivityStub`

  ```java
  GreetingActivities activities = Workflow.newActivityStub(GreetingActivities.class,
              ActivityOptions.newBuilder()
                      .setStartToCloseTimeout(Duration.ofSeconds(2))
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
                                            // Set Activity Execution timeout (single run)
                                            .setStartToCloseTimeout(Duration.ofSeconds(2))
                                            .build()))
                      .build();
  ```
