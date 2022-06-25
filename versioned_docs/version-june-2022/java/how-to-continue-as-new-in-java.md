---
id: how-to-continue-as-new-in-java
title: How to Continue-As-New in Java
sidebar_label: Continue-As-New
description: To cause a Workflow to Continue-As-New, use `Workflow.continueAsNew()`.
tags:
  - java
  - developer-guide
---

Temporal SDK allows you to use [Continue-As-New](/concepts/what-is-continue-as-new) in various ways.

To continue execution of the same Workflow that is currently running, use:

```java
Workflow.continueAsNew(input1, ...);
```

To continue execution of a currently running Workflow as a completely different Workflow type, use `Workflow.newContinueAsNewStub()`.
For example, in a Workflow class called `MyWorkflow`, we can create a Workflow stub with a different type, and call its Workflow method to continue execution as that type:

```java
MyOtherWorkflow continueAsNew = Workflow.newContinueAsNewStub(MyOtherWorkflow.class);
coninueAsNew.greet(input);
```

To provide `ContinueAsNewOptions` options in `Workflow.newContinueAsNewStub()` use:

```java
ContinueAsNewOptions options = ContinueAsNewOptions.newBuilder()
        .setTaskQueue("newTaskQueueName")
        .build();

MyOtherWorkflow continueAsNew = Workflow.newContinueAsNewStub(MyOtherWorkflow.class, options);
// ...
continueAsNew.greet(input);
```

Providing these options allows you to continue Workflow Execution as a new Workflow run, with a different Workflow Type, and on a different Task Queue.

Java Workflow reference: <https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/workflow/package-summary.html>
