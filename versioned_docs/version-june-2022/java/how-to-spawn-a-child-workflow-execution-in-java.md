---
id: how-to-spawn-a-child-workflow-execution-in-java
title: How to spawn a Child Workflow Execution in Java
sidebar_label: Child Workflow Execution
description: The first call to the Child Workflow stub can be synchronous or asynchronous using `Async.function(Functions.Func)` or `Async.procedure(Functions.Proc)`, and must always be to a method annotated with `@WorkflowMethod`.
tags:
  - java
  - developer-guide
---

The first call to the Child Workflow stub must always be its Workflow method (method annotated with `@WorkflowMethod`).
Similar to Activities, invoking Child Workflow methods can be made synchronous or asynchronous by using `Async#function` or `Async#procedure`.
The synchronous call blocks until a Child Workflow method completes.
The asynchronous call returns a `Promise` which can be used to wait for the completion of the Child Workflow method, as in the following example:

```java
GreetingChild child = Workflow.newChildWorkflowStub(GreetingChild.class);
Promise<String> greeting = Async.function(child::composeGreeting, "Hello", name);
// ...
greeting.get()
```

The following examples show how to spawn a Child Workflow:

- Spawn a Child Workflow from a Workflow:

  ```java
  // Child Workflow interface
  @WorkflowInterface
  public interface GreetingChild {
  @WorkflowMethod
  String composeGreeting(String greeting, String name);
  }
  // Child Workflow implementation not shown

  // Parent Workflow implementation
  public class GreetingWorkflowImpl implements GreetingWorkflow {

  @Override
  public String getGreeting(String name) {
      GreetingChild child = Workflow.newChildWorkflowStub(GreetingChild.class);

      // This is a blocking call that returns only after child has completed.
      return child.composeGreeting("Hello", name );
  }
  }
  ```

- Spawn two Child Workflows (with the same type) in parallel:

  ```java
  // Parent Workflow implementation
  public class GreetingWorkflowImpl implements GreetingWorkflow {

      @Override
      public String getGreeting(String name) {

          // Workflows are stateful, so a new stub must be created for each new child.
          GreetingChild child1 = Workflow.newChildWorkflowStub(GreetingChild.class);
          Promise<String> greeting1 = Async.function(child1::composeGreeting, "Hello", name);

          // Both children will run concurrently.
          GreetingChild child2 = Workflow.newChildWorkflowStub(GreetingChild.class);
          Promise<String> greeting2 = Async.function(child2::composeGreeting, "Bye", name);

          // Do something else here.
          ...
          return "First: " + greeting1.get() + ", second: " + greeting2.get();
      }
  }
  ```

- Send a Signal to a Child Workflow from the parent:

  ```java
  // Child Workflow interface
  @WorkflowInterface
  public interface GreetingChild {
      @WorkflowMethod
      String composeGreeting(String greeting, String name);

      @SignalMethod
      void updateName(String name);
  }

  // Parent Workflow implementation
  public class GreetingWorkflowImpl implements GreetingWorkflow {

      @Override
      public String getGreeting(String name) {
          GreetingChild child = Workflow.newChildWorkflowStub(GreetingChild.class);
          Promise<String> greeting = Async.function(child::composeGreeting, "Hello", name);
          child.updateName("Temporal");
          return greeting.get();
      }
  }
  ```

- Sending a Query to Child Workflows from within the parent Workflow code is not supported. However, you can send a Query to Child Workflows from Activities using `WorkflowClient`.

Related reads:

- [How to set a Child Workflow Options in Java](/java/how-to-set-child-workflow-options-in-java)

- [How to develop a Workflow Definition in Java](/java/how-to-develop-a-workflow-definition-in-java)

- Java Workflow reference: <https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/workflow/package-summary.html>
