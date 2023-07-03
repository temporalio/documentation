---
id: reference-activityoptions
title: Java ActivityOptions reference
sidebar_label: Activity Options reference
description: Use `ActivityOptions` to configure how to invoke an Activity Execution.
tags:
  - developer-guide
  - how-to
  - java
---

Use [`ActivityOptions`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/activity/ActivityOptions.Builder.html) to configure how to invoke an Activity Execution.

You can set Activity Options using an `ActivityStub` within a Workflow implementation, or per-Activity using `WorkflowImplementationOptions` within a Worker.
Note that if you define options per-Activity Type options with `WorkflowImplementationOptions.setActivityOptions()`, setting them again specifically with `ActivityStub` in a Workflow will override this setting.

The following table lists all `ActivityOptions` that can be configured for an Activity invocation.

| Option                                                 | Required                                           | Type                     |
| ------------------------------------------------------ | -------------------------------------------------- | ------------------------ |
| [`setScheduleToCloseTimeout`](#scheduletoclosetimeout) | Yes (if `StartToCloseTimeout` is not specified)    | Duration                 |
| [`setScheduleToStartTimeout`](#scheduletostarttimeout) | No                                                 | Duration                 |
| [`setStartToCloseTimeout`](#starttoclosetimeout)       | Yes (if `ScheduleToCloseTimeout` is not specified) | Duration                 |
| [`setHeartbeatTimeout`](#heartbeattimeout)             | No                                                 | Duration                 |
| [`setTaskQueue`](#taskqueue)                           | No                                                 | String                   |
| [`setRetryOptions`](#retryoptions)                     | No                                                 | RetryOptions             |
| [`setCancellationType`](#cancellationtype)             | No                                                 | ActivityCancellationType |

#### ScheduleToCloseTimeout

To set a [Schedule-To-Close Timeout](/concepts/what-is-a-schedule-to-close-timeout), use [`ActivityOptions.newBuilder.setScheduleToCloseTimeout​`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/activity/ActivityOptions.Builder.html).

This or `StartToCloseTimeout` must be set.

- Type: `Duration`
- Default: Unlimited.
  Note that if `WorkflowRunTimeout` and/or `WorkflowExecutionTimeout` are defined in the Workflow, all Activity retries will stop when either or both of these timeouts are reached.

You can set Activity Options using an `ActivityStub` within a Workflow implementation, or per-Activity using `WorkflowImplementationOptions` within a Worker.
Note that if you define options per-Activity Type options with `WorkflowImplementationOptions.setActivityOptions()`, setting them again specifically with `ActivityStub` in a Workflow will override this setting.

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

#### ScheduleToStartTimeout

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

#### StartToCloseTimeout

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

#### HeartbeatTimeout

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

#### TaskQueue

- Type: `String`
- Default: Defaults to the Task Queue that the Workflow was started with.

- With `ActivityStub`

  ```java
  GreetingActivities activities = Workflow.newActivityStub(GreetingActivities.class,
                  ActivityOptions.newBuilder()
                          // note that either StartToCloseTimeout or ScheduleToCloseTimeout are required when
                          // setting Activity options.
                          .setStartToCloseTimeout(Duration.ofSeconds(5))
                          .setTaskQueue("yourTaskQueue")
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
                                            .setTaskQueue("yourTaskQueue")
                                            .build()))
                      .build();
  ```

See [Task Queue](/concepts/what-is-a-task-queue)

#### RetryOptions

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

#### setCancellationType

- Type: `ActivityCancellationType`
- Default: `ActivityCancellationType.TRY_CANCEL`

- With `ActivityStub`

  ```java
  private final GreetingActivities activities =
    Workflow.newActivityStub(
        GreetingActivities.class,
        ActivityOptions.newBuilder()
            .setCancellationType(ActivityCancellationType.WAIT_CANCELLATION_COMPLETED)
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
                                .setCancellationType(ActivityCancellationType.WAIT_CANCELLATION_COMPLETED)
                                .build()))
                .build();
  ```
