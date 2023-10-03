---
id: interface-heirarchies
title: Workflow interface inheritance
sidebar_label: Interface inheritance
description: Workflow interfaces can form inheritance hierarchies.
tags:
  - java
  - workflow
---

Workflow interfaces can form inheritance hierarchies.
It may be useful for creating reusable components across multiple
Workflow interfaces.
For example imagine a UI or CLI button that allows a `retryNow` Signal on any Workflow. To implement this feature you can redesign an interface like the following:

```java
public interface Retryable {
    @SignalMethod
    void retryNow();
}

@WorkflowInterface
public interface FileProcessingWorkflow extends Retryable {

    @WorkflowMethod
    String processFile(Arguments args);

    @QueryMethod(name="history")
    List<String> getHistory();

    @QueryMethod
    String getStatus();

    @SignalMethod
    void abandon();
}
```

Then some other Workflow interface can extend just `Retryable`, for example:

```java
@WorkflowInterface
public interface MediaProcessingWorkflow extends Retryable {

    @WorkflowMethod
    String processBlob(Arguments args);
}
```

Now if we have two running Workflows, one that implements the `FileProcessingWorkflow` interface and another that implements the `MediaProcessingWorkflow` interface, we can Signal to both using their common interface and knowing their workflowIds, for example:

```java
Retryable r1 = client.newWorkflowStub(Retryable.class, firstWorkflowId);
Retryable r2 = client.newWorkflowStub(Retryable.class, secondWorkflowId);
r1.retryNow();
r2.retryNow();
```

The same technique can be used to query Workflows using a base Workflow interface.

Note that this approach does not apply to `@WorkflowMethod` annotations, meaning that when using a base interface, it should not include any `@WorkflowMethod` methods.
To illustrate this, lets' say that we define the following **invalid** code:

```java
// INVALID CODE!
public interface BaseWorkflow {
    @WorkflowMethod
    void retryNow();
}

@WorkflowInterface
public interface Workflow1 extends BaseWorkflow {}

@WorkflowInterface
public interface Workflow2 extends BaseWorkflow {}
```

If we attempt to register implementations of Workflow1 and Workflow2 with a Worker will fail.
Let's say that we have:

```java
worker.registerWorkflowImplementationTypes(
        Workflow1Impl.class, Workflow2Impl.class);
```

This registration will fail with:

```text
java.lang.IllegalStateException: BaseWorkflow workflow type is already registered with the worker
```
