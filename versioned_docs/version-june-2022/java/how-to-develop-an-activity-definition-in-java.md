---
id: how-to-develop-an-activity-definition-in-java
title: How to develop an Activity Definition in Java
sidebar_label: Activity Definition
description: In the Temporal Java SDK programming model, Activities are classes which implement the Activity Interface.
tags:
  - java
  - developer-guide
---

An [Activity Definition](/concepts/what-is-an-activity) is a combination of the Temporal Java SDK [Activity](https://www.javadoc.io/static/io.temporal/temporal-sdk/0.19.0/io/temporal/activity/Activity.html) Class implementing a specially annotated interface.

An Activity interface is annotated with `@ActivityInterface` and an Activity implementation implements this Activity interface.
TO handle Activity types that do not have an explicitly registered handler, you can directly implement a dynamic Activity.

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
    @ActivityMethod
    String composeGreeting(String greeting, String language);
}
```

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

Use `DynamicActivity` to implement any number of Activity types dynamically.
When an Activity implementation that extends `DynamicActivity` is registered, it is called for any Activity type invocation that doesn't have an explicitly registered handler.

The dynamic Activity interface is implemented with the `execute` method, as shown in the following example.

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
