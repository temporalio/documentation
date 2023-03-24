---
id: how-to-heartbeat-an-activity-in-java
title: How to Heartbeat an Activity in Java
sidebar_label: Activity Heartbeat
description: To inform the Temporal service that the Activity is still alive, use `Activity.getExecutionContext().heartbeat()` in the Activity implementation code.
tags:
  - java
  - developer-guide
---

To Heartbeat an Activity Execution in Java, use the `Activity.getExecutionContext().heartbeat()` Class method.

```java
public class YourActivityDefinitionImpl implements YourActivityDefinition {

  @Override
  public String yourActivityMethod(YourActivityMethodParam param) {
    // ...
    Activity.getExecutionContext().heartbeat(details);
    // ...
  }
  // ...
}
```

The method takes an optional argument, the `details` variable above that represents latest progress of the Activity Execution.
This method can take a variety of types such as an exception object, custom object, or string.

If the Activity Execution times out, the last Heartbeat `details` are included in the thrown `ActivityTimeoutException`, which can be caught by the calling Workflow.
The Workflow can then use the `details` information to pass to the next Activity invocation if needed.

In the case of Activity retries, the last Heartbeat's `details` are available and can be extracted from the last failed attempt by using `Activity.getExecutionContext().getHeartbeatDetails(Class<V> detailsClass)`
