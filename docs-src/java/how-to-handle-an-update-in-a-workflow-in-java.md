---
id: how-to-handle-an-update-in-a-workflow-in-java
title: How to handle Updates in an Workflow
sidebar_label: Handle Updates
description: Use the @UpdateMethod annotation to handle Signals within the Workflow interface.
tags:
  - java
  - developer-guide
---

Workflows listen for Update by the update's name.

Use the `@UpdateMethod` annotation to handle Updates in the Workflow interface.
The handler method can accept multiple serializable input parameters, but it's recommend using only a single parameter.
The function can return a serializable value or `void`.
If any exception is throw while handling an update that exception may fail the Workflow task or the update depending on the type of the exception and `WorkflowImplementationOptions.setFailWorkflowExceptionTypes`

```java
@WorkflowInterface
public interface FileProcessingWorkflow {

   @WorkflowMethod
   String processFile(Arguments args);

   @UpdateMethod
   void pauseProcessing();
}
```

Update handlers, unlike Query handlers, can change Workflow state.

The Updates type defaults to the name of the method.
To overwrite this default naming and assign a custom Update type, use the `@UpdateMethod` annotation with the `name` parameter.

```java
@WorkflowInterface
public interface FileProcessingWorkflow {

   @WorkflowMethod
   String processFile(Arguments args);

   @UpdateMethod(name = "pause")
   void pauseProcessing();
}
```

**Dynamic Update Handler**

You can also implement Update handlers dynamically.
This is useful for library-level code and implementation of DSLs.

```java
TODO
Workflow.registerListener(
  (DynamicUpdateHandler)
      (updateName, encodedArgs) -> encodedArgs.get(0, String.class));
```

When registered, any Updates sent to the Workflow without a defined handler will be delivered to the `DynamicUpdateHandler`.
You can only register one `Workflow.registerListener(Object)` per Workflow Execution.
`DynamicUpdateHandler` can be implemented in both regular and dynamic Workflow implementations.
