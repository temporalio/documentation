---
id: java-workflow-interface
title: Workflow Interface
---

Workflow encapsulates the orchestration of Activities and child Workflows.
It can also answer synchronous queries and receive external events (also known as signals).

A Workflow must define an interface class. A Workflow interface class must be annotated with `@WorkflowInterface`.
All of its methods must have one of the following annotations:

- **@WorkflowMethod** indicates an entry point to a Workflow. It contains parameters such as timeouts and a task queue.
  Required parameters (such as `executionStartToCloseTimeoutSeconds`) that are not specified through the annotation must be provided at runtime.
- **@SignalMethod** indicates a method that reacts to external signals. It must have a `void` return type.
- **@QueryMethod** indicates a method that reacts to synchronous query requests. It must have a non `void` return type.

You can have more than one method with the same annotation (except @WorkflowMethod). For example:

```java
@WorkflowInterface
public interface FileProcessingWorkflow {

    @WorkflowMethod
    String processFile(Arguments args);

    @QueryMethod(name="history")
    List<String> getHistory();

    @QueryMethod(name="status")
    String getStatus();

    @SignalMethod
    void retryNow();

    @SignalMethod
    void abandon();
}
```

Note that name parameter of Workflow method annotations can be used to specify name of Workflow, signal and query types.
If name is not specified the short name of the Workflow interface separated by underscore with the method name is used.
In the above code the @WorkflowMethod.name is not specified, thus the Workflow type defaults to `"FileProcessingWorkflow_processFile"`.

We recommended that you use a single value type argument for all types of Workflow methods.
This way, adding new arguments as fields to the value type is a backwards-compatible change.

# Workflow Interface Inheritance

Workflow interfaces can form inheritance hierarchies. It may be useful for creating components reusable across multiple
Workflow types. For example imaging a UI or CLI button that allows to call `retryNow` signal on any Workflow. To implement
this feature you can redesign the above interface to:

```java
@WorkflowInterface
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

    @QueryMethod(name="status")
    String getStatus();

    @SignalMethod
    void abandon();
}
```

Then some other Workflow can implement it as well:

```java
@WorkflowInterface
public interface MediaProcessingWorkflow extends Retryable {
    @WorkflowMethod
    String processBlob(Arguments args);
}
```

Then it would be possible to send signal to both of them using the Retryable interface only:

```java
Retryable r = client.newWorkflowStab(Retryable.class, workflowId);
r.retryNow();
```

The same technique can be used to query Workflows through a base interface.

Note that an attempt to start Workflow through a base interface annotated with `@WorkflowInterface` is not going to work.
Let's look at the following **invalid** example:

```java
// INVALID CODE!
@WorkflowInterface
public interface BaseWorkflow {
    @WorkflowMethod
    void retryNow();
}

@WorkflowInterface
public interface Workflow1 extends BaseWorkflow {}

@WorkflowInterface
public interface Workflow2 extends BaseWorkflow {}
```

An attempt to register implementations of Workflow1 and Workflow2 are going to fail as they are going to use the same
Workflow type. The type is defined by the type of the class which is annotated with @WorkflowInterface. In this case `BaseWorkflow`.
The solution is to remove @WorkflowInterface annotation from BaseWorkflow. The following is valid code:

```java
public interface BaseWorkflow {
    @WorkflowMethod
    void retryNow();
}

@WorkflowInterface
public interface Workflow1 extends BaseWorkflow {}

@WorkflowInterface
public interface Workflow2 extends BaseWorkflow {}
```

Implementations of Workflow1 and Workflow2 can registered with the same worker as they will have types defined by their interfaces.
