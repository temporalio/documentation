---
id: how-to-asynchronously-complete-an-activity-in-java
title: How to asynchronous complete an Activity in Java
sidebar_label: Asynchronous complete an Activity
description: Asynchronous complete an Activity in Java.
tags:
  - java
  - how-to
---

To complete an Activity asynchronously, set the [`ActivityCompletionClient`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/ActivityCompletionClient.html) interface to the `complete()` method.

```java
    @Override
    public String composeGreeting(String greeting, String name) {

      // Get the activity execution context
      ActivityExecutionContext context = Activity.getExecutionContext();

      // Set a correlation token that can be used to complete the activity asynchronously
      byte[] taskToken = context.getTaskToken();

      /**
       * For the example we will use a {@link java.util.concurrent.ForkJoinPool} to execute our
       * activity. In real-life applications this could be any service. The composeGreetingAsync
       * method is the one that will actually complete workflow action execution.
       */
      ForkJoinPool.commonPool().execute(() -> composeGreetingAsync(taskToken, greeting, name));
      context.doNotCompleteOnReturn();

      // Since we have set doNotCompleteOnReturn(), the workflow action method return value is
      // ignored.
      return "ignored";
    }

    // Method that will complete action execution using the defined ActivityCompletionClient
    private void composeGreetingAsync(byte[] taskToken, String greeting, String name) {
      String result = greeting + " " + name + "!";

      // Complete our workflow activity using ActivityCompletionClient
      completionClient.complete(taskToken, result);
    }
  }
```

Alternatively, set the [`doNotCompleteOnReturn()`](<https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/activity/ActivityExecutionContext.html#doNotCompleteOnReturn()>) method during an Activity Execution.

```java
    @Override
    public String composeGreeting(String greeting, String name) {

      // Get the activity execution context
      ActivityExecutionContext context = Activity.getExecutionContext();

      // Set a correlation token that can be used to complete the activity asynchronously
      byte[] taskToken = context.getTaskToken();

      /**
       * For the example we will use a {@link java.util.concurrent.ForkJoinPool} to execute our
       * activity. In real-life applications this could be any service. The composeGreetingAsync
       * method is the one that will actually complete workflow action execution.
       */
      ForkJoinPool.commonPool().execute(() -> composeGreetingAsync(taskToken, greeting, name));
      context.doNotCompleteOnReturn();

      // Since we have set doNotCompleteOnReturn(), the workflow action method return value is
      // ignored.
      return "ignored";
    }
```

When this method is called during an Activity Execution, the Activity Execution does not complete when it's method returns.
