---
id: how-to-define-a-query-in-java
title: How to define a Query in Java
sidebar_label: Define Query
description: To define a Query, create a Query handler using the `@QueryMethod` annotation in the Workflow interface and implement it in the Workflow implementation.
tags:
  - java
  - developer-guide
---

To define a Query, create a Query handler using the `@QueryMethod` annotation in the Workflow interface and implement it in the Workflow implementation.
Once defined, call the Query method in the Client code to send a Query.

Note that Query methods can only be defined inside Workflows Interface.

The `@QueryMethod` annotation indicates that the method is used to handle a [Query](/docs/concepts/what-is-a-query) that is sent to the Workflow Execution.
The method can have parameters that can be used to filter data that the Query returns.
Because the method returns a value, it must have a return type that is not `void`.

The Query name defaults to the name of the method.
In the following example, the Query name defaults to `getStatus`.

```java
@WorkflowInterface
public interface FileProcessingWorkflow {
   @QueryMethod
   String getStatus();
}
```

To overwrite this default naming and assign a custom Query name, use the `@QueryMethod` annotation with the `name` parameter. In the following example, the Query name is set to "history".

```java
@WorkflowInterface
public interface FileProcessingWorkflow {
   @QueryMethod(name = "history")
   String getStatus();
}
```

A Workflow Definition interface can define multiple methods annotated with `@QueryMethod`, but the method names or the `name` parameters for each must be unique.

The Query method usually just returns a value derived from the fields of the Workflow object.

Query methods can take in any number of input parameters which can be used to limit the data that is returned.
