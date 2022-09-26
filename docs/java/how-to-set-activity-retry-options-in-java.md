---
id: how-to-set-activity-retry-options-in-java
title: How to set Activity Retry Options in Java
sidebar_label: Activity Retry Options
description: To set a Heartbeat Timeout, use `ActivityOptions.newBuilder.setHeartbeatTimeout​`].
tags:
  - Java
  - how-to
  - developer-guide
---

To set a Retry Policy, known as the [Retry Options](/concepts/what-is-a-retry-policy) in Java, use [`ActivityOptions.newBuilder.setRetryOptions()`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/activity/ActivityOptions.Builder.html).

- Type: `RetryOptions`
- Default: Server-defined Activity Retry policy.

- With `ActivityStub`

  ```java
  private final ActivityOptions options =
      ActivityOptions.newBuilder()
          // note that either StartToCloseTimeout or ScheduleToCloseTimeout are
          // required when setting Activity options.
          .setStartToCloseTimeout(Duration.ofSeconds(5))
          .setRetryOptions(
              RetryOptions.newBuilder()
                  .setInitialInterval(Duration.ofSeconds(1))
                  .setMaximumInterval(Duration.ofSeconds(10))
                  .build())
          .build();
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
                                .setRetryOptions(
                                      RetryOptions.newBuilder()
                                          .setDoNotRetry(NullPointerException.class.getName())
                                          .build())
                                .build()))
                .build();
  ```
