---
id: how-to-set-activityoptions-in-java
title: How to set ActivityOptions in Java
sidebar_label: Activity Options
description: Use `ActivityOptions` to configure how to invoke an Activity Execution.
tags:
  - java
  - developer-guide
---

Use `ActivityOptions` to configure how to invoke an Activity Execution.
Note that Activity options must be set before the Activity Execution is invoked.

You can set Activity options for Activities within a Workflow or define specific Activity options per Activity Type within a Worker.

## Setting Activity options within a Workflow

Use `ActivityOptions` with `ActivityStub` to set options for invoking Activities within a Workflow.
The following example shows how to set `ActivityOptions` for Activities within a Workflow.

```java
GreetingActivities activities = Workflow.newActivityStub(GreetingActivities.class,
                ActivityOptions.newBuilder()
                        .setStartToCloseTimeout(Duration.ofSeconds(5))
                        // if task queue not set, it will be same Task Queue as what the Workflow uses
                        .setTaskQueue("yourTaskQueue")
                        // If RetryOptions are not explicitly set, Activities have a default RetryOption that apply.
                       .setRetryOptions(RetryOptions.newBuilder()
                                .build())
                        .build());

```

Note that these Activity options will apply for all the Activities defined in the _GreetingActivities_ Activity interface.
You can create multiple Activity stubs within a Workflow, and each can have different Activity options defined.

## Setting per-Activity options when registering a Workflow with a Worker

To set different options per Activity type, use `.setActivityOptions` with `WorkflowImplementationOptions`.
Note that if you define options per Activity Type with `WorkflowImplementationOptions.setActivityOptions()`, setting them again specifically within `ActivityOptions` in a Workflow will override this setting.

The following example shows how to set Activity options for Activity Types with `WorkflowImplementationOptions`.

```java
 WorkflowImplementationOptions options =
                WorkflowImplementationOptions.newBuilder()
                        // setActivityOptions allows you to set different ActivityOption per Activity type.
                        // By default Activity type is the name of Activity method (with first letter capitalized.)
                        .setActivityOptions(
                                ImmutableMap.of(
                                        "GetCustomerGreeting",
                                        ActivityOptions.newBuilder()
                                                // Set Activity execution timeout (including retries)
                                                .setScheduleToCloseTimeout(Duration.ofSeconds(5))
                                                .build(),
                                        "EmailCustomerGreeting",
                                        ActivityOptions.newBuilder()
                                                // Set Activity execution timeout (single run)
                                                .setStartToCloseTimeout(Duration.ofSeconds(2))
                                                .setRetryOptions(
                                                        RetryOptions.newBuilder()
                                                                // ActivityTypeB activity type shouldn't retry on NPE
                                                                .setDoNotRetry(NullPointerException.class.getName())
                                                                .build())
                                                .build()))
                        .build();
// ...
worker.registerWorkflowImplementationTypes(options, MyWorkflowImpl.class);
```

## Activity Options

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

### `ScheduleToCloseTimeout`

- Type: `Duration`
- Default: Unlimited.
  Note that if `WorkflowRunTimeout` and/or `WorkflowExecutionTimeout` are defined in the Workflow, all Activity retries will stop when either or both of these timeouts are reached.

- With `ActivityStub`

  ```java
  GreetingActivities activities = Workflow.newActivityStub(GreetingActivities.class,
                  ActivityOptions.newBuilder()
                          .setStartToCloseTimeout(Duration.ofSeconds(5))
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

See [Schedule-to-Close Timeout](/docs/concepts/what-is-a-schedule-to-close-timeout)

### `ScheduleToStartTimeout`

- Type: `Duration`
- Default: Unlimited. This timeout is non-retryable.

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

See [Schedule-To-Start Timeout](/docs/concepts/what-is-a-schedule-to-start-timeout)

### `StartToCloseTimeout`

- Type: `Duration`
- Default: Defaults to [`ScheduleToCloseTimeout`](#scheduletoclosetimeout) value

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

See [Start-to-Close Timeout](/docs/concepts/what-is-a-start-to-close-timeout)

### `HeartbeatTimeout`

- Type: `Duration`
- Default: None

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

See [Heartbeat Timeout](/docs/concepts/what-is-a-heartbeat-timeout)

### `TaskQueue`

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

See [Task Queue](/docs/concepts/what-is-a-task-queue)

### `RetryOptions`

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

### `setCancellationType`

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
