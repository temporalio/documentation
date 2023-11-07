---
id: how-to-set-a-dynamic-workflow-in-java
title: How to set a Dynamic Workflow
sidebar_label: Set a Dynamic Workflow
description: Use `DynamicWorkflow` to implement Workflow Types dynamically.
tags:
- dynamic workflow
- java sdk
---

Use [`DynamicWorkflow`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/workflow/DynamicWorkflow.html) to implement Workflow Types dynamically.
Register a Workflow implementation type that extends `DynamicWorkflow` to implement any Workflow Type that is not explicitly registered with the Worker.

The dynamic Workflow interface is implemented with the `execute` method. This method takes in `EncodedValues` that are inputs to the Workflow Execution.
These inputs can be specified by the Client when invoking the Workflow Execution.

```java
public class MyDynamicWorkflow implements DynamicWorkflow {
   @Override
    public Object execute(EncodedValues args) {
    }
}
```
