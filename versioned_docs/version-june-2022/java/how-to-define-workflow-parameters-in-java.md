---
id: how-to-define-workflow-parameters-in-java
title: How to define Workflow Parameters in Java
sidebar_label: Workflow parameters
description: A method annotated with `@WorkflowMethod` can have any number of parameters.
tags:
  - developer-guide
  - java
---

A method annotated with `@WorkflowMethod` can have any number of parameters.

We recommend passing a single parameter that contains all the input fields to allow for adding fields in a backward-compatible manner.

Note that all inputs should be serializable by the default Jackson JSON Payload Converter.

You can create a custom object and pass it to the Workflow method, as shown in the following example.

```java
//...
@WorkflowInterface
public interface YourWorkflow {
    @WorkflowMethod
    String yourWFMethod(CustomObj customobj);
// ...
}
```
