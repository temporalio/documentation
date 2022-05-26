---
id: how-to-define-activity-parameters-in-java
title: How to define Activity paramters in Java
sidebar_label: Activity parameters
description: An Activity interface can have any number of parameters.
tags:
  - developer-guide
  - java
---

An Activity interface can have any number of parameters.
All inputs should be serializable by the default Jackson JSON Payload Converter.

When implementing Activities, be mindful of the amount of data that you transfer using the Activity invocation parameters or return values as these are recorded in the Workflow Execution Events History.
Large Events Histories can adversely impact performance.

You can create a custom object, and pass it to the Activity interface, as shown in the following example.

```java
@ActivityInterface
public interface YourActivities {
    String getCustomObject(CustomObj customobj);
    void sendCustomObject(CustomObj customobj, String abc);
}
```

The `execute` method in the dynamic Activity interface implementation takes in `EncodedValues` that are inputs to the Activity Execution, as shown in the following example.

```java
 // Dynamic Activity implementation
  public static class DynamicActivityImpl implements DynamicActivity {
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

For more details, see [Dynamic Activity Reference](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/activity/DynamicActivity.html).
