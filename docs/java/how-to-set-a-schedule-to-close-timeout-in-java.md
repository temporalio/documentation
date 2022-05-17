---
id: how-to-set-a-schedule-to-close-timeout-in-java
title: How to set a Schedule-To-Close Timeout in Java
sidebar_label: Schedule-To-Close Timeout
description: To set a Schedule-To-Close Timeout, use `ActivityOptions.newBuilder.setScheduleToCloseTimeout​`].
tags:
  - Java
  - how-to
  - developer-guide
---

To set a [Schedule-To-Close Timeout](/docs/concepts/what-is-a-schedule-to-close-timeout), use [`ActivityOptions.newBuilder.setScheduleToCloseTimeout​`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/activity/ActivityOptions.Builder.html).

This or `StartToCloseTimeout` must be set.

- Type: `Duration`
- Default: Unlimited.
  Note that if `WorkflowRunTimeout` and/or `WorkflowExecutionTimeout` are defined in the Workflow, all Activity retries will stop when either or both of these timeouts are reached.

- With `ActivityStub`

  ```java
  GreetingActivities activities = Workflow.newActivityStub(GreetingActivities.class,
                  ActivityOptions.newBuilder()
                          .setScheduleToCloseTimeout(Duration.ofSeconds(5))
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
                                          .setScheduleToCloseTimeout(Duration.ofSeconds(5))
                                          .build()))
                      .build();
  ```
