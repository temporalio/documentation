---
id: how-to-validate-an-update-in-a-workflow-in-java
title: How to validate an Update in a Workflow in Java
sidebar_label: validate an update
description: To add a Validator to an Update use `@UpdateValidatorMethod`
tags:
  - java
  - developer-guide
---

Validate certain aspects of the data sent to the Workflow using an Update validator method.
For instance, a counter Workflow might never want to accept a non-positive number. Use the `@UpdateValidatorMethod` annotation and set `updateName`
to the name of your Update handler. Your Update Validator should accept the same input parameters as your Update Handler and return `void`.

```java
@WorkflowInterface
public interface GreetingWorkflow {
    @WorkflowMethod
    List<String> getGreetings();

    @UpdateMethod
    int addGreeting(String name);

    @UpdateValidatorMethod(updateName = "addGreeting")
    void addGreetingValidator(String name);
}
```
