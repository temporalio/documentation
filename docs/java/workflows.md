---
id: java-workflows
title: Workflows in Java
sidebar_label: Workflows
description: The core abstraction of the Temporal solution is a fault-oblivious stateful Workflow.
---

import SharedDoc from '../shared/continue-as-new.md'

## TODO: integrate the rest

## ContinueAsNew

<SharedDoc />

Temporal SDK allows you to manually use "Continue-as-new" in a number of ways:

If you are continuing execution of the same workflow that is currently running you can do:

```java
Workflow.continueAsNew(input1, ...);
```

It is also possible to continue execution as a completely differnt Workflow type.
In a Workflow class called `MyWorkflow` for example, we can create a Workflow Stub with a different type and
call its Workflow method to continue execution as that type:

```java
MyOtherWorkflow continueAsNew = Workflow.newContinueAsNewStub(MyOtherWorkflow.class);
continueAsNew.greet(input);
```

`Workflow.newContinueAsNewStub` also allows to provide `ContinueAsNewOptions` options, for example:

```java
ContinueAsNewOptions options = ContinueAsNewOptions.newBuilder()
        .setTaskQueue("newTaskQueueName")
        .build();

MyOtherWorkflow continueAsNew = Workflow.newContinueAsNewStub(MyOtherWorkflow.class, options);
// ...
continueAsNew.greet(input);
```

This allows you to continue workflow execution as a new Workflow run with a different Workflow type,
and on a different Task Queue.

Another way to deal with the execution history size limits is to use Child Workflows, however
they themselves could eventually, if long running, experience the same issue in which case you can again
apply the "Continue-as-new" feature if needed.
