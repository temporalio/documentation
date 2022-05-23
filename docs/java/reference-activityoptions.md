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

### `ScheduleToCloseTimeout`

import ScheduleToCloseTimeout from './how-to-set-a-schedule-to-close-timeout-in-java.md'

<ScheduleToCloseTimeout/>

### `ScheduleToStartTimeout`

import ScheduleToStartTimeout from './how-to-set-a-schedule-to-start-timeout-in-java.md'

<ScheduleToStartTimeout/>

### `StartToCloseTimeout`

import StartToCloseTimeout from './how-to-set-a-start-to-close-timeout-in-java.md'

<StartToCloseTimeout/>

### `HeartbeatTimeout`

import HeartbeatTimeout from './how-to-set-a-heartbeat-timeout-in-java.md'

<HeartbeatTimeout/>

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

See [Task Queue](/concepts/what-is-a-task-queue)

### `RetryOptions`

import ActivityRetryOptions from './how-to-set-activity-retry-options-in-java.md'

<ActivityRetryOptions/>

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
