---
id: how-to-handle-a-query-in-a-workflow-in-java
title: How to handle a Query in a Workflow in Java
sidebar_label: Handle Query
description: To handle a Query in a Workflow, define a Query handler method using the `@QueryMethod` annotation in the Workflow interface.
tags:
  - java
  - developer-guide
---

To handle a Query in the Workflow, create a Query handler using the `@QueryMethod` annotation in the Workflow interface and define it in the Workflow implementation.

The `@QueryMethod` annotation indicates that the method is used to handle a Query that is sent to the Workflow Execution.
The method can have parameters that can be used to filter data that the Query returns.
Because the method returns a value, it must have a return type that is not `void`.

The Query name defaults to the name of the method.
In the following example, the Query name defaults to `getStatus`.

```java
@WorkflowInterface
public interface FileProcessingWorkflow {
   @QueryMethod
   String getStatus();
}
```

To overwrite this default naming and assign a custom Query name, use the `@QueryMethod` annotation with the `name` parameter. In the following example, the Query name is set to "history".

```java
@WorkflowInterface
public interface FileProcessingWorkflow {
   @QueryMethod(name = "history")
   String getStatus();
}
```

A Workflow Definition interface can define multiple methods annotated with `@QueryMethod`, but the method names or the `name` parameters for each must be unique.

The following Workflow interface has a Query method `getCount()` to handle Queries to this Workflow.

```java
  @WorkflowInterface
  public interface HelloWorld {
    @WorkflowMethod
    void sayHello(String name);

    @QueryMethod
    int getCount();
  }
```

The following example is the Workflow implementation with the Query method defined in the `HelloWorld` Workflow interface from the previous exmaple.

```java
  public static class HelloWorldImpl implements HelloWorld {

    private String greeting = "Hello";
    private int count = 0;

    @Override
    public void sayHello(String name) {
      while (!"Bye".equals(greeting)) {
        logger.info(++count + ": " + greeting + " " + name + "!");
        String oldGreeting = greeting;
        Workflow.await(() -> !Objects.equals(greeting, oldGreeting));
      }
      logger.info(++count + ": " + greeting + " " + name + "!");
    }

    @Override
    public int getCount() {
      return count;
    }
  }
```

**Dynamic Query Handler**
You can also implement Query handlers dynamically. This is useful for library-level code and implementation of DSLs.

Use `Workflow.registerListener(Object)` to register an implementation of the `DynamicQueryListener` in the Workflow implementation code.

```java
      Workflow.registerListener(
        (DynamicQueryHandler)
            (queryName, encodedArgs) -> name = encodedArgs.get(0, String.class));
```

When registered, any Queries sent to the Workflow without a defined handler will be delivered to the `DynamicQueryHandler`.
Note that you can only register one `Workflow.registerListener(Object)` per Workflow Execution.
`DynamicQueryHandler` can be implemented in both regular and dynamic Workflow implementations.
