---
id: how-to-define-activity-parameters-in-java
title: How to define Activity paramters in Java
sidebar_label: Activity parameters
description: In the Temporal Java SDK programming model, Activities are classes which implement the Activity Interface.
tags:
  - developer-guide
  - java
---

A Java-based Activity definition comprises a Activity interface annotated with `@ActivityInterface` and an Activity implementation that implements the Activity interface.

#### Activity interface parameters

Activity interface is a Java interface and is annotated with the `@ActivityInterface` annotation.

```java
@ActivityInterface
public interface GreetingActivities {
    String composeGreeting(String greeting, String language);
}
```

Each method defined in the Actvity interface defines a separate Activity method.
You can annotate each method in the Activity interface with the `@ActivityMethod` annotation, but this is completely optional.
The following example uses the `@ActivityMethod` annotation for the method defined in the previous example.

```java
@ActivityInterface
public interface GreetingActivities {
    @ActivityMethod()
    String composeGreeting(String greeting, String language);
}
```

#### Activity implementation parameters

An Activity implementation is a Java class that implements an Activity annotated interface.

```java
// Implementation for the GreetingActivities interface example from in the previous section
 static class GreetingActivitiesImpl implements GreetingActivities {
    @Override
    public String composeGreeting(String greeting, String name) {
      return greeting + " " + name + "!";
    }
  }
```

When implementing Activities, be mindful of the amount of data that you transfer using the Activity invocation parameters or return values as these are recorded in the Workflow Execution Events History.
Large Events Histories can adversely impact performance.

#### Dynamic Activity parameters

Use `DynamicActivity` to implement any number of Activity types dynamically.
When an Activity implementation that extends `DynamicActivity` is registered, it is called for any Activity type invocation that doesn't have an explicitly registered handler.

`DynamicActivity` can be useful for integrations with existing libraries.
For example, it can be used to call some external HTTP API with each function exposed as a different Activity type.

The Dynamic Activity interface is implemented with the `execute` method. This method takes in `EncodedValues` that are inputs to the Activity Execution, as shown in the following example.

```java
 // Dynamic Activity implementation
  public static class DynamicGreetingActivityImpl implements DynamicActivity {
    @Override
    public Object execute(EncodedValues args) {
      String activityType = Activity.getExecutionContext().getInfo().getActivityType();
      return activityType
          + ": "
          + args.get(0, String.class)
          + " "
          + args.get(1, String.class)
          + " from: "
          + args.get(2, String.class);
    }
  }
```

Use `Activity.getExecutionContext()` to get information about the Activity type that should be implemented dynamically.

You can register only one instance that implements `DynamicActivity` with a Worker.

For more details, see [Dynamic Activity Reference](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/activity/DynamicActivity.html).
