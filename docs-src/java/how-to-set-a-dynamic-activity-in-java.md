---
id: how-to-set-a-dynamic-activity-in-java
title: How to set a Dynamic Activity
sidebar_label: Set a Dynamic Activity
description: Use `DynamicActivity` to implement any number of Activity types dynamically.
tags:
- dynamic activity
- java sdk
---

To handle Activity types that do not have an explicitly registered handler, you can directly implement a dynamic Activity.

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
