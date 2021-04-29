---
id: continue-as-new
title: Continue-as-new
---

Temporal stores the execution history of all Workflows. 
There is a maximum limit of this execution history and even tho the Temporal 
Server emits warnings while your workflow are approaching this limit, you should make sure 
your workflows don't reach it.

Workflows that periodically execute a number of Activities, for a long time, have the potential
of running into this execution history size limit.

One way of dealing with this issue is to use "Continue-as-new". This feature allows you
to complete the current Workflow execution and start a new one.
This new execution has the same Workflow Id, but a different Run Id, and as such will 
get its own execution history.

If your Workflow are running periodically using a Cron definition, the "Continue-as-new"
feature is used internally by Temporal. In this case, each Workflow execution as defined by the Cron definition
will have its own Run Id and execution history.

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
