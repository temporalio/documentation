---
id: how-to-continue-as-new-in-java
title: How to Continue-As-New in Java
sidebar_label: Continue-As-New
description: To cause a Workflow to Continue-As-New, use `Workflow.continueAsNew()`.
---

Temporal SDK allows you to use [Continue-As-New](/docs/concepts/what-is-continue-as-new) in a number of ways:

- You can continue execution of the same Workflow that is currently running by using:

  ```java
  Workflow.continueAsNew(input1, ...);
  ```

- To continue execution of a currently running Workflow as a completely different Workflow type, use `Workflow.newContinueAsNewStub()`.
  For example, in a Workflow class called `MyWorkflow`, we can create a Workflow stub with a different type, and call its Workflow method to continue execution as that type:

  ```java
  MyOtherWorkflow continueAsNew = Workflow.newContinueAsNewStub(MyOtherWorkflow.class);
  continueAsNew.greet(input);
  ```

- `Workflow.newContinueAsNewStub()` also allows you to provide `ContinueAsNewOptions` options, as in the following example:

  ```java
  ContinueAsNewOptions options = ContinueAsNewOptions.newBuilder()
          .setTaskQueue("newTaskQueueName")
          .build();

  MyOtherWorkflow continueAsNew = Workflow.newContinueAsNewStub(MyOtherWorkflow.class, options);
  // ...
  continueAsNew.greet(input);
  ```

  This allows you to continue Workflow Execution as a new Workflow run, with a different Workflow Type, and on a different Task Queue.
