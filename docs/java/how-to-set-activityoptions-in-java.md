---
id: how-to-set-activityoptions-in-java
title: How to set ActivityOptions in Java
sidebar_label: Set Activity Options
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

For more details, see [Activity Options Reference](/java/reference-activityoptions).
